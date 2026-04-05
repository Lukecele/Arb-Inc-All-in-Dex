'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const ClientLimitOrdersPage = dynamic(() => import('./ClientWrapper'), { ssr: false })

export default function LimitOrdersPage() {
  return (
    <Suspense fallback={<div style={{ color: '#fff', textAlign: 'center', padding: '100px' }}>Loading Limit Orders...</div>}>
      <ClientLimitOrdersPage />
    </Suspense>
  )
}
