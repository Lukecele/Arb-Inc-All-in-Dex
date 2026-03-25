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
import { useState, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import styled, { createGlobalStyle, keyframes } from 'styled-components'
import DemoModeOverlay from './DemoModeOverlay'
import theme from '../styles/theme'

const WBNB_ADDRESS = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'
const WBNB_ABI = [
  'function deposit() payable',
  'function withdraw(uint256 wad)',
  'function balanceOf(address) view returns (uint256)',
]
const NATIVE_TOKEN_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'

const ARB_INC_ADDRESS = '0x5EE54869Ecd5E752C31aF095187326D4A4D50e1c'
const USDT_ADDRESS = '0x55d398326f99059fF775485246999027B3197955'

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

const customTokens = [
  {
    chainId: 56,
    address: '0x5EE54869Ecd5E752C31aF095187326D4A4D50e1c',
    symbol: 'Arb Inc',
    name: 'Arbitrage Inception',
    decimals: 9,
    logoURI: 'https://cdn.dexscreener.com/cms/images/3db2502d596330f75db19c4275c3acd833d9f35d370a39ed28933073d75edc7f?width=800&height=800&quality=95&format=auto',
  },
  {
    chainId: 56,
    address: '0x55d398326f99059fF775485246999027B3197955',
    symbol: 'USDT',
    name: 'Tether USD',
    decimals: 18,
    logoURI: 'https://tokens.icons.1001.org/0x55d398326f99059ff775485246999027b3197955.png',
  },
  {
    chainId: 56,
    address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
    symbol: 'USDC',
    name: 'USD Coin',
    decimals: 18,
    logoURI: 'https://tokens.icons.1001.org/0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d.png',
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

const SwapScroller = styled.div<{ $scale?: number }>`
  display: inline-block;
  width: 400px;
  transform-origin: top left;
  @media (max-width: 480px) {
    width: 480px;
    transform: scale(0.75);
  }
  @media (min-width: 481px) {
    width: 100%;
    transform: scale(${props => props.$scale || 1});
  }
`

const SwapSection = styled.section`
  width: 100%;
`

const WrapUnwrapSection = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
`

const WrapUnwrapButton = styled.button<{ $variant: 'wrap' | 'unwrap' }>`
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  border-radius: 12px;
  transition: all 0.2s ease;
  background: ${props => props.$variant === 'wrap' 
    ? 'linear-gradient(135deg, #28E0B9 0%, #189470 100%)' 
    : 'linear-gradient(135deg, #FF9901 0%, #cc7a00 100%)'};
  color: #fff;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`

const WrapUnwrapInput = styled.input`
  width: 120px;
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid ${theme.colors.border.DEFAULT};
  border-radius: 8px;
  background: ${theme.colors.glass.medium};
  color: #fff;
  text-align: center;
  &::placeholder {
    color: ${theme.colors.text.muted};
  }
`

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 15px;
  flex-wrap: wrap;

  a {
    color: ${theme.colors.accent.DEFAULT};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
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

const Transparency = styled.p`
  margin-top: 15px;
  font-size: 12px;
  color: #888;
`

function getTokenAddress(symbol: string | null): string | undefined {
  if (!symbol) return undefined
  const s = symbol.toUpperCase()
  if (s === 'BNB') return NATIVE_TOKEN_ADDRESS
  if (s === 'WBNB') return WBNB_ADDRESS
  if (s === 'USDT') return USDT_ADDRESS
  if (s === 'ARBINc') return ARB_INC_ADDRESS
  if (s === 'ARBITRAGE INC' || s === 'ARBITRAGEINCEPTION') return ARB_INC_ADDRESS
  return undefined
}

function SwapPageContent() {
  const searchParams = useSearchParams()
  const tokenInParam = searchParams.get('tokenIn')
  const tokenOutParam = searchParams.get('tokenOut')
  
  const defaultTokenIn = getTokenAddress(tokenInParam) || USDT_ADDRESS
  const defaultTokenOut = getTokenAddress(tokenOutParam) || ARB_INC_ADDRESS
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
  const [, setChain] = useSetChain()
  const connectedWallets = useWallets()

  const [ethersProvider, setEthersProvider] = useState<ethers.providers.Web3Provider | null>(null)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [wrapAmount, setWrapAmount] = useState('')
  const [unwrapAmount, setUnwrapAmount] = useState('')
  const [wrapLoading, setWrapLoading] = useState(false)
  const [unwrapLoading, setUnwrapLoading] = useState(false)

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

  const handleWrap = useCallback(async () => {
    if (!ethersProvider || !walletAddress || !wrapAmount) return
    setWrapLoading(true)
    try {
      const wbnb = new ethers.Contract(WBNB_ADDRESS, WBNB_ABI, ethersProvider.getSigner())
      const value = ethers.utils.parseEther(wrapAmount)
      const tx = await wbnb.deposit({ value })
      await tx.wait()
      setWrapAmount('')
      alert(`Successfully wrapped ${wrapAmount} BNB to WBNB!`)
    } catch (err: any) {
      alert(`Wrap failed: ${err.message}`)
    } finally {
      setWrapLoading(false)
    }
  }, [ethersProvider, walletAddress, wrapAmount])

  const handleUnwrap = useCallback(async () => {
    if (!ethersProvider || !walletAddress || !unwrapAmount) return
    setUnwrapLoading(true)
    try {
      const wbnb = new ethers.Contract(WBNB_ADDRESS, WBNB_ABI, ethersProvider.getSigner())
      const value = ethers.utils.parseEther(unwrapAmount)
      const tx = await wbnb.withdraw(value)
      await tx.wait()
      setUnwrapAmount('')
      alert(`Successfully unwrapped ${unwrapAmount} WBNB to BNB!`)
    } catch (err: any) {
      alert(`Unwrap failed: ${err.message}`)
    } finally {
      setUnwrapLoading(false)
    }
  }, [ethersProvider, walletAddress, unwrapAmount])

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
          
          {walletAddress && (
            <WrapUnwrapSection>
              <WrapUnwrapInput
                type="text"
                placeholder="Amount BNB"
                value={wrapAmount}
                onChange={e => setWrapAmount(e.target.value)}
              />
              <WrapUnwrapButton 
                $variant="wrap" 
                onClick={handleWrap}
                disabled={wrapLoading || !wrapAmount}
              >
                {wrapLoading ? 'Wrapping...' : 'Wrap BNB → WBNB'}
              </WrapUnwrapButton>
              <WrapUnwrapInput
                type="text"
                placeholder="Amount WBNB"
                value={unwrapAmount}
                onChange={e => setUnwrapAmount(e.target.value)}
              />
              <WrapUnwrapButton 
                $variant="unwrap" 
                onClick={handleUnwrap}
                disabled={unwrapLoading || !unwrapAmount}
              >
                {unwrapLoading ? 'Unwrapping...' : 'Unwrap WBNB → BNB'}
              </WrapUnwrapButton>
            </WrapUnwrapSection>
          )}
          
          <SwapWrapper>
            <SwapScroller>
              <SwapSection style={{ position: 'relative' }}>
                 <Widget
                   client="arbitrage-inception"
                   theme={darkTheme}
                   tokenList={customTokens}
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
                   title="Swap on BSC"
                 />
                {!walletAddress && <DemoModeOverlay />}
              </SwapSection>
            </SwapScroller>
          </SwapWrapper>
        </MainContent>

        <section style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto', color: '#ffffff', lineHeight: '1.6', fontFamily: 'sans-serif' }}>
          <h2 style={{ color: '#f3ba2f' }}>Advanced Token Swap Protocol on BNB Smart Chain</h2>
          <p>
            The <strong>Arbitrage Inception Swap</strong> interface provides a seamless gateway to the decentralized finance (DeFi) ecosystem on the <strong>BNB Smart Chain (BSC)</strong>. By leveraging deep liquidity pools and optimized routing, our swap mechanism ensures users receive the best possible rates with minimal slippage.
          </p>
          <p>
            Every transaction executed through this widget contributes to the <strong>Arbitrage Inception ecosystem</strong>. A portion of the volume is strategically used to strengthen liquidity and generate <strong>consistent BNB rewards</strong> for token holders. Whether you are trading $ARBINc or other BEP-20 tokens, our platform prioritizes security, speed, and low gas fees.
          </p>
          <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
            <li><strong>Optimized Routing:</strong> Integrated with PancakeSwap and major DEX aggregators.</li>
            <li><strong>Reward Driven:</strong> Volume-based rewards distributed automatically to holders.</li>
            <li><strong>Transparent Execution:</strong> All swaps are verifiable on-chain via BscScan.</li>
          </ul>
        </section>

        <Footer>
          <FooterLinks>
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-of-service">Terms of Service</a>
            <a href="/cookie-policy">Cookie Policy</a>
            <a href="/contact">Contact</a>
          </FooterLinks>
          <Disclaimer>
            <strong>⚠️ Risk Disclaimer:</strong> Cryptocurrency trading involves high risk. Arbitrage Inception provides a frontend interface powered by KyberSwap Protocol and is not responsible for any financial losses. Please trade responsibly.
          </Disclaimer>
          <Transparency>
            Powered by KyberSwap Protocol. Arbitrage Inception provides a customized interface to access decentralized liquidity pools on the BNB Smart Chain.
          </Transparency>
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