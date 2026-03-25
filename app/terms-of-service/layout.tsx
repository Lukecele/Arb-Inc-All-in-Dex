import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | Arbitrage Inception',
  description: 'Terms of Service for Arbitrage Inception. Understand the terms and conditions governing the use of our DEX aggregator, swap, and liquidity services.',
  keywords: ['terms of service', 'terms and conditions', 'Arbitrage Inception', 'legal', 'disclaimer'],
  alternates: {
    canonical: 'https://arbitrage-inc.exchange/terms-of-service',
  },
  openGraph: {
    title: 'Terms of Service | Arbitrage Inception',
    description: 'Terms of Service for Arbitrage Inception.',
    url: 'https://arbitrage-inc.exchange/terms-of-service',
    siteName: 'Arbitrage Inception',
    images: [
      {
        url: 'https://arbitrage-inc.exchange/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Arbitrage Inception',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service | Arbitrage Inception',
    description: 'Terms of Service for Arbitrage Inception.',
    images: ['https://arbitrage-inc.exchange/og-image.svg'],
  },
}

export default function TermsOfServiceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
