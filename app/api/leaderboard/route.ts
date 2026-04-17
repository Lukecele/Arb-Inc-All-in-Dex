import { NextResponse } from 'next/server';
import { redis } from '@/lib/redis';

export async function GET() {
  try {
    // 🛡️ Se Redis non è configurato, restituiamo una classifica vuota invece di crashare
    if (!redis) {
      return NextResponse.json({ leaderboard: [] });
    }

    const rawData = await redis.zrevrange('leaderboard', 0, 99, { withScores: true });
    
    const leaderboard = [];
    for (let i = 0; i < rawData.length; i += 2) {
      leaderboard.push({
        address: rawData[i],
        points: parseInt(rawData[i + 1] as string, 10),
      });
    }

    return NextResponse.json({ leaderboard });
  } catch (error) {
    return NextResponse.json({ leaderboard: [] });
  }
}
