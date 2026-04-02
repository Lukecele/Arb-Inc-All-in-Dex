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
        url: 'https://cdn.dexscreener.com/cms/images/3db2502d596330f75db19c4275c3acd833d9f35d370a39ed28933073d75edc7f?width=800&height=800&quality=95&format=auto',
        width: 800,
        height: 800,
        alt: 'Arbitrage Inception Zap',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zap Liquidity | Add/Remove Liquidity | Arbitrage Inception',
    description: 'Add or remove liquidity from BSC pools with a single click.',
    images: [
      'https://cdn.dexscreener.com/cms/images/3db2502d596330f75db19c4275c3acd833d9f35d370a39ed28933073d75edc7f?width=800&height=800&quality=95&format=auto',
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
