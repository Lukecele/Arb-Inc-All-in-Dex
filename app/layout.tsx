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
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#8B5CF6',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ margin: 0, padding: 0, backgroundColor: '#050508' }}>
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

        {/* MANTENIAMO SOLO LA SOCIAL BAR (Meno invasiva) */}
        <Script 
          src="https://pl29130418.profitablecpmratenetwork.com/be/fa/88/befa8896026792febb6eddb72ce45b2e.js" 
          strategy="lazyOnload" 
        />
      </body>
    </html>
  )
}
