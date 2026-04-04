import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Limit Order | Set Your Trade Price | Arbitrage Inception',
  description: 'Create a limit order on BNB Smart Chain. Set your desired price and trade automatically when the market reaches your target. Powered by KyberSwap aggregator.',
  keywords: [
    'create limit order',
    'set price',
    'limit order BSC',
    'KyberSwap',
    'ARB Inc',
    'automated trading',
    'BNB Smart Chain',
    'DeFi',
    'crypto trading'
  ],
  alternates: {
    canonical: 'https://arbitrage-inc.exchange/limit-orders/create',
  },
  openGraph: {
    title: 'Create Limit Order | Arbitrage Inception',
    description: 'Set your desired price and trade automatically when the market reaches your target. Powered by KyberSwap.',
    url: 'https://arbitrage-inc.exchange/limit-orders/create',
    siteName: 'Arbitrage Inception',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Create Limit Order - Arbitrage Inception',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Create Limit Order | Arbitrage Inception',
    description: 'Set your desired price and trade automatically when the market reaches your target.',
    images: ['/og-image.png'],
    site: '@Arbitrageincept',
    creator: '@Arbitrageincept',
  },
}

export default function CreateLimitOrderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
