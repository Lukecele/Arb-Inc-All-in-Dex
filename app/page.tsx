import HomePageClient from './HomePageClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Arbitrage Inception | DEX Aggregator',
  description: 'Swap, zap, and provide liquidity on BSC with the best rates.',
}

export default function HomePage() {
  return (
    <main style={{ position: 'relative', minHeight: '100vh' }}>
      
      {/* A-Ads Banner Superiore (Adaptive) */}
      <div style={{ 
        width: '100%', 
        backgroundColor: '#0a0a0f', 
        borderBottom: '1px solid rgba(139, 92, 246, 0.2)',
        padding: '10px 0'
      }}>
        <div id="frame" style={{ width: '100%', margin: 'auto', position: 'relative', zIndex: 999 }}>
          <iframe 
            data-aa='2433982' 
            src='//acceptable.a-ads.com/2433982/?size=Adaptive' 
            style={{ 
              border: 0, 
              padding: 0, 
              width: '100%', 
              maxWidth: '970px', // Limite per non farlo diventare troppo gigante su schermi enormi
              height: '90px', 
              overflow: 'hidden', 
              display: 'block', 
              margin: 'auto' 
            }}
          />
        </div>
      </div>

      {/* Il DEX originale */}
      <HomePageClient />
      
    </main>
  )
}
