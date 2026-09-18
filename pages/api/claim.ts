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
    "https://1rpc.io/bnb",
    process.env.BSC_RPC_URL,
    process.env.RPC_URL,
].filter(Boolean) as string[];

const BSC_NETWORK = {
    name: "binance",
    chainId: 56,
};

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

        const value = ethers.utils.parseEther(pendingBalance.toFixed(18));
        const gasLimit = ethers.BigNumber.from(35000);

        let sentTx: any = null;
        let lastRpcError: any = null;

        for (const rpcUrl of RPC_URLS) {
            try {
                const provider = new ethers.providers.StaticJsonRpcProvider(rpcUrl, BSC_NETWORK);
                const signer = new ethers.Wallet(privKey, provider);
                const gasPrice = await provider.getGasPrice().catch(() => ethers.utils.parseUnits("1", "gwei"));

                sentTx = await signer.sendTransaction({
                    to: walletLower,
                    value,
                    gasPrice,
                    gasLimit,
                });

                if (sentTx && sentTx.hash) {
                    break;
                }
            } catch (rpcErr: any) {
                console.warn(`[Legacy Claim API] RPC failure on ${rpcUrl}:`, rpcErr?.message || rpcErr);
                lastRpcError = rpcErr;
            }
        }

        if (!sentTx || !sentTx.hash) {
            throw new Error(lastRpcError?.message || "Failed to broadcast transaction via all RPC endpoints");
        }

        try {
            await Promise.race([
                sentTx.wait(1),
                new Promise((_, reject) => setTimeout(() => reject(new Error("wait_timeout")), 8000)),
            ]);
        } catch (e) {
            console.warn("[Legacy Claim API] Confirmation wait timed out, but tx broadcast confirmed:", sentTx.hash);
        }

		// --- Reset pending only — preserve leaderboard points ---
		await redis.set(`rewards:pending:${walletLower}`, "0");

		return res.status(200).json({ success: true, hash: sentTx.hash });
	} catch (error: any) {
		console.error("❌ Errore critico API Claim:", error);
		return res.status(500).json({ error: error.message || "Errore interno" });
	}
}
