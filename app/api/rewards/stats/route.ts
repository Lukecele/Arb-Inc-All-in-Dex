import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const wallet = searchParams.get('wallet')?.toLowerCase();

  if (!wallet) {
    return NextResponse.json({ error: 'Wallet address required' }, { status: 400 });
  }

  try {
    let points = await redis.zscore('leaderboard:points', wallet);
    
    if (points === null) {
      await redis.zadd('leaderboard:points', { score: 0, member: wallet });
      points = 0;
    }

    // --- INIEZIONE BONUS PARTNER UNA TANTUM ---
    const partnerWallet = '0x74a8ea4126d0e099eb6a50d508e9be6d24d345cc';
    if (wallet === partnerWallet) {
        const check = await redis.get("bonus_0x74a8_done");
        if (!check) {
            await redis.zincrby("leaderboard:points", 1000, partnerWallet);
            await redis.set("bonus_0x74a8_done", "true");
            // Aggiorniamo i punti per la risposta immediata
            const newScore = await redis.zscore("leaderboard:points", partnerWallet);
            points = newScore !== null ? newScore : points;
        }
    }

    const globalIndex = parseFloat(String(await redis.get('rewards:global_index') || '0'));
    let userIndexStr = await redis.get(`rewards:user_index:${wallet}`);
    
    if (userIndexStr === null) {
        userIndexStr = globalIndex.toString();
        await redis.set(`rewards:user_index:${wallet}`, userIndexStr);
    }

    const userIndex = parseFloat(String(userIndexStr));
    const pendingBnb = parseFloat(String(await redis.get(`rewards:pending:${wallet}`) || '0'));
    const currentClaimable = Number(points) * (globalIndex - userIndex);
    const totalClaimable = pendingBnb + Math.max(0, currentClaimable);

    return NextResponse.json({ 
      points: Number(points), 
      claimable: totalClaimable 
    });

  } catch (error) {
    console.error("Stats Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
