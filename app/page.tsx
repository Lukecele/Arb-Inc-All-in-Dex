import HomePageClient from './HomePageClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Arbitrage Inception | DEX Aggregator & Liquidity Hub',
  description: 'Swap, zap, and provide liquidity on BSC with the best rates.',
  keywords: ['DeFi', 'BSC', 'Arbitrage', 'DEX Aggregator'],
}

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      {/* Homepage originale del DEX */}
      <HomePageClient />

      {/* Pulsante Fluttuante Direct Link (SmartLink) */}
      <a 
        href="https://idealistic-revenue.com/8YeCXW" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[9999] group flex items-center gap-3"
      >
        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-4 py-3 rounded-2xl shadow-2xl shadow-violet-500/40 border border-violet-400/30 hover:scale-105 transition-all duration-300 active:scale-95">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎁</span>
            <div className="flex flex-col items-start leading-tight">
              <span className="text-[10px] uppercase font-bold tracking-tighter opacity-80">Daily Reward</span>
              <span className="text-sm font-extrabold">CLAIM BTC</span>
            </div>
          </div>
        </div>
        
        {/* Effetto notifica pulsante */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
        </span>
      </a>
    </div>
  )
}
