const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env.local") });
const { Redis } = require("@upstash/redis");

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

async function run() {
    console.log("🔍 AVVIO RIPOPOLAMENTO LEADERBOARD DA PENDING BNB...");
    
    let cursor = 0;
    let pendingKeys = [];
    try {
        do {
            const result = await redis.scan(cursor, { match: "rewards:pending:*", count: 1000 });
            cursor = result[0];
            pendingKeys.push(...result[1]);
        } while (cursor !== 0 && cursor !== "0");
    } catch (error) {
        console.error("❌ ERRORE SCAN:", error);
        // Fallback
        const allKeys = await redis.keys("rewards:pending:*");
        if (allKeys && allKeys.length > 0) pendingKeys = allKeys;
    }

    if (pendingKeys.length === 0) {
        console.log("🤷 Nessun debito pendente (rewards:pending:*) trovato in Redis.");
        process.exit(0);
    }

    console.log(`📋 Trovati ${pendingKeys.length} wallet con pending BNB.`);
    let added = 0;
    
    for (const key of pendingKeys) {
        const wallet = key.replace("rewards:pending:", "").toLowerCase();
        
        // Verifica che sia un indirizzo valido prima di inserire
        if (/^0x[a-fA-F0-9]{40}$/.test(wallet)) {
            // Aggiungiamo il wallet alla leaderboard con 0 punti in modo che possa accedere alla dashboard
            await redis.zadd("leaderboard:points", { score: 0, member: wallet });
            added++;
        }
    }
    
    console.log(`✅ Successo! Ripristinati ${added} wallets nella leaderboard a 0 punti.`);
    process.exit(0);
}

run();
