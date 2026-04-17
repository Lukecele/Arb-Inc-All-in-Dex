import { NextResponse } from 'next/server';
import { redis } from '@/lib/redis';
import crypto from 'crypto';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const rawID = searchParams.get('userID') || searchParams.get('tracking_id') || '';
  const rev = searchParams.get('rev') || '0';
  const amt = parseFloat(searchParams.get('amt') || '0');
  const receivedHash = searchParams.get('hash') || '';
  
  const secretKey = '47a8d13548d53cc588d7faf8ee5b84fc';
  const stringToHash = `${rawID}${rev}${secretKey}`;
  const expectedHash = crypto.createHash('sha256').update(stringToHash).digest('hex');

  if (receivedHash && receivedHash !== expectedHash) return new NextResponse('Unauthorized', { status: 200 });

  const [userWallet, referrerWallet] = rawID.split('--ref--');

  if (userWallet && userWallet.startsWith('0x') && amt > 0) {
    // Punti pieni all'utente
    await redis.zincrby('leaderboard', amt, userWallet);

    // Bonus 10% al referrer (se esiste e non è l'utente stesso)
    if (referrerWallet && referrerWallet.startsWith('0x') && referrerWallet !== userWallet) {
      const bonus = amt * 0.10;
      await redis.zincrby('leaderboard', bonus, referrerWallet);
    }
  }

  return new NextResponse('OK', { status: 200 });
}
