import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Limit Orders | Set Price & Trade Automatically | Arbitrage Inception',
  description: 'Place limit orders on BNB Smart Chain and trade automatically when the market hits your target price. Powered by KyberSwap aggregator.',
  keywords: ['Limit Order', 'BSC', 'DeFi', 'Crypto Trading', 'KyberSwap', 'ARB Inc', 'DEX Aggregator', 'automated trading', 'price target'],
  alternates: {
    canonical: 'https://arbitrage-inc.exchange/limit-orders',
  },
  openGraph: {
    title: 'Limit Orders | Set Price & Trade Automatically | Arbitrage Inception',
    description: 'Place limit orders on BSC and trade automatically when the market hits your target. Powered by KyberSwap.',
    url: 'https://arbitrage-inc.exchange/limit-orders',
    siteName: 'Arbitrage Inception',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Arbitrage Inception Limit Orders',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Limit Orders | Set Price & Trade Automatically | Arbitrage Inception',
    description: 'Place limit orders on BSC and trade automatically when the market hits your target. Powered by KyberSwap.',
    images: ['/og-image.png'],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://arbitrage-inc.exchange/' },
    { '@type': 'ListItem', position: 2, name: 'Limit Orders', item: 'https://arbitrage-inc.exchange/limit-orders' },
  ],
}

export default function LimitOrdersLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {children}
    </>
  )
}
