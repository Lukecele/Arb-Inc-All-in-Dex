import Script from "next/script";
import { Inter } from 'next/font/google';
import type { Metadata, Viewport } from 'next';
import './globals.css';
import StyledComponentsRegistry from '../lib/registry';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import CookieConsent from '../components/CookieConsent';
import ErrorBoundary from '../components/ErrorBoundary';
import { ClientWeb3Provider } from '../components/ClientWeb3Provider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
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
  title: 'Arbitrage Inception | DEX Aggregator',
  description: 'Swap and earn BNB rewards on BNB Chain.',
  icons: { icon: '/logo.jpg', apple: '/logo.jpg', shortcut: '/favicon.ico' },
  manifest: '/manifest.json',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=AW-18069102524" />
        <Script id="google-analytics" strategy="afterInteractive">{`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag("js", new Date()); gtag("config", "AW-18069102524");`}</Script>
      <body className={inter.className} style={{ margin: 0, padding: 0, backgroundColor: '#050508' }}>
        {/* Caricamento Differito Tag Google (Analytics + Ads) */}
        <Script
          strategy="lazyOnload"
        />
        <Script
          strategy="lazyOnload"
        />
        <Script id="google-analytics-ads" strategy="lazyOnload">
          {`
          `}
        </Script>

        <StyledComponentsRegistry>
          <ClientWeb3Provider>
            <ErrorBoundary>
              {children}
            </ErrorBoundary>
          </ClientWeb3Provider>
        </StyledComponentsRegistry>
        <CookieConsent />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
