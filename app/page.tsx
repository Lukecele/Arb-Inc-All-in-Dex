import HomePageClient from './HomePageClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Arbitrage Inception | Professional DEX Aggregator',
  description: 'High-performance multi-chain DEX aggregator and liquidity terminal on BNB Smart Chain.',
}

export default function HomePage() {
  return (
    <main style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#050508' }}>
      
      {/* 1. Navigazione */}
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

      {/* 2. Banner Coinserom IN ALTO (Massima visibilità) */}
      <div style={{ 
        width: '100%', 
        margin: '20px 0', 
        overflowX: 'auto', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center' 
      }}>
        <div style={{ width: '970px', margin: '0 auto', textAlign: 'center' }}>
          <iframe 
            src="//ads.coinserom.com/pub?adsunit=333937&size=970x250" 
            style={{ width: '970px', height: '250px', border: '0px', padding: '0', backgroundColor: 'transparent', overflow: 'auto' }}
          ></iframe>
          <a 
            style={{ display: 'block', textAlign: 'right', fontSize: '11px', width: '970px', color: 'rgba(255,255,255,0.3)', textDecoration: 'none', marginTop: '5px' }} 
            href="https://coinserom.com/?affiliate=3537313432" 
            target="_blank"
            rel="noopener noreferrer"
          >
            Ads by Coinserom
          </a>
        </div>
      </div>

      {/* 3. Il DEX Aggregator */}
      <HomePageClient />

      {/* 4. MintFunnel / Coinscribble Widget (In fondo) */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '40px auto 60px auto', 
        padding: '20px',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div dangerouslySetInnerHTML={{ 
          __html: '<coinscribble-ad widget="c86fd914-f913-4395-865b-e43860c2de26"></coinscribble-ad>' 
        }} />
        <script async src="https://cdn.coinscribble.sapient.tools/js/widget2.js"></script>
      </div>
      
    </main>
  )
}
