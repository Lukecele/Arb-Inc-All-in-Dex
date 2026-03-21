'use client'

import dynamic from 'next/dynamic'

const ZapPageClient = dynamic(() => import('./ZapPageClient'), {
  ssr: false,
  loading: () => (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a3e 50%, #0f172a 100%)',
      color: '#fff',
      fontSize: '18px',
    }}>
      Loading Zap Interface...
    </div>
  ),
})

export default function ZapPageWrapper() {
  return <ZapPageClient />
}
