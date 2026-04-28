const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });
const { Redis } = require('@upstash/redis');
const ethers = require('ethers');

const redis = new Redis({ url: process.env.UPSTASH_REDIS_REST_URL, token: process.env.UPSTASH_REDIS_REST_TOKEN });
const provider = new ethers.JsonRpcProvider("https://bsc-dataseed.binance.org/");
const TREASURY = "0x66BB01F14229E2179bAD84D52A69C0e4628dE63f";

async function fixDebt() {
    console.log("🚨 INIZIO PROCEDURA DI EMERGENZA...");
    
    const balanceWei = await provider.getBalance(TREASURY);
    const balanceBnb = parseFloat(ethers.formatEther(balanceWei));
    const safeMax = balanceBnb * 0.50; // Massimo debito consentito
    
    const wallets = await redis.zrange('leaderboard:points', 0, -1);
    let totalPending = 0;
    
    for (const w of wallets) {
        totalPending += parseFloat(await redis.get(`rewards:pending:${w}`) || "0");
    }
    
    console.log(`🏦 Saldo Reale Treasury: ${balanceBnb.toFixed(6)} BNB`);
    console.log(`💰 Debito Attuale: ${totalPending.toFixed(6)} BNB`);
    console.log(`🛡️ Limite Sicurezza (50%): ${safeMax.toFixed(6)} BNB`);
    
    if (totalPending > safeMax) {
        const ratio = safeMax / totalPending;
        console.log(`\n⚠️ Debito eccessivo! Applico correzione del ${(100 - ratio*100).toFixed(2)}%...`);
        
        let newTotal = 0;
        for (const w of wallets) {
            const pending = parseFloat(await redis.get(`rewards:pending:${w}`) || "0");
            const corrected = pending * ratio;
            await redis.set(`rewards:pending:${w}`, corrected.toString());
            newTotal += corrected;
        }
        console.log(`✅ Debito riallineato con successo a: ${newTotal.toFixed(6)} BNB`);
    } else {
        console.log("\n✅ Debito sotto controllo. Nessuna correzione necessaria.");
    }
}
fixDebt();
