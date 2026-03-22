'use client'

import styled from 'styled-components'
import theme from '../styles/theme'

const Overlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 450px;
  z-index: 10;
  padding: 0 10px;
`

const DemoCard = styled.div`
  background: linear-gradient(to top, rgba(15, 15, 26, 0.98) 0%, rgba(15, 15, 26, 0.95) 100%);
  backdrop-filter: blur(10px);
  border-top: 1px solid ${theme.colors.border.DEFAULT};
  padding: ${theme.spacing[3]} ${theme.spacing[4]};
`

const DemoTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[1]};
  margin-bottom: ${theme.spacing[2]};
  color: ${theme.colors.text.secondary};
  font-size: 11px;
`

const DemoDot = styled.span`
  width: 6px;
  height: 6px;
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
  grid-template-columns: repeat(4, 1fr);
  gap: ${theme.spacing[2]};
`

const DemoStat = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
`

const DemoLabel = styled.span`
  font-size: 10px;
  color: ${theme.colors.text.muted};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const DemoValue = styled.span`
  font-size: ${theme.typography.sizes.xs};
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
