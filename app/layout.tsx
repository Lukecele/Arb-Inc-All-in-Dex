import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import StyledComponentsRegistry from '../lib/registry'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata: Metadata = {
  metadataBase: new URL('https://arbitrage-inc.exchange'),
  title: {
    default: 'Arbitrage Inception | DEX Aggregator & Liquidity Hub',
    template: '%s | Arbitrage Inception',
  },
  description: 'Swap, zap, bridge, and earn BNB rewards with Arbitrage Inception. The all-in-one DeFi aggregator on BNB Smart Chain featuring deflationary tokenomics, automated token burns, passive income through 12h BNB distributions, and cross-DEX aggregation powered by PancakeSwap & KyberSwap.',
  keywords: ['DeFi', 'BSC', 'BNB Smart Chain', 'Cryptocurrency', 'Swap', 'Liquidity', 'PancakeSwap', 'KyberSwap', 'Arbitrage', 'ARB Inc', 'DEX Aggregator', 'Zap', 'Yield Farming', 'BNB Rewards', 'Deflationary Token', 'Token Burn', 'Passive Income', 'Cross-Chain Bridge', 'Mayan Finance'],
  applicationName: 'Arbitrage Inception',
  authors: [{ name: 'Arbitrage Inception', url: 'https://arbitrage-inc.exchange' }],
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
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Arbitrage Inception - DeFi Aggregator on BNB Smart Chain',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arbitrage Inception | All-in-One DeFi Aggregator, Swap & Liquidity Hub on BSC',
    description: 'Swap, zap, bridge, and earn BNB rewards. Deflationary tokenomics with automated burns and passive income distributions.',
    images: ['/og-image.png'],
    site: '@Arbitrageincept',
    creator: '@Arbitrageincept',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
        url: 'https://arbitrage-inc.exchange/og-image.png'
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
    logo: 'https://arbitrage-inc.exchange/og-image.png',
    sameAs: [
      'https://x.com/Arbitrageincept',
      'https://t.me/ArbitrageInception'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      url: 'https://arbitrage-inc.exchange/contact'
    }
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Arbitrage Inception?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Arbitrage Inception is an all-in-one DeFi platform on BNB Smart Chain. It combines swap, zap, cross-chain bridge, and limit orders with a deflationary token (ARB Inc) that automatically distributes BNB rewards to holders every 12 hours.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is the ARB Inc token?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'ARB Inc is a deflationary BEP-20 token on BNB Smart Chain with a total supply of 1 billion tokens. It features a 4% buy/sell tax, automated buyback & burn, and BNB reward distributions powered by DEX revenue.'
        }
      },
      {
        '@type': 'Question',
        name: 'How do I earn BNB rewards?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Hold at least 2,000,000 ARB Inc tokens in your wallet. Every 12 hours, 40% of the collected BNB from DEX revenue is automatically distributed to qualifying holders. No staking or claiming needed.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is the minimum holding to receive rewards?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You need a minimum of 2,000,000 ARB Inc tokens to be eligible for BNB reward distributions.'
        }
      },
      {
        '@type': 'Question',
        name: 'How often are rewards distributed?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'BNB rewards are distributed every 12 hours automatically to all eligible holders.'
        }
      },
      {
        '@type': 'Question',
        name: 'What chains does Arbitrage Inception support?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The ARB Inc token and native DEX functions (swap, zap, limit orders) run on BNB Smart Chain (BSC). The bridge feature powered by Mayan Finance supports cross-chain swaps to and from multiple EVM and non-EVM chains.'
        }
      },
      {
        '@type': 'Question',
        name: 'How do I buy ARB Inc tokens?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can buy ARB Inc directly on the Swap page using BNB. The swap is powered by PancakeSwap V2. Connect your wallet (MetaMask, Coinbase, WalletConnect) and swap BNB for ARB Inc in seconds.'
        }
      },
      {
        '@type': 'Question',
        name: 'What are the trading fees?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'ARB Inc has a 4% buy/sell tax that funds the reward distribution and buyback & burn mechanism. Additionally, a 0.1% dev fee applies to swaps on the platform.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is the deflationary mechanism?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '20% of every BNB distribution is used for buyback & burn, permanently removing ARB Inc from circulation. This continuous reduction in supply creates deflationary pressure over time.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is the Zap feature?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Zap lets you add or remove liquidity from BSC pools with a single transaction. Instead of manually splitting tokens and providing both sides of a pair, Zap handles everything automatically using PancakeSwap and KyberSwap pools.'
        }
      },
    ],
  }
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-US">
      <body style={{ margin: 0, padding: 0 }}>
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
