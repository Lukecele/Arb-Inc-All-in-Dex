'use client'
import React from 'react'
import styled from 'styled-components'
import { FaGithub, FaTelegramPlane, FaTwitter, FaLinkedin, FaFacebook, FaEnvelope } from 'react-icons/fa'

const FooterContainer = styled.footer`
  width: 100%;
  padding: 3rem 2rem 1.5rem;
  background: #030014;
  border-top: 1px solid rgba(139, 92, 246, 0.1);
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #94a3b8;
`

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  width: 100%;
  max-width: 1000px;
`

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
`

const SocialIcon = styled.a`
  color: #94a3b8;
  font-size: 1.5rem;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);

  &:hover {
    color: #a855f7;
    background: rgba(168, 85, 247, 0.1);
    border-color: rgba(168, 85, 247, 0.3);
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(168, 85, 247, 0.2);
  }
`

const ContactLink = styled.a`
  color: #94a3b8;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: color 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;

  &:hover {
    color: #a855f7;
    background: rgba(255, 255, 255, 0.03);
  }
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
  font-size: 0.85rem;
  
  strong { color: #a855f7; font-weight: 600; }
  
  @media (max-width: 768px) { padding: 1rem; font-size: 0.75rem; }
`

const Copyright = styled.div`
  text-align: center;
  font-size: 0.85rem;
  opacity: 0.7;
`

export default function Footer() {
  return (
    <FooterContainer>
      <TopSection>
        <SocialLinks>
          <SocialIcon href="https://t.me/ArbitrageInception" aria-label="Join our Telegram" target="_blank" rel="noopener noreferrer">
            <FaTelegramPlane />
          </SocialIcon>
          <SocialIcon href="https://x.com/Arbitrageincept" aria-label="Follow us on X" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </SocialIcon>
          <SocialIcon href="#/Arb-Inc-All-in-Dex" aria-label="View Source on GitHub" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </SocialIcon>
          <SocialIcon href="https://www.linkedin.com/in/luca-celebrano-24a289247" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </SocialIcon>
          <SocialIcon href="https://www.facebook.com/luca.celebrano" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FaFacebook />
          </SocialIcon>
        </SocialLinks>
        
        <ContactLink href="https://arbitrage-inc.exchange/contact">
          <FaEnvelope /> Contact Us
        </ContactLink>
      </TopSection>

      <DisclaimerBox>
        <strong>Risk Disclaimer & Terms of Use:</strong> Arbitrage Inception is a decentralized application (dApp) operating as an interface to interact with third-party smart contracts (e.g., KyberSwap, Mayan Finance, PancakeSwap, and Limit Orders protocols). We do not custody your funds, nor do we manage the underlying liquidity pools. Trading digital assets involves significant risk, including the possible loss of all invested funds. Smart contracts may contain vulnerabilities. By using this interface, you acknowledge that you are doing so entirely at your own risk. Arbitrage Inception and its developers assume no liability for any losses, hacks, slippage issues, or network failures. 
        <br /><br />
        <strong>Tax Token Notice:</strong> When trading $ARB INC or other tax tokens, please ensure your slippage is set correctly (e.g., <strong>8%</strong>) to account for tokenomics and prevent transaction failures. Always do your own research (DYOR) before interacting with any decentralized protocol.
      </DisclaimerBox>
      
      <Copyright>
        © {new Date().getFullYear()} Arbitrage Inception. All rights reserved.
      </Copyright>
<p style={{fontSize: "0.7rem", opacity: 0.6, marginTop: "1rem"}}>APR is estimated based on protocol revenue and is not guaranteed. This interface is open-source and decentralized. No IP tracking is performed.</p>
    </FooterContainer>
  )
}
