const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const { Redis } = require('@upstash/redis');

const redis = new Redis({ 
    url: process.env.UPSTASH_REDIS_REST_URL, 
    token: process.env.UPSTASH_REDIS_REST_TOKEN 
});

async function restore() {
    console.log("⚖️ INIZIO RIPRISTINO PROPORZIONALE (BUDGET: 0.008 BNB)...");
    
    // 🎯 IL TUO BUDGET REALE NEL TREASURY
    const TOTAL_BNB_TO_RESTORE = 0.008; 

    const affectedWallets = [
        "0x75f7f06a5c5c440c1adbd586826cd26253ede219",
        "0x66bb01f14229e2179bad84d52a69c0e4628de63f",
        "0xdd10e79aef463d71cff79badd033a32f93bd8e3a",
        "0x3b523ec5ac7f37a151142b756040301729061348",
        "0xaff5340ecfaf7ce049261cff193f5fed6bdf04e7"
    ];

    try {
        const globalIndex = parseFloat(await redis.get('rewards:global_index') || "0");
        let totalPoints = 0;
        const walletData = [];

        // 1. Leggiamo i punti di tutti e calcoliamo il totale
        for (const wallet of affectedWallets) {
            const points = parseFloat(await redis.zscore('leaderboard:points', wallet) || "0");
            totalPoints += points;
            walletData.push({ wallet, points });
        }

        console.log(`📊 Punti totali dei 5 storici: ${totalPoints}`);

        // 2. Calcolo dell'Indice Matematico
        const offset = TOTAL_BNB_TO_RESTORE / totalPoints;
        const newUserIndex = globalIndex - offset;

        console.log(`⚙️ Nuovo Indice Personale calcolato: ${newUserIndex}`);

        // 3. Salviamo nel database e stampiamo i risultati
        console.log("\n💰 ASSEGNAZIONE REALE:");
        for (const data of walletData) {
            await redis.set(`rewards:user_index:${data.wallet.toLowerCase()}`, newUserIndex.toString());
            const assignedBNB = data.points * offset;
            console.log(`✅ ${data.wallet} -> Mostrerà: ${assignedBNB.toFixed(6)} BNB`);
        }

        console.log("\n🎉 RIPRISTINO COMPLETATO IN SICUREZZA! Ricarica il sito.");
    } catch (e) {
        console.error("❌ Errore:", e);
    }
    process.exit(0);
}
restore();
