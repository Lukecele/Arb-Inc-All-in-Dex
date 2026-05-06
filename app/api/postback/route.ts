import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL || "",
	token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
});

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const wallet = searchParams.get("tracking_id")?.toLowerCase();
	const status = searchParams.get("status");

	if (!wallet) return new Response("No Wallet", { status: 400 });

	try {
		const amount = 250;

		// 1. Assegna Punti all'utente
		await redis.zincrby("leaderboard:points", amount, wallet);
		console.log(`✅ Task CPAGrip completata: +250 Punti a ${wallet}`);

		// 2. Bonus Referral
		const parent = await redis.get(`ref:parent:${wallet}`);
		if (parent) {
			const bonus = amount * 0.1; // 25 punti
			await redis.zincrby("leaderboard:points", bonus, parent as string);
			await redis.incrbyfloat(`ref:earnings:${parent}`, bonus);
			console.log(
				`🎁 Bonus Task: +${bonus} punti a ${parent} (invito di ${wallet})`,
			);
		}

		return new Response("OK", { status: 200 });
	} catch (error) {
		console.error("Errore Postback:", error);
		return new Response("Error", { status: 500 });
	}
}
