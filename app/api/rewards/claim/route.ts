import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import * as ethers from 'ethers';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

export async function POST(request: Request) {
  try {
    const { wallet } = await request.json();
    const walletLower = wallet.toLowerCase();

    const points = parseFloat(String(await redis.zscore('leaderboard:points', walletLower) || '0'));
    const globalIndex = parseFloat(String(await redis.get('rewards:global_index') || '0'));
    const userIndexStr = await redis.get(`rewards:user_index:${walletLower}`);
    const userIndex = userIndexStr !== null ? parseFloat(String(userIndexStr)) : globalIndex;
    const pendingBnb = parseFloat(String(await redis.get(`rewards:pending:${walletLower}`) || '0'));

    const currentClaimable = points * (globalIndex - userIndex);
    const totalToPay = pendingBnb + Math.max(0, currentClaimable);

    if (totalToPay <= 0) {
      return NextResponse.json({ error: 'Nulla da prelevare' }, { status: 400 });
    }

    // 🔥 SINTASSI ETHERS V5
    const provider = new (ethers as any).providers.JsonRpcProvider("https://bsc-dataseed.binance.org/");
    
    if (!process.env.TREASURY_PRIVATE_KEY) {
        throw new Error("Manca la chiave privata su Vercel!");
    }
    
    const signer = new (ethers as any).Wallet(process.env.TREASURY_PRIVATE_KEY, provider);
    
    const tx = await signer.sendTransaction({
      to: walletLower,
      value: (ethers as any).utils.parseEther(totalToPay.toFixed(18))
    });

    await tx.wait();

    await redis.set(`rewards:pending:${walletLower}`, "0");
    await redis.set(`rewards:user_index:${walletLower}`, globalIndex.toString());

    return NextResponse.json({ success: true, txHash: tx.hash });

  } catch (error: any) {
    console.error('Errore Claim:', error);
    return NextResponse.json({ error: error.message || 'Errore interno' }, { status: 500 });
  }
}
