const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const { Redis } = require("@upstash/redis");

const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL,
	token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

async function checkRadar() {
	try {
		// Scarica tutti i wallet e i rispettivi punti
		const list = await redis.zrange("leaderboard:points", 0, -1, {
			withScores: true,
		});

		console.log("\n📊 --- CONTENUTO DEL DATABASE (IL RADAR) ---");
		if (list.length === 0) {
			console.log("⚠️ Il database è VUOTO! [ ]");
			console.log("Nessun wallet si è mai connesso al sito o fatto task.");
		} else {
			for (let i = 0; i < list.length; i += 2) {
				console.log(`🎯 Wallet: ${list[i]}  |  Punti: ${list[i + 1]}`);
			}
		}
		console.log("--------------------------------------------\n");
	} catch (e) {
		console.error("❌ Errore di connessione a Redis:", e);
	}
	process.exit(0);
}

checkRadar();
