import HomePageClient from './HomePageClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Arbitrage Inception | Professional DEX Aggregator',
  description: 'High-performance multi-chain DEX aggregator and liquidity terminal on BNB Smart Chain.',
}

export default function HomePage() {
  return (
    <main style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#050508' }}>
      
      {/* Navbar minimale */}
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

      {/* 1. Il DEX originale */}
      <HomePageClient />

      {/* 2. TrafficStars Native Ad Spot */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '40px auto', 
        padding: '0 20px',
        backgroundColor: 'rgba(255,255,255,0.02)',
        borderRadius: '12px'
      }}>
        <div id="ts_ad_native_794p8"></div>
        <script dangerouslySetInnerHTML={{ __html: `
          window.addEventListener('load', function() {
            if (typeof NativeAd === 'function') {
              NativeAd({
                element_id: "ts_ad_native_794p8",
                spot: "54d88e539e5241e884c0e19981fd174e",
                type: "label-under",
                cols: 4,
                rows: 1,
                title: "Suggested for you",
                titlePosition: "left",
                adsByPosition: "right",
                breakpoints: [
                  { "cols": 2, "width": 770 }
                ],
              });
            }
          });
        `}} />
      </div>
      
    </main>
  )
}
