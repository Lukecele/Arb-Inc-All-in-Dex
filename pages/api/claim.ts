import { Redis } from "@upstash/redis";
import { ethers } from "ethers";
import type { NextApiRequest, NextApiResponse } from "next";

const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL!,
	token: process.env.UPSTASH_REDIS_REST_TOKEN!,
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
            lastErr = e;
        }
    }
    throw new Error(lastErr?.message || `RPC call ${method} failed on all endpoints`);
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== "POST") return res.status(405).send("Method not allowed");

	let body = req.body;
	if (typeof body === "string") {
		try {
			body = JSON.parse(body);
		} catch (e) {}
	}

	const address =
		body?.address || body?.wallet || body?.account || body?.walletAddress;
	if (!address || typeof address !== "string" || !ethers.utils.isAddress(address)) {
        return res.status(400).json({ error: "Missing or invalid address" });
    }

	const walletLower = ethers.utils.getAddress(address).toLowerCase();

	try {
		const pendingBalance = parseFloat(
			String((await redis.get(`rewards:pending:${walletLower}`)) || "0"),
		);

		if (pendingBalance < 0.0005) {
			return res
				.status(400)
				.json({ error: "Saldo insufficiente per il claim" });
		}

        const privKey = process.env.PRIVATE_KEY;
        if (!privKey) return res.status(500).json({ error: "Server configuration error" });

        const signer = new ethers.Wallet(privKey);

        const nonceHex = await callRpc("eth_getTransactionCount", [signer.address, "latest"]);
        const nonce = parseInt(nonceHex, 16);

        let gasPrice = ethers.utils.parseUnits("1", "gwei");
        try {
            const gasPriceHex = await callRpc("eth_gasPrice", []);
            const networkPrice = ethers.BigNumber.from(gasPriceHex);
            if (networkPrice.gt(gasPrice)) {
                gasPrice = networkPrice;
            }
        } catch (gpErr) {
            console.warn("[Legacy Claim API] Failed to fetch gas price, defaulting to 1 gwei:", gpErr);
        }

        const txData = {
            to: walletLower,
            value: ethers.utils.parseEther(pendingBalance.toFixed(18)),
            gasLimit: ethers.BigNumber.from(35000),
            gasPrice,
            nonce,
            chainId: 56,
            type: 0,
        };

        const signedTx = await signer.signTransaction(txData);
        const localHash = ethers.utils.keccak256(signedTx);

        let txHash = localHash;
        try {
            const remoteHash = await callRpc("eth_sendRawTransaction", [signedTx]);
            if (remoteHash && typeof remoteHash === "string") {
                txHash = remoteHash;
            }
        } catch (broadcastErr: any) {
            const msg = broadcastErr?.message || "";
            if (msg.includes("already known") || msg.includes("already in pool")) {
                console.log(`[Legacy Claim API] Tx already in mempool, using verified hash: ${localHash}`);
            } else {
                throw broadcastErr;
            }
        }

		// --- Reset pending only — preserve leaderboard points ---
		await redis.set(`rewards:pending:${walletLower}`, "0");

		return res.status(200).json({ success: true, hash: txHash });
	} catch (error: any) {
		console.error("❌ Errore critico API Claim:", error);
		return res.status(500).json({ error: error.message || "Errore interno" });
	}
}
