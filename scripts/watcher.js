const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const { Redis } = require('@upstash/redis');
const { ethers } = require('ethers');

const redis = new Redis({ 
    url: process.env.UPSTASH_REDIS_REST_URL, 
    token: process.env.UPSTASH_REDIS_REST_TOKEN 
});

const provider = new ethers.JsonRpcProvider("https://bsc-dataseed.binance.org/");
const tokenAddress = "0x5EE54869Ecd5E752C31aF095187326D4A4D50e1c";
const treasuryAddress = process.env.TREASURY_WALLET;

async function run() {
    console.log("🚀 Avvio Watcher V4 (Fix Decimali 9)...");
    
    if (!treasuryAddress) {
        console.error("❌ ERRORE: Variabile TREASURY_WALLET non trovata nel file .env!");
        return;
    }
    if (!process.env.UPSTASH_REDIS_REST_URL) {
        console.error("❌ ERRORE: Variabili Upstash non trovate nel file .env!");
        return;
    }

    try {
        // --- 1. GESTIONE DIVIDENDI BNB ---
        const currentBnb = parseFloat(ethers.formatEther(await provider.getBalance(treasuryAddress)));
        const lastSeenBnb = parseFloat(await redis.get("rewards:last_seen_bnb") || 0);
        const diff = currentBnb - lastSeenBnb;

        if (diff > 0) {
            const allData = await redis.zrange("leaderboard:points", 0, -1, { withScores: true });
            let totalPoints = 0;
            for (let i = 1; i < allData.length; i += 2) totalPoints += parseInt(allData[i]);

            if (totalPoints > 0) {
                const indexIncrement = diff / totalPoints;
                await redis.incrbyfloat("rewards:global_index", indexIncrement);
                console.log(`💰 Nuove tasse: +${diff.toFixed(6)} BNB. Index aggiornato.`);
            }
        }
        await redis.set("rewards:last_seen_bnb", currentBnb);

        // --- 2. STAKING BILANCIATO E PENALITA' CHIRURGICA ---
        const abi = ["function balanceOf(address) view returns (uint256)"];
        const contract = new ethers.Contract(tokenAddress, abi, provider);
        const wallets = await redis.zrange("leaderboard:points", 0, -1);

        for (const wallet of wallets) {
            try {
                const balance = await contract.balanceOf(wallet);
                // LA MAGIA È QUI: 9 Decimali invece di 18
                const tokens = parseFloat(ethers.formatUnits(balance, 9));
                const currentPoints = parseFloat(await redis.zscore("leaderboard:points", wallet)) || 0;

                if (tokens >= 2000000) {
                    const pointsToAdd = Math.floor((tokens / 1000000) * 10);
                    await redis.zincrby("leaderboard:points", pointsToAdd, wallet);
                    await redis.set(`status:diamond:${wallet}`, "1");
                    console.log(`✨ ${wallet}: +${pointsToAdd} pt (Hold ${Math.floor(tokens).toLocaleString()} TKN)`);
                } 
                else if (tokens < 2000000 && currentPoints > 0) {
                    const wasDiamond = await redis.get(`status:diamond:${wallet}`);
                    if (wasDiamond === "1") {
                        const penalty = Math.floor(currentPoints * 0.05);
                        if (penalty > 0) {
                            await redis.zincrby("leaderboard:points", -penalty, wallet);
                            console.log(`🩸 ${wallet}: -${penalty} pt (Paper Hands Penalty!)`);
                        }
                    }
                }
            } catch (e) {
                console.error(`❌ Errore lettura wallet ${wallet}`);
            }
        }
        console.log("🏁 Ciclo completato.");
    } catch (e) { 
        console.error("💥 Errore fatale:", e); 
    }
}
run();
