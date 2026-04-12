import HomePageClient from './HomePageClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Arbitrage Inception | DEX Aggregator',
  description: 'Swap, zap, and provide liquidity on BSC with the best rates.',
}

export default function HomePage() {
  return <HomePageClient />
}
