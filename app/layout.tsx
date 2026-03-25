import type { Metadata } from 'next'
import './globals.css'
import StyledComponentsRegistry from '../lib/registry'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata: Metadata = {
  title: {
    default: 'Arbitrage Inception | DEX Aggregator & Liquidity Hub',
    template: '%s | Arbitrage Inception',
  },
  description: 'Swap, zap, and provide liquidity on BSC with the best rates. Features custom ARB Inc swaps, liquidity pools, and cross-DEX aggregation powered by PancakeSwap & KyberSwap.',
  keywords: ['DeFi', 'BSC', 'Cryptocurrency', 'Swap', 'Liquidity', 'PancakeSwap', 'Arbitrage', 'ARB Inc', 'DEX Aggregator', 'Zap', 'Yield Farming'],
  verification: {
    google: '2b040ac83f9d76c4',
  },
  alternates: {
    canonical: 'https://arbitrage-inc.exchange/',
  },
  openGraph: {
    title: 'Arbitrage Inception | DEX Aggregator & Liquidity Hub',
    description: 'Swap, zap, and provide liquidity on BSC with the best rates.',
    type: 'website',
    url: 'https://arbitrage-inc.exchange/',
    siteName: 'Arbitrage Inception',
    images: [
      {
        url: 'https://arbitrage-inc.exchange/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Arbitrage Inception',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arbitrage Inception | DEX Aggregator & Liquidity Hub',
    description: 'Swap, zap, and provide liquidity on BSC with the best rates.',
    images: ['https://arbitrage-inc.exchange/og-image.svg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
