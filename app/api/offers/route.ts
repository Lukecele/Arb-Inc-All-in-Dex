import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const wallet = searchParams.get('wallet') || 'guest';
  
  // TRUCCO DA MAESTRI: Catturiamo l'IP reale dell'utente che sta visitando il sito
  // Vercel inserisce l'IP in questo header "x-forwarded-for"
  const forwardedFor = request.headers.get('x-forwarded-for');
  const userIp = forwardedFor ? forwardedFor.split(',')[0] : '';
  
  const userId = '2517944';
  const key = '26271b30ab81cc1f2aa423c79ccb3d6a';
  
  // Aggiungiamo il parametro &ip= alla richiesta
  const rssUrl = `https://www.cpagrip.com/common/offer_feed_rss.php?user_id=${userId}&key=${key}&tracking_id=${wallet}&ip=${userIp}`;
  
  try {
    const parser = new Parser();
    const feed = await parser.parseURL(rssUrl);
    
    const cleanOffers = feed.items.map(item => {
      const imgMatch = item.content?.match(/src="(.*?)"/);
      return {
        title: item.title,
        link: item.link,
        image: imgMatch ? imgMatch[1] : null,
      };
    }).slice(0, 8);

    return NextResponse.json({ offers: cleanOffers });
  } catch (error) {
    console.error("Errore CPAGrip RSS:", error);
    return NextResponse.json({ error: 'Failed to fetch offers' }, { status: 500 });
  }
}
