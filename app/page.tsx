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
      <div className="flex-grow">
        <HomePageClient />
      </div>
      
      {/* Il banner apparirà qui, sotto tutto il contenuto */}
      <footer className="container mx-auto px-4 pb-10">
        <AdBanner />
      </footer>
    </main>
  )
}
