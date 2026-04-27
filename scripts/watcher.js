require('dotenv').config();
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
    console.log("🚀 Avvio Watcher V3 (Anti-Whale, Decay & Task-Safe)...");
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
                const tokens = parseFloat(ethers.formatUnits(balance, 18));
                const currentPoints = parseFloat(await redis.zscore("leaderboard:points", wallet)) || 0;

                if (tokens >= 2000000) {
                    // PREMIO BILANCIATO: 10 punti ogni 1 milione di token
                    const pointsToAdd = Math.floor((tokens / 1000000) * 10);
                    await redis.zincrby("leaderboard:points", pointsToAdd, wallet);
                    
                    // IL MARCHIO: Segniamo che questo utente è diventato un Diamond Hand
                    await redis.set(`status:diamond:${wallet}`, "1");
                    
                    console.log(`✨ ${wallet}: +${pointsToAdd} pt (Hold ${tokens.toLocaleString()} TKN)`);
                } 
                else if (tokens < 2000000 && currentPoints > 0) {
                    // CONTROLLO CHIRURGICO: Era un Diamond Hand in passato?
                    const wasDiamond = await redis.get(`status:diamond:${wallet}`);
                    
                    if (wasDiamond === "1") {
                        // Ha venduto! Scatta la Paper Hands Penalty
                        const penalty = Math.floor(currentPoints * 0.05);
                        if (penalty > 0) {
                            await redis.zincrby("leaderboard:points", -penalty, wallet);
                            console.log(`🩸 ${wallet}: -${penalty} pt (Paper Hands Penalty!)`);
                        }
                    }
                    // Se wasDiamond non è "1", è un utente task/referral e viene ignorato. Niente malus.
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
