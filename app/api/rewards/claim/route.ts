import { Redis } from "@upstash/redis";
import * as ethers from "ethers";
import { NextResponse } from "next/server";

const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL || "",
	token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
});

const RPC_URLS = [
    "https://binance.nodereal.io",
    "https://bsc-dataseed.binance.org/",
    "https://bsc-dataseed1.binance.org/",
    "https://1rpc.io/bnb",
    process.env.BSC_RPC_URL,
    process.env.RPC_URL,
].filter(Boolean) as string[];

const BSC_NETWORK = {
    name: "binance",
    chainId: 56,
};

function createProvider(url: string) {
    const ProviderClass = (ethers as any).providers?.StaticJsonRpcProvider || (ethers as any).providers?.JsonRpcProvider;
    return new ProviderClass(url, BSC_NETWORK);
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

            const privKey = process.env.PRIVATE_KEY;
            if (!privKey) throw new Error("Errore configurazione server (Key missing)");

            const value = (ethers as any).utils.parseEther(totalToPay.toFixed(18));
            const gasLimit = (ethers as any).BigNumber.from(35000);

            let sentTx: any = null;
            let lastRpcError: any = null;

            for (const rpcUrl of RPC_URLS) {
                try {
                    console.log(`[Claim API] Attempting payout via RPC: ${rpcUrl}`);
                    const provider = createProvider(rpcUrl);
                    const signer = new (ethers as any).Wallet(privKey, provider);

                    const gasPrice = await provider.getGasPrice().catch(() => (ethers as any).utils.parseUnits("1", "gwei"));

                    sentTx = await signer.sendTransaction({
                        to: walletLower,
                        value,
                        gasPrice,
                        gasLimit,
                    });

                    if (sentTx && sentTx.hash) {
                        console.log(`[Claim API] Tx successfully broadcast: ${sentTx.hash} via ${rpcUrl}`);
                        break;
                    }
                } catch (rpcErr: any) {
                    console.warn(`[Claim API] Broadcast failed on ${rpcUrl}:`, rpcErr?.message || rpcErr);
                    lastRpcError = rpcErr;
                }
            }

            if (!sentTx || !sentTx.hash) {
                throw new Error(lastRpcError?.message || "Failed to broadcast transaction via all RPC endpoints");
            }

            // Attendiamo 1 conferma (3s su BSC), con fallback non bloccante
            try {
                await Promise.race([
                    sentTx.wait(1),
                    new Promise((_, reject) => setTimeout(() => reject(new Error("wait_timeout")), 8000)),
                ]);
            } catch (waitErr) {
                console.warn("[Claim API] Confirmation wait timed out, but tx broadcast confirmed:", sentTx.hash);
            }

            // Azzeriamo solo il saldo BNB reale e sincronizziamo l'indice
            await redis.set(`rewards:pending:${walletLower}`, "0");
            await redis.set(
                `rewards:user_index:${walletLower}`,
                globalIndex.toString(),
            );

            return NextResponse.json({ success: true, txHash: sentTx.hash, hash: sentTx.hash });
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
