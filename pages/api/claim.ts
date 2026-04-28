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
    // 1. Leggiamo il saldo
    const pendingBalance = parseFloat(await redis.get(`rewards:pending:${walletLower}`) || "0");

    if (pendingBalance < 0.0005) {
      return res.status(400).json({ error: 'Saldo insufficiente per il claim' });
    }

    // 🛡️ 2. AZZERIAMO SUBITO (Preveniamo il doppio click)
    await redis.set(`rewards:pending:${walletLower}`, "0");

    const provider = new ethers.providers.StaticJsonRpcProvider(
        { url: RPC_URL, timeout: 15000 }, 
        { chainId: 56, name: 'binance' }
    );
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

    console.log(`🚀 Invio transazione sicura a ${address}: ${pendingBalance} BNB`);
    
    const tx = await signer.sendTransaction({
      to: address,
      value: ethers.utils.parseEther(pendingBalance.toFixed(18))
    });

    // Non aspettiamo il wait() per rispondere all'utente (così il sito è più veloce)
    // ma lasciamo che il processo continui in background
    tx.wait().then(() => {
        console.log(`✅ Confermata su chain: ${tx.hash}`);
    }).catch(async (e) => {
        console.error("❌ Fallimento dopo invio, restituisco i punti:", e.message);
        // Se proprio fallisce sulla blockchain, gli ridiamo i punti
        await redis.set(`rewards:pending:${walletLower}`, pendingBalance.toString());
    });

    return res.status(200).json({ success: true, hash: tx.hash });

  } catch (error: any) {
    console.error('❌ Errore critico API Claim:', error);
    return res.status(500).json({ error: error.message || 'Errore interno' });
  }
}
