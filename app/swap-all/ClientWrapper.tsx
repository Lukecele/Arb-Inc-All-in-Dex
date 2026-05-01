'use client'

import dynamic from 'next/dynamic';
// Importiamo il Widget in modo dinamico per evitare errori SSR con Next.js
const Widget = dynamic(() => import('@kyberswap/widgets').then(mod => mod.Widget), { ssr: false, loading: () => <div style={{ height: '400px', width: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', animation: 'pulse 2s infinite' }}>Loading Aggregator...</div> })
import { useConnectWallet, useSetChain, useWallets } from '@web3-onboard/react'
import { ethers } from 'ethers'
import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import styled, { createGlobalStyle } from 'styled-components'
import theme from '../styles/theme'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { FaCopy, FaCheckCircle } from 'react-icons/fa'

const BSC_CHAIN_ID = 56
const FEE_RECEIVER = '0xafF5340ECFaf7ce049261cff193f5FED6BDF04E7'
const FEE_PCM = 10
const ARB_CONTRACT = "0x5ee54869ecd5e752c31af095187326d4a4d50e1c"

const darkTheme = {
  text: '#FFFFFF', subText: '#A9A9A9', primary: '#1C1C1C', dialog: '#313131', secondary: '#0F0F0F', interactive: '#292929', stroke: '#505050', accent: '#28E0B9', success: '#189470', warning: '#FF9901', error: '#FF537B', fontFamily: 'Work Sans', borderRadius: '16px', buttonRadius: '999px', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.04)',
}

const GlobalStyle = createGlobalStyle` * { margin: 0; padding: 0; box-sizing: border-box; } body { font-family: ${theme.typography.fontFamily}; background: linear-gradient(135deg, ${theme.colors.background.primary} 0%, #1a1a3e 50%, ${theme.colors.background.secondary} 100%); color: #FFFFFF; min-height: 100vh; } `

// Aggiunto padding-left: 280px per dare spazio alla sidebar globale
const Container = styled.div` min-height: 100vh; display: flex; flex-direction: column; align-items: center; padding: 40px 20px 40px 280px; background: ${theme.colors.background.primary}; @media (max-width: 1024px) { padding: 40px 20px; } `
const PageHeader = styled.header` width: 100%; max-width: 1200px; display: flex; justify-content: space-between; align-items: center; padding: 15px 0; flex-wrap: wrap; gap: 10px; border-bottom: 1px solid ${theme.colors.border.DEFAULT}; `
const LogoSection = styled.div` display: flex; align-items: center; gap: 12px; `
const Logo = styled.img` width: 40px; height: 40px; border-radius: ${theme.borderRadius.full}; box-shadow: ${theme.shadows.glow}; `
const Title = styled.h1` font-size: 18px; font-weight: 700; background: ${theme.colors.primary.gradient}; -webkit-background-clip: text; -webkit-text-fill-color: transparent; `
const WalletSection = styled.div` display: flex; gap: 10px; align-items: center; `
const ConnectButton = styled.button` padding: 10px 20px; font-size: 14px; cursor: pointer; background: ${theme.colors.primary.gradient}; color: #fff; border: none; border-radius: ${theme.borderRadius.full}; font-weight: 600; transition: ${theme.transitions.fast}; &:hover { transform: translateY(-2px); box-shadow: ${theme.shadows.glow}; } `
const DisconnectButton = styled.button` padding: 6px 12px; font-size: 12px; cursor: pointer; background: #FF537B; color: white; border: none; border-radius: 6px; `
const MainContent = styled.main` flex: 1; width: 100%; display: flex; flex-direction: column; align-items: center; gap: 20px; padding: 20px 0; `

// Allargato a 480px per i numeri
const SwapWrapper = styled.div` width: 100%; max-width: 480px; margin: 0 auto; background: ${theme.colors.glass.light}; border-radius: ${theme.borderRadius.lg}; border: 1px solid ${theme.colors.border.DEFAULT}; padding: 16px; overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: thin; scrollbar-color: rgba(40, 224, 185, 0.3) transparent; @media (max-width: 480px) { padding: 8px; border-radius: 12px; max-width: calc(100vw - 16px); } `
const SwapScroller = styled.div` display: inline-block; width: 480px; transform-origin: top left; @media (max-width: 480px) { width: 480px; transform: scale(0.75); } @media (min-width: 481px) { width: 100%; transform: scale(1); } `
const SwapSection = styled.section` width: 100%; `
const PointsBadge = styled.div` background: rgba(40, 224, 185, 0.1); color: #28E0B9; border: 1px solid rgba(40, 224, 185, 0.3); padding: 10px; border-radius: 12px; font-size: 13px; font-weight: bold; text-align: center; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 0.5px; `

// Box copiabile per ARB INC (Ripristinato)
const ContractBox = styled.div`
  background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(139, 92, 246, 0.3); padding: 10px 15px; border-radius: 10px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; font-size: 13px;
  .addr { font-family: 'Monaco', monospace; color: #a855f7; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin-left: 8px; margin-right: 12px; }
  button { background: none; border: none; color: #94a3b8; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; &:hover { color: white; transform: scale(1.1); } }
`

export default function ClientWrapper() {
  const searchParams = useSearchParams()
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
  const [, setChain] = useSetChain()
  const connectedWallets = useWallets()

  const [ethersProvider, setEthersProvider] = useState<ethers.providers.Web3Provider | null>(null)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  // Disabilitiamo il custom tokenIn/Out che rompeva KyberSwap
  const defaultTokenIn = undefined
  const defaultTokenOut = undefined

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

  const handleSubmitTx = useCallback(async (txData: { from: string; to: string; value: string; data: string; gasLimit: string }): Promise<string> => {
    if (!ethersProvider) throw new Error('No wallet')
    const signer = ethersProvider.getSigner()
    const tx = await signer.sendTransaction(txData)
    if (walletAddress) {
      try {
        const referrer = window.localStorage.getItem('arb_inc_referrer') || '';
        fetch('/api/dex-reward', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userWallet: walletAddress, type: 'swap', referrerWallet: referrer }) })
        .then(() => { alert("🎉 Swap Successful! +100 Points added to your Leaderboard!"); });
      } catch (err) { console.error("Errore salvataggio punti:", err); }
    }
    return tx.hash
  }, [ethersProvider, walletAddress])

  const copyToClipboard = () => { navigator.clipboard.writeText(ARB_CONTRACT); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  // Il pulsante del Global Wallet da passare all'Header
  const globalWalletSection = (
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
  )

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header activePage="/swap-all" walletSection={globalWalletSection} />
        
        <PageHeader>
          <LogoSection>
            <Logo src="/logo.jpg" alt="Arb Inc Logo" />
            <Title>Swap All</Title>
          </LogoSection>
        </PageHeader>

        <MainContent>
          <section style={{ maxWidth: '800px', width: '100%', marginBottom: '20px', padding: '20px', background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '12px' }}>
            <h2 style={{ color: '#8B5CF6', marginBottom: '10px' }}>DEX Aggregator - Best Swap Rates</h2>
            <p style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '15px' }}>
              Swap any token on <strong>BNB Smart Chain</strong> with the best rates through our KyberSwap integration. 
            </p>
          </section>
          
          <SwapWrapper>
            <PointsBadge>🚀 Earn 100 Points & 10% Referral Bonus per swap!</PointsBadge>
            
            <ContractBox>
              <div style={{display: 'flex', alignItems: 'center', overflow: 'hidden'}}>
                <span style={{color: '#a1a1aa', fontWeight: 'bold'}}>ARB Inc:</span>
                <span className="addr">{ARB_CONTRACT}</span>
              </div>
              <button onClick={copyToClipboard} aria-label="Copy Contract Address" title="Copy Contract">
                {copied ? <FaCheckCircle style={{color: '#22c55e', fontSize: '16px'}} /> : <FaCopy style={{fontSize: '16px'}} />}
              </button>
            </ContractBox>

            <SwapScroller>
              <SwapSection>
                <Widget
                  client="arbitrage-inception"
                  theme={darkTheme}
                  width={480}
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
