import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | Arbitrage Inception',
  description: 'Get in touch with the Arbitrage Inception team. Questions about swaps, liquidity, or the platform? We\'re here to help.',
  alternates: {
    canonical: 'https://arbitrage-inc.exchange/contact',
  },
  openGraph: {
    title: 'Contact Us | Arbitrage Inception',
    description: 'Get in touch with the Arbitrage Inception team.',
    url: 'https://arbitrage-inc.exchange/contact',
    siteName: 'Arbitrage Inception',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
