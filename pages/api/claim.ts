import { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const RPC_URL = "https://binance.chainnodes.org"; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');

  const { address } = req.body;
  if (!address) return res.status(400).json({ error: 'Missing address' });

  try {
    const walletLower = address.toLowerCase();
    const pendingBalance = parseFloat(await redis.get(`rewards:pending:${walletLower}`) || "0");

    if (pendingBalance < 0.002) {
      return res.status(400).json({ error: 'Sotto la soglia minima di 0.002 BNB' });
    }

    // 🛠️ FIX: Sintassi per Ethers v5
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

    console.log(`Inizio claim per ${walletLower}: ${pendingBalance} BNB`);

    const tx = await signer.sendTransaction({
      to: address,
      value: ethers.utils.parseEther(pendingBalance.toFixed(18))
    });

    await tx.wait();

    await redis.set(`rewards:pending:${walletLower}`, "0");

    return res.status(200).json({ success: true, hash: tx.hash });
  } catch (error: any) {
    console.error('Errore Claim:', error);
    return res.status(500).json({ error: error.message || 'Errore durante il prelievo' });
  }
}
