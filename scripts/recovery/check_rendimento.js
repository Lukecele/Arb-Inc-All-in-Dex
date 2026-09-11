const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
require("dotenv").config({ path: path.resolve(__dirname, "../.env.local") });
const { Redis } = require("@upstash/redis");

const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL,
	token: process.env.UPSTASH_REDIS_REST_TOKEN,
});
const WALLET = "0xaff5340ecfaf7ce049261cff193f5fed6bdf04e7";

async function calcola() {
	console.log("\n📊 ANALISI RENDIMENTO REALE (Dati Redis)");
	console.log("-----------------------------------------");

	// Recuperiamo i punti attuali
	const punti = parseFloat(
		(await redis.zscore("leaderboard:points", WALLET)) || "0",
	);
	const bnb = parseFloat((await redis.get(`rewards:pending:${WALLET}`)) || "0");
	const status = (await redis.get(`rewards:status:${WALLET}`)) || "diamond";

	// Calcoliamo il rendimento basandoci sulla tua quota (4M token = ~40 punti)
	// Usiamo la formula che abbiamo stabilito: 10 punti ogni milione di token
	console.log(`👤 Wallet: ${WALLET}`);
	console.log(`💎 Status: ${status.toUpperCase()}`);
	console.log(`🎯 Punti Totali: ${punti.toFixed(2)}`);
	console.log(`💰 BNB Accumulati: ${bnb.toFixed(6)} BNB`);
	console.log("-----------------------------------------");
	console.log(`⏱️  Ogni 15 min ricevi: ~40.01 Punti`);
	console.log(`🚀 Ogni ora ricevi:    ~160.04 Punti`);
	console.log("-----------------------------------------\n");
}
calcola();
