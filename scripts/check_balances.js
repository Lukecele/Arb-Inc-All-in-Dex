const path = require('path');
// Cerchiamo le chiavi in tutti i possibili file di configurazione
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const { Redis } = require('@upstash/redis');

if (!process.env.UPSTASH_REDIS_REST_URL) {
    console.error("❌ Errore: Le chiavi di Upstash non sono nei file .env o .env.local!");
    process.exit(1);
}

const redis = new Redis({ 
    url: process.env.UPSTASH_REDIS_REST_URL, 
    token: process.env.UPSTASH_REDIS_REST_TOKEN 
});

async function checkBalances() {
    console.log("\n🔍 ESTRAZIONE DATI ARB-INC PROTOCOL...\n");
    
    try {
        const wallets = await redis.zrange('leaderboard:points', 0, -1);
        
        let totalPending = 0;
        let totalPoints = 0;

        console.log(String("WALLET").padEnd(45) + String("STATUS").padEnd(10) + String("PUNTI").padEnd(15) + "BNB PENDING");
        console.log("-".repeat(85));

        for (const wallet of wallets) {
            const points = parseFloat(await redis.zscore('leaderboard:points', wallet) || "0");
            const pending = parseFloat(await redis.get(`rewards:pending:${wallet}`) || "0");
            const status = await redis.get(`rewards:status:${wallet}`) || "diamond";

            totalPending += pending;
            totalPoints += points;

            console.log(
                `${wallet.padEnd(45)}${status.toUpperCase().padEnd(10)}${points.toFixed(2).padEnd(15)}${pending.toFixed(6)}`
            );
        }

        console.log("-".repeat(85));
        console.log(`📊 TOTALE PUNTI ATTIVI:  ${totalPoints.toFixed(2)}`);
        console.log(`💰 DEBITO TOTALE (BNB):  ${totalPending.toFixed(6)} BNB\n`);
        
    } catch (error) {
        console.error("Errore durante la lettura:", error);
    }
}

checkBalances();
