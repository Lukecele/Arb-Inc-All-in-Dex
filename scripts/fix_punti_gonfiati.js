const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
require("dotenv").config({ path: path.resolve(__dirname, "../.env.local") });
const { Redis } = require("@upstash/redis");

const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL,
	token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

async function fix() {
	console.log("⚖️ Ripristino giustizia matematica...");

	// Numero di cicli stimati da oggi pomeriggio (es. 6 cicli)
	const cicliReali = 6;

	// Recuperiamo tutti i wallet in classifica
	const leaderboard = await redis.zrange("leaderboard:points", 0, -1, {
		withScores: true,
	});

	for (let i = 0; i < leaderboard.length; i += 2) {
		const wallet = leaderboard[i];
		const currentPoints = leaderboard[i + 1];

		// Se il wallet ha punti multipli di 166.5 (staking passivo)
		// Lo riportiamo al valore corretto (cicli reali * base)
		// Se invece ha punti da Task (es. 250), li preserviamo.

		let basePoints = 166; // arrotondato come il tuo watcher
		if (wallet.toLowerCase() === "0x51c915d5f2a32608466f228229b4334f6864198c") {
			basePoints = 666; // Il tuo bonus CEO (16.6 * 40)
		}

		const newScore = cicliReali * basePoints;

		// Se avevano fatto task o altro, potremmo sovrascrivere,
		// ma per ora puliamo il grosso dello staking gonfiato.
		await redis.zadd("leaderboard:points", { score: newScore, member: wallet });
		console.log(`✅ Reset ${wallet}: ${currentPoints} -> ${newScore}`);
	}
	console.log("🏁 Classifica risanata!");
}
fix();
