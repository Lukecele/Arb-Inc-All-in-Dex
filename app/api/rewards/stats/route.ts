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
    let isNewUser = false;

    if (points === null) {
      await redis.zadd('leaderboard:points', { score: 0, member: wallet });
      points = 0;
      isNewUser = true;
    }

    const globalIndex = parseFloat(String(await redis.get('rewards:global_index') || '0'));
    let userIndexStr = await redis.get(`rewards:user_index:${wallet}`);
    
    if (userIndexStr === null) {
        userIndexStr = globalIndex.toString();
        await redis.set(`rewards:user_index:${wallet}`, userIndexStr);
    }

    const userIndex = parseFloat(String(userIndexStr));
    
    // 🔥 LA PATCH È QUI: Leggiamo i BNB congelati nel salvadanaio
    const pendingBnb = parseFloat(String(await redis.get(`rewards:pending:${wallet}`) || '0'));
    
    // Calcoliamo i BNB nuovi generati DALL'ULTIMO aggiornamento
    const currentClaimable = Number(points) * (globalIndex - userIndex);

    // Il totale è: Salvadanaio + Nuovi BNB
    const totalClaimable = pendingBnb + Math.max(0, currentClaimable);

    return NextResponse.json({ 
      points: Number(points), 
      claimable: totalClaimable 
    });

  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
