'use client'

import { useState, useEffect, useCallback } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { ChainId, PoolType } from '@kyberswap/liquidity-widgets'
import '@kyberswap/liquidity-widgets/dist/style.css'
import {
  init,
  useConnectWallet,
  useSetChain,
} from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'
import { ethers } from 'ethers'
import { LiquidityWidget } from '@kyberswap/liquidity-widgets'
import ZapOutClient from './ZapOutClient'
import PoolSelector from './PoolSelector'
import DemoModeOverlay from './DemoModeOverlay'
import { pools, pcsV3Pools } from '../pools'
import type { PoolInfo } from '../pools'

const injected = injectedModule()

init({
  wallets: [injected],
  chains: [
    {
      id: '0x38',
      token: 'BNB',
      label: 'BNB Smart Chain',
      rpcUrl: 'https://bsc.publicnode.com',
    },
  ],
})

const BSC_CHAIN_ID = 56
const FEE_RECEIVER = '0xafF5340ECFaf7ce049261cff193f5FED6BDF04E7'
const FEE_PCM = 100

const GlobalStyle = createGlobalStyle`
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: linear-gradient(135deg, #0f0f1a 0%, #1a1a3e 50%, #0f172a 100%);
    color: #FFFFFF;
    min-height: 100vh;
  }
`

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 15px;
  @media (min-width: 769px) {
    padding: 40px 20px;
  }
`

const Header = styled.header`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`

const Logo = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  @media (min-width: 769px) {
    width: 60px;
    height: 60px;
  }
`

const Title = styled.h1`
  font-size: 18px;
  font-weight: 700;
  background: linear-gradient(90deg, #8B5CF6, #EC4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media (min-width: 769px) {
    font-size: 28px;
  }
`

const Nav = styled.nav`
  display: flex;
  gap: 20px;
`

const NavLink = styled.a`
  color: #A9A9A9;
  text-decoration: none;
  font-weight: 500;
  &:hover { color: #8B5CF6; }
`

const MainContent = styled.main`
  flex: 1;
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 20px 0;
  @media (min-width: 769px) {
    gap: 40px;
    padding: 40px 0;
  }
`

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 15px;
  background: linear-gradient(90deg, #8B5CF6, #EC4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media (min-width: 769px) {
    font-size: 36px;
    margin-bottom: 40px;
  }
`

const WidgetContainer = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  padding: 10px;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 350px;
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  & > * {
    min-width: 300px;
    max-width: 100%;
  }
  @media (min-width: 769px) {
    border-radius: 24px;
    padding: 40px;
    min-height: 500px;
  }
`

const Footer = styled.footer`
  width: 100%;
  max-width: 1200px;
  padding: 20px 0;
  text-align: center;
  color: #666;
  font-size: 12px;
  @media (min-width: 769px) {
    padding: 40px 0;
    font-size: 14px;
  }
`

const TabButton = styled.button<{ $active?: boolean }>`
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.$active ? '#000' : '#A9A9A9'};
  background: ${props => props.$active ? 'linear-gradient(90deg, #8B5CF6, #EC4899)' : 'rgba(255, 255, 255, 0.05)'};
  border: none;
  border-radius: 12px;
  cursor: pointer;
  white-space: nowrap;
  &:hover {
    background: ${props => props.$active ? 'linear-gradient(90deg, #8B5CF6, #EC4899)' : 'rgba(255, 255, 255, 0.1)'};
  }
  @media (min-width: 769px) {
    padding: 12px 32px;
    font-size: 16px;
  }
`

