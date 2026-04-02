'use client'

import dynamic from 'next/dynamic'
import styled, { keyframes } from 'styled-components'

const shimmer = keyframes`
  0% { background-position: -600px 0; }
  100% { background-position: 600px 0; }
`

const SkeletonWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #070715;
  gap: 24px;
  padding: 40px 20px;
`

const SkeletonCard = styled.div`
  width: 100%;
  max-width: 480px;
  height: 520px;
  border-radius: 24px;
  background: linear-gradient(90deg, #0c0c1e 25%, #121228 50%, #0c0c1e 75%);
  background-size: 600px 100%;
  animation: ${shimmer} 1.6s ease-in-out infinite;
  border: 1px solid rgba(124,58,237,0.1);
`

const SkeletonTitle = styled.div`
  width: 200px;
  height: 24px;
  border-radius: 8px;
  background: linear-gradient(90deg, #0c0c1e 25%, #121228 50%, #0c0c1e 75%);
  background-size: 600px 100%;
  animation: ${shimmer} 1.6s ease-in-out infinite;
`

const ZapPageClient = dynamic(() => import('./ZapPageClient'), {
  ssr: false,
  loading: () => (
    <SkeletonWrap>
      <SkeletonTitle />
      <SkeletonCard />
    </SkeletonWrap>
  ),
})

export default function ZapPageWrapper() {
  return <ZapPageClient />
}
