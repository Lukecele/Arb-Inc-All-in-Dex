import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const wallet = searchParams.get('tracking_id');
  const status = searchParams.get('status'); 
  
  if (!wallet) return new Response("No Wallet", { status: 400 });

  try {
    const amount = 250;
    await redis.zincrby('leaderboard:points', amount, wallet.toLowerCase());
    console.log(`✅ Task CPAGrip completata: +250 Punti a ${wallet}`);
    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Errore Postback:", error);
    return new Response("Error", { status: 500 });
  }
}
