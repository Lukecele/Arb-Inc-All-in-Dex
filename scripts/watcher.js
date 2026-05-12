const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
require("dotenv").config({ path: path.resolve(__dirname, "../.env.local") });
const { Redis } = require("@upstash/redis");
const ethers = require("ethers");

if (!process.env.UPSTASH_REDIS_REST_URL) process.exit(1);

const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL,
	token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const TOKEN_CONTRACT_ADDRESS =
	"0x5EE54869Ecd5E752C31aF095187326D4A4D50e1c".toLowerCase();
const REAL_TREASURY_WALLET =
	"0x66BB01F14229E2179bAD84D52A69C0e4628dE63f".toLowerCase();
const CEO_WALLET = "0xaff5340ecfaf7ce049261cff193f5fed6bdf04e7".toLowerCase();

const provider = new ethers.JsonRpcProvider(
	"https://bsc-dataseed1.binance.org/",
);
// FEATURE 2: Nessun limite minimo richiesto.
const SAFE_FACTOR = 0.73;

async function watch() {
	console.log(
		`\n🕒 [${new Date().toLocaleTimeString()}] Avvio Ciclo Motore Centrale (No Min Limit)...`,
	);
	try {
		const balance = await provider.getBalance(
			ethers.getAddress(REAL_TREASURY_WALLET),
		);
		const lastBalanceStr = await redis.get("rewards:last_balance");
		const lastBalance = lastBalanceStr ? BigInt(lastBalanceStr) : balance;
		const allWallets = await redis.zrange("leaderboard:points", 0, -1);

		// 🛡️ FASE 1: DISTRIBUZIONE DIRETTA BNB
		if (balance > lastBalance) {
			const diff = parseFloat(ethers.formatEther(balance - lastBalance));
			const toDistribute = diff * SAFE_FACTOR;

			let realTotalPoints = 0;
			const scores = {};
			for (const w of allWallets) {
				const pts = parseFloat(
					(await redis.zscore("leaderboard:points", w)) || "0",
				);
				scores[w] = pts;
				realTotalPoints += pts;
			}

			if (realTotalPoints > 0 && diff > 0) {
				console.log(
					`📈 Tasse rilevate: ${diff.toFixed(6)} BNB. Distribuisco: ${toDistribute.toFixed(6)} BNB.`,
				);
				for (const w of allWallets) {
					if (scores[w] > 0) {
						const share = scores[w] / realTotalPoints;
						const earned = toDistribute * share;
						const pending = parseFloat(
							(await redis.get(`rewards:pending:${w}`)) || "0",
						);
						await redis.set(
							`rewards:pending:${w}`,
							(pending + earned).toString(),
						);
					}
				}
			}
		}

		await redis.set("rewards:last_balance", balance.toString());

		// 💎 FASE 2: AGGIORNAMENTO PUNTI (Holding & Referral - PROPORZIONALE)
		console.log("🔄 Scansione Holding (Nessun Limite Minimo)...");
		const abi = ["function balanceOf(address) view returns (uint256)"];
		const contract = new ethers.Contract(
			ethers.getAddress(TOKEN_CONTRACT_ADDRESS),
			abi,
			provider,
		);

		let newGlobalSum = 0;

		for (const w of allWallets) {
			if (w === REAL_TREASURY_WALLET || w === TOKEN_CONTRACT_ADDRESS) continue;
			try {
				const lowerW = w.toLowerCase();
				const currentPoints = parseFloat(
					(await redis.zscore("leaderboard:points", lowerW)) || "0",
				);
				const holding = await contract.balanceOf(ethers.getAddress(lowerW));
				const lastHoldingStr = await redis.get(
					`rewards:last_holding:${lowerW}`,
				);
				const lastHolding = lastHoldingStr ? BigInt(lastHoldingStr) : holding;

				let status = (await redis.get(`rewards:status:${lowerW}`)) || "diamond";

				if (holding < lastHolding) {
					status = "paper";
					console.log(`🩸 ${lowerW} ha venduto! Malus 5%.`);
				} else if (holding > lastHolding && holding > 0n) {
					status = "diamond";
				}

				let updatedPoints = currentPoints;
				if (status === "paper") {
					updatedPoints = currentPoints * 0.95;
				} else if (status === "diamond" && holding > 0n) {
					// Feature 2: Se hai > 0 token, guadagni punti proporzionali.
					const multiplier = 10;
					const pointsGained =
						(Number(holding / 10n ** 9n) / 1000000) * multiplier;
					updatedPoints += pointsGained;

					// --- 🚀 LOGICA REFERRAL BONUS ---
					const parent = await redis.get(`ref:parent:${lowerW}`);
					if (parent) {
						const bonus = pointsGained * 0.1;
						await redis.zincrby("leaderboard:points", bonus, parent);
						await redis.incrbyfloat(`ref:earnings:${parent}`, bonus);
						if (bonus > 0.001)
							console.log(`🎁 Bonus: ${bonus.toFixed(4)} pts a ${parent}`);
					}
				}

				await redis.set(`rewards:status:${lowerW}`, status);
				await redis.set(`rewards:last_holding:${lowerW}`, holding.toString());
				await redis.zadd("leaderboard:points", {
					score: updatedPoints,
					member: lowerW,
				});

				newGlobalSum += updatedPoints;
			} catch (e) {}
		}

		await redis.set(
			"leaderboard:total_points_sum:global",
			newGlobalSum.toString(),
		);
		console.log(
			`🏁 Ciclo completato. Somma globale: ${newGlobalSum.toFixed(2)}`,
		);
	} catch (e) {
		console.error("❌ Errore Watcher:", e.message);
	}

	setTimeout(watch, 15 * 60 * 1000);
}

watch();
