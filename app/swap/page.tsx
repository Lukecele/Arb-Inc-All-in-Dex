'use client'

import {
  init,
  useConnectWallet,
  useSetChain,
} from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'
import walletConnectModule from '@web3-onboard/walletconnect'
import { ethers } from 'ethers'
import { useState, useEffect, Suspense } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import ArbIncSwap from './ArbIncSwap'
import theme from '../styles/theme'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const ARB_INC_ADDRESS = '0x5EE54869Ecd5E752C31aF095187326D4A4D50e1c'

const injected = injectedModule()
const walletConnect = walletConnectModule({
  projectId: 'b03ed6d8451c1e05022897815db0ad0b',
  requiredChains: [56],
  optionalChains: [1, 137, 42161, 8453, 10],
  dappUrl: 'http://localhost:3000',
})

init({
  wallets: [injected, walletConnect],
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

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: ${theme.typography.fontFamily};
    background: ${theme.colors.background.DEFAULT};
    color: #FFFFFF;
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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

const Header = styled.header`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  flex-wrap: wrap;
  gap: 10px;
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(10, 10, 18, 0.75);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid ${theme.colors.border.DEFAULT};
  @media (min-width: 769px) {
    padding: 20px 0;
  }
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
  @media (min-width: 769px) {
    width: 60px;
    height: 60px;
  }
`

const Title = styled.h1`
  font-size: 18px;
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
  gap: 4px;
  background: rgba(255, 255, 255, 0.03);
  padding: 6px 10px;
  border-radius: 100px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  -webkit-backdrop-filter: blur(16px);
  backdrop-filter: blur(16px);
  @media (max-width: 768px) {
    gap: 3px;
    padding: 6px 8px;
    flex-wrap: wrap;
    justify-content: center;
    border-radius: 20px;
  }
`

const NavLink = styled.a`
  color: ${theme.colors.text.secondary};
  text-decoration: none;
  font-weight: 500;
  font-size: 13px;
  padding: 7px 14px;
  border-radius: 100px;
  transition: all ${theme.transitions.fast};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
    transition: left 0.5s ease;
  }
  
  &:hover {
    color: ${theme.colors.text.primary};
    background: rgba(139, 92, 246, 0.12);
    &::before {
      left: 100%;
    }
  }
  @media (max-width: 768px) {
    font-size: 12px;
    padding: 6px 10px;
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
  transition: all ${theme.transitions.fast};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%, rgba(255,255,255,0.05) 100%);
    opacity: 0;
    transition: opacity ${theme.transitions.DEFAULT};
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.glow};
    &::before {
      opacity: 1;
    }
  }
`

const DisconnectButton = styled.button`
  padding: 6px 12px;
  font-size: 12px;
  cursor: pointer;
  background: #EF4444;
  color: white;
  border: none;
  border-radius: 6px;
  transition: all ${theme.transitions.fast};
  
  &:hover {
    background: #DC2626;
    transform: translateY(-1px);
  }
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

const InfoCard = styled.div`
  max-width: 800px;
  width: 100%;
  margin-bottom: 20px;
  padding: 24px;
  background: linear-gradient(135deg, rgba(45, 212, 191, 0.08) 0%, rgba(139, 92, 246, 0.05) 100%);
  border: 1px solid rgba(45, 212, 191, 0.2);
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(45, 212, 191, 0.5), transparent);
  }
`

const InfoCardTitle = styled.h2`
  color: #2DD4BF;
  margin-bottom: 12px;
  font-size: 20px;
  font-weight: 700;
`

const InfoCardText = styled.p`
  font-size: 14px;
  line-height: 1.7;
  margin-bottom: 16px;
  color: ${theme.colors.text.secondary};
`

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 16px 0;
`

const FeatureListItem = styled.li`
  font-size: 13px;
  line-height: 1.8;
  color: ${theme.colors.text.secondary};
  padding-left: 20px;
  position: relative;
  margin-bottom: 4px;
  
  &::before {
    content: '→';
    position: absolute;
    left: 0;
    color: #2DD4BF;
    font-weight: 600;
  }
`

const Footer = styled.footer`
  width: 100%;
  max-width: 1200px;
  padding: 40px 0;
  text-align: center;
  color: ${theme.colors.text.muted};
  font-size: 14px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.3), transparent);
  }
`

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  
  a {
    color: ${theme.colors.text.secondary};
    text-decoration: none;
    font-size: 13px;
    transition: color ${theme.transitions.fast};
    &:hover {
      color: ${theme.colors.accent.DEFAULT};
    }
  }
`

const Disclaimer = styled.div`
  max-width: 600px;
  margin: 0 auto 20px;
  padding: 15px;
  background: rgba(255, 152, 0, 0.06);
  border: 1px solid rgba(255, 152, 0, 0.15);
  border-radius: 10px;
  color: #FFB347;
  font-size: 12px;
  line-height: 1.6;
`

function SwapPageContent() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
  const [, setChain] = useSetChain()

  const [ethersProvider, setEthersProvider] = useState<ethers.providers.Web3Provider | null>(null)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)

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

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header activePage="/swap" />

        <MainContent>
          <InfoCard>
            <InfoCardTitle>Custom Token Swap on BSC</InfoCardTitle>
            <InfoCardText>
              Swap <strong style={{ color: '#fff' }}>ARB Inc</strong> token directly via PancakeSwap V2 Router. Our custom interface handles 
              Fee-on-Transfer (FOT) tokens with 4% tax automatically, ensuring accurate slippage and successful transactions.
            </InfoCardText>
            <FeatureList>
              <FeatureListItem><strong style={{ color: '#fff' }}>BNB ↔ WBNB:</strong> Instant wrap/unwrap with 0.1% dev fee</FeatureListItem>
              <FeatureListItem><strong style={{ color: '#fff' }}>ARB Inc → BNB:</strong> Sell ARB Inc with 4% tax handled automatically</FeatureListItem>
              <FeatureListItem><strong style={{ color: '#fff' }}>BNB → ARB Inc:</strong> Buy ARB Inc with real-time price calculation</FeatureListItem>
              <FeatureListItem><strong style={{ color: '#fff' }}>Direct Routing:</strong> Bypasses aggregators for tax token compatibility</FeatureListItem>
            </FeatureList>
            <p style={{ fontSize: 12, color: theme.colors.text.muted }}>
              For tokens other than ARB Inc, use our <a href="/swap-all" style={{ color: '#2DD4BF', textDecoration: 'underline' }}>Swap All</a> feature with KyberSwap aggregator.
            </p>
          </InfoCard>
          
          <ArbIncSwap
            ethersProvider={ethersProvider}
            walletAddress={walletAddress}
          />
        </MainContent>

        <Footer />
      </Container>
    </>
  )
}

export default function SwapPage() {
  return (
    <Suspense fallback={<div style={{ color: '#fff', textAlign: 'center', padding: '100px' }}>Loading...</div>}>
      <SwapPageContent />
    </Suspense>
  )
}
