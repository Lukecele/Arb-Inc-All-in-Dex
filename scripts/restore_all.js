const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const { Redis } = require('@upstash/redis');

const redis = new Redis({ 
    url: process.env.UPSTASH_REDIS_REST_URL, 
    token: process.env.UPSTASH_REDIS_REST_TOKEN 
});

async function restoreAll() {
    console.log("🌐 INIZIO RIPRISTINO GLOBALE (BUDGET: 0.008 BNB)...");
    
    const TOTAL_BNB_TO_RESTORE = 0.008; 

    try {
        // 1. Prende TUTTI i wallet dal database
        const allWallets = await redis.zrange('leaderboard:points', 0, -1);
        console.log(`🔍 Trovati ${allWallets.length} wallet totali sul radar.`);

        const globalIndex = parseFloat(await redis.get('rewards:global_index') || "0");
        let totalPoints = 0;
        const walletData = [];

        // 2. Calcola i punti di chiunque ne abbia
        for (const wallet of allWallets) {
            const points = parseFloat(await redis.zscore('leaderboard:points', wallet) || "0");
            if (points > 0) {
                totalPoints += points;
                walletData.push({ wallet, points });
            } else {
                // Se hanno 0 punti, li fissa all'indice globale per sicurezza
                await redis.set(`rewards:user_index:${wallet.toLowerCase()}`, globalIndex.toString());
            }
        }

        console.log(`📊 Punti totali di tutto l'ecosistema: ${totalPoints}`);

        if (totalPoints === 0) {
            console.log("Nessun utente ha punti. Esco.");
            process.exit(0);
        }

        // 3. Calcolo della fetta esatta per punto
        const offset = TOTAL_BNB_TO_RESTORE / totalPoints;
        const newUserIndex = globalIndex - offset;

        // 4. Salva nel database
        console.log("\n💰 ASSEGNAZIONE REALE (Per tutti i possessori di punti):");
        for (const data of walletData) {
            await redis.set(`rewards:user_index:${data.wallet.toLowerCase()}`, newUserIndex.toString());
            const assignedBNB = data.points * offset;
            console.log(`✅ ${data.wallet} -> Mostrerà: ${assignedBNB.toFixed(6)} BNB`);
        }

        console.log("\n🎉 RIPRISTINO GLOBALE COMPLETATO! Ricarica il sito.");
    } catch (e) {
        console.error("❌ Errore:", e);
    }
    process.exit(0);
}
restoreAll();
