const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const { Redis } = require("@upstash/redis");

const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL,
	token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

async function clean() {
	console.log("🧼 PULIZIA CHIRURGICA DEI SALDI IN CORSO...");

	// I numeri esatti del disastro per poterlo annullare
	const BAD_INDEX = 0.006882138319951401;
	const CORRECT_INDEX = 0.000000499747;

	const allWallets = await redis.zrange("leaderboard:points", 0, -1);

	for (const wallet of allWallets) {
		const walletLower = wallet.toLowerCase();
		const points = parseFloat(
			(await redis.zscore("leaderboard:points", walletLower)) || "0",
		);
		const currentPending = parseFloat(
			(await redis.get(`rewards:pending:${walletLower}`)) || "0",
		);

		// Matematica curativa: (Saldo Attuale - Soldi Finti) + Soldi Veri
		let fixedPending =
			currentPending - points * BAD_INDEX + points * CORRECT_INDEX;

		// Protezione: i saldi non possono scendere sotto lo zero
		if (fixedPending < 0) fixedPending = 0;

		await redis.set(`rewards:pending:${walletLower}`, fixedPending.toString());
	}

	console.log("✅ PULIZIA COMPLETATA! I BNB fantasma sono stati cancellati.");
	process.exit(0);
}
clean();
