require("dotenv").config({ path: ".env.local" });
const { Redis } = require("@upstash/redis");
const redis = new Redis({ url: process.env.UPSTASH_REDIS_REST_URL, token: process.env.UPSTASH_REDIS_REST_TOKEN });

async function run() {
    console.log("🔎 Cerco ESATTAMENTE le chiavi spazzatura inserite dall'hacker...");
    const keysToDelete = [];

    // 1. Cerca nella leaderboard se c'è l'indirizzo con l'URL attaccato (invalido)
    const data = await redis.zrange("leaderboard:points", 0, -1);
    for (const w of data) {
        if (!/^0x[0-9a-fA-F]{40}$/i.test(w)) {
            console.log(`⚠️ Trovato indirizzo corrotto in leaderboard: ${w.substring(0,60)}...`);
            keysToDelete.push({ type: "zset", key: "leaderboard:points", member: w });
        }
    }

    // 2. Cerca chiavi "processed_tx" palesemente invalide (XSS, DOS, piene di zeri)
    let cursor = "0";
    do {
        const [nextCursor, keys] = await redis.scan(cursor, { match: "processed_tx:*", count: 1000 });
        cursor = nextCursor;
        for (const k of keys) {
            const tx = k.replace("processed_tx:", "");
            // Una vera tx hash è "0x" seguito da ESATTAMENTE 64 caratteri esadecimali
            // In più eliminiamo le sue finte key piene di zeri (0x00000000000000)
            if (!/^0x[0-9a-fA-F]{64}$/.test(tx) || tx.includes("0000000000000000000")) {
                keysToDelete.push({ type: "string", key: k });
            }
        }
    } while (cursor !== "0" && cursor !== 0);

    if (keysToDelete.length === 0) {
        console.log("✅ Nessuna traccia di monnezza hacker trovata. Database pulito.");
        return;
    }

    console.log(`\n🚨 Trovati ${keysToDelete.length} record spazzatura totali pronti ad essere disintegrati.`);

    if (process.argv[2] !== '--confirm') {
        console.log("\n🛑 Questo è un test di SOLA LETTURA.");
        console.log("Per ELIMINARE DEFINITIVAMENTE questa spazzatura, esegui il comando:");
        console.log("node pulizia_chirurgica.js --confirm\n");
        return;
    }

    console.log("\n🗑️ Eseguo l'eliminazione...");
    for (const item of keysToDelete) {
        if (item.type === "zset") {
            await redis.zrem(item.key, item.member);
            // Svuotiamo anche tutti i dati collegati a quella stringa pseudo-wallet
            await redis.del(`rewards:pending:${item.member}`);
            await redis.del(`rewards:last_holding:${item.member}`);
            await redis.del(`rewards:status:${item.member}`);
            await redis.del(`rewards:user_index:${item.member}`);
            await redis.del(`ref:parent:${item.member}`);
        } else {
            await redis.del(item.key);
        }
    }
    console.log("✅ Pulizia hacker COMPLETATA con successo! \n🏆 Punti, BNB pendenti e utenti REALI non sono stati minimamente toccati.");
}
run().catch(console.error);
