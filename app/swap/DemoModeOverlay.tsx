'use client'

import styled from 'styled-components'
import { theme } from '../styles/theme'

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
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(236, 72, 153, 0.15));
  backdrop-filter: blur(10px);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
`

const DemoTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.text.primary};
  font-weight: ${theme.typography.weights.semibold};
  font-size: ${theme.typography.sizes.sm};
`

const DemoDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${theme.colors.primary};
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`

const DemoStats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing.sm};
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

const MOCK_BALANCES = [
  { token: 'USDT', balance: '1,000.00', value: '$1,000.00' },
  { token: 'WBNB', balance: '0.50', value: '~$185.00' },
  { token: 'CAKE', balance: '25.00', value: '~$37.50' },
  { token: 'Arb Inc', balance: '50,000,000', value: '~$220.00' },
]

export default function DemoModeOverlay() {
  return (
    <Overlay>
      <DemoCard>
        <DemoTitle>
          <DemoDot />
          Demo Mode — Connect wallet to trade
        </DemoTitle>
        <DemoStats>
          {MOCK_BALANCES.map((item) => (
            <DemoStat key={item.token}>
              <DemoLabel>{item.token}</DemoLabel>
              <DemoValue>{item.balance}</DemoValue>
            </DemoStat>
          ))}
        </DemoStats>
      </DemoCard>
    </Overlay>
  )
}
