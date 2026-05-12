require("dotenv").config({ path: ".env.local" });
const { Redis } = require("@upstash/redis");

const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL,
	token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const ETH_REGEX = /^0x[0-9a-fA-F]{40}$/i;

async function checkAllPending() {
	console.log("🔍 Scansione completa di TUTTI i BNB pendenti nel database...");

	let cursor = "0";
	let keys = [];

	// Cerchiamo TUTTE le chiavi rewards:pending
	do {
		const [nextCursor, matchingKeys] = await redis.scan(cursor, { match: "rewards:pending:*", count: 1000 });
		cursor = nextCursor;
		keys.push(...matchingKeys);
	} while (cursor !== "0" && cursor !== 0);

	if (keys.length === 0) {
		console.log("Nessun record di BNB pendenti trovato.");
		return;
	}

	console.log(`Trovati ${keys.length} record di BNB pendenti totali, sto recuperando i valori...`);

	// Otteniamo i valori di tutte le chiavi in un botto solo (pipeline per velocità)
	const pipeline = redis.pipeline();
	keys.forEach(key => pipeline.get(key));
	const values = await pipeline.exec();

	const walletsPending = keys.map((key, index) => {
		const address = key.replace("rewards:pending:", "");
		const pendingValue = parseFloat(values[index] || "0");
		return { address, pendingValue };
	}).filter(w => w.pendingValue > 0);

	const valid = walletsPending.filter(w => ETH_REGEX.test(w.address));
	const invalid = walletsPending.filter(w => !ETH_REGEX.test(w.address));

	// Ordiniamo in base a chi ha più pendenti
	valid.sort((a, b) => b.pendingValue - a.pendingValue);
	invalid.sort((a, b) => b.pendingValue - a.pendingValue);

	let fakePendingBnb = 0;
	console.log("\n=== 🚨 BNB PENDENTI SU WALLET HACKER (GIA' ELIMINATI DALLA LEADERBOARD O FORMATO ERRATO) ===");
	if (invalid.length === 0) {
		console.log("Nessun hacker/wallet invalido con BNB pendenti rilevato.");
	} else {
		for (const w of invalid) {
			fakePendingBnb += w.pendingValue;
			console.log(` - Address: ${w.address}\n   BNB bloccati: ${w.pendingValue.toFixed(6)}\n`);
		}
	}

	console.log(`\n=== 📥 TOP 100 BNB PENDENTI (WALLET REALI E VALIDI) ===`);
	const top100Valid = valid.slice(0, 100);
	if (top100Valid.length === 0) {
		console.log("Nessun wallet reale con BNB pendenti.");
	} else {
		top100Valid.forEach((w, i) => {
			console.log(` ${++i}. ${w.address} | Pendenti: ${w.pendingValue.toFixed(6)} BNB`);
		});
	}

	console.log(`\n💰 TOTALE BNB FIGURATIVI (DEGLI HACKER) DA DISTRUGGERE: ${fakePendingBnb.toFixed(6)} BNB`);
	console.log("✅ Script di SOLA LETTURA terminato. Nessun dato è stato cancellato.");
}

checkAllPending().catch(console.error);
