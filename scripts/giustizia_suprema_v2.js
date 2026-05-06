const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
require("dotenv").config({ path: path.resolve(__dirname, "../.env.local") });
const { Redis } = require("@upstash/redis");
const { ethers } = require("ethers");

// 💎 IL TUO TOKEN
const tokenAddress = "0x5ee54869ecd5e752c31af095187326d4a4d50e1c";
const abi = [
	"function balanceOf(address) view returns (uint256)",
	"function decimals() view returns (uint8)",
];

// RPC alternativo più veloce
const provider = new ethers.JsonRpcProvider("https://binance.llamarpc.com");
const tokenContract = new ethers.Contract(tokenAddress, abi, provider);

const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL,
	token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

async function run() {
	console.log("⚖️ AVVIO GIUSTIZIA SUPREMA - FIX DECIMALI E RPC 🚀");

	const CEO_WALLET = "0xaff5340ecfaf7ce049261cff193f5fed6bdf04e7".toLowerCase();
	const PARTNER_WALLET =
		"0x74a8ea4126d0e099eb6a50d508e9be6d24d345cc".toLowerCase();

	// 1. Rileviamo i decimali reali del token
	const decimals = await tokenContract.decimals();
	console.log(`📝 Il token ha ${decimals} decimali.`);

	// 2. Wallets da processare
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

			// Calcolo corretto basato sui decimali rilevati
			const balance = parseFloat(ethers.formatUnits(rawBalance, decimals));

			let finalScore = 0;
			const millions = balance / 1000000;
			const multiplier = addr === CEO_WALLET ? 50 : 10;

			// Calcolo Holding (10 ore = 2 cicli)
			finalScore = Math.floor(millions * multiplier * 2);

			// Aggiunta Bonus Partner (Sempre 1000)
			if (addr === PARTNER_WALLET) {
				finalScore += 1000;
				console.log(
					`💎 PARTNER: ${addr} | Balance: ${balance.toFixed(2)} | Bonus +1000 applicato.`,
				);
			}

			// Bonus Task fisso per quel wallet specifico
			if (addr === "0x510f4dcbe2063f95d64f25816a6fb27f0c6a255d") {
				finalScore += 250;
			}

			// Scriviamo su Redis (Sovrascriviamo per correggere gli "0" di prima)
			await redis.zadd("leaderboard:points", {
				score: finalScore,
				member: addr,
			});
			console.log(
				`✅ ${addr}: Balance ${balance.toFixed(0)} -> Punti: ${finalScore}`,
			);
		} catch (err) {
			console.error(`❌ Errore su ${wallet}:`, err.message);
		}
	}

	console.log("🏁 Classifica Ricalcolata con successo.");
	process.exit();
}

run();
