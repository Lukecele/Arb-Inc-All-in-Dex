const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
require("dotenv").config({ path: path.resolve(__dirname, "../.env.local") });
const { Redis } = require("@upstash/redis");

const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL,
	token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

async function fix() {
	console.log("⚖️ Avvio operazione Giustizia Vera...");

	const CICLI = 6;
	const RATE_STANDARD = 166;
	const RATE_CEO = 666;
	const TASK_BONUS = 250;

	const CEO_WALLET = "0x51c915d5f2a32608466f228229b4334f6864198c";
	const TASK_WALLETS = [
		"0x12469ba697d66e295b1142416b6b657d19ac8f8f",
		"0x510f4dcbe2063f95d64f25816a6fb27f0c6a255d",
	];

	const leaderboard = await redis.zrange("leaderboard:points", 0, -1, {
		withScores: true,
	});

	for (let i = 0; i < leaderboard.length; i += 2) {
		const wallet = leaderboard[i].toLowerCase();
		let newScore = CICLI * RATE_STANDARD;

		// 1. Sei tu? Moltiplicatore CEO
		if (wallet === CEO_WALLET.toLowerCase()) {
			newScore = CICLI * RATE_CEO;
		}

		// 2. Hai fatto la task? Aggiungi il bonus
		if (TASK_WALLETS.includes(wallet)) {
			newScore += TASK_BONUS;
		}

		await redis.zadd("leaderboard:points", { score: newScore, member: wallet });
		console.log(`✨ ${wallet}: Score impostato a ${newScore}`);
	}
	console.log("🏁 Classifica restaurata con i gradi corretti!");
}
fix();
