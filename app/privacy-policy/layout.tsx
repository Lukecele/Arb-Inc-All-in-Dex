import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Arbitrage Inception',
  description: 'Privacy Policy for Arbitrage Inception. Learn how we collect, use, and protect your data when using our DEX aggregator and liquidity services.',
  keywords: ['privacy policy', 'data protection', 'Arbitrage Inception', 'cookies', 'GDPR'],
  alternates: {
    canonical: 'https://arbitrage-inc.exchange/privacy-policy',
  },
  openGraph: {
    title: 'Privacy Policy | Arbitrage Inception',
    description: 'Privacy Policy for Arbitrage Inception DEX aggregator.',
    url: 'https://arbitrage-inc.exchange/privacy-policy',
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
    title: 'Privacy Policy | Arbitrage Inception',
    description: 'Privacy Policy for Arbitrage Inception.',
    images: ['https://arbitrage-inc.exchange/og-image.svg'],
  },
}

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
