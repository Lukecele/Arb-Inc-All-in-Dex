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
      console.log(`🎯 Nuovo Holder sul radar: ${wallet}`);
    }

    const globalIndex = parseFloat(String(await redis.get('rewards:global_index') || '0'));
    let userIndexStr = await redis.get(`rewards:user_index:${wallet}`);
    
    if (userIndexStr === null) {
        if (isNewUser) {
            await redis.set(`rewards:user_index:${wallet}`, globalIndex.toString());
            userIndexStr = globalIndex.toString();
        } else {
            await redis.set(`rewards:user_index:${wallet}`, "0");
            userIndexStr = "0";
        }
    }

    // 🛠️ IL FIX TYPESCRIPT È QUI: Aggiunto String() per far felice Vercel
    const userIndex = parseFloat(String(userIndexStr));
    const claimable = Number(points) * (globalIndex - userIndex);

    return NextResponse.json({ 
      points: Number(points), 
      claimable: Math.max(0, claimable) 
    });

  } catch (error) {
    console.error('Errore API Stats:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
