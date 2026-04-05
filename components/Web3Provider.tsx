'use client'

import { init } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'
import walletConnectModule from '@web3-onboard/walletconnect'

const injected = injectedModule()
const walletConnect = walletConnectModule({
  projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID || 'b03ed6d8451c1e05022897815db0ad0b',
  requiredChains: [56],
  optionalChains: [1, 137, 42161, 8453, 10],
  dappUrl: process.env.NEXT_PUBLIC_DAPP_URL || 'https://arbitrage-inc.exchange'
})

init({
  wallets: [injected, walletConnect],
  chains: [
    {
      id: '0x38',
      token: 'BNB',
      label: 'BNB Smart Chain',
      rpcUrl: 'https://bsc.publicnode.com',
    },
  ],
  appMetadata: {
    name: 'Arbitrage Inception',
    icon: 'https://arbitrage-inc.exchange/logo.png',
    description: 'DEX Aggregator on BNB Chain',
  }
})

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
