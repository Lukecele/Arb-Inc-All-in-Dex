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

      {/* 2. NUOVO Cointraffic Banner (Top) */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        <span id="ct_cQd9eSMbdcb"></span>
      </div>

      {/* 3. Il DEX Aggregator al centro */}
      <HomePageClient />

      {/* 4. Primo Cointraffic Banner (Bottom) */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '40px 0' }}>
        <span id="ct_clEJQkwMj04"></span>
      </div>

      {/* 5. MintFunnel / Coinscribble Widget */}
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
