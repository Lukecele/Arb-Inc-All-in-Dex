require("dotenv").config({ path: ".env.local" });
const { Redis } = require("@upstash/redis");

const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL,
	token: process.env.UPSTASH_REDIS_REST_TOKEN,
});
const ETH_REGEX = /^0x[0-9a-fA-F]{40}$/i; // Ignora maiuscole/minuscole

async function check() {
	// Ordine decrescente (dal più alto al più basso)
	const data = await redis.zrange("leaderboard:points", 0, -1, { withScores: true, rev: true });
	const wallets = [];
	for (let i = 0; i < data.length; i += 2) {
		wallets.push({ address: String(data[i]), points: Number(data[i+1]) });
	}
	
	const valid = wallets.filter(w => ETH_REGEX.test(w.address));
	const invalid = wallets.filter(w => !ETH_REGEX.test(w.address));

	console.log(`\n=== 📊 ANALISI LEADERBOARD & HACKER ===`);
	console.log(`Totale wallet (o script) trovati: ${wallets.length}`);
	console.log(`Wallet REALI (Ethereum validi): ${valid.length}`);
	console.log(`Wallet INVALITI/HACKER (stringhe iniettate): ${invalid.length}`);

	let fakePendingBnb = 0;
	console.log("\n=== 🚨 LISTA WALLET FAKE (DA PULIRE) ===");
	if (invalid.length === 0) console.log("Nessun wallet fake trovato.");
	
	for (const w of invalid) {
		const pendingStr = await redis.get(`rewards:pending:${w.address}`);
		const pending = parseFloat(pendingStr || "0");
		fakePendingBnb += pending;
		console.log(` - Address inietto: ${w.address.slice(0, 100)}...`);
		console.log(`   Punti assegnati: ${w.points} | BNB bloccati: ${pending.toFixed(6)}\n`);
	}

	console.log(`\n💰 TOTALE BNB CHE SALVEREMO STRAPPANDOLI ALL'HACKER: ${fakePendingBnb.toFixed(6)} BNB`);

	console.log("\n=== 🏆 TOP 100 WALLET REALI ===");
	for (let i = 0; i < Math.min(100, valid.length); i++) {
		const w = valid[i];
		const pendingStr = await redis.get(`rewards:pending:${w.address}`);
		const pending = parseFloat(pendingStr || "0");
		console.log(`${(i+1).toString().padStart(3, ' ')}. ${w.address} | Punti: ${w.points.toFixed(2)} | BNB Pendenti: ${pending.toFixed(6)}`);
	}

	console.log("\n✅ Script di SOLA LETTURA terminato. Nessun dato è stato cancellato o azzerato.");
	process.exit(0);
}

check().catch(console.error);
