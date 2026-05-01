'use client'
import dynamic from 'next/dynamic';
const Widget = dynamic(() => import('@kyberswap/widgets').then(mod => mod.Widget), { ssr: false, loading: () => <div className='h-[400px] w-full animate-pulse bg-gray-800 rounded-xl' /> })
import { useConnectWallet, useSetChain } from '@web3-onboard/react'
import { ethers } from 'ethers'
import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import styled, { createGlobalStyle } from 'styled-components'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const BSC_CHAIN_ID = 56
const ARB_CONTRACT = "0x5ee54869ecd5e752c31af095187326d4a4d50e1c"

const darkTheme = {
  text: '#FFFFFF', subText: '#A9A9A9', primary: '#1C1C1C', dialog: '#313131', secondary: '#0F0F0F', interactive: '#292929', stroke: '#505050', accent: '#28E0B9', success: '#189470', warning: '#FF9901', error: '#FF537B', fontFamily: 'Inter', borderRadius: '16px', buttonRadius: '999px', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.04)'
}

const GlobalStyle = createGlobalStyle` body { background: #030014; margin: 0; } `
const PageLayout = styled.div` padding-left: 260px; padding-top: 40px; display: flex; flex-direction: column; align-items: center; @media (max-width: 1024px) { padding-left: 0; } `;
const SwapBox = styled.div` width: 100%; max-width: 480px; display: flex; flex-direction: column; gap: 15px; `;

export default function ClientWrapper() {
  const searchParams = useSearchParams()
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
  const [, setChain] = useSetChain()
  const [walletAddress, setWalletAddress] = useState<string | null>(null)

  useEffect(() => {
    if (wallet) setWalletAddress(wallet.accounts[0]?.address || null)
    else setWalletAddress(null)
  }, [wallet])

  const handleSubmitTx = useCallback(async (txData: any) => {
    if (!wallet?.provider) throw new Error('No wallet')
    const provider = new ethers.providers.Web3Provider(wallet.provider)
    const tx = await provider.getSigner().sendTransaction(txData)
    return tx.hash
  }, [wallet])

  const walletSection = (
    <button onClick={() => wallet ? disconnect(wallet) : connect()} style={{ background: '#a855f7', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}>
      {wallet ? `Connected: ${walletAddress?.slice(0,6)}...` : 'Connect Wallet'}
    </button>
  )

  return (
    <>
      <GlobalStyle />
      <Header activePage="/swap-all" walletSection={walletSection} />
      <PageLayout>
        <SwapBox>
          <Widget
            client="arbitrage-inception" theme={darkTheme} tokenList={[]}
            defaultTokenIn={searchParams?.get('tokenIn') || undefined}
            defaultTokenOut={searchParams?.get('tokenOut') || undefined}
            rpcUrl="https://bsc-dataseed.binance.org/" chainId={BSC_CHAIN_ID}
            connectedAccount={{ address: walletAddress || '', chainId: BSC_CHAIN_ID }}
            onSubmitTx={handleSubmitTx} onSwitchChain={() => setChain({ chainId: BSC_CHAIN_ID.toString() })}
            enableRoute={true} title="Swap All Tokens"
          />
        </SwapBox>
        <Footer />
      </PageLayout>
    </>
  )
}
