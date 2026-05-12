import { ethers } from "ethers";
import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

// Configurazione BSC (usiamo StaticJsonRpcProvider per evitare problemi di network)
const RPC_URL = process.env.BSC_RPC_URL || "https://bsc-dataseed.binance.org/";

// Inizializzazione Redis
const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL || "",
    token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
});

export async function POST(req: Request) {
    try {
        if (!process.env.UPSTASH_REDIS_REST_URL) {
            return NextResponse.json(
                { success: false, error: "Missing Redis config" },
                { status: 500 },
            );
        }

        const body = await req.json();
        let { userWallet, type, txHash } = body;

        // 1. Validazione input base
        if (!userWallet || !ethers.utils.isAddress(userWallet)) {
            return NextResponse.json({ success: false, error: "Invalid wallet address" }, { status: 400 });
        }
        userWallet = ethers.utils.getAddress(userWallet).toLowerCase();

        if (!txHash || typeof txHash !== "string" || !/^0x[a-fA-F0-9]{64}$/.test(txHash)) {
            return NextResponse.json({ success: false, error: "Valid txHash required" }, { status: 400 });
        }

        let points = 0;
        if (type === "swap") points = 100;
        else if (type === "zap") points = 150;
        else if (type === "limit") points = 200;
        else {
            return NextResponse.json({ success: false, error: "Invalid reward type" }, { status: 400 });
        }

        // =========================================================
        // 🔒 VERIFICA BLOCKCHAIN (StaticJsonRpcProvider è CRUCIALE)
        // =========================================================
        const provider = new ethers.providers.StaticJsonRpcProvider(RPC_URL, { 
            name: 'binance', 
            chainId: 56 
        });

        try {
            // Controllo receipt (più solido di getTransaction)
            const receipt = await provider.getTransactionReceipt(txHash);
            
            if (!receipt) {
                return NextResponse.json({ success: false, error: "Transaction not found on blochchain" }, { status: 400 });
            }
            
            // Verifica da chi è partita la chiamata
            if (receipt.from.toLowerCase() !== userWallet) {
                return NextResponse.json({ success: false, error: "Transaction does not belong to this wallet" }, { status: 403 });
            }

            // Verifica status successo
            if (receipt.status !== 1) {
                return NextResponse.json({ success: false, error: "Transaction failed or pending on blockchain" }, { status: 400 });
            }
        } catch (rpcError: any) {
            console.error("RPC Verify Error:", rpcError);
            return NextResponse.json({ success: false, error: "Error verifying transaction on chain" }, { status: 500 });
        }

        // =========================================================
        // 🚨 ANTI-FARMING (CONTROLLO ATOMICO)
        // =========================================================
        const isNewTransaction = await redis.set(
            `processed_tx:${txHash}`,
            "true",
            { nx: true, ex: 2592000 } // Scadenza 30 giorni
        );
        
        if (!isNewTransaction) {
            return NextResponse.json({
                success: false,
                error: "Reward already claimed for this transaction",
            }, { status: 400 });
        }

        // 2. Assegna punti base
        await redis.zincrby("leaderboard:points", points, userWallet);

        // 3. Assegna il bonus Referrer
        const parent = await redis.get(`ref:parent:${userWallet}`);
        if (parent) {
            const bonus = points * 0.1;
            await redis.zincrby("leaderboard:points", bonus, parent as string);
            await redis.incrbyfloat(`ref:earnings:${parent}`, bonus);
        }

        return NextResponse.json({ success: true, pointsAdded: points });
    } catch (error) {
        console.error("Errore salvataggio punti:", error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 },
        );
    }
}
