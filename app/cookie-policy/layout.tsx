import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy | Arbitrage Inception',
  description: 'Cookie Policy for Arbitrage Inception. Learn about the cookies we use and how they help improve your experience on our platform.',
  keywords: ['cookie policy', 'cookies', 'Arbitrage Inception', 'tracking', 'analytics'],
  alternates: {
    canonical: 'https://arbitrage-inc.exchange/cookie-policy',
  },
  openGraph: {
    title: 'Cookie Policy | Arbitrage Inception',
    description: 'Cookie Policy for Arbitrage Inception.',
    url: 'https://arbitrage-inc.exchange/cookie-policy',
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
    title: 'Cookie Policy | Arbitrage Inception',
    description: 'Cookie Policy for Arbitrage Inception.',
    images: ['https://arbitrage-inc.exchange/og-image.svg'],
  },
}

export default function CookiePolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
