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
  icons: { icon: '/logo.jpg', apple: '/logo.jpg', shortcut: '/favicon.ico' },
  manifest: '/manifest.json',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Verifica HillTopAds */}
        <meta name="fc1ab86acd169d0bdfc0110c03e37eea1b45dafa" content="fc1ab86acd169d0bdfc0110c03e37eea1b45dafa" />
        
        {/* 1. HillTopAds Popunder (Il "motore" invisibile) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(aja){
                var d = document,
                    s = d.createElement('script'),
                    l = d.scripts[d.scripts.length - 1];
                s.settings = aja || {};
                s.src = "\/\/fluffy-management.com\/c\/Df9.6lb\/2S5xlRScW\/QH9nNqjZkA1tMyThEF2nMiSV0T2qOzTTU\/xUM\/T_Yh1q";
                s.async = true;
                s.referrerPolicy = 'no-referrer-when-downgrade';
                l.parentNode.insertBefore(s, l);
              })({})
            `,
          }}
        />

        {/* 2. HillTopAds In-Page Push (Notifica discreta) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(sxax){
                var d = document,
                    s = d.createElement('script'),
                    l = d.scripts[d.scripts.length - 1];
                s.settings = sxax || {};
                s.src = "\/\/stupid-police.com\/b.XwV\/sUdrGnls0CYSWTcb\/jeomQ9huXZkUklZkEPUT\/YS5rNoT\/ECydOWD\/UctpNPjpkm1SM\/TfIZ4bOoQV";
                s.async = true;
                s.referrerPolicy = 'no-referrer-when-downgrade';
                l.parentNode.insertBefore(s, l);
              })({})
            `,
          }}
        />
      </head>
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
      </body>
    </html>
  )
}
