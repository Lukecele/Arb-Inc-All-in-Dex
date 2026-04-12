import HomePageClient from './HomePageClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Arbitrage Inception | DEX Aggregator',
  description: 'Professional Swap & Liquidity Hub',
}

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Monetag gestirà la pubblicità automaticamente, noi lasciamo lo spazio pulito */}
      <div className="flex-grow pt-8">
        <HomePageClient />
      </div>
      
      <footer className="container mx-auto px-4 pb-10 text-center text-slate-600 text-[10px] uppercase tracking-widest opacity-50 mt-10">
        © 2026 Arbitrage Inception • Decentralized & Secure
      </footer>
    </main>
  )
}
