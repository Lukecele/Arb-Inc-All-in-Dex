import './globals.css'
import StyledComponentsRegistry from '../lib/registry'
import { Analytics } from '@vercel/analytics/next'

export const metadata = {
  title: 'Arbitrage Inc | Swap Widget',
  description: 'Swap tokens with the best rates using KyberSwap. Powered by Arbitrage Inc.',
  openGraph: {
    title: 'Arbitrage Inc | Swap Widget',
    description: 'Swap tokens with the best rates using KyberSwap. Powered by Arbitrage Inc.',
    type: 'website',
    url: 'https://arbitrage-inc.exchange/',
    siteName: 'Arbitrage Inc',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Arbitrage Inc Swap Widget',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arbitrage Inc | Swap Widget',
    description: 'Swap tokens with the best rates using KyberSwap. Powered by Arbitrage Inc.',
    images: ['/og-image.svg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        <Analytics />
      </body>
    </html>
  )
}
