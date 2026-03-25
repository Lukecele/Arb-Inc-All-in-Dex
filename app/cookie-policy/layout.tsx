import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy | Arbitrage Inception',
  description: 'Cookie Policy for Arbitrage Inception. Learn about the cookies we use and how they help improve your experience on our platform.',
  alternates: {
    canonical: 'https://arbitrage-inc.exchange/cookie-policy',
  },
  openGraph: {
    title: 'Cookie Policy | Arbitrage Inception',
    description: 'Cookie Policy for Arbitrage Inception.',
    url: 'https://arbitrage-inc.exchange/cookie-policy',
    siteName: 'Arbitrage Inception',
  },
}

export default function CookiePolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
