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
import { Web3Provider } from '../components/Web3Provider' // Il nostro nuovo provider

const DAPP_URL = process.env.NEXT_PUBLIC_DAPP_URL || 'https://arbitrage-inc.exchange';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#8B5CF6',
  colorScheme: 'dark',
}

export const metadata: Metadata = {
  metadataBase: new URL(DAPP_URL),
  title: {
    default: 'Arbitrage Inception | DEX Aggregator & Liquidity Hub',
    template: '%s | Arbitrage Inception',
  },
  description: 'Swap, earn BNB rewards and build passive income on BNB Chain. All-in-one DeFi hub with zap, bridge, limit orders & cross-DEX aggregation.',
  keywords: ['DeFi', 'BSC', 'BNB Smart Chain', 'Swap', 'PancakeSwap', 'KyberSwap', 'Arbitrage', 'Bridge', 'Mayan Finance'],
  authors: [{ name: 'Arbitrage Inception', url: DAPP_URL }],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Arbitrage Inception | DeFi Hub on BNB Chain',
    description: 'Swap, earn BNB rewards and build passive income.',
    type: 'website',
    url: DAPP_URL,
    siteName: 'Arbitrage Inception',
    images: [{ url: '/logo.webp', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@Arbitrageincept',
    images: ['/logo.webp'],
  },
  icons: { icon: '/logo.webp', apple: '/logo.webp' },
  manifest: '/manifest.json',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://bsc.publicnode.com" />
        <link rel="dns-prefetch" href="https://bsc.publicnode.com" />
        {/* Schema FinancialProduct per SEO Pro */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FinancialProduct",
              "name": "Arb Inc Token",
              "description": "Deflationary token with 20% burn and BNB rewards.",
              "offers": { "@type": "Offer", "priceCurrency": "BNB" }
            })
          }}
        />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        <ErrorBoundary>
          <Web3Provider> {/* Avvolge tutto il sito: wallet sempre connesso */}
            <StyledComponentsRegistry>
              {children}
            </StyledComponentsRegistry>
          </Web3Provider>
        </ErrorBoundary>
        <CookieConsent />
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics gaId="G-H6XYJKW0CX" />
      </body>
    </html>
  )
}
