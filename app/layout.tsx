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
              <main style={{ relative: 'relative', zIndex: 10 }}>
                {children}
              </main>
            </ErrorBoundary>
          </ClientWeb3Provider>
        </StyledComponentsRegistry>
        
        <CookieConsent />
        <Analytics />
        <SpeedInsights />

        {/* Ads caricate dopo che il sito è pronto, per non coprire i widget */}
        <Script 
          src="https://pl29130416.profitablecpmratenetwork.com/ca/47/77/ca477764f17dae98009fbb7f7a2e29cf.js" 
          strategy="lazyOnload" 
        />
        <Script 
          src="https://pl29130418.profitablecpmratenetwork.com/be/fa/88/befa8896026792febb6eddb72ce45b2e.js" 
          strategy="lazyOnload" 
        />
      </body>
    </html>
  )
}
