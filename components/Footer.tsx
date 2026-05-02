'use client'
import React from 'react'
import styled from 'styled-components'

const FooterContainer = styled.footer`
  width: 100%;
  padding: 3rem 2rem 1rem;
  background: #030014;
  border-top: 1px solid rgba(139, 92, 246, 0.1);
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #94a3b8;
  font-size: 0.85rem;
`

const DisclaimerBox = styled.div`
  max-width: 1000px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  line-height: 1.6;
  text-align: justify;
  
  strong { color: #a855f7; font-weight: 600; }
  
  @media (max-width: 768px) { padding: 1rem; font-size: 0.75rem; }
`

const Copyright = styled.div`
  text-align: center;
  margin-top: 1rem;
  opacity: 0.7;
`

export default function Footer() {
  return (
    <FooterContainer>
      <DisclaimerBox>
        <strong>Risk Disclaimer & Terms of Use:</strong> Arbitrage Inception is a decentralized application (dApp) operating as an interface to interact with third-party smart contracts (e.g., KyberSwap, Mayan Finance, PancakeSwap, and <strong>Limit Orders protocols</strong>). We do not custody your funds, nor do we manage the underlying liquidity pools. Trading digital assets involves significant risk, including the possible loss of all invested funds. Smart contracts may contain vulnerabilities. By using this interface, you acknowledge that you are doing so entirely at your own risk. Arbitrage Inception and its developers assume no liability for any losses, hacks, slippage issues, or network failures. 
        <br /><br />
        <strong>Tax Token Notice:</strong> When trading $ARB INC or other tax tokens, please ensure your slippage is set correctly (e.g., <strong>8%</strong>) to account for tokenomics and prevent transaction failures. Always do your own research (DYOR) before interacting with any decentralized protocol.
      </DisclaimerBox>
      
      <Copyright>
        © {new Date().getFullYear()} Arbitrage Inception. All rights reserved.
      </Copyright>
    </FooterContainer>
  )
}
