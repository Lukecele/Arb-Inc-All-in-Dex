import { GoogleAnalytics } from '@next/third-parties/google';
import { Inter } from 'next/font/google';
import "./globals.css";
import StyledComponentsRegistry from '../lib/registry';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import CookieConsent from '../components/CookieConsent';
import ErrorBoundary from '../components/ErrorBoundary';
import { ClientWeb3Provider } from '../components/ClientWeb3Provider';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

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

        {/* COINTRAFFIC UNIFIED CODE: Caricamento sicuro post-interazione */}
        <Script 
          src="https://appsha-prm.ctengine.io/js/script.js?wkey=NRiudnM4Pi" 
          strategy="afterInteractive" 
        />
      </body>
    </html>
  )
}
