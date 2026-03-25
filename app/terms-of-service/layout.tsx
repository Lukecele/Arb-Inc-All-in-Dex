import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | Arbitrage Inception',
  description: 'Terms of Service for Arbitrage Inception. Understand the terms and conditions governing the use of our DEX aggregator, swap, and liquidity services.',
  alternates: {
    canonical: 'https://arbitrage-inc.exchange/terms-of-service',
  },
  openGraph: {
    title: 'Terms of Service | Arbitrage Inception',
    description: 'Terms of Service for Arbitrage Inception.',
    url: 'https://arbitrage-inc.exchange/terms-of-service',
    siteName: 'Arbitrage Inception',
  },
}

export default function TermsOfServiceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
