const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });
const { Redis } = require('@upstash/redis');
const { ethers } = require('ethers');

const tokenAddress = "0x5EE54869Ecd5E752C31aF095187326D4A4D50e1c";
const abi = ["function balanceOf(address) view returns (uint256)"];

const provider = new ethers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
const tokenContract = new ethers.Contract(tokenAddress, abi, provider);

const redis = new Redis({ 
    url: process.env.UPSTASH_REDIS_REST_URL, 
    token: process.env.UPSTASH_REDIS_REST_TOKEN 
});

async function fix() {
    console.log("⚖️ Avvio ricalcolo Giustizia Finale con Bonus Partner...");
    
    const CEO_WALLET = "0xaff5340ecfaf7ce049261cff193f5fed6bdf04e7"; 
    const PARTNER_WALLET = "0x74a8ea4126d0e099eb6a50d508e9be6d24d345cc";
    const TASK_WALLETS = [
        "0x12469ba697d66e295b1142416b6b657d19ac8f8f",
        "0x510f4dcbe2063f95d64f25816a6fb27f0c6a255d"
    ];

    const leaderboard = await redis.zrange('leaderboard:points', 0, -1);
    const allWallets = new Set([...leaderboard, CEO_WALLET, PARTNER_WALLET]);

    for (let wallet of allWallets) {
        try {
            wallet = wallet.toLowerCase();
            const balanceWei = await tokenContract.balanceOf(wallet);
            const balance = parseFloat(ethers.formatEther(balanceWei));
            
            // Se non ha token e non è il CEO o il Partner, saltiamo
            if (balance === 0 && wallet !== CEO_WALLET.toLowerCase() && wallet !== PARTNER_WALLET.toLowerCase()) continue;

            const millions = balance / 1000000;
            const multiplier = (wallet === CEO_WALLET.toLowerCase()) ? 50 : 10;

            // Calcolo base
            let finalScore = Math.floor(millions * multiplier * 2);

            // Bonus Task standard
            if (TASK_WALLETS.map(tw => tw.toLowerCase()).includes(wallet)) {
                finalScore += 250;
            }

            // 🔥 INIEZIONE BONUS PARTNER (1000 Punti)
            if (wallet === PARTNER_WALLET.toLowerCase()) {
                finalScore += 1000;
                console.log(`💎 BONUS PARTNER APPLICATO a ${wallet}`);
            }

            await redis.zadd('leaderboard:points', { score: finalScore, member: wallet });
            console.log(`✅ ${wallet}: Holding ${balance.toFixed(0)} -> Punti totali: ${finalScore}`);
            
        } catch (err) {
            console.error(`❌ Errore su ${wallet}:`, err.message);
        }
    }
    console.log("🏁 Classifica aggiornata con successo.");
}

fix();
