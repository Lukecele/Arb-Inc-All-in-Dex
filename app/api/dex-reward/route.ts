import { utils } from "ethers";
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
			return NextResponse.json(
				{ success: false, error: "No wallet" },
				{ status: 400 },
			);
		if (!utils.isAddress(userWallet)) return NextResponse.json({ success: false, error: "Invalid Ethereum address" }, { status: 400 });
      userWallet = utils.getAddress(userWallet).toLowerCase();
      if (!txHash || typeof txHash !== "string" || txHash.length !== 66) return NextResponse.json({ success: false, error: "Valid txHash required" }, { status: 400 });

		// 🚨 SISTEMA ANTI-FARMING
		if (txHash) {
			const isNewTransaction = await redis.set(
				`processed_tx:${txHash}`,
				"true",
				{ nx: true },
			);
			if (!isNewTransaction) {
				console.log(
					`[BLOCCATO] Tentativo di claim doppio per tx/order: ${txHash}`,
				);
				return NextResponse.json({
					success: false,
					error: "Reward already claimed for this transaction",
				});
			}
		}

		let points = 0;
		if (type === "swap") points = 100;
		if (type === "zap") points = 150;
		if (type === "limit") points = 200;
		if (points === 0)
			return NextResponse.json(
				{ success: false, error: "Invalid type" },
				{ status: 400 },
			);

		// 1. Assegna punti base
		await redis.zincrby("leaderboard:points", points, userWallet);

		// 2. Assegna il bonus Referrer usando il Database (Infallibile)
		const parent = await redis.get(`ref:parent:${userWallet}`);
		if (parent) {
			const bonus = points * 0.1;
			await redis.zincrby("leaderboard:points", bonus, parent as string);
			await redis.incrbyfloat(`ref:earnings:${parent}`, bonus);
			console.log(
				`🎁 Bonus DEX: +${bonus} punti a ${parent} (invito di ${userWallet})`,
			);
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
