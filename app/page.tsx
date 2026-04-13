import HomePageClient from './HomePageClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Arbitrage Inception | Professional DEX Aggregator',
  description: 'High-performance multi-chain DEX aggregator and liquidity terminal on BNB Smart Chain.',
}

export default function HomePage() {
  return (
    <main style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#050508' }}>
      
      {/* Navigazione */}
      <nav style={{ 
        width: '100%', 
        padding: '20px 0', 
        textAlign: 'center', 
        borderBottom: '1px solid rgba(139, 92, 246, 0.1)',
        display: 'flex',
        justifyContent: 'center',
        gap: '30px'
      }}>
        <a href="/" style={{ color: 'white', fontWeight: 'bold', letterSpacing: '1px', fontSize: '12px', textDecoration: 'none' }}>
          TRADING TERMINAL
        </a>
        <a href="/rewards" style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 'bold', letterSpacing: '1px', fontSize: '12px', textDecoration: 'none' }}>
          ECOSYSTEM REWARDS
        </a>
      </nav>

      {/* DEX */}
      <HomePageClient />

      {/* Container Annunci - Ho aggiunto un bordo grigio per vedere se esiste */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '60px auto', 
        padding: '20px',
        backgroundColor: 'rgba(255,255,255,0.02)',
        borderRadius: '12px',
        border: '1px dashed rgba(255,255,255,0.1)',
        minHeight: '250px'
      }}>
        <div id="ts_ad_native_794p8"></div>
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            function loadNative() {
              if (typeof NativeAd === 'function') {
                console.log('TrafficStars: SDK trovato, inizializzo...');
                NativeAd({
                  element_id: "ts_ad_native_794p8",
                  spot: "54d88e539e5241e884c0e19981fd174e",
                  type: "label-under",
                  cols: 4,
                  rows: 1,
                  title: "Suggested for you",
                  titlePosition: "left",
                  adsByPosition: "right",
                  breakpoints: [{ "cols": 2, "width": 770 }],
                });
              } else {
                console.log('TrafficStars: SDK non ancora pronto, riprovo tra 500ms...');
                setTimeout(loadNative, 500);
              }
            }
            loadNative();
          })();
        `}} />
      </div>
    </main>
  )
}
