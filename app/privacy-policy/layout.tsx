import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Arbitrage Inception',
  description: 'Privacy Policy for Arbitrage Inception. Learn how we collect, use, and protect your data when using our DEX aggregator and liquidity services.',
  alternates: {
    canonical: 'https://arbitrage-inc.exchange/privacy-policy',
  },
  openGraph: {
    title: 'Privacy Policy | Arbitrage Inception',
    description: 'Privacy Policy for Arbitrage Inception DEX aggregator.',
    url: 'https://arbitrage-inc.exchange/privacy-policy',
    siteName: 'Arbitrage Inception',
  },
}

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
