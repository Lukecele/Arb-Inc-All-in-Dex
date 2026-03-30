import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Limit Order | Arbitrage Inception',
  description: 'Place limit orders on BSC with the best rates. Set your price and trade automatically when the market reaches your target. Powered by KyberSwap.',
  keywords: ['DeFi', 'BSC', 'Limit Order', 'Crypto Trading', 'KyberSwap', 'ARB Inc', 'DEX Aggregator'],
  alternates: {
    canonical: 'https://arbitrage-inc.exchange/limit-orders',
  },
  openGraph: {
    title: 'Limit Order | Arbitrage Inception',
    description: 'Place limit orders on BSC with the best rates. Powered by KyberSwap.',
    url: 'https://arbitrage-inc.exchange/limit-orders',
    siteName: 'Arbitrage Inception',
  },
}

export default function LimitOrdersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
