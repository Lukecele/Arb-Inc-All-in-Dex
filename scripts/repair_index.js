const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const { Redis } = require("@upstash/redis");

const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL,
	token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

async function repair() {
	console.log("🛠️ RIPARAZIONE INDICE IN CORSO...");

	const TOTAL_POINTS = 13768.56; // Preso dai tuoi log
	const NEW_BNB = 0.008601;
	const SAFE_FACTOR = 0.8;

	// Il calcolo corretto: BNB / Punti Totali
	const correctIndex = (NEW_BNB * SAFE_FACTOR) / TOTAL_POINTS;

	console.log(`- Nuovo Global Index Corretto: ${correctIndex.toFixed(12)}`);

	try {
		// 1. Sistemiamo l'indice globale
		await redis.set("rewards:global_index", correctIndex.toString());

		// 2. Sistemiamo gli indici degli utenti per farli ripartire da zero
		const allWallets = await redis.zrange("leaderboard:points", 0, -1);
		for (const wallet of allWallets) {
			// Settiamo lo user_index uguale al global_index così il saldo attuale "fluttuante" diventa 0
			// e rimangono solo i BNB che abbiamo messo nel pending durante la migrazione
			await redis.set(
				`rewards:user_index:${wallet.toLowerCase()}`,
				correctIndex.toString(),
			);
		}

		console.log("✅ INDICI RIPARATI. I saldi sul sito ora sono reali.");
	} catch (e) {
		console.error("❌ Errore:", e.message);
	}
	process.exit(0);
}
repair();
