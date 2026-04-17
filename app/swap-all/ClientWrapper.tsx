'use client'
import { triggerDexReward } from "@/lib/triggerReward";

import { Widget } from '@kyberswap/widgets'
import { useConnectWallet, useSetChain, useWallets } from '@web3-onboard/react'
import { ethers } from 'ethers'
import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import styled, { createGlobalStyle } from 'styled-components'
import theme from '../styles/theme'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const BSC_CHAIN_ID = 56
const FEE_RECEIVER = '0xafF5340ECFaf7ce049261cff193f5FED6BDF04E7'
const FEE_PCM = 10

const darkTheme = {
  text: '#FFFFFF',
  subText: '#A9A9A9',
  primary: '#1C1C1C',
  dialog: '#313131',
  secondary: '#0F0F0F',
  interactive: '#292929',
  stroke: '#505050',
  accent: '#28E0B9',
  success: '#189470',
  warning: '#FF9901',
  error: '#FF537B',
  fontFamily: 'Work Sans',
  borderRadius: '16px',
  buttonRadius: '999px',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.04)',
}

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: ${theme.typography.fontFamily};
    background: linear-gradient(135deg, ${theme.colors.background.primary} 0%, #1a1a3e 50%, ${theme.colors.background.secondary} 100%);
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
  background: ${theme.colors.background.primary};
  @media (min-width: 769px) {
    padding: 40px 20px;
  }
`

const PageHeader = styled.header`
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
  gap: 12px;
`

const Logo = styled.img`
  width: 40px;
  height: 40px;
  border-radius: ${theme.borderRadius.full};
  box-shadow: ${theme.shadows.glow};
`

const Title = styled.h1`
  font-size: 18px;
  font-weight: 700;
  background: ${theme.colors.primary.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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
  background: #FF537B;
  color: white;
  border: none;
  border-radius: 6px;
`

const MainContent = styled.main`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px 0;
`

const SwapWrapper = styled.div`
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  background: ${theme.colors.glass.light};
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.colors.border.DEFAULT};
  padding: 16px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: rgba(40, 224, 185, 0.3) transparent;
  @media (max-width: 480px) {
    padding: 8px;
    border-radius: 12px;
    max-width: calc(100vw - 16px);
  }
`

const SwapScroller = styled.div`
  display: inline-block;
  width: 400px;
  transform-origin: top left;
  @media (max-width: 480px) {
    width: 480px;
    transform: scale(0.75);
  }
  @media (min-width: 481px) {
    width: 100%;
    transform: scale(1);
  }
`

const SwapSection = styled.section`
  width: 100%;
`

export default function ClientWrapper() {
  const searchParams = useSearchParams()
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
  const [, setChain] = useSetChain()
  const connectedWallets = useWallets()

  const [ethersProvider, setEthersProvider] = useState<ethers.providers.Web3Provider | null>(null)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)

  const tokenInParam = searchParams.get('tokenIn')
  const tokenOutParam = searchParams.get('tokenOut')

  const defaultTokenIn = tokenInParam || undefined
  const defaultTokenOut = tokenOutParam || undefined

  useEffect(() => {
    if (wallet && wallet.provider) {
      const provider = new ethers.providers.Web3Provider(wallet.provider, 'any')
      setEthersProvider(provider)
      setWalletAddress(wallet.accounts[0]?.address || null)
    } else {
      setEthersProvider(null)
      setWalletAddress(null)
    }
  }, [wallet])

  useEffect(() => {
    if (!connectedWallets.length) return
    const connectedWalletsLabelArray = connectedWallets.map(({ label }) => label)
    window.localStorage.setItem('connectedWallets', JSON.stringify(connectedWalletsLabelArray))
  }, [connectedWallets, wallet])

  useEffect(() => {
    const previouslyConnectedWallets = JSON.parse(window.localStorage.getItem('connectedWallets') || '[]')
    async function setWalletFromLocalStorage() {
      if (previouslyConnectedWallets?.length && !wallet) {
        await connect({ autoSelect: previouslyConnectedWallets[0] })
      }
    }
    if (previouslyConnectedWallets?.length) {
      setWalletFromLocalStorage()
    }
  }, [connect, wallet])

  const handleSwitchChain = useCallback(() => {
    if (wallet) {
      setChain({ chainId: BSC_CHAIN_ID.toString() })
    }
  }, [wallet, setChain])

  const handleSubmitTx = useCallback(async (txData: {
    from: string
    to: string
    value: string
    data: string
    gasLimit: string
  }): Promise<string> => {
    if (!ethersProvider) throw new Error('No wallet')
    const signer = ethersProvider.getSigner()
    const tx = await signer.sendTransaction(txData)
        triggerDexReward(walletAddress || undefined, "swap", tx.hash);
    return tx.hash
  }, [ethersProvider])

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header activePage="/swap-all" />
        
        <PageHeader>
          <LogoSection>
            <Logo src="/logo.jpg" alt="Arb Inc Logo" />
            <Title>Swap All</Title>
          </LogoSection>
          
          <WalletSection>
            {wallet ? (
              <DisconnectButton onClick={() => disconnect(wallet)}>
                Disconnect {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
              </DisconnectButton>
            ) : (
              <ConnectButton onClick={() => connect()} disabled={connecting}>
                {connecting ? 'Connecting...' : 'Connect Wallet'}
              </ConnectButton>
            )}
          </WalletSection>
        </PageHeader>

        <MainContent>
          <section style={{ 
            maxWidth: '800px', 
            width: '100%', 
            marginBottom: '20px',
            padding: '20px',
            background: 'rgba(139, 92, 246, 0.1)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            borderRadius: '12px',
          }}>
            <h2 style={{ color: '#8B5CF6', marginBottom: '10px' }}>DEX Aggregator - Best Swap Rates</h2>
            <p style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '15px' }}>
              Swap any token on <strong>BNB Smart Chain</strong> with the best rates through our KyberSwap integration. 
            </p>
          </section>
          
          <SwapWrapper>
            <SwapScroller>
              <SwapSection>
                <Widget
                  client="arbitrage-inception"
                  theme={darkTheme}
                  tokenList={[]}
                  defaultTokenIn={defaultTokenIn}
                  defaultTokenOut={defaultTokenOut}
                  rpcUrl="https://bsc.publicnode.com"
                  chainId={BSC_CHAIN_ID}
                  connectedAccount={{
                    address: walletAddress || '',
                    chainId: BSC_CHAIN_ID,
                  }}
                  onSubmitTx={handleSubmitTx}
                  onSwitchChain={handleSwitchChain}
                  enableRoute={true}
                  feeSetting={{
                    feeAmount: FEE_PCM,
                    feeReceiver: FEE_RECEIVER,
                    chargeFeeBy: 'currency_out',
                    isInBps: true,
                  }}
                  title="Swap All Tokens"
                />
              </SwapSection>
            </SwapScroller>
          </SwapWrapper>
        </MainContent>

        <Footer />
      </Container>
    </>
  )
}
