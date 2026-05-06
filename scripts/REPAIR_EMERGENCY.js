const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const { Redis } = require("@upstash/redis");

const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL,
	token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

async function repair() {
	const REAL_TOTAL_POINTS = 13768;
	const REAL_BNB = 0.008601;
	const CORRECT_INDEX = (REAL_BNB * 0.8) / REAL_TOTAL_POINTS;

	await redis.set("rewards:global_index", CORRECT_INDEX.toString());
	await redis.set(
		"leaderboard:total_points_sum:global",
		REAL_TOTAL_POINTS.toString(),
	);

	const allWallets = await redis.zrange("leaderboard:points", 0, -1);
	for (const wallet of allWallets) {
		await redis.set(
			`rewards:user_index:${wallet.toLowerCase()}`,
			CORRECT_INDEX.toString(),
		);
	}
	console.log("✅ BOLLE SGONFIATE. I saldi ora sono reali.");
	process.exit(0);
}
repair();
