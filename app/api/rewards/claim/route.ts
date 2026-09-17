import { Redis } from "@upstash/redis";
import * as ethers from "ethers";
import { NextResponse } from "next/server";

const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL || "",
	token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
});

const RPC_URLS = [
    process.env.BSC_RPC_URL,
    process.env.RPC_URL,
    "https://binance.nodereal.io",
    "https://bsc-rpc.publicnode.com",
    "https://1rpc.io/bnb",
].filter(Boolean) as string[];

async function getWorkingProvider() {
    for (const url of RPC_URLS) {
        try {
            const p = new (ethers as any).providers.JsonRpcProvider(url);
            await Promise.race([
                p.getBlockNumber(),
                new Promise((_, reject) => setTimeout(() => reject(new Error("RPC Timeout")), 2500))
            ]);
            return p;
        } catch (e) {
            console.warn(`[Claim API] Fallback triggered from RPC ${url}`);
        }
    }
    return new (ethers as any).providers.JsonRpcProvider(RPC_URLS[0]);
}

export const maxDuration = 30;
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
	try {
        const body = await request.json();
		const wallet = body?.wallet || body?.walletAddress;

        // 1. Controllo base che ci sia un wallet fornito
        if (!wallet || typeof wallet !== "string") {
            return NextResponse.json({ error: "Missing or invalid wallet parameter" }, { status: 400 });
        }
        
        // 2. Formattazione Ethers.js robusta anti-injection
        if (!(ethers as any).utils.isAddress(wallet.toLowerCase())) {
            return NextResponse.json({ error: "Invalid Ethereum address format" }, { status: 400 });
        }
        const walletLower = (ethers as any).utils.getAddress(wallet).toLowerCase();

        // 3. Lock atomico per wallet: impedisce richieste parallele/concorrenti da script (TTL 45s di margine)
        const lockKey = `lock:claim:${walletLower}`;
        const acquired = await redis.set(lockKey, "locked", { nx: true, ex: 45 });
        if (!acquired) {
            return NextResponse.json(
                { error: "Richiesta di claim già in elaborazione per questo wallet. Riprova tra poco." },
                { status: 429 },
            );
        }

        try {
            const MIN_CLAIM = 0.001;

            const points = parseFloat(
                String((await redis.zscore("leaderboard:points", walletLower)) || "0"),
            );
            const globalIndex = parseFloat(
                String((await redis.get("rewards:global_index")) || "0"),
            );
            const userIndexStr = await redis.get(`rewards:user_index:${walletLower}`);
            const userIndex = userIndexStr !== null ? parseFloat(String(userIndexStr)) : globalIndex;
            const pendingBnb = parseFloat(
                String((await redis.get(`rewards:pending:${walletLower}`)) || "0"),
            );

            const currentClaimable = points * (globalIndex - userIndex);
            const totalToPay = pendingBnb + Math.max(0, currentClaimable);

            if (totalToPay < MIN_CLAIM) {
                return NextResponse.json(
                    { error: `Sotto soglia: ${totalToPay.toFixed(6)}` },
                    { status: 400 },
                );
            }

            const provider = await getWorkingProvider();
            const privKey = process.env.PRIVATE_KEY;
            if (!privKey) throw new Error("Errore configurazione server (Key missing)");

            const signer = new (ethers as any).Wallet(privKey, provider);

            const tx = await signer.sendTransaction({
                to: walletLower,
                value: (ethers as any).utils.parseEther(totalToPay.toFixed(18)),
            });

            await tx.wait();

            // Azzeriamo solo il saldo BNB reale e sincronizziamo l'indice
            await redis.set(`rewards:pending:${walletLower}`, "0");
            await redis.set(
                `rewards:user_index:${walletLower}`,
                globalIndex.toString(),
            );

            return NextResponse.json({ success: true, txHash: tx.hash, hash: tx.hash });
        } finally {
            // Rilascio atomico del lock
            await redis.del(lockKey);
        }
	} catch (error: any) {
		return NextResponse.json(
			{ error: error.message || "Errore interno al server" },
			{ status: 500 },
		);
	}
}
