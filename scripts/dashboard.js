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
const TREASURY_WALLET =
	"0x66BB01F14229E2179bAD84D52A69C0e4628dE63f".toLowerCase();

async function checkHealth() {
	console.log("\n📊 CEO DASHBOARD: BALANCE & HEALTH CHECK");
	console.log("---------------------------------------------------------");

	try {
		// 1. Cassa Reale
		const treasuryBalWei = await provider.getBalance(
			ethers.getAddress(TREASURY_WALLET),
		);
		const treasuryBnb = parseFloat(ethers.formatEther(treasuryBalWei));

		// 2. Calcolo Debito Totale (Scansiona tutti gli utenti)
		let totalDebt = 0;
		let activeWallets = 0;
		let cursor = 0;

		do {
			const res = await redis.scan(cursor, {
				match: "rewards:pending:*",
				count: 100,
			});
			cursor = res[0];
			const keys = res[1];
			for (const key of keys) {
				const debt = parseFloat((await redis.get(key)) || "0");
				totalDebt += debt;
				if (debt > 0) activeWallets++;
			}
		} while (cursor !== 0 && cursor !== "0");

		// 3. Diagnosi
		const healthPct = treasuryBnb > 0 ? (totalDebt / treasuryBnb) * 100 : 0;
		let status = "✅ SICURO (Sotto il 50%)";
		if (healthPct > 50 && healthPct < 80)
			status = "⚠️ ATTENZIONE (Erosione gas fees)";
		if (healthPct >= 80) status = "🚨 PERICOLO (Rischio insolvenza)";

		// 4. Stampa Report
		console.log(`🏦 Cassa Reale (Treasury):  ${treasuryBnb.toFixed(6)} BNB`);
		console.log(
			`💸 Debito Totale Utenti:    ${totalDebt.toFixed(6)} BNB (su ${activeWallets} wallet)`,
		);
		console.log(`🩺 Indice di Rischio:       ${healthPct.toFixed(2)}%`);
		console.log(`🛡️ Stato Protocollo:        ${status}`);

		// 5. Check Punti Rapido
		const top1 = await redis.zrange("leaderboard:points", 0, 0, {
			rev: true,
			withScores: true,
		});
		if (top1.length === 0 || top1[1] === 0) {
			console.log("---------------------------------------------------------");
			console.log(
				"⏳ PUNTI: Attualmente a zero. Aspetta il prossimo ciclo del Watcher per la nuova classifica corretta.",
			);
		}
	} catch (e) {
		console.log("❌ Errore di connessione:", e.message);
	}
	console.log("---------------------------------------------------------\n");
}
checkHealth();
