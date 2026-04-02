import type { Metadata } from 'next'
import './globals.css'
import StyledComponentsRegistry from '../lib/registry'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata: Metadata = {
  title: {
    default: 'Arbitrage Inception | All-in-One DeFi Aggregator, Swap & Liquidity Hub on BSC',
    template: '%s | Arbitrage Inception',
  },
  description: 'Swap, zap, bridge, and earn BNB rewards with Arbitrage Inception. The all-in-one DeFi aggregator on BNB Smart Chain featuring deflationary tokenomics, automated token burns, passive income through 12h BNB distributions, and cross-DEX aggregation powered by PancakeSwap & KyberSwap.',
  keywords: ['DeFi', 'BSC', 'BNB Smart Chain', 'Cryptocurrency', 'Swap', 'Liquidity', 'PancakeSwap', 'KyberSwap', 'Arbitrage', 'ARB Inc', 'DEX Aggregator', 'Zap', 'Yield Farming', 'BNB Rewards', 'Deflationary Token', 'Token Burn', 'Passive Income', 'Cross-Chain Bridge', 'Mayan Finance'],
  verification: {
    google: '2b040ac83f9d76c4',
  },
  alternates: {
    canonical: 'https://arbitrage-inc.exchange/',
  },
  openGraph: {
    title: 'Arbitrage Inception | All-in-One DeFi Aggregator, Swap & Liquidity Hub on BSC',
    description: 'Swap, zap, bridge, and earn BNB rewards. Deflationary tokenomics with automated burns and passive income distributions.',
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
    title: 'Arbitrage Inception | All-in-One DeFi Aggregator, Swap & Liquidity Hub on BSC',
    description: 'Swap, zap, bridge, and earn BNB rewards. Deflationary tokenomics with automated burns and passive income distributions.',
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

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Arbitrage Inception',
    description: 'All-in-one DeFi aggregator on BNB Smart Chain. Swap, zap, bridge, and earn BNB rewards with deflationary tokenomics.',
    url: 'https://arbitrage-inc.exchange/',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://arbitrage-inc.exchange/swap?search={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    },
    sameAs: [
      'https://x.com/Arbitrageincept',
      'https://t.me/ArbitrageInception'
    ],
    publisher: {
      '@type': 'Organization',
      name: 'Arbitrage Inception',
      logo: {
        '@type': 'ImageObject',
        url: 'https://arbitrage-inc.exchange/og-image.svg'
      }
    }
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'ARB Inc Token',
    description: 'Deflationary BEP-20 token on BNB Smart Chain with BNB rewards distribution, automated token burns, and DEX revenue sharing.',
    brand: {
      '@type': 'Brand',
      name: 'Arbitrage Inception'
    },
    category: 'Cryptocurrency',
    url: 'https://arbitrage-inc.exchange/',
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock'
    }
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Arbitrage Inception',
    url: 'https://arbitrage-inc.exchange/',
    logo: 'https://arbitrage-inc.exchange/og-image.svg',
    sameAs: [
      'https://x.com/Arbitrageincept',
      'https://t.me/ArbitrageInception'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      url: 'https://arbitrage-inc.exchange/contact'
    }
  }
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-US">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
