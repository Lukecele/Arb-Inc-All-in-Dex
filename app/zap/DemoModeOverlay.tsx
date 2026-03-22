'use client'

import styled from 'styled-components'
import theme from '../styles/theme'
import type { PoolInfo } from '../pools'

const Overlay = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 40px);
  max-width: 500px;
  z-index: 10;
`

const DemoCard = styled.div`
  background: ${theme.colors.glass.medium};
  backdrop-filter: blur(20px);
  border: 1px solid ${theme.colors.border.DEFAULT};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing[4]};
`

const DemoTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
  margin-bottom: ${theme.spacing[4]};
  color: ${theme.colors.text.primary};
  font-weight: ${theme.typography.weights.semibold};
  font-size: ${theme.typography.sizes.sm};
`

const DemoDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${theme.colors.primary.DEFAULT};
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`

const DemoStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing[4]};
  @media (max-width: 480px) {
    grid-template-columns: repeat(3, 1fr);
    gap: ${theme.spacing[2]};
  }
`

const DemoStat = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

const DemoLabel = styled.span`
  font-size: ${theme.typography.sizes.xs};
  color: ${theme.colors.text.secondary};
`

const DemoValue = styled.span`
  font-size: ${theme.typography.sizes.sm};
  color: ${theme.colors.text.primary};
  font-weight: ${theme.typography.weights.medium};
`

interface DemoModeOverlayProps {
  pool: PoolInfo
}

export default function DemoModeOverlay({ pool }: DemoModeOverlayProps) {
  return (
    <Overlay>
      <DemoCard>
        <DemoTitle>
          <DemoDot />
          Demo Mode — Connect wallet to interact
        </DemoTitle>
        <DemoStats>
          <DemoStat>
            <DemoLabel>TVL</DemoLabel>
            <DemoValue>${pool.liquidityUSD.toLocaleString()}</DemoValue>
          </DemoStat>
          <DemoStat>
            <DemoLabel>APR</DemoLabel>
            <DemoValue style={{ color: theme.colors.status.success }}>
              {pool.apr || 'N/A'}
            </DemoValue>
          </DemoStat>
          <DemoStat>
            <DemoLabel>DEX</DemoLabel>
            <DemoValue>{pool.dex}</DemoValue>
          </DemoStat>
        </DemoStats>
      </DemoCard>
    </Overlay>
  )
}
