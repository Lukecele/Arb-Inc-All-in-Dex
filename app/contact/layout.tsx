import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | Arbitrage Inception',
  description: 'Get in touch with the Arbitrage Inception team. Questions about swaps, liquidity, or the platform? We\'re here to help.',
  keywords: ['contact', 'support', 'Arbitrage Inception', 'help', 'BSC', 'DeFi'],
  alternates: {
    canonical: 'https://arbitrage-inc.exchange/contact',
  },
  openGraph: {
    title: 'Contact Us | Arbitrage Inception',
    description: 'Get in touch with the Arbitrage Inception team.',
    url: 'https://arbitrage-inc.exchange/contact',
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
    title: 'Contact Us | Arbitrage Inception',
    description: 'Get in touch with the Arbitrage Inception team.',
    images: ['https://arbitrage-inc.exchange/og-image.svg'],
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
