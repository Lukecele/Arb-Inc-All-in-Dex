import { NextResponse } from "next/server";
import { ethers } from "ethers";
import { Redis } from "@upstash/redis";

// Ripristino RPC ufficiale Binance
const RPC_URL = (process.env.BSC_RPC_URL || "https://bsc-dataseed.binance.org").replace(/\/$/, "");

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        let { txHash, userWallet, type } = body;

        if (!txHash || !userWallet || !type) {
            return NextResponse.json({ success: false, error: "Parametri mancanti" }, { status: 400 });
        }

        if (!ethers.utils.isAddress(userWallet)) {
            return NextResponse.json({ success: false, error: "Wallet non valido" }, { status: 400 });
        }
        userWallet = userWallet.toLowerCase();

        let points = 0;
        if (type === "swap") points = 100;
        else if (type === "zap") points = 150;
        else if (type === "limit") points = 200;
        else return NextResponse.json({ success: false, error: "Invalid type" }, { status: 400 });

        try {
            const alreadyClaimed = await redis.get(`claim_tx:${txHash}`);
            if (alreadyClaimed) {
                return NextResponse.json({ success: false, error: "Transazione già riscattata" }, { status: 400 });
            }

            // --- FIX RADICALE PER REFERRER ---
            // Definiamo la connessione forzando headers che sovrascrivono il default "client"
            const connection: ethers.utils.ConnectionInfo = {
                url: RPC_URL,
                headers: {
                    "Referer": "https://arbitrage-inc.exchange",
                    "User-Agent": "Mozilla/5.0"
                }
            };

            const provider = new ethers.providers.StaticJsonRpcProvider(connection, 56);
            const receipt = await provider.getTransactionReceipt(txHash);
            
            if (!receipt || receipt.status !== 1) {
                return NextResponse.json({ success: false, error: "Transazione fallita o non trovata" }, { status: 400 });
            }

            if (receipt.from.toLowerCase() !== userWallet) {
                return NextResponse.json({ success: false, error: "La transazione non appartiene a questo wallet" }, { status: 403 });
            }

            await redis.set(`claim_tx:${txHash}`, "true", { ex: 2592000 });

        } catch (verifyError: any) {
            console.error("RPC Verify Error:", verifyError);
            return NextResponse.json({ success: false, error: "Errore durante la verifica blockchain" }, { status: 503 });
        }

        await redis.zincrby("leaderboard:points", points, userWallet);

        const parent = await redis.get(`ref:parent:${userWallet}`);
        if (parent) {
            const bonus = points * 0.1;
            await redis.zincrby("leaderboard:points", bonus, parent as string);
            await redis.incrbyfloat(`ref:earnings:${parent}`, bonus);
        }

        return NextResponse.json({ success: true, pointsAdded: points });

    } catch (error) {
        console.error("General Error:", error);
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
}
