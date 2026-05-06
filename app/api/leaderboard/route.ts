import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL!,
	token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function GET() {
	try {
		const data = await redis.zrange("leaderboard:points", 0, 99, {
			rev: true,
			withScores: true,
		});
		const leaderboard = [];
		for (let i = 0; i < data.length; i += 2) {
			leaderboard.push({
				address: String(data[i]),
				points: Number(data[i + 1]),
			});
		}
		return NextResponse.json({ leaderboard });
	} catch (e) {
		return NextResponse.json({ leaderboard: [] });
	}
}
