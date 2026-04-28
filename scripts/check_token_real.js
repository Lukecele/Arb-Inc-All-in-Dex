const { ethers } = require('ethers');
const provider = new ethers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
const tokenAddress = "0x5EE54869Ecd5E752C31aF095187326D4A4D50e1c";
const abi = [
    "function balanceOf(address) view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function symbol() view returns (string)"
];
const contract = new ethers.Contract(tokenAddress, abi, provider);

async function check() {
    try {
        const symbol = await contract.symbol();
        const decimals = await contract.decimals();
        const ceoBalance = await contract.balanceOf("0xaff5340ecfaf7ce049261cff193f5fed6bdf04e7");
        console.log(`💎 Token: ${symbol}`);
        console.log(`🔢 Decimali: ${decimals}`);
        console.log(`💰 Bilancio CEO (Grezzo): ${ceoBalance.toString()}`);
    } catch (e) {
        console.log("❌ Errore: Il contratto non risponde su BSC. Forse sei su Arbitrum?");
    }
}
check();
