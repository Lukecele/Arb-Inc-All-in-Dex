import { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');
  
  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  const address = body?.address || body?.wallet;
  if (!address) return res.status(400).json({ error: 'Missing address' });
  const walletLower = address.toLowerCase();

  try {
    const pendingBalance = parseFloat(String(await redis.get(`rewards:pending:${walletLower}`) || "0"));
    if (pendingBalance < 0.0005) return res.status(400).json({ error: 'Saldo insufficiente' });

    const provider = new ethers.providers.StaticJsonRpcProvider("https://bsc-dataseed.binance.org/");
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

    const tx = await signer.sendTransaction({
      to: address,
      value: ethers.utils.parseEther(pendingBalance.toFixed(18))
    });

    await tx.wait();

    // --- 🛡️ FIX: AZZERIAMO SOLO I BNB, I PUNTI RESTANO ---
    await redis.set(`rewards:pending:${walletLower}`, "0");

    return res.status(200).json({ success: true, hash: tx.hash });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
