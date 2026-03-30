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
  gap: 12px;
  background: ${theme.colors.glass.medium};
  padding: 10px 20px;
  border-radius: 50px;
  border: 1px solid ${theme.colors.border.DEFAULT};
  @media (max-width: 768px) {
    gap: 8px;
    padding: 8px 16px;
  }
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

const Footer = styled.footer`
  width: 100%;
  max-width: 1200px;
  padding: 40px 0;
  text-align: center;
  color: ${theme.colors.text.muted};
  font-size: 14px;
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
    &:hover {
      color: ${theme.colors.accent.DEFAULT};
    }
  }
`

const Disclaimer = styled.div`
  max-width: 600px;
  margin: 0 auto 20px;
  padding: 15px;
  background: rgba(255, 152, 0, 0.1);
  border: 1px solid rgba(255, 152, 0, 0.3);
  border-radius: 8px;
  color: #FF9901;
  font-size: 12px;
  line-height: 1.5;
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
        <Header>
          <LogoSection>
            <Logo src="https://cdn.dexscreener.com/cms/images/3db2502d596330f75db19c4275c3acd833d9f35d370a39ed28933073d75edc7f?width=800&height=800&quality=95&format=auto" alt="Arbitrage Inception" />
            <Title>Arbitrage Inception</Title>
          </LogoSection>
          <Nav>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/swap" style={{ color: theme.colors.accent.DEFAULT, background: theme.colors.glass.heavy }}>Swap (Custom)</NavLink>
            <NavLink href="/swap-all">Swap All</NavLink>
            <NavLink href="/zap">Zap</NavLink>
            <NavLink href="/bridge">Bridge</NavLink>
            <NavLink href="/limit-orders">Limit Orders</NavLink>
            <NavLink href="/bridge">Bridge</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </Nav>
          <WalletSection>
            {walletAddress ? (
              <>
                <span style={{ fontFamily: 'monospace' }}>
                  {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </span>
                <DisconnectButton onClick={() => wallet && disconnect(wallet)}>
                  Disconnect
                </DisconnectButton>
              </>
            ) : (
              <ConnectButton onClick={() => connect()} disabled={connecting}>
                {connecting ? 'Connecting...' : 'Connect Wallet'}
              </ConnectButton>
            )}
          </WalletSection>
        </Header>

        <MainContent>
          <section style={{ 
            maxWidth: '800px', 
            width: '100%', 
            marginBottom: '20px',
            padding: '20px',
            background: 'rgba(40, 224, 185, 0.1)',
            border: '1px solid rgba(40, 224, 185, 0.3)',
            borderRadius: '12px',
          }}>
            <h2 style={{ color: '#28E0B9', marginBottom: '10px' }}>Custom Token Swap on BSC</h2>
            <p style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '15px' }}>
              Swap <strong>ARB Inc</strong> token directly via PancakeSwap V2 Router. Our custom interface handles 
              Fee-on-Transfer (FOT) tokens with 4% tax automatically, ensuring accurate slippage and successful transactions.
            </p>
            <ul style={{ listStyleType: 'square', paddingLeft: '20px', fontSize: '13px', lineHeight: '1.8' }}>
              <li><strong>BNB ↔ WBNB:</strong> Instant wrap/unwrap with 0.1% dev fee</li>
              <li><strong>ARB Inc → BNB:</strong> Sell ARB Inc with 4% tax handled automatically</li>
              <li><strong>BNB → ARB Inc:</strong> Buy ARB Inc with real-time price calculation</li>
              <li><strong>Direct Routing:</strong> Bypasses aggregators for tax token compatibility</li>
            </ul>
            <p style={{ fontSize: '12px', marginTop: '15px', color: '#A9A9A9' }}>
              For tokens other than ARB Inc, use our <a href="/swap-all" style={{ color: '#28E0B9' }}>Swap All</a> feature with KyberSwap aggregator.
            </p>
          </section>
          
          <ArbIncSwap
            ethersProvider={ethersProvider}
            walletAddress={walletAddress}
          />
        </MainContent>

        <Footer>
          <FooterLinks>
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-of-service">Terms of Service</a>
            <a href="/cookie-policy">Cookie Policy</a>
            <a href="/contact">Contact</a>
          </FooterLinks>
          <Disclaimer>
            <strong>⚠️ Risk Disclaimer:</strong> Cryptocurrency trading involves high risk. Arbitrage Inception provides a frontend interface powered by PancakeSwap V2 Router and is not responsible for any financial losses. Please trade responsibly.
          </Disclaimer>
          <p style={{ marginTop: '10px' }}>© 2026 Arbitrage Inception. All rights reserved.</p>
        </Footer>
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
