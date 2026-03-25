import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Swap Token BSC | Arbitrage Inception',
  description:
    'Scambia token sulla BNB Smart Chain con le migliori tariffe tramite KyberSwap. Aggregazione multi-DEX, esecuzione ottimizzata, dev fee trasparente.',
  alternates: {
    canonical: 'https://arbitrage-inc.exchange/swap',
  },
  openGraph: {
    title: 'Swap Token BSC | Arbitrage Inception',
    description:
      'Scambia token sulla BNB Smart Chain con le migliori tariffe tramite KyberSwap.',
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
    title: 'Swap Token BSC | Arbitrage Inception',
    description:
      'Scambia token sulla BNB Smart Chain con le migliori tariffe tramite KyberSwap.',
    images: [
      'https://cdn.dexscreener.com/cms/images/3db2502d596330f75db19c4275c3acd833d9f35d370a39ed28933073d75edc7f?width=800&height=800&quality=95&format=auto',
    ],
  },
}

export default function SwapLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
