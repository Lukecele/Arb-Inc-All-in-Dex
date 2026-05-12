require("dotenv").config({ path: ".env.local" });
const { Redis } = require("@upstash/redis");

const redis = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const ETH_REGEX = /^0x[0-9a-fA-F]{40}$/i;

async function cleanHacker() {
    console.log("🧹 Inizio pulizia dei dati corrotti (Hacker)...");

    // 1. Pulizia dalla Leaderboard
    const data = await redis.zrange("leaderboard:points", 0, -1, { withScores: true });
    const wallets = [];
    for (let i = 0; i < data.length; i += 2) {
        wallets.push({ address: String(data[i]), points: Number(data[i+1]) });
    }
    
    const invalid = wallets.filter(w => !ETH_REGEX.test(w.address));
    
    if (invalid.length === 0) {
        console.log("✅ Nessun indirizzo corrotto trovato nella leaderboard.");
    } else {
        for (const w of invalid) {
            console.log(`🗑️ Rimuovo dalla leaderboard: ${w.address}`);
            await redis.zrem("leaderboard:points", w.address);
            
            // Pulisci anche le chiavi collegate a questo indirizzo sporco
            await redis.del(`rewards:pending:${w.address}`);
            await redis.del(`rewards:last_holding:${w.address}`);
            await redis.del(`rewards:status:${w.address}`);
            await redis.del(`rewards:user_index:${w.address}`);
            await redis.del(`ref:parent:${w.address}`);
            await redis.del(`ref:children:${w.address}`);
            await redis.del(`ref:earnings:${w.address}`);
        }
        console.log(`✅ Rimossi ${invalid.length} indirizzi corrotti dalla leaderboard e relative chiavi.`);
    }

    // 2. Pulizia di chiavi rewards:pending:* orfane (per sicurezza)
    let cursor = "0";
    let pendingKeys = [];
    do {
        const [nextCursor, matchingKeys] = await redis.scan(cursor, { match: "rewards:pending:*", count: 1000 });
        cursor = nextCursor;
        pendingKeys.push(...matchingKeys);
    } while (cursor !== "0" && cursor !== 0);

    const invalidPending = pendingKeys.filter(key => {
        const addr = key.replace("rewards:pending:", "");
        return !ETH_REGEX.test(addr);
    });

    if (invalidPending.length > 0) {
        for (const key of invalidPending) {
            console.log(`🗑️ Rimuovo chiave orfana: ${key}`);
            await redis.del(key);
        }
        console.log(`✅ Rimosse ${invalidPending.length} chiavi pendenti orfane.`);
    } else {
        console.log("✅ Nessuna chiave pendente orfana trovata.");
    }

    console.log("🎉 Pulizia completata con successo!");
    process.exit(0);
}

cleanHacker().catch(console.error);
