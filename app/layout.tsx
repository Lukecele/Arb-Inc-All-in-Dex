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
  icons: { icon: '/logo.png', apple: '/logo.png' },
  manifest: '/manifest.json',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning style={{ margin: 0, padding: 0, backgroundColor: '#050508' }}>
        <StyledComponentsRegistry>
          <Web3Provider>
            <ErrorBoundary>
              {children}
            </ErrorBoundary>
          </Web3Provider>
        </StyledComponentsRegistry>
        <CookieConsent />
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics gaId="G-H6XYJKW0CX" />
      </body>
    </html>
  )
}
