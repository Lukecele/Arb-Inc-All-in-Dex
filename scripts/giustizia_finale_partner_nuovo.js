const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
require("dotenv").config({ path: path.resolve(__dirname, "../.env.local") });
const { Redis } = require("@upstash/redis");
const { ethers } = require("ethers");

// 💎 CONTRATTO ARB INC
const tokenAddress = "0x5ee54869ecd5e752c31af095187326d4a4d50e1c";
const abi = ["function balanceOf(address) view returns (uint256)"];
const provider = new ethers.JsonRpcProvider(
	"https://bsc-dataseed.binance.org/",
);
const tokenContract = new ethers.Contract(tokenAddress, abi, provider);

const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL,
	token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

async function run() {
	console.log("⚖️ RICALCOLO: 10 Ore per Holder | 1000 Flat per Partner Nuovo");

	const CEO_WALLET = "0xaff5340ecfaf7ce049261cff193f5fed6bdf04e7".toLowerCase();
	const PARTNER_WALLET =
		"0x74a8ea4126d0e099eb6a50d508e9be6d24d345cc".toLowerCase();

	// 1. Reset Totale
	await redis.del("leaderboard:points");
	console.log("🗑️ Redis Leaderboard resettata.");

	// Recuperiamo la lista dei wallet che hanno interagito per non scordare nessuno
	// (Aggiungi qui altri se necessario)
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
			let finalScore = 0;

			if (addr === PARTNER_WALLET) {
				// IL PARTNER È NUOVO: Solo Bonus, zero holding retroattiva
				finalScore = 1000;
				console.log(
					`💎 PARTNER IDENTIFICATO: ${addr} -> 1000 Bonus (No holding points)`,
				);
			} else {
				// GLI ALTRI: Holding retroattiva 10 ore (2 cicli)
				const balanceWei = await tokenContract.balanceOf(addr);
				const balance = parseFloat(ethers.formatEther(balanceWei));
				const millions = balance / 1000000;
				const multiplier = addr === CEO_WALLET ? 50 : 10;

				finalScore = Math.floor(millions * multiplier * 2);

				// Bonus Task se presenti (es. quello da 250)
				if (addr === "0x510f4dcbe2063f95d64f25816a6fb27f0c6a255d")
					finalScore += 250;

				console.log(
					`✅ HOLDER: ${addr} -> Punti: ${finalScore} (Holding: ${balance.toFixed(0)})`,
				);
			}

			// Scriviamo su Redis
			await redis.zadd("leaderboard:points", {
				score: finalScore,
				member: addr,
			});
		} catch (err) {
			console.error(`❌ Errore su ${wallet}:`, err.message);
		}
	}

	console.log("🏁 Giustizia applicata. Partner a 1000, altri ricalcolati.");
	process.exit();
}

run();
