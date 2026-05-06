const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const { Redis } = require("@upstash/redis");

const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL,
	token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

async function nukeAndFund() {
	const TREASURY = "0x66bb01f14229e2179bad84d52a69c0e4628de63f";
	const CONTRACT = "0x5ee54869ecd5e752c31af095187326d4a4d50e1c";

	console.log("💣 FASE 1: RICERCA E DISTRUZIONE TREASURY/CONTRATTO...");
	const allWalletsRaw = await redis.zrange("leaderboard:points", 0, -1);

	for (const rawWallet of allWalletsRaw) {
		const lower = rawWallet.toLowerCase();
		if (lower === TREASURY || lower === CONTRACT) {
			console.log(`   Vaporizzo intruso: ${rawWallet}`);
			await redis.zrem("leaderboard:points", rawWallet);
			await redis.del(`rewards:pending:${rawWallet}`);
			await redis.del(`rewards:user_index:${rawWallet}`);
		}
	}

	console.log("📊 FASE 2: RICALCOLO PUNTI E RABBOCCO BNB...");
	// Riprendiamo la lista pulita
	const cleanWallets = await redis.zrange("leaderboard:points", 0, -1);
	let totalPoints = 0;

	for (const w of cleanWallets) {
		totalPoints += parseFloat(await redis.zscore("leaderboard:points", w));
	}
	await redis.set(
		"leaderboard:total_points_sum:global",
		totalPoints.toString(),
	);

	// Assegniamo gli 0.008601 BNB reali (con SAFE_FACTOR 80%)
	const REAL_BNB = 0.008601;
	const CORRECT_INDEX = (REAL_BNB * 0.8) / totalPoints;
	await redis.set("rewards:global_index", CORRECT_INDEX.toString());

	for (const w of cleanWallets) {
		const points = parseFloat(await redis.zscore("leaderboard:points", w));
		const pending = points * CORRECT_INDEX;

		await redis.set(`rewards:user_index:${w}`, CORRECT_INDEX.toString());
		await redis.set(`rewards:pending:${w}`, pending.toString());
	}

	console.log(
		"✅ OPERAZIONE COMPLETATA! Database immacolato e fondi caricati.",
	);
	process.exit(0);
}
nukeAndFund();
