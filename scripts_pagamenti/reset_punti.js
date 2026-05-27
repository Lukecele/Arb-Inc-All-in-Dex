const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "..", ".env.local") });
require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });
const { Redis } = require("@upstash/redis");

const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL,
	token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

async function pulizia() {
	console.log("🧹 Inizio pulizia del database leaderboard...");

	// Eliminiamo SOLO la classifica dei punti.
	// I BNB e i referral rimangono intatti.
	await redis.del("leaderboard:points");

	console.log("✅ Tabellone punti AZZERATO con successo! L'albero Referral e i fondi sono salvi.");
}

pulizia();
