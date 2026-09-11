const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
require("dotenv").config({ path: path.resolve(__dirname, "../.env.local") });
const { Redis } = require("@upstash/redis");
const { ethers } = require("ethers");

const tokenAddress = "0x5ee54869ecd5e752c31af095187326d4a4d50e1c";
const DECIMALS = 9; // Impostato a 9 come richiesto
const abi = ["function balanceOf(address) view returns (uint256)"];

// RPC Ufficiale Binance (più stabile)
const provider = new ethers.JsonRpcProvider(
	"https://bsc-dataseed1.binance.org/",
);
const tokenContract = new ethers.Contract(tokenAddress, abi, provider);

const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL,
	token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

async function run() {
	console.log("⚖️ GIUSTIZIA SUPREMA V3 - DECIMALI: 9 | 10 ORE HOLDING 🚀");

	const CEO_WALLET = "0xaff5340ecfaf7ce049261cff193f5fed6bdf04e7".toLowerCase();
	const PARTNER_WALLET =
		"0x74a8ea4126d0e099eb6a50d508e9be6d24d345cc".toLowerCase();

	// 1. Reset Classifica
	await redis.del("leaderboard:points");
	console.log("🗑️ Leaderboard pulita.");

	const seedWallets = [
		CEO_WALLET,
		PARTNER_WALLET,
		"0xd126d51f10f4a04ef809dc069f6cb89df74fd64e",
		"0x510f4dcbe2063f95d64f25816a6fb27f0c6a255d",
		"0x49fc4985f1b80b9f7ccdef6e681ca415cd8e35ce",
		"0xdd10e79aef463d71cff79badd033a32f93bd8e3a",
		"0x31be2d736f4a4ff92e15d75c4bfea211baf5a2b4",
	];

	for (const wallet of seedWallets) {
		try {
			const addr = wallet.toLowerCase();
			const rawBalance = await tokenContract.balanceOf(addr);

			// Usiamo i 9 decimali per formattare
			const balance = parseFloat(ethers.formatUnits(rawBalance, DECIMALS));

			const millions = balance / 1000000;
			const multiplier = addr === CEO_WALLET ? 50 : 10;

			// Holding 10 ore (2 cicli da 6 ore circa)
			let finalScore = Math.floor(millions * multiplier * 2);

			// BONUS PARTNER FLAT 1000
			if (addr === PARTNER_WALLET) {
				finalScore += 1000;
			}

			// Bonus Task Fisso (per il wallet specifico)
			if (addr === "0x510f4dcbe2063f95d64f25816a6fb27f0c6a255d") {
				finalScore += 250;
			}

			await redis.zadd("leaderboard:points", {
				score: finalScore,
				member: addr,
			});
			console.log(
				`✅ ${addr}: Balance ${balance.toFixed(2)} -> Punti Finali: ${finalScore}`,
			);
		} catch (err) {
			console.error(`❌ Errore su ${wallet}:`, err.message);
		}
	}

	console.log("🏁 Classifica ricostruita con successo basata sui 9 decimali.");
	process.exit();
}

run();
