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
import Header from '../../components/Header'
import Footer from '../../components/Footer'

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

const mapStringToPoolType = (poolTypeString: string): PoolType => {
  switch (poolTypeString) {
    case 'DEX_PANCAKESWAPV2': return PoolType.DEX_PANCAKESWAPV2;
    case 'DEX_PANCAKESWAPV3': return PoolType.DEX_PANCAKESWAPV3;
    case 'DEX_SUSHISWAPV2': return PoolType.DEX_SUSHISWAPV2;
    case 'DEX_SUSHISWAPV3': return PoolType.DEX_SUSHISWAPV3;
    default: return PoolType.DEX_PANCAKESWAPV2;
  }
};

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
  @media (max-width: 768px) { padding: 15px; }
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
  @media (max-width: 480px) { padding: 10px; }
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
  @media (min-width: 769px) { font-size: 32px; margin-bottom: 30px; }
`

const PageTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  margin: 20px 0;
  background: ${theme.colors.primary.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  @media (min-width: 769px) { font-size: 40px; margin: 30px 0; }
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
  &:hover { background: ${props => props.$active ? theme.colors.primary.gradient : theme.colors.glass.heavy}; }
`

// NUOVO: BADGE PUNTI ZAP
const PointsBadge = styled.div`
  background: rgba(255, 153, 0, 0.1);
  color: #FF9900;
  border: 1px solid rgba(255, 153, 0, 0.3);
  padding: 10px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
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

  // --- IL GRILLETTO AGGIORNATO CON TXHASH E ALERT ---
  const handleSubmitTx = useCallback(async (txData: any) => {
    if (!wallet) throw new Error('No wallet connected')
    
    const provider = new ethers.providers.Web3Provider(wallet.provider, 'any')
    const signer = provider.getSigner()
    
    // Invia la transazione ZAP sulla blockchain
    const tx = await signer.sendTransaction({
      from: txData.from,
      to: txData.to,
      value: txData.value,
      data: txData.data,
      gasLimit: txData.gasLimit,
    })
    
    // Spariamo i 150 punti e mostriamo l'alert
    if (address) {
      try {
        const referrer = window.localStorage.getItem('arb_inc_referrer') || '';
        fetch('/api/dex-reward', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userWallet: address,
            type: 'zap', 
            txHash: tx.hash, // Fondamentale per l'anti-cheat
            referrerWallet: referrer
          })
        }).then(() => {
           alert("🎉 Liquidity Zap Successful! +150 Points added to your Leaderboard!");
        });
      } catch (err) {
        console.error("Errore salvataggio punti Zap:", err);
      }
    }

    return tx.hash
  }, [wallet, address])

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header
          activePage="/zap"
          walletSection={
            address ? (
              <>
                <span style={{ fontFamily: 'monospace', fontSize: '12px', marginRight: '10px' }}>
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
            )
          }
        />

        <MainContent>
          <SectionTitle>Liquidity Zap</SectionTitle>
          <PageTitle>Zap</PageTitle>
          
          <section style={{ 
            maxWidth: '800px', 
            width: '100%', 
            marginBottom: '20px',
            padding: '20px',
            background: 'rgba(255, 152, 0, 0.1)',
            border: '1px solid rgba(255, 152, 0, 0.3)',
            borderRadius: '12px',
          }}>
            <h2 style={{ color: '#FF9900', marginBottom: '10px' }}>Add/Remove Liquidity with One Click</h2>
            <p style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '15px' }}>
              Zap in or out of <strong>liquidity pools</strong> on BNB Smart Chain with a single transaction. 
              Our Zap feature supports both <strong>PancakeSwap V2/V3</strong> and <strong>SushiSwap</strong> pools.
            </p>
            <ul style={{ listStyleType: 'square', paddingLeft: '20px', fontSize: '13px', lineHeight: '1.8' }}>
              <li><strong>Zap In:</strong> Add liquidity with any token in one click</li>
              <li><strong>Zap Out:</strong> Remove liquidity and receive single token</li>
              <li><strong>ARB Inc Pools:</strong> Special pools for ARB Inception liquidity</li>
            </ul>
          </section>
          
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
                  <PointsBadge>🏆 Earn 150 Points & 10% Referral Bonus per Zap In!</PointsBadge>
                  <WidgetScroller $scale={0.8}>
                    <WidgetContainer style={{ position: 'relative' }}>
                      {address ? (
                        <LiquidityWidget
                          chainId={chainId as ChainId.Bsc}
                          poolType={mapStringToPoolType(selectedPool.poolType)}
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
                            poolType={mapStringToPoolType(selectedPool.poolType)}
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

        <Footer />
      </Container>
    </>
  )
}
