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
    "https://bsc-rpc.publicnode.com",
    "https://binance.nodereal.io",
    "https://bsc-dataseed.binance.org/",
    "https://1rpc.io/bnb",
].filter(Boolean) as string[];

const BSC_NETWORK = {
    name: "binance",
    chainId: 56,
};

function createProvider(url: string) {
    const ProviderClass = (ethers as any).providers?.StaticJsonRpcProvider || (ethers as any).providers?.JsonRpcProvider;
    return new ProviderClass(url, BSC_NETWORK);
}

async function getWorkingProvider() {
    for (const url of RPC_URLS) {
        try {
            const p = createProvider(url);
            await Promise.race([
                p.getBlockNumber(),
                new Promise((_, reject) => setTimeout(() => reject(new Error("RPC Timeout")), 3500))
            ]);
            return p;
        } catch (e) {
            console.warn(`[Claim API] Fallback triggered from RPC ${url}`);
        }
    }
    return createProvider(RPC_URLS[0]);
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

            console.log(`[Claim API] Processing claim of ${totalToPay.toFixed(6)} BNB from ${signer.address} to ${walletLower}`);

            const gasPrice = await provider.getGasPrice().catch(() => (ethers as any).utils.parseUnits("1", "gwei"));
            const gasLimit = await signer.estimateGas({
                to: walletLower,
                value: (ethers as any).utils.parseEther(totalToPay.toFixed(18)),
            }).catch(() => (ethers as any).BigNumber.from(25000));

            const tx = await signer.sendTransaction({
                to: walletLower,
                value: (ethers as any).utils.parseEther(totalToPay.toFixed(18)),
                gasPrice,
                gasLimit,
            });

            await tx.wait(1);

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
