import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";
const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL || "",
	token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
});
export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const wallet = searchParams.get("tracking_id")?.toLowerCase();
	const secret = searchParams.get("secret");
	const expectedSecret = process.env.CPAGRIP_POSTBACK_SECRET;
	if (expectedSecret && secret !== expectedSecret) {
		return new Response("Unauthorized", { status: 401 });
	}
	if (!wallet) return new Response("No Wallet", { status: 400 });
	try {
		const amount = 250;
		await redis.zincrby("leaderboard:points", amount, wallet);
		const parent = await redis.get(`ref:parent:${wallet}`);
		if (parent) {
			const bonus = amount * 0.1;
			await redis.zincrby("leaderboard:points", bonus, parent as string);
			await redis.incrbyfloat(`ref:earnings:${parent}`, bonus);
		}
		return new Response("OK", { status: 200 });
	} catch (error) {
		console.error("Postback error:", error);
		return new Response("Error", { status: 500 });
	}
}
