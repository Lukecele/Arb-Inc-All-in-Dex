import { NextResponse } from "next/server";
import { ethers } from "ethers";
import { Redis } from "@upstash/redis";

// Configurazione BSC - Usiamo un provider ad alta affidabilità come default
const RPC_URL = (process.env.BSC_RPC_URL || "https://binance.llamarpc.com").replace(/\/$/, "");

// Inizializzazione Redis
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        let { txHash, userWallet, type } = body;

        // Validazione base
        if (!txHash || !userWallet || !type) {
            return NextResponse.json({ success: false, error: "Parametri mancanti" }, { status: 400 });
        }

        // Validazione integrità indirizzo (ethers v5)
        if (!ethers.utils.isAddress(userWallet)) {
            return NextResponse.json({ success: false, error: "Wallet non valido" }, { status: 400 });
        }
        userWallet = userWallet.toLowerCase();

        // Calcolo Punti
        let points = 0;
        if (type === "swap") points = 100;
        else if (type === "zap") points = 150;
        else if (type === "limit") points = 200;
        else return NextResponse.json({ success: false, error: "Invalid type" }, { status: 400 });

        // --- 🛡️ SECURITY PATCH (ON-CHAIN + REDIS) ---
        try {
            // 1. Verifica Double-Spend (Redis)
            const alreadyClaimed = await redis.get(`claim_tx:${txHash}`);
            if (alreadyClaimed) {
                return NextResponse.json({ success: false, error: "Transazione già riscattata" }, { status: 400 });
            }

            // 2. Convalida Blockchain (Sintassi v5 con fix Referrer URL)
            // L'errore in image_8d0cab.png indica che "client" non è un URL valido.
            // Usiamo l'indirizzo reale del sito per soddisfare i requisiti del fetcher.
            const connection = {
                url: RPC_URL,
                headers: { 
                    "Referer": "https://arbitrage-inc.exchange",
                    "Origin": "https://arbitrage-inc.exchange"
                }
            };
            
            const provider = new ethers.providers.StaticJsonRpcProvider(connection, 56);
            const receipt = await provider.getTransactionReceipt(txHash);
            
            if (!receipt || receipt.status !== 1) {
                return NextResponse.json({ success: false, error: "Transazione fallita o non trovata" }, { status: 400 });
            }

            // 3. Verifica Ownership
            if (receipt.from.toLowerCase() !== userWallet) {
                return NextResponse.json({ success: false, error: "La transazione non appartiene a questo wallet" }, { status: 403 });
            }

            // 4. Marcatura hash come usato (30 giorni)
            await redis.set(`claim_tx:${txHash}`, "true", { ex: 2592000 });

        } catch (verifyError: any) {
            console.error("RPC Verify Error:", verifyError);
            return NextResponse.json({ success: false, error: "Errore durante la verifica blockchain" }, { status: 503 });
        }
        // --- END SECURITY PATCH ---

        // Assegnazione Punti
        await redis.zincrby("leaderboard:points", points, userWallet);

        // 🎁 Bonus Referrer
        const parent = await redis.get(`ref:parent:${userWallet}`);
        if (parent) {
            const bonus = points * 0.1;
            await redis.zincrby("leaderboard:points", bonus, parent as string);
            await redis.incrbyfloat(`ref:earnings:${parent}`, bonus);
        }

        console.log(`[OK] Reward elaborata per ${userWallet}: ${points} punti`);
        return NextResponse.json({ success: true, pointsAdded: points });

    } catch (error) {
        console.error("General Error:", error);
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
}
