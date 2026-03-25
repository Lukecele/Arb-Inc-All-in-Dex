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
import theme from '../styles/theme'

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
const FEE_PCM = 10 // 0.1% fee

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
  padding: 40px 20px;
  background: ${theme.colors.background.primary};
  @media (max-width: 768px) {
    padding: 15px;
  }
`

const Header = styled.header`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  flex-wrap: wrap;
  gap: 10px;
  border-bottom: 1px solid ${theme.colors.border.DEFAULT};
`

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const Logo = styled.img`
  width: 40px;
  height: 40px;
  border-radius: ${theme.borderRadius.full};
  box-shadow: ${theme.shadows.glow};
  @media (min-width: 769px) {
    width: 60px;
    height: 60px;
  }
`

const Title = styled.h1`
  font-size: 16px;
  font-weight: 700;
  background: ${theme.colors.primary.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media (min-width: 769px) {
    font-size: 28px;
  }
`

const Nav = styled.nav`
  display: flex;
  gap: 12px;
  background: ${theme.colors.glass.medium};
  padding: 10px 20px;
  border-radius: 50px;
  border: 1px solid ${theme.colors.border.DEFAULT};
  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    gap: 8px;
    padding: 8px 16px;
  }
`

const WalletSection = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`

const ConnectButton = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  background: ${theme.colors.primary.gradient};
  color: #fff;
  border: none;
  border-radius: ${theme.borderRadius.full};
  font-weight: 600;
  transition: ${theme.transitions.fast};
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.glow};
  }
`

const DisconnectButton = styled.button`
  padding: 6px 12px;
  font-size: 12px;
  cursor: pointer;
  background: ${theme.colors.status.error};
  color: white;
  border: none;
  border-radius: ${theme.borderRadius.sm};
`

const NavLink = styled.a`
  color: ${theme.colors.text.secondary};
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  padding: 8px 16px;
  border-radius: 20px;
  transition: ${theme.transitions.fast};
  &:hover {
    color: ${theme.colors.text.primary};
    background: ${theme.colors.glass.heavy};
  }
  @media (max-width: 768px) {
    font-size: 13px;
    padding: 6px 12px;
  }
`

const MainContent = styled.main`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 0;
`

const WidgetWrapper = styled.div`
  width: 100%;
  background: ${theme.colors.glass.light};
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.colors.border.DEFAULT};
  padding: 20px;
  overflow: hidden;
  @media (max-width: 480px) {
    padding: 10px;
  }
`

const WidgetScroller = styled.div<{ $scale?: number }>`
  transform: scale(${props => props.$scale || 1});
  transform-origin: top center;
  width: 100%;
`

const WidgetContainer = styled.div`
  min-height: 500px;
`

const SectionTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
  background: ${theme.colors.primary.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media (min-width: 769px) {
    font-size: 32px;
    margin-bottom: 30px;
  }
`

const Footer = styled.footer`
  width: 100%;
  max-width: 1200px;
  padding: 40px 0;
  text-align: center;
  color: ${theme.colors.text.muted};
  font-size: 14px;
`

const TabButton = styled.button<{ $active?: boolean }>`
  padding: 12px 32px;
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.$active ? '#fff' : theme.colors.text.secondary};
  background: ${props => props.$active ? theme.colors.primary.gradient : theme.colors.glass.medium};
  border: none;
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: ${theme.transitions.fast};
  &:hover {
    background: ${props => props.$active ? theme.colors.primary.gradient : theme.colors.glass.heavy};
  }
`

export default function ZapPageClient() {
  const [{ wallet }, connect, disconnect] = useConnectWallet()
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
            <NavLink href="/swap">Swap (Custom)</NavLink>
            <NavLink href="/swap-all">Swap All</NavLink>
            <NavLink href="/zap" style={{ color: theme.colors.accent.DEFAULT, background: theme.colors.glass.heavy }}>Zap</NavLink>
          </Nav>
          <WalletSection>
            {address ? (
              <>
                <span style={{ fontFamily: 'monospace', fontSize: '12px' }}>
                  {address.slice(0, 6)}...{address.slice(-4)}
                </span>
                <DisconnectButton onClick={() => wallet && disconnect(wallet)}>
                  Disconnect
                </DisconnectButton>
              </>
            ) : (
              <ConnectButton onClick={handleConnectWallet}>
                Connect Wallet
              </ConnectButton>
            )}
          </WalletSection>
        </Header>

        <MainContent>
          <SectionTitle>Liquidity Zap</SectionTitle>
          
          <PoolSelector
            selectedPoolId={selectedPool.id}
            onPoolChange={setSelectedPool}
          />
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '25px' }}>
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
                  marginBottom: '20px',
                  padding: '16px',
                  background: 'rgba(255, 152, 0, 0.1)',
                  border: '1px solid rgba(255, 152, 0, 0.3)',
                  borderRadius: '12px',
                  color: '#FF9901',
                  fontSize: '14px',
                  lineHeight: '1.5',
                }}>
                  <strong>⚠️ Tax Token Notice:</strong> For tax tokens like Arbitrage Inception, select "Degen Mode" in settings with high slippage (5% or more) to ensure successful transactions.
                </div>
                
                <WidgetWrapper>
                  <WidgetScroller $scale={0.8}>
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
                  </WidgetScroller>
                </WidgetWrapper>
              </>
            ) : (
            <WidgetWrapper>
              <WidgetScroller $scale={0.8}>
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
              </WidgetScroller>
            </WidgetWrapper>
          )}

        </MainContent>

        <section style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto', color: '#ffffff', lineHeight: '1.6', fontFamily: 'sans-serif' }}>
          <h2 style={{ color: '#f3ba2f' }}>Simplify Liquidity Provision with Zap Technology</h2>
          <p>
            The <strong>Arbitrage Inception Zap</strong> feature is designed for efficiency and ease of use. Providing liquidity in DeFi usually requires multiple manual steps and multiple transactions. Our <strong>Zap smart contract</strong> bundles these actions into a single-click experience.
          </p>
          <p>
            By using Zap, you can instantly convert a single asset into <strong>Liquidity Provider (LP) tokens</strong> or exit a pool directly back into your preferred currency. This significantly reduces <strong>gas fees</strong> and saves time, making it the perfect tool for active yield farmers and long-term holders looking to strengthen the arbitrage pools.
          </p>
          <h3 style={{ color: '#f3ba2f', fontSize: '1.2rem' }}>Key Benefits of Zap:</h3>
          <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
            <li><strong>One-Click Entry:</strong> Skip the manual 50/50 split of assets.</li>
            <li><strong>Efficiency:</strong> Reduced interaction with the blockchain means lower overall fees.</li>
            <li><strong>Liquidity Depth:</strong> Helps maintain stable arbitrage pairs across the protocol.</li>
          </ul>
        </section>

        <Footer>
          © 2026 Arbitrage Inception. All rights reserved. | Powered by PancakeSwap
        </Footer>
      </Container>
    </>
  )
}