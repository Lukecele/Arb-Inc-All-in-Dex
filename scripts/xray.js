const { ethers } = require("ethers");
const provider = new ethers.JsonRpcProvider(
	"https://bsc-dataseed.binance.org/",
);

// L'indirizzo del token che hai messo nel watcher
const tokenAddress = "0x5EE54869Ecd5E752C31aF095187326D4A4D50e1c";
const abi = [
	"function balanceOf(address) view returns (uint256)",
	"function decimals() view returns (uint8)",
	"function symbol() view returns (string)",
];

async function run() {
	try {
		const contract = new ethers.Contract(tokenAddress, abi, provider);
		const decimals = await contract.decimals();
		const symbol = await contract.symbol();

		console.log(`\n🔍 RAGGI X SUL TOKEN: ${symbol} (Decimali: ${decimals})`);

		const wallets = [
			"0x75f7f06a5c5c440c1adbd586826cd26253ede219",
			"0x66bb01f14229e2179bad84d52a69c0e4628de63f",
			"0xdd10e79aef463d71cff79badd033a32f93bd8e3a",
			"0x3b523ec5ac7f37a151142b756040301729061348",
			"0xaff5340ecfaf7ce049261cff193f5fed6bdf04e7",
		];

		console.log("---------------------------------------------------");
		for (const w of wallets) {
			const bal = await contract.balanceOf(w);
			const formatted = parseFloat(ethers.formatUnits(bal, decimals));

			if (formatted >= 2000000) {
				console.log(
					`✅ ${w.slice(0, 6)}... : ${formatted.toLocaleString()} TOKEN (PRENDERA' I PUNTI!)`,
				);
			} else {
				console.log(
					`❌ ${w.slice(0, 6)}... : ${formatted.toLocaleString()} TOKEN (Sotto soglia 2M)`,
				);
			}
		}
		console.log("---------------------------------------------------\n");
	} catch (e) {
		console.error("Errore:", e);
	}
}
run();
