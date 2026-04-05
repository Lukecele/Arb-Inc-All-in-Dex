import dynamic from "next/dynamic";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import './globals.css'
import StyledComponentsRegistry from '../lib/registry'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import CookieConsent from '../components/CookieConsent'
import ErrorBoundary from '../components/ErrorBoundary'
import WebVitals from '../components/WebVitals'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#8B5CF6',
  colorScheme: 'dark',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://arbitrage-inc.exchange'),
  title: {
    default: 'Arbitrage Inception | DEX Aggregator & Liquidity Hub',
    template: '%s | Arbitrage Inception',
  },
  description: 'Swap, earn BNB rewards and build passive income on BNB Chain. All-in-one DeFi hub with zap, bridge, limit orders & cross-DEX aggregation.',
  keywords: ['DeFi', 'BSC', 'BNB Smart Chain', 'Cryptocurrency', 'Swap', 'Liquidity', 'PancakeSwap', 'KyberSwap', 'Arbitrage', 'ARB Inc', 'DEX Aggregator', 'Zap', 'Yield Farming', 'BNB Rewards', 'Deflationary Token', 'Token Burn', 'Passive Income', 'Cross-Chain Bridge', 'Mayan Finance'],
  applicationName: 'Arbitrage Inception',
  authors: [{ name: 'Arbitrage Inception', url: 'https://arbitrage-inc.exchange' }],
  generator: 'Next.js',
  creator: 'Arbitrage Inception',
  publisher: 'Arbitrage Inception',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  verification: {
    google: '2b040ac83f9d76c4',
  },
  alternates: {
    canonical: 'https://arbitrage-inc.exchange/',
  },
  openGraph: {
    title: 'Arbitrage Inception | DeFi Hub on BNB Chain',
    description: 'Swap, earn BNB rewards and build passive income. All-in-one DeFi hub with zap, bridge, limit orders & cross-DEX aggregation.',
    type: 'website',
    url: 'https://arbitrage-inc.exchange/',
    siteName: 'Arbitrage Inception',
    locale: 'en_US',
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
    title: 'Arbitrage Inception | DeFi Hub on BNB Chain',
    description: 'Swap, earn BNB rewards and build passive income. All-in-one DeFi hub with zap, bridge, limit orders & cross-DEX aggregation.',
    images: ['/og-image.png'],
    site: '@Arbitrageincept',
    creator: '@Arbitrageincept',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
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
    '@type': 'CryptoExchange',
    name: 'Arbitrage Inception',
    url: 'https://arbitrage-inc.exchange/',
    description: 'Decentralized exchange aggregator on BNB Smart Chain featuring PancakeSwap and KyberSwap integration.'
  }
]

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://arbitrage-inc.exchange/' },
    { '@type': 'ListItem', position: 2, name: 'Swap', item: 'https://arbitrage-inc.exchange/swap' },
    { '@type': 'ListItem', position: 3, name: 'Zap', item: 'https://arbitrage-inc.exchange/zap' },
    { '@type': 'ListItem', position: 4, name: 'Bridge', item: 'https://arbitrage-inc.exchange/bridge' },
    { '@type': 'ListItem', position: 5, name: 'Limit Orders', item: 'https://arbitrage-inc.exchange/limit-orders' },
    { '@type': 'ListItem', position: 6, name: 'About', item: 'https://arbitrage-inc.exchange/about' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://bsc.publicnode.com" />
        <link rel="preconnect" href="https://api.coingecko.com" />
        <link rel="dns-prefetch" href="https://bsc.publicnode.com" />
        <link rel="dns-prefetch" href="https://api.coingecko.com" />
      
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FinancialProduct",
      "name": "Arb Inc Token",
      "description": "Deflationary token with 20% burn and BNB rewards on the Arbitrage Inception DEX.",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "BNB",
        "availability": "https://schema.org/InStock"
      }
    })
  }}
/>
</head>
      <body style={{ margin: 0, padding: 0 }}>
        <Script id="structured-data" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Script id="breadcrumb-data" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <ErrorBoundary>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </ErrorBoundary>
        <WebVitals />
        <Analytics />
        <SpeedInsights />
        <CookieConsent />
        <GoogleAnalytics gaId="G-H6XYJKW0CX" />
      </body>
    </html>
  )
}
