import { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Usiamo Ankr: il nodo più affidabile per le dApp
const RPC_URL = "https://rpc.ankr.com/bsc"; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');

  console.log("📦 Dati ricevuti dal sito:", req.body);

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch(e) {}
  }

  const address = body?.address || body?.wallet || body?.account || body?.walletAddress;

  if (!address) {
    return res.status(400).json({ error: 'Missing address' });
  }

  try {
    const walletLower = address.toLowerCase();
    const pendingBalance = parseFloat(await redis.get(`rewards:pending:${walletLower}`) || "0");

    console.log(`🔍 Controllo: Il wallet ${walletLower} ha ${pendingBalance} BNB su Redis`);

    if (pendingBalance < 0.0005) {
      return res.status(400).json({ error: 'Sotto la soglia minima' });
    }

    // 🛠️ FIX DEFINITIVO: StaticJsonRpcProvider con Chain ID 56 hardcodato
    // Questo impedisce a Ethers di bloccarsi cercando la rete
    const provider = new ethers.providers.StaticJsonRpcProvider(
        { url: RPC_URL, timeout: 10000 }, 
        { chainId: 56, name: 'binance' }
    );
    
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

    console.log(`🚀 Tutto ok! Invio transazione a ${address}...`);
    const tx = await signer.sendTransaction({
      to: address,
      value: ethers.utils.parseEther(pendingBalance.toFixed(18))
    });

    console.log(`⏳ Transazione inviata! Attesa conferma... Hash: ${tx.hash}`);
    await tx.wait();
    
    await redis.set(`rewards:pending:${walletLower}`, "0");
    console.log(`✅ Claim completato con successo!`);

    return res.status(200).json({ success: true, hash: tx.hash });
  } catch (error: any) {
    console.error('❌ Errore Claim Transazione:', error);
    return res.status(500).json({ error: error.message || 'Errore durante il prelievo' });
  }
}
