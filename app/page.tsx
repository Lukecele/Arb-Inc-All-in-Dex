import HomePageClient from './HomePageClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Arbitrage Inception | DEX Aggregator & Liquidity Hub',
  description: 'Swap, zap, and provide liquidity on BSC with the best rates. Features custom ARB Inc swaps, liquidity pools, and cross-DEX aggregation powered by PancakeSwap & KyberSwap.',
  keywords: ['DeFi', 'BSC', 'Cryptocurrency', 'Swap', 'Liquidity', 'PancakeSwap', 'Arbitrage', 'ARB Inc', 'DEX Aggregator'],
}

export default function HomePage() {
  return <HomePageClient />
}
