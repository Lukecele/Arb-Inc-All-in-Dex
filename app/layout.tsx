import { GoogleAnalytics } from "@next/third-parties/google";
import { Inter } from 'next/font/google';
import type { Metadata, Viewport } from 'next';
import './globals.css';
import StyledComponentsRegistry from '../lib/registry';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import CookieConsent from '../components/CookieConsent';
import ErrorBoundary from '../components/ErrorBoundary';
import { Web3Provider } from '../components/Web3Provider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

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
    images: [{ url: '/logo.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@Arbitrageincept',
    images: ['/logo.png'],
  },
  icons: { 
    icon: '/logo.png', 
    apple: '/logo.png',
    shortcut: '/favicon.ico'
  },
  manifest: '/manifest.json',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="https://bsc.publicnode.com" />
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
      <body 
        suppressHydrationWarning 
        style={{ 
          margin: 0, 
          padding: 0, 
          fontFamily: 'var(--font-inter), sans-serif',
          backgroundColor: '#050508' 
        }}
      >
        <ErrorBoundary>
          <Web3Provider>
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
