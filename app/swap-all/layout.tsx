import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Swap All Tokens BSC | Arbitrage Inception',
  description:
    'Scambia qualsiasi token sulla BNB Smart Chain. KyberSwap Elastic aggrega liquidità da Uniswap V3, PancakeSwap e altre DEX per le migliori tariffe.',
  alternates: {
    canonical: 'https://arbitrage-inc.exchange/swap-all',
  },
  openGraph: {
    title: 'Swap All Tokens BSC | Arbitrage Inception',
    description:
      'Scambia qualsiasi token sulla BNB Smart Chain con le migliori tariffe.',
    url: 'https://arbitrage-inc.exchange/swap-all',
    siteName: 'Arbitrage Inception',
    images: [
      {
        url: 'https://cdn.dexscreener.com/cms/images/3db2502d596330f75db19c4275c3acd833d9f35d370a39ed28933073d75edc7f?width=800&height=800&quality=95&format=auto',
        width: 800,
        height: 800,
        alt: 'Arbitrage Inception Swap All',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Swap All Tokens BSC | Arbitrage Inception',
    description:
      'Scambia qualsiasi token sulla BNB Smart Chain con le migliori tariffe.',
    images: [
      'https://cdn.dexscreener.com/cms/images/3db2502d596330f75db19c4275c3acd833d9f35d370a39ed28933073d75edc7f?width=800&height=800&quality=95&format=auto',
    ],
  },
}

export default function SwapAllLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
