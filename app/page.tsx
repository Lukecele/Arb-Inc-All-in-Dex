import HomePageClient from './HomePageClient'
import AdBanner from '../components/AdBanner'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Arbitrage Inception | DEX Aggregator',
  description: 'Professional Swap & Liquidity Hub',
}

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Banner in posizione "Top" - Massima visibilità */}
      <div className="container mx-auto px-4 pt-6 flex justify-center">
        <AdBanner />
      </div>

      <div className="flex-grow">
        <HomePageClient />
      </div>
      
      <footer className="container mx-auto px-4 pb-10 text-center text-slate-600 text-[10px] uppercase tracking-widest opacity-50">
        © 2026 Arbitrage Inception • Decentralized & Secure
      </footer>
    </main>
  )
}
