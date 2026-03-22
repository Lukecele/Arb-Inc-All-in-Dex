'use client'

import styled from 'styled-components'
import { theme } from '../styles/theme'
import type { PoolInfo } from '../pools'

const Overlay = styled.div`
  margin-top: ${theme.spacing.lg};
`

const DemoCard = styled.div`
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(236, 72, 153, 0.15));
  backdrop-filter: blur(10px);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  @media (max-width: 480px) {
    padding: 10px;
  }
`

const DemoTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.text.primary};
  font-weight: ${theme.typography.weights.semibold};
  font-size: ${theme.typography.sizes.sm};
  @media (max-width: 480px) {
    font-size: 10px;
    flex-wrap: wrap;
    gap: 4px;
  }
`

const DemoDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${theme.colors.accent};
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`

const DemoStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.md};
  @media (max-width: 480px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 4px;
  }
`

const DemoStat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  text-align: center;
`

const DemoLabel = styled.span`
  font-size: ${theme.typography.sizes.xs};
  color: ${theme.colors.text.secondary};
`

const DemoValue = styled.span`
  font-size: ${theme.typography.sizes.md};
  color: ${theme.colors.text.primary};
  font-weight: ${theme.typography.weights.semibold};
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
