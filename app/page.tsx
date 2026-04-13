import HomePageClient from './HomePageClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Arbitrage Inception | Professional DEX Aggregator',
  description: 'High-performance multi-chain DEX aggregator and liquidity terminal on BNB Smart Chain.',
}

export default function HomePage() {
  return (
    <main style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#050508' }}>
      
      {/* Header di cortesia minimale per dare un tono professionale */}
      <div style={{ 
        width: '100%', 
        backgroundColor: '#0a0a0f', 
        borderBottom: '1px solid rgba(139, 92, 246, 0.1)',
        padding: '15px 0',
        textAlign: 'center'
      }}>
        <span style={{ 
          color: 'rgba(255,255,255,0.5)', 
          fontSize: '11px', 
          letterSpacing: '2px', 
          fontWeight: 'bold',
          textTransform: 'uppercase' 
        }}>
          Institutional Grade Trading Interface
        </span>
      </div>

      {/* Solo il DEX originale */}
      <HomePageClient />
      
    </main>
  )
}
