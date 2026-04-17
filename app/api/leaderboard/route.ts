import { NextResponse } from 'next/server';
import { redis } from '@/lib/redis';

export async function GET() {
  try {
    const topData = await redis.zrange('leaderboard', 0, 9, { rev: true, withScores: true });
    
    const leaderboard = [];
    for (let i = 0; i < topData.length; i += 2) {
      leaderboard.push({
        wallet: topData[i],
        score: Math.floor(Number(topData[i + 1]))
      });
    }

    return NextResponse.json({ leaderboard });
  } catch (error) {
    return NextResponse.json({ leaderboard: [] }, { status: 500 });
  }
}
