import type { Metadata } from 'next'
import './globals.css'
import StyledComponentsRegistry from '../lib/registry'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata: Metadata = {
  title: 'Arbitrage Inception | Advanced Swap & Arbitrage on BSC',
  description: 'Arbitrage Inception is a decentralized frontend interface powered by KyberSwap. Swap tokens, provide liquidity via Zap, and earn BNB rewards on the BNB Smart Chain (BSC).',
  keywords: 'Arbitrage Inception, BNB Smart Chain, BSC Swap, KyberSwap frontend, DeFi aggregator, Crypto Arbitrage, Zap Liquidity, Earn BNB, BEP-20',
  authors: [{ name: 'Arbitrage Inception Team' }],
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: '2b040ac83f9d76c4',
  },
  alternates: {
    canonical: 'https://arbitrage-inc.exchange/',
  },
  openGraph: {
    type: 'website',
    url: 'https://arbitrage-inc.exchange/',
    title: 'Arbitrage Inception | Advanced Swap & Arbitrage on BSC',
    description: 'Trade efficiently on the BNB Smart Chain. Use our KyberSwap-powered interface for swaps, zap liquidity, and earn automated BNB rewards.',
    siteName: 'Arbitrage Inception',
    images: [
      {
        url: 'https://cdn.dexscreener.com/cms/images/3db2502d596330f75db19c4275c3acd833d9f35d370a39ed28933073d75edc7f?width=800&height=800&quality=95&format=auto',
        width: 800,
        height: 800,
        alt: 'Arbitrage Inception',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@Arbitrageincept',
    title: 'Arbitrage Inception | Advanced Swap & Arbitrage on BSC',
    description: 'Trade efficiently on the BNB Smart Chain. Use our KyberSwap-powered interface for swaps, zap liquidity, and earn automated BNB rewards.',
    images: ['https://cdn.dexscreener.com/cms/images/3db2502d596330f75db19c4275c3acd833d9f35d370a39ed28933073d75edc7f?width=800&height=800&quality=95&format=auto'],
  },
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
