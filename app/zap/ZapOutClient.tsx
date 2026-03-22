'use client'

import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
`

const Card = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 24px;
  padding: 60px 40px;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`

const Title = styled.h3`
  font-size: 24px;
  color: #FFFFFF;
  margin-bottom: 16px;
`

const Description = styled.p`
  color: #A9A9A9;
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 30px;
`

const LinkButton = styled.a`
  display: inline-block;
  padding: 16px 40px;
  background: linear-gradient(90deg, #8B5CF6, #EC4899);
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 18px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.2s;
  &:hover {
    opacity: 0.9;
  }
`

const Features = styled.ul`
  text-align: left;
  color: #A9A9A9;
  margin: 30px 0;
  padding-left: 20px;
  li {
    margin-bottom: 10px;
    line-height: 1.5;
  }
`

export default function ZapOutClient({ poolAddress, poolType, token0Address, token0Symbol, token1Address, token1Symbol }: {
  poolAddress: string
  poolType: string
  token0Address: string
  token0Symbol: string
  token1Address: string
  token1Symbol: string
}) {
  const pancakeswapUrl = 'https://pancakeswap.finance/liquidity/positions'

  return (
    <Container>
      <Card>
        <Title>Zap Out (Remove Liquidity)</Title>
        <Description>
          View and manage your liquidity positions on PancakeSwap. Select your {token0Symbol}/{token1Symbol} position to remove liquidity.
        </Description>
        
        <Features>
          <li>View all your liquidity positions</li>
          <li>Remove liquidity from any pool</li>
          <li>Direct interaction with PancakeSwap contracts</li>
          <li>Support for all PancakeSwap V2 and V3 pools</li>
        </Features>
        
        <LinkButton 
          href={pancakeswapUrl} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Go to My Positions
        </LinkButton>
        
        <p style={{ marginTop: '20px', color: '#666', fontSize: '14px' }}>
          You will be redirected to PancakeSwap's official interface to manage your liquidity positions
        </p>
      </Card>
    </Container>
  )
}