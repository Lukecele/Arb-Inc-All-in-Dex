import { Redis } from '@upstash/redis';
import { ethers } from 'ethers';
import { NextResponse } from 'next/server';
const redis = new Redis({ url: process.env.UPSTASH_REDIS_REST_URL!, token: process.env.UPSTASH_REDIS_REST_TOKEN! });

export async function POST(req: Request) {
  try {
    const { walletAddress } = await req.json();
    const walletLower = walletAddress.toLowerCase();
    const globalIndex = parseFloat(await redis.get("rewards:global_index") || "0");
    const userIndex = parseFloat(await redis.get(`user:index:${walletLower}`) || "0");
    const points = await redis.zscore("leaderboard:points", walletLower) || 0;
    const claimable = points * (globalIndex - userIndex);

    if (claimable < 0.005) return NextResponse.json({ error: "Sotto soglia" }, { status: 400 });

    const provider = new ethers.JsonRpcProvider("https://bsc-dataseed.binance.org/");
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
    const tx = await signer.sendTransaction({ to: walletAddress, value: ethers.parseEther(claimable.toFixed(18)) });

    await redis.set(`user:index:${walletLower}`, globalIndex);
    return NextResponse.json({ success: true, hash: tx.hash });
  } catch (e) { return NextResponse.json({ error: "Errore" }, { status: 500 }); }
}
