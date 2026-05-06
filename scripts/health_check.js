const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
require("dotenv").config({ path: path.resolve(__dirname, "../.env.local") });
const { Redis } = require("@upstash/redis");
const ethers = require("ethers");

const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL,
	token: process.env.UPSTASH_REDIS_REST_TOKEN,
});
const provider = new ethers.JsonRpcProvider(
	"https://bsc-dataseed.binance.org/",
);
const TREASURY = "0x66BB01F14229E2179bAD84D52A69C0e4628dE63f";

async function run() {
	const balanceWei = await provider.getBalance(TREASURY);
	const balanceBnb = parseFloat(ethers.formatEther(balanceWei));

	const wallets = await redis.zrange("leaderboard:points", 0, -1);
	let totalPending = 0;
	for (const w of wallets) {
		totalPending += parseFloat(
			(await redis.get(`rewards:pending:${w}`)) || "0",
		);
	}

	const ratio = (totalPending / balanceBnb) * 100;

	console.log("\n🏥 DIAGNOSTICA SALUTE TREASURY");
	console.log("-----------------------------------");
	console.log(`🏦 Saldo Reale Blockchain : ${balanceBnb.toFixed(6)} BNB`);
	console.log(`💰 Debito Verso gli Utenti: ${totalPending.toFixed(6)} BNB`);
	console.log(`📊 Percentuale di Utilizzo: ${ratio.toFixed(2)}%`);
	console.log("-----------------------------------");

	if (ratio <= 55) {
		console.log("✅ STATO: SICURO. Il protocollo è ampiamente solvibile.\n");
	} else if (ratio > 55 && ratio <= 90) {
		console.log("⚠️ STATO: ATTENZIONE. Margine di sicurezza in riduzione.\n");
	} else {
		console.log("🚨 STATO: PERICOLO! Rischio default imminente.\n");
	}
}
run();
