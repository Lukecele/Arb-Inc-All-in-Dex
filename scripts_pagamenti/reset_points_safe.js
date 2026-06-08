const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "..", ".env.local") });
require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });
const { Redis } = require("@upstash/redis");

const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL,
	token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

async function puliziaSicura() {
	console.log("🧹 Inizio azzeramento controllato della leaderboard (Upstash)...");

	try {
		// 1. Recuperiamo tutti i wallet presenti nella classifica senza rimuoverli
		const wallets = await redis.zrange("leaderboard:points", 0, -1);

		if (!wallets || wallets.length === 0) {
			console.log("❌ Nessun wallet trovato nella leaderboard. Operazione annullata.");
			return;
		}

		console.log(`⚠️  Trovati ${wallets.length} wallet attivi. Preparazione azzeramento...`);
		console.log("🔒 Sicurezza: I saldi BNB e l'albero dei referral NON verranno toccati.");

		// 2. Inizializziamo il pipeline per ottimizzare le performance su Upstash via HTTP
		const pipeline = redis.pipeline();

		for (const wallet of wallets) {
			// Impostiamo lo score a 0: il wallet RESTA indicizzato, evitando di smemorizzarlo
			pipeline.zadd("leaderboard:points", { score: 0, member: wallet });
		}

		// 3. Eseguiamo il batch di comandi in un'unica richiesta
		await pipeline.exec();

		console.log("✅ Successo! Tutti i punti della classifica sono stati azzerati a 0.");
		console.log("💡 I wallet sono ancora presenti nel tabellone (nessuna smemorizzazione). I fondi sono al sicuro.");
	} catch (error) {
		console.error("❌ Errore durante l'esecuzione del reset:", error);
	}
}

puliziaSicura();
