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

    // 1. IL FIX DEL RADAR (Rileva se è DAVVERO un nuovo utente)
    if (points === null) {
      await redis.zadd('leaderboard:points', { score: 0, member: wallet });
      points = 0;
      isNewUser = true;
      console.log(`🎯 Nuovo Holder sul radar: ${wallet}`);
    }

    const globalIndex = parseFloat((await redis.get('rewards:global_index')) || '0');
    let userIndexStr = await redis.get(`rewards:user_index:${wallet}`);
    
    // 2. IL FIX DEI BNB (Protegge i vecchi holder)
    if (userIndexStr === null) {
        if (isNewUser) {
            // È un nuovo utente: parte da OGGI per proteggere la pool
            await redis.set(`rewards:user_index:${wallet}`, globalIndex.toString());
            userIndexStr = globalIndex.toString();
        } else {
            // È UN VECCHIO HOLDER! Non ha mai fatto claim, merita i BNB passati.
            await redis.set(`rewards:user_index:${wallet}`, "0");
            userIndexStr = "0";
        }
    }

    const userIndex = parseFloat(userIndexStr);
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
