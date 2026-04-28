const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });
const ethers = require('ethers');

const provider = new ethers.JsonRpcProvider("https://bsc-dataseed.binance.org/");
// Indirizzi convertiti in minuscolo per evitare il Checksum Error
const TOKEN_ADDRESS = "0x56a640954939768ad660686940860089201a9908".toLowerCase();
const WALLET = "0xaff5340ecfaf7ce049261cff193f5fed6bdf04e7".toLowerCase();

const abi = ["function balanceOf(address) view returns (uint256)"];
const contract = new ethers.Contract(TOKEN_ADDRESS, abi, provider);

async function check() {
    try {
        const balance = await contract.balanceOf(WALLET);
        const formatted = parseFloat(ethers.formatUnits(balance, 18));
        
        // La logica del nostro watcher.js: 10 punti ogni 1.000.000 di token
        const pointsPerCycle = (formatted / 1000000) * 10;
        
        console.log("\n📈 ANALISI RENDIMENTO PUNTI");
        console.log("-----------------------------------");
        console.log(`👤 Wallet: ${WALLET}`);
        console.log(`💰 Saldo Token: ${formatted.toLocaleString()} ARB-INC`);
        console.log(`⏱️ Rendimento: +${pointsPerCycle.toFixed(4)} Punti ogni 15 min`);
        console.log(`📅 Previsione: +${(pointsPerCycle * 4).toFixed(4)} Punti all'ora`);
        console.log("-----------------------------------\n");
    } catch (error) {
        console.error("❌ Errore durante il check:", error.message);
    }
}
check();
