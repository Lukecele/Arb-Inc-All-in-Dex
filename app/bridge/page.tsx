'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const ClientBridgePage = dynamic(() => import('./ClientWrapper'), { ssr: false })

export default function BridgePage() {
  return (
    <Suspense fallback={<div style={{ color: '#fff', textAlign: 'center', padding: '100px' }}>Loading Bridge...</div>}>
      <ClientBridgePage />
    </Suspense>
  )
}
