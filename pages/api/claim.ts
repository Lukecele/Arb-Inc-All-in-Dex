import { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const RPC_URL = "https://bsc-dataseed.binance.org/"; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');

  // Recupero super-robusto del body (come avevi tu in originale)
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch(e) {}
  }

  // Cerca l'indirizzo in tutte le varianti possibili del frontend
  const address = body?.address || body?.wallet || body?.account || body?.walletAddress;
  if (!address) return res.status(400).json({ error: 'Missing address' });

  const walletLower = address.toLowerCase();

  try {
    const pendingBalance = parseFloat(String(await redis.get(`rewards:pending:${walletLower}`) || "0"));

    // Se provi a claimare meno di 0.0005 BNB, restituisce errore 400
    if (pendingBalance < 0.0005) {
      return res.status(400).json({ error: 'Saldo insufficiente per il claim' });
    }

    const provider = new ethers.providers.StaticJsonRpcProvider(
        { url: RPC_URL, timeout: 15000 }, 
        { chainId: 56, name: 'binance' }
    );
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

    console.log(`🚀 Claim for ${address}: ${pendingBalance} BNB (Points preserved)`);
    
    const tx = await signer.sendTransaction({
      to: address,
      value: ethers.utils.parseEther(pendingBalance.toFixed(18))
    });

    await tx.wait().then(() => {
        console.log(`✅ Transaction confirmed: ${tx.hash}`);
    }).catch(async (e) => {
        console.error("❌ Error sending transaction");
    });

    // --- Reset pending only — preserve leaderboard points ---
    await redis.set(`rewards:pending:${walletLower}`, "0");

    return res.status(200).json({ success: true, hash: tx.hash });

  } catch (error: any) {
    console.error('❌ Errore critico API Claim:', error);
    return res.status(500).json({ error: error.message || 'Errore interno' });
  }
}
