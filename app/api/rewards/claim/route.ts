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
    "https://bsc-dataseed2.binance.org/",
    "https://1rpc.io/bnb",
    process.env.BSC_RPC_URL,
    process.env.RPC_URL,
].filter(Boolean) as string[];

async function callRpc(method: string, params: any[]): Promise<any> {
    let lastErr: any = null;
    for (const url of RPC_URLS) {
        try {
            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ jsonrpc: "2.0", id: Date.now(), method, params }),
                signal: AbortSignal.timeout(5000),
            });
            if (!res.ok) continue;
            const data = await res.json();
            if (data?.error) {
                throw new Error(data.error.message || JSON.stringify(data.error));
            }
            if (data?.result !== undefined) {
                return data.result;
            }
        } catch (e: any) {
            console.warn(`[Claim API] RPC ${url} ${method} failed:`, e?.message || e);
            lastErr = e;
        }
    }
    throw new Error(lastErr?.message || `RPC call ${method} failed on all endpoints`);
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

            // Offline signer - Zero dipendenze di rete per la firma!
            const signer = new (ethers as any).Wallet(privKey);

            // 1. Recupero Nonce
            const nonceHex = await callRpc("eth_getTransactionCount", [signer.address, "latest"]);
            const nonce = parseInt(nonceHex, 16);

            // 2. Recupero Gas Price (minimo garantito 1 gwei su BSC)
            let gasPrice = (ethers as any).utils.parseUnits("1", "gwei");
            try {
                const gasPriceHex = await callRpc("eth_gasPrice", []);
                const networkPrice = (ethers as any).BigNumber.from(gasPriceHex);
                if (networkPrice.gt(gasPrice)) {
                    gasPrice = networkPrice;
                }
            } catch (gpErr) {
                console.warn("[Claim API] Failed to fetch gas price, defaulting to 1 gwei:", gpErr);
            }

            // 3. Costruzione e firma offline (100% in memoria, pura crittografia locale ECDSA)
            const txData = {
                to: walletLower,
                value: (ethers as any).utils.parseEther(totalToPay.toFixed(18)),
                gasLimit: (ethers as any).BigNumber.from(35000),
                gasPrice,
                nonce,
                chainId: 56,
                type: 0,
            };

            const signedTx = await signer.signTransaction(txData);
            const localHash = (ethers as any).utils.keccak256(signedTx);

            // 4. Broadcast transazione tramite nodi BSC ridondati
            console.log(`[Claim API] Broadcasting tx for ${walletLower} (amount: ${totalToPay.toFixed(6)} BNB, nonce: ${nonce})`);
            let txHash = localHash;
            try {
                const remoteHash = await callRpc("eth_sendRawTransaction", [signedTx]);
                if (remoteHash && typeof remoteHash === "string") {
                    txHash = remoteHash;
                }
            } catch (broadcastErr: any) {
                const msg = broadcastErr?.message || "";
                if (msg.includes("already known") || msg.includes("already in pool")) {
                    console.log(`[Claim API] Tx already in mempool, using verified hash: ${localHash}`);
                } else {
                    throw broadcastErr;
                }
            }

            console.log(`[Claim API] Tx successfully broadcast! Hash: ${txHash}`);

            // 5. Azzeriamo solo il saldo BNB reale e sincronizziamo l'indice
            await redis.set(`rewards:pending:${walletLower}`, "0");
            await redis.set(
                `rewards:user_index:${walletLower}`,
                globalIndex.toString(),
            );

            return NextResponse.json({ success: true, txHash, hash: txHash });
        } finally {
            // Rilascio atomico del lock
            await redis.del(lockKey);
        }
	} catch (error: any) {
        console.error("[Claim API Critical Error]:", error);
		return NextResponse.json(
			{ error: error.message || "Errore interno al server" },
			{ status: 500 },
		);
	}
}
