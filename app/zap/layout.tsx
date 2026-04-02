import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Zap Liquidity | Add/Remove Liquidity | Arbitrage Inception',
  description: 'Add or remove liquidity from BSC pools with a single click. Zap in/out from PancakeSwap and SushiSwap pools easily.',
  keywords: ['zap liquidity', 'add liquidity', 'remove liquidity', 'BSC liquidity', 'PancakeSwap liquidity', 'SushiSwap liquidity', 'yield farming', 'LP tokens'],
  alternates: {
    canonical: 'https://arbitrage-inc.exchange/zap',
  },
  openGraph: {
    title: 'Zap Liquidity | Add/Remove Liquidity | Arbitrage Inception',
    description: 'Add or remove liquidity from BSC pools with a single click.',
    url: 'https://arbitrage-inc.exchange/zap',
    siteName: 'Arbitrage Inception',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Arbitrage Inception Zap',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zap Liquidity | Add/Remove Liquidity | Arbitrage Inception',
    description: 'Add or remove liquidity from BSC pools with a single click.',
    images: [
      '/og-image.png',
    ],
  },
}


const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://arbitrage-inc.exchange/' },
    { '@type': 'ListItem', position: 2, name: 'Zap Liquidity', item: 'https://arbitrage-inc.exchange/zap' },
  ],
}

export default function ZapLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {children}
    </>
  )
}
