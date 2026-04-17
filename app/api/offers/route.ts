import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const wallet = searchParams.get('wallet') || 'guest';
  
  // 1. CATTURIAMO L'IP REALE (Da Vercel)
  const forwardedFor = request.headers.get('x-forwarded-for');
  const userIp = forwardedFor ? forwardedFor.split(',')[0] : '151.75.207.169'; // IP di fallback in caso di test locale
  
  // 2. CATTURIAMO LO USER AGENT (Che dispositivo usa l'utente?)
  const userAgent = request.headers.get('user-agent') || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)';
  
  const userId = '2517944';
  const key = '26271b30ab81cc1f2aa423c79ccb3d6a';
  
  // 3. COSTRUIAMO L'URL COMPLETO CON TUTTE LE ARMI
  const apiUrl = `https://www.cpagrip.com/common/offer_feed_rss.php?user_id=${userId}&key=${key}&tracking_id=${encodeURIComponent(wallet)}&ip=${userIp}&ua=${encodeURIComponent(userAgent)}`;
  
  try {
    const response = await fetch(apiUrl);
    const xmlText = await response.text();
    
    // Siccome CPAGrip usa un XML custom, usiamo una Regex (Espressione Regolare) veloce
    // per estrarre le offerte invece di librerie pesanti
    const offers: any[] = [];
    const offerBlocks = xmlText.match(/<offer>([\s\S]*?)<\/offer>/g) || [];
    
    for (const block of offerBlocks) {
      // Estraiamo i campi che ci interessano
      const titleMatch = block.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/);
      const linkMatch = block.match(/<offerlink><!\[CDATA\[(.*?)\]\]><\/offerlink>/);
      const photoMatch = block.match(/<offerphoto><!\[CDATA\[(.*?)\]\]><\/offerphoto>/);
      
      if (titleMatch && linkMatch) {
        offers.push({
          title: titleMatch[1],
          link: linkMatch[1],
          image: photoMatch ? photoMatch[1] : null,
        });
      }
      
      // Fermiamoci a 8 offerte
      if (offers.length >= 8) break;
    }

    return NextResponse.json({ offers });
  } catch (error) {
    console.error("Errore CPAGrip Custom API:", error);
    return NextResponse.json({ error: 'Failed to fetch offers' }, { status: 500 });
  }
}
