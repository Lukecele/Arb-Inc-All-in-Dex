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

      {/* 2. Banner Coinserom (In Alto) */}
      <div style={{ width: '100%', margin: '20px 0', overflowX: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '970px', margin: '0 auto', textAlign: 'center' }}>
          <iframe 
            src="//ads.coinserom.com/pub?adsunit=333937&size=970x250" 
            style={{ width: '970px', height: '250px', border: '0px', padding: '0', backgroundColor: 'transparent', overflow: 'auto' }}
          ></iframe>
        </div>
      </div>

      {/* 3. Il DEX Aggregator */}
      <HomePageClient />

      {/* 4. Banner A-Ads (Il Paracadute - 728x90 o simile) */}
      <div style={{ width: '100%', margin: '40px 0', display: 'flex', justifyContent: 'center', overflowX: 'auto' }}>
        {/* SOSTITUISCI IL_TUO_ID_AADS CON IL TUO CODICE */}
        <iframe 
          data-aa='IL_TUO_ID_AADS' 
          src='//ad.a-ads.com/IL_TUO_ID_AADS?size=728x90' 
          style={{ width: '728px', height: '90px', border: '0px', padding: '0', overflow: 'hidden', backgroundColor: 'transparent' }}
        ></iframe>
      </div>

      {/* 5. MintFunnel / Coinscribble Widget (In Fondo) */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '20px auto 60px auto', 
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
