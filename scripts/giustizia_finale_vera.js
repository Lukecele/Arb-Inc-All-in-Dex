const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });
const { Redis } = require('@upstash/redis');
const { ethers } = require('ethers');

// 💎 INDIRIZZO DEL TOKEN DAL TUO SCREENSHOT
const tokenAddress = "0x5EE54869Ecd5E752C31aF095187326D4A4D50e1c";
const abi = ["function balanceOf(address) view returns (uint256)"];

// Connessione al provider (usiamo BSC Mainnet)
const provider = new ethers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
const tokenContract = new ethers.Contract(tokenAddress, abi, provider);

const redis = new Redis({ 
    url: process.env.UPSTASH_REDIS_REST_URL, 
    token: process.env.UPSTASH_REDIS_REST_TOKEN 
});

async function fix() {
    console.log("⚖️ Avvio ricalcolo Ad Personam basato su Blockchain...");
    
    const CEO_WALLET = "0xaff5340ecfaf7ce049261cff193f5fed6bdf04e7"; // Quello che finisce in 4e7
    const TASK_WALLETS = [
        "0x12469ba697d66e295b1142416b6b657d19ac8f8f",
        "0x510f4dcbe2063f95d64f25816a6fb27f0c6a255d"
    ];

    // 1. Recuperiamo tutti i wallet che hanno interagito (quelli attualmente in Redis)
    const leaderboard = await redis.zrange('leaderboard:points', 0, -1);
    
    // Assicuriamoci che il CEO sia considerato
    const allWallets = new Set([...leaderboard, CEO_WALLET]);

    for (let wallet of allWallets) {
        try {
            wallet = wallet.toLowerCase();
            
            // 2. Leggiamo il bilancio REALE dal contratto Arbitrage Inception
            const balanceWei = await tokenContract.balanceOf(wallet);
            const balance = parseFloat(ethers.formatEther(balanceWei));
            
            if (balance === 0 && wallet !== CEO_WALLET) continue;

            const millions = balance / 1000000;

            // 3. Moltiplicatore (50x per CEO, 10x per gli altri)
            const multiplier = (wallet === CEO_WALLET.toLowerCase()) ? 50 : 10;

            // 4. Calcolo punti per 2 cicli (Holding in Milioni * Multiplier * 2)
            let finalScore = Math.floor(millions * multiplier * 2);

            // 5. Aggiunta Bonus Task
            if (TASK_WALLETS.map(tw => tw.toLowerCase()).includes(wallet)) {
                finalScore += 250;
            }

            // 6. Aggiornamento Redis (sovrascrittura totale per pulire lo schifo di prima)
            await redis.zadd('leaderboard:points', { score: finalScore, member: wallet });
            console.log(`✅ ${wallet}: Holding ${balance.toFixed(0)} -> Punti totali: ${finalScore}`);
            
        } catch (err) {
            console.error(`❌ Errore su ${wallet}:`, err.message);
        }
    }
    console.log("🏁 Operazione conclusa. Classifica ora specchia la realtà on-chain.");
}

fix();
