const { Redis } = require("@upstash/redis");
const { ethers } = require("ethers");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env.local") });

const provider = new ethers.JsonRpcProvider(
	"https://bsc-dataseed.binance.org/",
);
const tokenAddress = "0x5EE54869Ecd5E752C31aF095187326D4A4D50e1c";
const abi = [
	"function balanceOf(address) view returns (uint256)",
	"function decimals() view returns (uint8)",
];
const tokenContract = new ethers.Contract(tokenAddress, abi, provider);

const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL,
	token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

async function fix() {
	console.log("🎯 Ricalcolo chirurgico con 9 decimali (2 Cicli)...");

	const CEO_WALLET = "0xaff5340ecfaf7ce049261cff193f5fed6bdf04e7".toLowerCase();
	const TASK_WALLETS = [
		"0x12469ba697d66e295b1142416b6b657d19ac8f8f",
		"0x510f4dcbe2063f95d64f25816a6fb27f0c6a255d",
	].map((w) => w.toLowerCase());

	const leaderboard = await redis.zrange("leaderboard:points", 0, -1);
	const allWallets = new Set([...leaderboard, CEO_WALLET]);

	for (const wallet of allWallets) {
		try {
			const rawBalance = await tokenContract.balanceOf(wallet);
			// USIAMO 9 DECIMALI QUI!
			const balance = parseFloat(ethers.formatUnits(rawBalance, 9));
			const millions = balance / 1000000;

			const multiplier = wallet.toLowerCase() === CEO_WALLET ? 50 : 10;

			// Matematica: (Milioni * Moltiplicatore * 2 Cicli)
			let score = Math.floor(millions * multiplier * 2);

			// Aggiunta Task Bonus
			if (TASK_WALLETS.includes(wallet.toLowerCase())) {
				score += 250;
				console.log(`🎁 Bonus Task per ${wallet}`);
			}

			await redis.zadd("leaderboard:points", { score: score, member: wallet });
			console.log(
				`✅ ${wallet}: Holding ${balance.toFixed(2)} -> Punti: ${score}`,
			);
		} catch (e) {
			console.error(`❌ Errore su ${wallet}:`, e.message);
		}
	}
	console.log("🏁 Classifica Risanata. Ora i milioni sono milioni!");
}
fix();
