const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env.local") });
const { Redis } = require("@upstash/redis");

const redis = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

async function resetLeaderboardZero() {
    console.log("🔍 AVVIO AZZERAMENTO PUNTI LEADERBOARD...");
    try {
        // 1. Prendi tutti i wallet attualmente in leaderboard
        const wallets = await redis.zrange("leaderboard:points", 0, -1);
        
        console.log(`📋 Trovati ${wallets.length} wallet nella leaderboard.`);

        if (wallets.length > 0) {
            console.log("⏳ Azzero i punti di tutti i wallet a 0...");
            
            // 2. Rimetti ogni wallet con punteggio 0
            for (const w of wallets) {
                await redis.zadd("leaderboard:points", { score: 0, member: w });
            }
            
            // 3. Azzera il totale globale
            await redis.set("leaderboard:total_points_sum:global", "0");
            
            console.log("✅ Tutti i punti della leaderboard sono stati resettati a 0 con successo!");
        } else {
            console.log("⚠️ Nessun wallet trovato in leaderboard. Se hai già fatto un comando 'DEL', purtroppo sono stati eliminati.");
            
            // Se li avessi persi, proviamo a recuperarli da eventuali saldi utente rimasti
            console.log("🔍 Provo a recuperarli dai bilanci pending...");
            let cursor = 0;
            let pendingWallets = new Set();
            do {
                const result = await redis.scan(cursor, { match: "rewards:pending:*", count: 1000 });
                cursor = result[0];
                for (const key of result[1]) {
                    pendingWallets.add(key.replace("rewards:pending:", ""));
                }
            } while (cursor !== 0 && cursor !== "0");
            
            if (pendingWallets.size > 0) {
                console.log(`♻️ Trovati ${pendingWallets.size} dall'elenco dei pendenti. Li riaggiungo alla leaderboard a 0 punti.`);
                for (const w of pendingWallets) {
                     await redis.zadd("leaderboard:points", { score: 0, member: w });
                }
                console.log("✅ Wallet recuperati e aggiunti alla leaderboard a 0 punti.");
            }
        }
    } catch (error) {
        console.error("❌ ERRORE:", error);
    }
    process.exit(0);
}

resetLeaderboardZero();
