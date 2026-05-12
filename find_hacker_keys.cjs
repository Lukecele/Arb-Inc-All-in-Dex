require("dotenv").config({ path: ".env.local" });
const { Redis } = require("@upstash/redis");

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const ETH_REGEX = /^0x[0-9a-fA-F]{40}$/i;

async function scanAll() {
    console.log("🕵️‍♂️ Avvio ricerca globale dell'hacker nel database...");

    // 1. Controllo approfondito sulla Leaderboard (che forse ha membri invisibili o formattati male)
    const leaderboardMembers = await redis.zrange("leaderboard:points", 0, -1, { withScores: true });
    let hackerInLeaderboard = 0;
    
    console.log("\n--- RICERCA IN LEADERBOARD ---");
    for (let i = 0; i < leaderboardMembers.length; i += 2) {
        const member = String(leaderboardMembers[i]);
        const score = Number(leaderboardMembers[i+1]);
        if (!ETH_REGEX.test(member)) {
            console.log(`🚨 TROVATO IN LEADERBOARD:`);
            console.log(`   Elemento: ${member}`);
            console.log(`   Punti: ${score}`);
            hackerInLeaderboard++;
        }
    }
    if (hackerInLeaderboard === 0) console.log("✅ Nessun hacker trovato nella leaderboard in questo momento.");


    // 2. Controllo su TUTTE le chiavi del database
    console.log("\n--- RICERCA NELLE CHIAVI GENERALI ---");
    let cursor = "0";
    let keys = [];

    do {
        const [nextCursor, matchingKeys] = await redis.scan(cursor, { match: "*", count: 1000 });
        cursor = nextCursor;
        keys.push(...matchingKeys);
    } while (cursor !== "0" && cursor !== 0);

    let hackerKeys = 0;
    for (const key of keys) {
        // Se la chiave contiene la parola "http" o stringhe anomale o è lunghissima
        if (key.includes("http") || (key.length > 60 && !key.includes("-"))) {
            console.log(`🚨 CHIAVE SOSPETTA TROVATA: ${key}`);
            hackerKeys++;
        } else {
            // Controlliamo se la chiave appartiene a un wallet non valido
            const parts = key.split(":");
            const possibleAddress = parts[parts.length - 1];
            if (possibleAddress.startsWith("0x") && !ETH_REGEX.test(possibleAddress)) {
                console.log(`🚨 CHIAVE DI UN WALLET INVALIDO TROVATA: ${key}`);
                hackerKeys++;
            }
        }
    }
    
    if (hackerKeys === 0) console.log("✅ Nessuna chiave sospetta trovata nel database.");

    console.log("\n✅ Ricerca completata (Sola lettura).");
}

scanAll().catch(console.error);
