const { Redis } = require("@upstash/redis");
require("dotenv").config({ path: "./.env.local" });

const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL,
	token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

async function fix() {
	console.log("🛠️ RIPARAZIONE BNB E SINCRONIZZAZIONE INDEX...");

	// 1. Leggiamo l'indice globale attuale
	const globalIndex = (await redis.get("rewards:global_index")) || "0";
	console.log(`🌍 Global Index attuale: ${globalIndex}`);

	// 2. Prendiamo tutti gli utenti della classifica
	const users = await redis.zrange("leaderboard:points", 0, -1);

	for (const wallet of users) {
		const addr = wallet.toLowerCase();

		// Sincronizziamo l'indice dell'utente con quello globale
		// Così il calcolo (Punti * (Global - User)) riparte da ZERO da questo istante
		await redis.set(`rewards:user_index:${addr}`, globalIndex);

		console.log(`✅ Sincronizzato Index per ${addr}`);
	}

	console.log(
		"🏁 Operazione conclusa. I BNB ora ripartiranno a crescere correttamente sui nuovi punti.",
	);
	process.exit();
}

fix();
