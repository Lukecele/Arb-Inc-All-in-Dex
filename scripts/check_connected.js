const { Redis } = require("@upstash/redis");
require("dotenv").config({ path: "./.env.local" });

const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL,
	token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

async function run() {
	const wallets = await redis.zrange("leaderboard:points", 0, -1, {
		withScores: true,
	});
	console.log("--------------------------------------------------");
	console.log(`✅ WALLET CONNESSI AL SITO: ${wallets.length / 2}`);
	console.log("--------------------------------------------------");

	for (let i = 0; i < wallets.length; i += 2) {
		console.log(`Wallet: ${wallets[i]} | Punti: ${wallets[i + 1]}`);
	}
	process.exit();
}
run();
