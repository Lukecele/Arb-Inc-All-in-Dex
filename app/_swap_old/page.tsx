'use client'

import dynamic from 'next/dynamic'

// Disabilitiamo il Server Side Rendering per i componenti Web3
const ClientSwapPage = dynamic(() => import('./ClientWrapper'), { ssr: false })

export default function SwapPage() {
  return <ClientSwapPage />
}

