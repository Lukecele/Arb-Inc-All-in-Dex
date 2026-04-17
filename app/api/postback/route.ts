import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const userId = searchParams.get('userId');
  const revenue = searchParams.get('rev'); // revenue in USD
  const receivedHash = searchParams.get('hash');
  const secretKey = process.env.TIMEWALL_SECRET_KEY;

  if (!secretKey) {
    console.error("❌ Errore: TIMEWALL_SECRET_KEY non configurata su Vercel!");
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  // Formula TimeWall: sha256(userID + revenue + SecretKey)
  const dataToHash = `${userId}${revenue}${secretKey}`;
  const calculatedHash = crypto.createHash('sha256').update(dataToHash).digest('hex');

  // Verifica se l'hash combacia
  if (receivedHash !== calculatedHash) {
    console.warn(`⚠️ Tentativo di postback fraudolento! Hash non valido per utente: ${userId}`);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  // Se arriviamo qui, il pagamento è REALE
  console.log(`✅ PAGAMENTO VALIDATO: ${userId} ha generato ${revenue}$`);

  // Qui in futuro aggiungerai la riga per salvare nel Database
  // es: await db.user.update({ where: { id: userId }, data: { points: ... } });

  return NextResponse.json({ status: 'ok' }, { status: 200 });
}
