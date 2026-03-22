'use client'

import { Widget } from '@kyberswap/widgets'
import {
  init,
  useConnectWallet,
  useSetChain,
  useWallets,
} from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'
import walletConnectModule from '@web3-onboard/walletconnect'
import { ethers } from 'ethers'
import { useState, useEffect, useCallback } from 'react'
import styled, { createGlobalStyle, keyframes } from 'styled-components'
import DemoModeOverlay from './DemoModeOverlay'
import theme from '../styles/theme'

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
const FEE_RECEIVER = '0xafF5340ECFaf7ce049261cff193f5FED6BDF04E7'
const FEE_PCM = 10 // 0.1% fee
const NATIVE_TOKEN_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'

const customTokens = [
  {
    chainId: 56,
    address: NATIVE_TOKEN_ADDRESS,
    symbol: 'BNB',
    name: 'BNB',
    decimals: 18,
    logoURI: 'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png',
  },
  {
    chainId: 56,
    address: '0x55d398326f99059fF775485246999027B3197955',
    symbol: 'USDT',
    name: 'Tether USD',
    decimals: 18,
    logoURI: 'https://coin.top/production/logo/usdtlogo.png',
  },
  {
    chainId: 56,
    address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
    symbol: 'USDC',
    name: 'USD Coin',
    decimals: 18,
    logoURI: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png',
  },
  {
    chainId: 56,
    address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    symbol: 'WBNB',
    name: 'Wrapped BNB',
    decimals: 18,
    logoURI: 'https://assets.coingecko.com/coins/images/12591/small/binance-coin-logo.png',
  },
  {
    chainId: 56,
    address: '0x5EE54869Ecd5E752C31aF095187326D4A4D50e1c',
    symbol: 'Arb Inc',
    name: 'Arbitrage Inception',
    decimals: 9,
    logoURI: 'https://cdn.dexscreener.com/cms/images/3db2502d596330f75db19c4275c3acd833d9f35d370a39ed28933073d75edc7f?width=800&height=800&quality=95&format=auto',
  },
]

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

// Styled Components
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

const glow = keyframes`
  0% { box-shadow: 0 0 5px #28E0B9, 0 0 10px #28E0B9, 0 0 15px #28E0B9; }
  50% { box-shadow: 0 0 10px #28E0B9, 0 0 20px #28E0B9, 0 0 30px #28E0B9; }
  100% { box-shadow: 0 0 5px #28E0B9, 0 0 10px #28E0B9, 0 0 15px #28E0B9; }
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

const SwapWrapper = styled.div`
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

const SwapScroller = styled.div<{ $scale?: number }>`
  transform: scale(${props => props.$scale || 1});
  transform-origin: top center;
  width: 100%;
`

const SwapSection = styled.section`
  width: 100%;
`

const Footer = styled.footer`
  width: 100%;
  max-width: 1200px;
  padding: 40px 0;
  text-align: center;
  color: ${theme.colors.text.muted};
  font-size: 14px;
`

export default function SwapPage() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
  const [, setChain] = useSetChain()
  const connectedWallets = useWallets()

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
    return tx.hash
  }, [ethersProvider])

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
            <NavLink href="/swap" style={{ color: theme.colors.accent.DEFAULT, background: theme.colors.glass.heavy }}>Swap</NavLink>
            <NavLink href="/zap">Zap</NavLink>
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
          <div style={{
            maxWidth: '400px',
            width: '100%',
            marginBottom: '0px',
            padding: '10px',
            background: 'rgba(255, 152, 0, 0.1)',
            border: '1px solid rgba(255, 152, 0, 0.3)',
            borderRadius: '12px',
            color: '#FF9901',
            fontSize: '12px',
            lineHeight: '1.4',
          }}>
            <strong>⚠️ Tax Token Notice:</strong> For tax tokens like Arbitrage Inception, set slippage to 5% or higher in settings to ensure successful transactions.
          </div>
          <SwapWrapper>
            <SwapScroller $scale={0.75}>
              <SwapSection style={{ position: 'relative' }}>
                <Widget
                  client="arbitrage-inception"
                  theme={darkTheme}
                  tokenList={customTokens}
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
                  title="Swap on BSC"
                />
                {!walletAddress && <DemoModeOverlay />}
              </SwapSection>
            </SwapScroller>
          </SwapWrapper>
        </MainContent>

        <Footer>
          © 2026 Arbitrage Inception. All rights reserved. | Powered by KyberSwap
        </Footer>
      </Container>
    </>
  )
}