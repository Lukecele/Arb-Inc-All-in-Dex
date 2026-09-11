require("dotenv").config({ path: ".env.local" });
const { Redis } = require("@upstash/redis");

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// Regex per trovare gli indirizzi hacker (non conformi a 42 caratteri esatti esadcecimali)
const ETH_REGEX = /^0x[0-9a-fA-F]{40}$/i;

// Regex per trovare indirizzi palesemente fasulli/di test
const FAKE_REGEX = /^(0x1234567890|0xaaaa|0xbbbb|0xcccc|0xdddd|0xeeee|0xffff|0xdead|0xcafe|0xbeef|0xbaad)/i;

async function executeCleanup() {
    console.log("🧹 AVVIO PULIZIA DB DRITTA AL PUNTO 🧹\n");

    const data = await redis.zrange("leaderboard:points", 0, -1, { withScores: true });
    
    // Raccogliamo tutte le chiavi pending nel sistema (per pulire eventuali resti)
	let cursor = "0";
	let allPendingKeys = [];
	do {
		const [nextCursor, matchingKeys] = await redis.scan(cursor, { match: "rewards:pending:*", count: 1000 });
		cursor = nextCursor;
		allPendingKeys.push(...matchingKeys);
	} while (cursor !== "0" && cursor !== 0);

	const allWalletsInSystem = new Set();
    // Aggiungo quelli in leaderboard
	for (let i = 0; i < data.length; i += 2) allWalletsInSystem.add(String(data[i]));
    // Aggiungo quelli con bnb pending
	for (const k of allPendingKeys) allWalletsInSystem.add(k.replace("rewards:pending:", ""));

    const badWallets = [];

    for (const address of allWalletsInSystem) {
        if (!ETH_REGEX.test(address) || FAKE_REGEX.test(address)) {
            badWallets.push(address);
        }
    }

    if (badWallets.length === 0) {
        console.log("✅ Il Database è già immacolato! Nessun wallet cattivo o finto trovato.");
        return;
    }

    console.log(`⚠️ Trovati ${badWallets.length} wallet da disintegrare:`);
    badWallets.forEach(w => console.log(`   👉 ${w}`));

    if (process.argv[2] !== "Y") {
        console.log("\n⚠️ MODALITÀ LETTURA: Nessun dato è stato cancellato.");
        console.log(`Per ESEGUIRE la rimozione definitiva lancia: node esegui_pulizia.js Y`);
        return;
    }

    console.log("\n🔥 PROCEDO CON LA RIMOZIONE...");
    for (const w of badWallets) {
        await redis.zrem("leaderboard:points", w);
        await redis.del(`rewards:pending:${w}`);
        await redis.del(`rewards:last_holding:${w}`);
        await redis.del(`rewards:status:${w}`);
        await redis.del(`rewards:user_index:${w}`);
        await redis.del(`ref:parent:${w}`);
        await redis.del(`ref:children:${w}`);
        await redis.del(`ref:earnings:${w}`);
        console.log(`🗑️ Eliminato ogni traccia di: ${w.substring(0, 45)}${w.length > 45 ? "..." : ""}`);
    }

    console.log("\n✅ PULIZIA COMPLETATA CON SUCCESSO. I dati buoni sono salvi!");
}

executeCleanup().catch(console.error);
