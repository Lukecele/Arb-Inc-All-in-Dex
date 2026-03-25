import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Zap Liquidity BSC | Arbitrage Inception',
  description:
    'Aggiungi o rimuovi liquidità in modo semplice sulla BNB Smart Chain. Zap in/out da pool di liquidità con un singolo click.',
  alternates: {
    canonical: 'https://arbitrage-inc.exchange/zap',
  },
  openGraph: {
    title: 'Zap Liquidity BSC | Arbitrage Inception',
    description:
      'Aggiungi o rimuovi liquidità in modo semplice sulla BNB Smart Chain.',
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
    title: 'Zap Liquidity BSC | Arbitrage Inception',
    description:
      'Aggiungi o rimuovi liquidità in modo semplice sulla BNB Smart Chain.',
    images: [
      'https://cdn.dexscreener.com/cms/images/3db2502d596330f75db19c4275c3acd833d9f35d370a39ed28933073d75edc7f?width=800&height=800&quality=95&format=auto',
    ],
  },
}

export default function ZapLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
