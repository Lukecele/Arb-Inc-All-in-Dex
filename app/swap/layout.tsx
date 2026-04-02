import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Swap ARB Inc | Custom Token Swap | Arbitrage Inception',
  description: 'Swap ARB Inc and BNB directly via PancakeSwap V2. Supports wrap/unwrap BNB-WBNB with 0.1% dev fee. Fast, secure, tax-token optimized.',
  keywords: ['ARB Inc swap', 'BNB swap', 'WBNB wrap', 'PancakeSwap', 'tax token swap', 'BSC swap', 'custom swap'],
  alternates: {
    canonical: 'https://arbitrage-inc.exchange/swap',
  },
  openGraph: {
    title: 'Swap ARB Inc | Custom Token Swap | Arbitrage Inception',
    description: 'Swap ARB Inc and BNB directly via PancakeSwap V2.',
    url: 'https://arbitrage-inc.exchange/swap',
    siteName: 'Arbitrage Inception',
    images: [
      {
        url: 'https://cdn.dexscreener.com/cms/images/3db2502d596330f75db19c4275c3acd833d9f35d370a39ed28933073d75edc7f?width=800&height=800&quality=95&format=auto',
        width: 800,
        height: 800,
        alt: 'Arbitrage Inception Swap',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Swap ARB Inc | Custom Token Swap | Arbitrage Inception',
    description: 'Swap ARB Inc and BNB directly via PancakeSwap V2.',
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
    { '@type': 'ListItem', position: 2, name: 'Swap', item: 'https://arbitrage-inc.exchange/swap' },
  ],
}

export default function SwapLayout({
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