export default function ZapPageClient() {
  const [{ wallet }, connect] = useConnectWallet()
  const [, setChain] = useSetChain()
  
  const [address, setAddress] = useState<string | undefined>()
  const [chainId, setChainId] = useState<number>(BSC_CHAIN_ID)
  const [activeTab, setActiveTab] = useState<'zap-in' | 'zap-out'>('zap-in')
  const allPools = [...pools, ...pcsV3Pools]
  const [selectedPool, setSelectedPool] = useState<PoolInfo>(allPools[0])

  useEffect(() => {
    if (wallet?.accounts?.[0]?.address) {
      setAddress(wallet.accounts[0].address)
      setChainId(parseInt(wallet?.chains?.[0]?.id || '0x38', 16))
    } else {
      setAddress(undefined)
    }
  }, [wallet])

  const handleConnectWallet = useCallback(() => {
    connect()
  }, [connect])

  const handleSwitchChain = useCallback(async () => {
    await setChain({ chainId: '0x38' })
  }, [setChain])

  const handleSubmitTx = useCallback(async (txData: any) => {
    if (!wallet) throw new Error('No wallet connected')
    
    const provider = new ethers.providers.Web3Provider(wallet.provider, 'any')
    const signer = provider.getSigner()
    
    const tx = await signer.sendTransaction({
      from: txData.from,
      to: txData.to,
      value: txData.value,
      data: txData.data,
      gasLimit: txData.gasLimit,
    })
    
    return tx.hash
  }, [wallet])

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>
          <LogoSection>
            <Logo src="https://cdn.dexscreener.com/cms/images/3db2502d596330f75db19c4275c3acd833d9f35d370a39ed28933073d75edc7f?width=800&height=800&quality=95&format=auto" alt="Arbitrage Inception" />
            <Title>Arbitrage Inception Zap</Title>
          </LogoSection>
          <Nav>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/swap">Swap</NavLink>
            <NavLink href="/zap">Zap</NavLink>
          </Nav>
        </Header>

        <MainContent>
          <SectionTitle>Liquidity Zap</SectionTitle>
          
          <PoolSelector
            selectedPoolId={selectedPool.id}
            onPoolChange={setSelectedPool}
          />
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '15px', flexWrap: 'wrap' }}>
            <TabButton
              $active={activeTab === 'zap-in'}
              onClick={() => setActiveTab('zap-in')}
            >
              Zap In
            </TabButton>
            <TabButton
              $active={activeTab === 'zap-out'}
              onClick={() => setActiveTab('zap-out')}
            >
              Zap Out
            </TabButton>
          </div>

            {activeTab === 'zap-in' ? (
              <>
                <div style={{
                  maxWidth: '600px',
                  width: '100%',
                  marginBottom: '15px',
                  padding: '10px',
                  background: 'rgba(255, 152, 0, 0.1)',
                  border: '1px solid rgba(255, 152, 0, 0.3)',
                  borderRadius: '8px',
                  color: '#FF9901',
                  fontSize: '11px',
                  lineHeight: '1.4',
                }}>
                  <strong>⚠️ Tax Token Notice:</strong> For tax tokens like Arbitrage Inception, select "Degen Mode" in settings with high slippage (5% or more) to ensure successful transactions.
                </div>
                
                <WidgetContainer style={{ position: 'relative' }}>
                  {address ? (
                    <LiquidityWidget
                      chainId={chainId as ChainId.Bsc}
                      poolType={PoolType.DEX_PANCAKESWAPV2}
                      poolAddress={selectedPool.address}
                      connectedAccount={{ address, chainId }}
                      source="arbitrage-inception"
                      feeConfig={{
                        feePcm: FEE_PCM,
                        feeAddress: FEE_RECEIVER,
                      }}
                      onClose={() => {}}
                      onConnectWallet={handleConnectWallet}
                      onSwitchChain={handleSwitchChain}
                      onSubmitTx={handleSubmitTx}
                    />
                  ) : (
                    <>
                      <LiquidityWidget
                        chainId={chainId as ChainId.Bsc}
                        poolType={PoolType.DEX_PANCAKESWAPV2}
                        poolAddress={selectedPool.address}
                        connectedAccount={{ address: address || '', chainId }}
                        source="arbitrage-inception"
                        feeConfig={{
                          feePcm: FEE_PCM,
                          feeAddress: FEE_RECEIVER,
                        }}
                        onClose={() => {}}
                        onConnectWallet={handleConnectWallet}
                        onSwitchChain={handleSwitchChain}
                        onSubmitTx={handleSubmitTx}
                      />
                      <DemoModeOverlay pool={selectedPool} />
                    </>
                  )}
                </WidgetContainer>
              </>
            ) : (
            <WidgetContainer style={{ padding: '0' }}>
              <ZapOutClient 
                poolAddress={selectedPool.address}
                poolType={selectedPool.poolType}
                token0Address={selectedPool.token0.address}
                token0Symbol={selectedPool.token0.symbol}
                token1Address={selectedPool.token1.address}
                token1Symbol={selectedPool.token1.symbol}
              />
            </WidgetContainer>
          )}

        </MainContent>

        <Footer>
          © 2026 Arbitrage Inception. All rights reserved. | Powered by PancakeSwap
        </Footer>
      </Container>
    </>
  )
}