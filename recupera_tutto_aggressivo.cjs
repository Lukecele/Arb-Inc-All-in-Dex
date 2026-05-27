const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env.local") });
const { Redis } = require("@upstash/redis");
const { ethers } = require("ethers");

const redis = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

async function aggressiveRecover() {
    console.log("🚀 AVVIO RICERCA GLOBALE WALLET SU TUTTO REDIS...");
    const wallets = new Set();
    const addressRegex = /0x[a-fA-F0-9]{40}/gi;

    let cursor = 0;
    let count = 0;
    try {
        do {
            const result = await redis.scan(cursor, { count: 3000 });
            cursor = result[0];
            const keys = result[1] || [];
            
            for(const key of keys) {
                // 1. Cerca nella stringa della chiave stessa (es. rewards:pending:0x...)
                const keyMatches = key.match(addressRegex);
                if (keyMatches) {
                    keyMatches.forEach(w => wallets.add(w.toLowerCase()));
                }

                // 2. Cerca nel contenuto in base al tipo di dato
                const type = await redis.type(key);
                if (type === "string") {
                    const val = await redis.get(key);
                    if (typeof val === "string") {
                        const valMatches = val.match(addressRegex);
                        if (valMatches) valMatches.forEach(w => wallets.add(w.toLowerCase()));
                    }
                } else if (type === "hash") {
                    const hkeys = await redis.hkeys(key);
                    if (hkeys) {
                        hkeys.forEach(k => {
                            const m = String(k).match(addressRegex);
                            if(m) m.forEach(w => wallets.add(w.toLowerCase()));
                        });
                    }
                    const hvals = await redis.hvals(key);
                    if (hvals) {
                        hvals.forEach(v => {
                            const m = String(v).match(addressRegex);
                            if(m) m.forEach(w => wallets.add(w.toLowerCase()));
                        });
                    }
                } else if (type === "set") {
                    const smembers = await redis.smembers(key);
                    if (smembers) {
                        smembers.forEach(v => {
                            const m = String(v).match(addressRegex);
                            if(m) m.forEach(w => wallets.add(w.toLowerCase()));
                        });
                    }
                }
                count++;
            }
        } while (cursor !== 0 && cursor !== "0");
        
        console.log(`\n✅ Scansione completata. Analizzate ${count} chiavi totali in Redis.`);
        console.log(`📋 Trovati ${wallets.size} indirizzi wallet unici sopravvissuti nel database.`);
        
        if (wallets.size > 0) {
            console.log("🔄 Sto ripristinando la leaderboard (con 0 punti per tutti)...");
            for (const w of wallets) {
                // Verifica di sicurezza nativa di ethers.js per saltare falsi positivi
                if (ethers.utils.isAddress(w)) { 
                    await redis.zadd("leaderboard:points", { score: 0, member: w });
                }
            }
            console.log("🎉 FATTO! Leaderboard ripopolata. Tutti i wallet ritrovati sono stati inseriti con 0 punti.");
            console.log("Ora gli utenti potranno collegarsi al frontend senza problemi.");
        } else {
            console.log("⚠️ Purtroppo non c'è traccia di nessun wallet in tutto Redis. I dati sono stati completamente piallati in precedenza.");
        }

    } catch (error) {
         console.error("❌ ERRORE CRITICO:", error);
    }
    process.exit(0);
}

aggressiveRecover();
