import { NextResponse } from "next/server";
import { ethers } from "ethers";
import { Redis } from "@upstash/redis";

// Configurazione BSC - robusta (rimuove eventuali barre finali)
const RPC_URL = (process.env.BSC_RPC_URL || "https://bsc-dataseed.binance.org").replace(/\/$/, "");

// Inizializzazione Redis
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { txHash, userWallet, amount } = body;

        // Validazione parametri
        if (!txHash || !userWallet || !amount) {
            return NextResponse.json({ success: false, error: "Parametri mancanti (txHash, userWallet, amount)" }, { status: 400 });
        }

        // 🛡️ 1. Verifica Double-Spend (Redis)
        const alreadyClaimed = await redis.get(`claim_tx:${txHash}`);
        if (alreadyClaimed) {
            return NextResponse.json({ success: false, error: "Transazione già riscattata" }, { status: 400 });
        }

        // 2. Convalida Blockchain
        // Usa StaticJsonRpcProvider per evitare l'errore 'could not detect network'
        const provider = new ethers.providers.StaticJsonRpcProvider(RPC_URL, 56);
        
        let receipt;
        try {
            receipt = await provider.getTransactionReceipt(txHash);
        } catch (rpcError: any) {
            console.error("RPC Verify Error:", rpcError);
            return NextResponse.json({ success: false, error: "Nodo BSC non raggiungibile, riprova tra poco" }, { status: 503 });
        }
        
        if (!receipt) {
            return NextResponse.json({ success: false, error: "Transazione non trovata su BSC" }, { status: 400 });
        }

        if (receipt.status !== 1) {
            return NextResponse.json({ success: false, error: "Transazione fallita on-chain" }, { status: 400 });
        }

        // 3. Verifica Ownership
        if (receipt.from.toLowerCase() !== userWallet.toLowerCase()) {
            console.warn(`[SECURITY] Wallet mismatch: User ${userWallet} tried to claim TX from ${receipt.from}`);
            return NextResponse.json({ success: false, error: "La transazione non appartiene a questo wallet" }, { status: 403 });
        }

        // 4. Marcatura hash come usato (30 giorni)
        await redis.set(`claim_tx:${txHash}`, "true", { ex: 2592000 });

        console.log(`[OK] Reward elaborata per ${userWallet}: ${amount}`);
        
        return NextResponse.json({ success: true, message: "Reward processed successfully" });

    } catch (error) {
        console.error("General Error:", error);
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
}
