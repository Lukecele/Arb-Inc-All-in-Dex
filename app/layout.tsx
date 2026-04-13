import { GoogleAnalytics } from '@next/third-parties/google';
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
    other: { coinzilla: "40513d259822a129e42a968860c68483" },
  icons: { icon: '/logo.jpg', apple: '/logo.jpg', shortcut: '/favicon.ico' },
  manifest: '/manifest.json',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ margin: 0, padding: 0, backgroundColor: '#050508' }}><script async src="https://appsha-prm.ctengine.io/js/script.js?wkey=NRiudnM4Pi"></script>
        <script async src="https://appsha-pnd.ctengine.io/js/script.js?wkey=NRiudnM4Pi"></script>
        <GoogleAnalytics gaId="G-H6XYJKW0CX" />
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
    </html>
  )
}
