import { utils } from "ethers";
import * as ethers from "ethers";
import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

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

		if (!userWallet)
			return NextResponse.json({ success: false, error: "No wallet" }, { status: 400 });
		
        if (!utils.isAddress(userWallet)) {
            return NextResponse.json({ success: false, error: "Invalid Ethereum address" }, { status: 400 });
        }
        userWallet = utils.getAddress(userWallet).toLowerCase();

        // 🛡️ 1. Controllo base Regex per l'hash (deve essere ESATTAMENTE 66 caratteri, formato Hex)
        if (!txHash || typeof txHash !== "string" || !/^0x[a-fA-F0-9]{64}$/.test(txHash)) {
            return NextResponse.json({ success: false, error: "Valid txHash required" }, { status: 400 });
        }

		let points = 0;
		if (type === "swap") points = 100;
		if (type === "zap") points = 150;
		if (type === "limit") points = 200;
		if (points === 0) {
			return NextResponse.json({ success: false, error: "Invalid type" }, { status: 400 });
        }

        // =========================================================
        // 🔒 LA BARRIERA RPC (VERIFICA SULLA BLOCKCHAIN)
        // =========================================================
        const provider = new (ethers as any).providers.JsonRpcProvider("https://bsc-dataseed.binance.org/");
        
        try {
            // Verifica che la Transazione esista sulla rete BSC
            const tx = await provider.getTransaction(txHash);
            if (!tx) {
                console.log(`[HACKER BLOCCATO] TX non trovata in rete: ${txHash}`);
                return NextResponse.json({ success: false, error: "Transaction not found on blochchain" }, { status: 400 });
            }
            
            // Verifica che la Transazione sia stata eseguita DAL wallet che sta chiedendo i punti!
            if (tx.from.toLowerCase() !== userWallet) {
                console.log(`[HACKER BLOCCATO] Furto di TX. Wallet Richiedente: ${userWallet} - Wallet Reale TX: ${tx.from}`);
                return NextResponse.json({ success: false, error: "Transaction does not belong to this wallet" }, { status: 403 });
            }

            // Verifica che la Transazione sia confermata e non fallita (status = 1)
            const receipt = await provider.getTransactionReceipt(txHash);
            if (!receipt || receipt.status !== 1) {
                return NextResponse.json({ success: false, error: "Transaction failed or pending on blockchain" }, { status: 400 });
            }

        } catch (rpcError) {
            console.error("RPC Verify Error:", rpcError);
            return NextResponse.json({ success: false, error: "Error verifying transaction on chain" }, { status: 500 });
        }
        // =========================================================

		// 🚨 SISTEMA ANTI-FARMING (Controlliamo che l'hash non sia GIÀ stato premiato)
		const isNewTransaction = await redis.set(
			`processed_tx:${txHash}`,
			"true",
			{ nx: true },
		);
		if (!isNewTransaction) {
			console.log(`[BLOCCATO] Tentativo di claim doppio per tx: ${txHash}`);
			return NextResponse.json({
				success: false,
				error: "Reward already claimed for this transaction",
			});
		}

		// 2. Assegna punti base
		await redis.zincrby("leaderboard:points", points, userWallet);

		// 3. Assegna il bonus Referrer usando il Database (Infallibile)
		const parent = await redis.get(`ref:parent:${userWallet}`);
		if (parent) {
			const bonus = points * 0.1;
			await redis.zincrby("leaderboard:points", bonus, parent as string);
			await redis.incrbyfloat(`ref:earnings:${parent}`, bonus);
			console.log(`🎁 Bonus DEX: +${bonus} punti a ${parent} (invito di ${userWallet})`);
		}

		return NextResponse.json({ success: true, pointsAdded: points });
	} catch (error) {
		console.error("Errore salvataggio punti:", error);
		return NextResponse.json(
			{ success: false, error: "Database error" },
			{ status: 500 },
		);
	}
}
