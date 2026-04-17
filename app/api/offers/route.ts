import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const wallet = searchParams.get('wallet') || 'guest';
  
  // Le tue credenziali (Al sicuro nel backend)
  const userId = '2517944';
  const key = '26271b30ab81cc1f2aa423c79ccb3d6a';
  
  // Chiamata all'RSS Feed con il wallet per il tracciamento
  const rssUrl = `https://www.cpagrip.com/common/offer_feed_rss.php?user_id=${userId}&key=${key}&tracking_id=${wallet}`;
  
  try {
    const parser = new Parser();
    const feed = await parser.parseURL(rssUrl);
    
    // Filtriamo e puliamo i dati per il frontend
    const cleanOffers = feed.items.map(item => {
      // CPAGrip mette le immagini dentro la descrizione HTML, proviamo a estrarla
      const imgMatch = item.content?.match(/src="(.*?)"/);
      return {
        title: item.title,
        link: item.link,
        image: imgMatch ? imgMatch[1] : null,
      };
    }).slice(0, 8); // Mostriamo al massimo le prime 8 offerte per non intassare la pagina

    return NextResponse.json({ offers: cleanOffers });
  } catch (error) {
    console.error("Errore CPAGrip RSS:", error);
    return NextResponse.json({ error: 'Failed to fetch offers' }, { status: 500 });
  }
}
