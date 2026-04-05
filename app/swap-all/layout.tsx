import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Swap All Tokens | DEX Aggregator | Arbitrage Inception',
  description: 'Swap any token on BSC with the best rates. KyberSwap aggregates liquidity from PancakeSwap, Uniswap V3, and other DEXs.',
  keywords: ['swap all tokens', 'BSC swap', 'DEX aggregator', 'KyberSwap', 'PancakeSwap', 'Uniswap V3', 'best swap rate', 'token exchange'],
  alternates: {
    canonical: 'https://arbitrage-inc.exchange/swap-all',
  },
  openGraph: {
    title: 'Swap All Tokens | DEX Aggregator | Arbitrage Inception',
    description: 'Swap any token on BSC with the best rates.',
    url: 'https://arbitrage-inc.exchange/swap-all',
    siteName: 'Arbitrage Inception',
    images: [
      {
        url: 'https://arbitrage-inc.exchange/logo-animato.gif',
        width: 800,
        height: 800,
        alt: 'Arbitrage Inception Swap All',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Swap All Tokens | DEX Aggregator | Arbitrage Inception',
    description: 'Swap any token on BSC with the best rates.',
    images: [
      'https://arbitrage-inc.exchange/logo-animato.gif',
    ],
  },
}

export default function SwapAllLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
