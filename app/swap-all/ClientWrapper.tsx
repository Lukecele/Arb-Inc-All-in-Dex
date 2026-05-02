'use client'

import dynamic from 'next/dynamic';
import { useConnectWallet, useWallets } from '@web3-onboard/react'
import { ethers } from 'ethers'
import { useState, useEffect, useCallback, useMemo } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { FaCopy, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa'

const Widget = dynamic(() => import('@kyberswap/widgets').then(mod => mod.Widget), { 
  ssr: false, 
  loading: () => <div style={{ height: '480px', width: '100%', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>Loading Aggregator...</div> 
})

const BSC_CHAIN_ID = 56
const FEE_RECEIVER = '0xafF5340ECFaf7ce049261cff193f5FED6BDF04E7'
const FEE_PCM = 10
const ARB_CONTRACT = "0x5ee54869ecd5e752c31af095187326d4a4d50e1c"

const GlobalStyle = createGlobalStyle`
  body { background-color: #030014; margin: 0; }
  .ks-widget-container::-webkit-scrollbar { width: 4px; }
  .ks-widget-container::-webkit-scrollbar-thumb { background: #a855f7; border-radius: 10px; }
`

const PageWrapper = styled.div`
  min-height: 100vh; padding-left: 260px; background: #030014; color: white;
  @media (max-width: 1024px) { padding-left: 0; padding-top: 60px; }
`
const Container = styled.div`
  max-width: 1200px; margin: 0 auto; padding: 40px 20px; display: flex; flex-direction: column; align-items: center;
`
const SwapWrapper = styled.div`
  width: 100%; max-width: 480px; background: rgba(255, 255, 255, 0.02); border-radius: 24px; border: 1px solid rgba(255, 255, 255, 0.05); padding: 12px;
  @media (max-width: 480px) { padding: 8px; border-radius: 16px; }
`
const PointsBadge = styled.div`
  background: rgba(40, 224, 185, 0.1); color: #28E0B9; border: 1px solid rgba(40, 224, 185, 0.2); padding: 10px; border-radius: 12px; font-size: 13px; font-weight: bold; text-align: center; margin-bottom: 12px; text-transform: uppercase;
`
const WarningBadge = styled.div`
  background: rgba(255, 153, 0, 0.1); color: #FF9900; border: 1px solid rgba(255, 153, 0, 0.3); padding: 12px; border-radius: 12px; font-size: 12px; line-height: 1.5; margin-bottom: 15px; display: flex; align-items: flex-start; gap: 10px;
`
const ContractBox = styled.div`
  background: rgba(0, 0, 0, 0.3); border: 1px solid rgba(168, 85, 247, 0.2); padding: 10px 15px; border-radius: 12px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;
  .addr { font-family: monospace; color: #a855f7; font-size: 12px; }
  button { background: none; border: none; color: #64748b; cursor: pointer; &:hover { color: white; } }
`
const kyberTheme = {
  text: '#FFFFFF', subText: '#A9A9A9', primary: '#1C1C1C', dialog: '#1C1C1C', 
  secondary: '#0F0F0F', interactive: '#292929', stroke: '#333333', 
  accent: '#a855f7', success: '#22c55e', warning: '#facc15', error: '#ef4444',
  fontFamily: 'Inter', borderRadius: '16px', buttonRadius: '12px'
}

export default function ClientWrapper() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
  const [copied, setCopied] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)

  useEffect(() => { setWalletAddress(wallet?.accounts[0]?.address || null) }, [wallet])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(ARB_CONTRACT); setCopied(true); setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmitTx = useCallback(async (txData: any) => {
    if (!wallet) throw new Error('No wallet connected')
    const provider = new ethers.providers.Web3Provider(wallet.provider, 'any')
    const signer = provider.getSigner()
    const tx = await signer.sendTransaction(txData)
    
    const referrer = typeof window !== 'undefined' ? window.localStorage.getItem('arb_inc_referrer') || '' : '';
    fetch('/api/dex-reward', { 
      method: 'POST', headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({ userWallet: walletAddress, type: 'swap', txHash: tx.hash, referrerWallet: referrer }) 
    }).then(() => alert("🎉 Swap Successful! +100 Points added!"));
    return tx.hash
  }, [wallet, walletAddress])

  const walletSection = useMemo(() => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      {wallet ? (
        <>
          <span style={{ fontSize: '12px', color: '#94a3b8', fontFamily: 'monospace' }}>{walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}</span>
          <button onClick={() => disconnect(wallet)} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }}>Disconnect</button>
        </>
      ) : (
        <button onClick={() => connect()} style={{ background: '#a855f7', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>{connecting ? 'Connecting...' : 'Connect Wallet'}</button>
      )}
    </div>
  ), [wallet, walletAddress, connecting, connect, disconnect])

  return (
    <>
      <GlobalStyle />
      <PageWrapper>
        <Header activePage="/swap-all" walletSection={walletSection} />
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '10px' }}>Swap All</h1>
            <p style={{ color: '#94a3b8', maxWidth: '600px' }}>Aggregated liquidity from 100+ DEXes for the best possible rates on BSC.</p>
          </div>

          <SwapWrapper>
            <PointsBadge>🚀 +100 Points per Swap</PointsBadge>
            
            <WarningBadge>
              <FaExclamationTriangle style={{ fontSize: '18px', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>Tax Token Notice:</strong> When swapping Arbitrage Inception (ARB INC), please set your slippage to <strong>8%</strong> to ensure the transaction processes successfully due to tokenomics.
              </div>
            </WarningBadge>

            <ContractBox>
              <span className="addr">ARB Inc: {ARB_CONTRACT.slice(0,10)}...</span>
              <button onClick={copyToClipboard}>
                {copied ? <FaCheckCircle style={{color: '#22c55e'}} /> : <FaCopy />}
              </button>
            </ContractBox>

            <Widget
              client="arbitrage-inception" theme={kyberTheme} width="100%" tokenList={[]} rpcUrl="https://bsc.publicnode.com" chainId={BSC_CHAIN_ID}
              connectedAccount={walletAddress ? { address: walletAddress, chainId: BSC_CHAIN_ID } : undefined}
              onSubmitTx={handleSubmitTx} enableRoute={true}
              feeSetting={{ feeAmount: FEE_PCM, feeReceiver: FEE_RECEIVER, chargeFeeBy: 'currency_out', isInBps: true }}
            />
          </SwapWrapper>
        </Container>
        <Footer />
      </PageWrapper>
    </>
  )
}
