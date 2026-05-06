const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
require("dotenv").config({ path: path.resolve(__dirname, "../.env.local") });
const { Redis } = require("@upstash/redis");
const ethers = require("ethers");

// 🛡️ TRUCCO: Specifichiamo la rete (56 = BSC) per evitare il loop di rilevamento
const provider = new ethers.JsonRpcProvider(
	"https://bsc-dataseed.binance.org/",
	56,
	{ staticNetwork: true },
);

const TOKEN_ADDRESS =
	"0x56a640954939768ad660686940860089201a9908".toLowerCase();
const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL,
	token: process.env.UPSTASH_REDIS_REST_TOKEN,
});
const abi = ["function balanceOf(address) view returns (uint256)"];

async function run() {
	console.log(`\n🕵️ REPORT RENDIMENTO (SOLA LETTURA)`);
	const contract = new ethers.Contract(TOKEN_ADDRESS, abi, provider);

	try {
		const topWallets = await redis.zrange("leaderboard:points", 0, 9, {
			rev: true,
		});

		console.log(
			"----------------------------------------------------------------------",
		);
		console.log(
			"WALLET          |  TOKEN IN WALLET | PUNTI OGNI 15 MIN | STATUS",
		);
		console.log(
			"----------------------------------------------------------------------",
		);

		for (const w of topWallets) {
			try {
				const balWei = await contract.balanceOf(w);
				const tokens = parseFloat(ethers.formatUnits(balWei, 18));

				// Matematica fissa: 10 punti ogni milione
				const pointsPerCycle = (tokens / 1000000) * 10;
				const status = (await redis.get(`rewards:status:${w}`)) || "diamond";

				const shortW = w.slice(0, 6) + "..." + w.slice(-4);
				const tokensStr = tokens
					.toLocaleString(undefined, { maximumFractionDigits: 0 })
					.padEnd(15);
				const pointsStr = `+${pointsPerCycle.toFixed(4)}`.padEnd(17);

				console.log(
					`${shortW} | ${tokensStr} | ${pointsStr} | ${status.toUpperCase()}`,
				);
			} catch (err) {
				console.log(
					`${w.slice(0, 6)}... | ❌ Salto: Problema lettura blockchain`,
				);
			}
		}
	} catch (e) {
		console.log("❌ Errore Redis:", e.message);
	}
	console.log(
		"----------------------------------------------------------------------\n",
	);
}
run();
