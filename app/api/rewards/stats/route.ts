import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';
const redis = new Redis({ url: process.env.UPSTASH_REDIS_REST_URL!, token: process.env.UPSTASH_REDIS_REST_TOKEN! });

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const wallet = searchParams.get('wallet')?.toLowerCase();
  if (!wallet) return NextResponse.json({ error: "No wallet" }, { status: 400 });

  const globalIndex = parseFloat(await redis.get("rewards:global_index") || "0");
  const userIndex = parseFloat(await redis.get(`user:index:${wallet}`) || "0");
  const points = await redis.zscore("leaderboard:points", wallet) || 0;
  const claimable = points * (globalIndex - userIndex);

  return NextResponse.json({ claimable: claimable > 0 ? claimable : 0, points });
}
