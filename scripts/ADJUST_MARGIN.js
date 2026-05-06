const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const { Redis } = require("@upstash/redis");

const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL,
	token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

async function adjust() {
	console.log("🎛️ RICALCOLO DEI SALDI CON NUOVO SAFE MARGIN...");

	const NEW_SAFE_FACTOR = 0.5; // 👈 50% agli utenti, 50% al Treasury. Modifica se vuoi.
	const REAL_BNB = 0.008601;

	const totalPointsStr = await redis.get("leaderboard:total_points_sum:global");
	const totalPoints = parseFloat(totalPointsStr);

	// Nuovo indice più conservativo
	const CORRECT_INDEX = (REAL_BNB * NEW_SAFE_FACTOR) / totalPoints;
	await redis.set("rewards:global_index", CORRECT_INDEX.toString());

	const cleanWallets = await redis.zrange("leaderboard:points", 0, -1);
	for (const w of cleanWallets) {
		const points = parseFloat(await redis.zscore("leaderboard:points", w));
		const newPending = points * CORRECT_INDEX;

		await redis.set(`rewards:user_index:${w}`, CORRECT_INDEX.toString());
		await redis.set(`rewards:pending:${w}`, newPending.toString());
	}

	console.log(
		`✅ SALDI RIDOTTI. Ora distribuiamo solo il ${NEW_SAFE_FACTOR * 100}%.`,
	);
	process.exit(0);
}
adjust();
