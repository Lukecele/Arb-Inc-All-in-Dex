import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bridge | Cross-Chain Token Swaps | Arbitrage Inception',
  description: 'Bridge tokens across 20+ chains with the best rates. Powered by Mayan Finance for fast, low-cost cross-chain swaps from/to BNB Smart Chain.',
  keywords: ['DeFi', 'Bridge', 'Cross-chain', 'Token Bridge', 'Mayan Finance', 'BSC', 'Arbitrage Inception', 'cross-chain swap', 'multi-chain'],
  alternates: {
    canonical: 'https://arbitrage-inc.exchange/bridge',
  },
  openGraph: {
    title: 'Bridge | Cross-Chain Token Swaps | Arbitrage Inception',
    description: 'Bridge tokens across 20+ chains with the best rates. Powered by Mayan Finance.',
    url: 'https://arbitrage-inc.exchange/bridge',
    siteName: 'Arbitrage Inception',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Arbitrage Inception Bridge - Cross-Chain Swaps',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bridge | Cross-Chain Token Swaps | Arbitrage Inception',
    description: 'Bridge tokens across 20+ chains with the best rates. Powered by Mayan Finance.',
    images: ['/og-image.svg'],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://arbitrage-inc.exchange/' },
    { '@type': 'ListItem', position: 2, name: 'Bridge', item: 'https://arbitrage-inc.exchange/bridge' },
  ],
}

export default function BridgeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {children}
    </>
  )
}
