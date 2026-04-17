import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  // Estraiamo i dati che TimeWall ci sta mandando
  const userId = searchParams.get('userId');
  const transId = searchParams.get('transId');
  const revenue = searchParams.get('rev');
  const amount = searchParams.get('amt');
  
  // Stampiamo i dati nel terminale (utile per noi per vedere se funziona)
  console.log(`🔔 TimeWall Ping: User ${userId} ha guadagnato ${amount} (Rev: $${revenue}). Trans: ${transId}`);

  // LA MAGIA PER L'APPROVAZIONE:
  // TimeWall vuole solo sapere che abbiamo ricevuto il messaggio.
  // Dobbiamo rispondere con uno Status 200 (OK) altrimenti considerano il postback fallito.
  return new NextResponse('OK', { status: 200 });
}
