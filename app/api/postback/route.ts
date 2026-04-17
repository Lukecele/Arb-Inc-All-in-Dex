import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  // 1. Estraiamo i parametri (facendo attenzione a maiuscole e minuscole dell'URL)
  const userID = searchParams.get('userID') || '';
  const transId = searchParams.get('transId') || '';
  const rev = searchParams.get('rev') || '';
  const amt = searchParams.get('amt') || '';
  const receivedHash = searchParams.get('hash') || '';
  
  // La tua chiave segreta (in futuro la sposteremo nel file .env)
  const secretKey = '47a8d13548d53cc588d7faf8ee5b84fc';
  
  // 2. LA SICUREZZA: Ricostruiamo l'hash di TimeWall
  // La loro formula: hash("sha256", userID . revenue . SecretKey)
  const stringToHash = `${userID}${rev}${secretKey}`;
  const expectedHash = crypto.createHash('sha256').update(stringToHash).digest('hex');
  
  // 3. Verifica Anti-Hacker
  if (receivedHash && receivedHash !== expectedHash) {
    console.error(`🚨 Allarme Sicurezza TimeWall! Hash non valido. Ricevuto: ${receivedHash}, Atteso: ${expectedHash}`);
    // Rispondiamo comunque 200 per non far bloccare l'URL da TimeWall, ma NON diamo i punti
    return new NextResponse('Invalid Security Hash', { status: 200 });
  }

  // 4. Successo! Qui in futuro aggiungeremo i punti al database
  console.log(`✅ TimeWall Postback Sicuro: Utente ${userID} ha guadagnato ${amt} punti (Rev: $${rev}). Trans: ${transId}`);

  // Risposta obbligatoria per farci approvare
  return new NextResponse('OK', { status: 200 });
}
