import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bridge | Arbitrage Inception',
  description: 'Bridge tokens across chains with the best rates. Cross-chain swaps powered by LI.FI with 0.1% dev fee.',
  keywords: ['DeFi', 'Bridge', 'Cross-chain', 'Token Bridge', 'LI.FI', 'BSC', 'Arbitrage Inception'],
  alternates: {
    canonical: 'https://arbitrage-inc.exchange/bridge',
  },
}

export default function BridgeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
