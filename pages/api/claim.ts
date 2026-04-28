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

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch(e) {}
  }

  const address = body?.address || body?.wallet || body?.account || body?.walletAddress;
  if (!address) return res.status(400).json({ error: 'Missing address' });

  const walletLower = address.toLowerCase();

  try {
    // 🛡️ FIX TYPESCRIPT: Usiamo String() per forzare il tipo corretto
    const pendingBalance = parseFloat(String(await redis.get(`rewards:pending:${walletLower}`) || "0"));

    if (pendingBalance < 0.0005) {
      return res.status(400).json({ error: 'Saldo insufficiente per il claim' });
    }

    // RESET TOTALE: Azzeriamo BNB pending E Punti classifica
    await redis.set(`rewards:pending:${walletLower}`, "0");
    await redis.zadd('leaderboard:points', { score: 0, member: walletLower });
    
    // Aggiorniamo il totale globale forzando le stringhe per TypeScript
    const currentGlobalPoints = parseFloat(String(await redis.get('leaderboard:total_points_sum:global') || "0"));
    const pointsToSubtract = parseFloat(String(await redis.zscore('leaderboard:points', walletLower) || "0"));
    await redis.set('leaderboard:total_points_sum:global', Math.max(0, currentGlobalPoints - pointsToSubtract).toString());

    const provider = new ethers.providers.StaticJsonRpcProvider(
        { url: RPC_URL, timeout: 15000 }, 
        { chainId: 56, name: 'binance' }
    );
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

    console.log(`🚀 Claim con RESET PUNTI per ${address}: ${pendingBalance} BNB`);
    
    const tx = await signer.sendTransaction({
      to: address,
      value: ethers.utils.parseEther(pendingBalance.toFixed(18))
    });

    tx.wait().then(() => {
        console.log(`✅ Transazione confermata: ${tx.hash}`);
    }).catch(async (e) => {
        console.error("❌ Errore, i punti restano a 0 ma l'invio è fallito!");
    });

    return res.status(200).json({ success: true, hash: tx.hash });

  } catch (error: any) {
    console.error('❌ Errore critico API Claim:', error);
    return res.status(500).json({ error: error.message || 'Errore interno' });
  }
}
