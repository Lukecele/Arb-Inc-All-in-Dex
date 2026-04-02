'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { FaTelegram, FaTwitter, FaChartLine, FaGlobe } from 'react-icons/fa';
import theme from '../app/styles/theme';

const FooterContainer = styled.footer`
  width: 100%;
  max-width: 1200px;
  padding: 48px 0 32px;
  text-align: center;
  color: ${theme.colors.text.muted};
  font-size: 13px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  margin-top: 48px;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  text-align: left;
  margin-bottom: 40px;
  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const FooterSection = styled.div``;

const FooterSectionTitle = styled.h4`
  font-size: 13px;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

const FooterLink = styled(Link)`
  display: block;
  color: ${theme.colors.text.secondary};
  text-decoration: none;
  font-size: 13px;
  padding: 6px 0;
  transition: ${theme.transitions.fast};
  &:hover {
    color: ${theme.colors.accent.DEFAULT};
  }
`;

const ExternalLink = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${theme.colors.text.secondary};
  text-decoration: none;
  font-size: 13px;
  padding: 6px 0;
  transition: ${theme.transitions.fast};
  &:hover {
    color: ${theme.colors.accent.DEFAULT};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 32px;
  flex-wrap: wrap;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  color: ${theme.colors.text.secondary};
  text-decoration: none;
  font-size: 14px;
  transition: ${theme.transitions.fast};
  &:hover {
    background: rgba(139, 92, 246, 0.08);
    border-color: rgba(139, 92, 246, 0.2);
    color: ${theme.colors.text.primary};
    transform: translateY(-2px);
  }
`;

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
    transition: ${theme.transitions.fast};
    &:hover {
      color: ${theme.colors.accent.DEFAULT};
    }
  }
`;

const Disclaimer = styled.div`
  max-width: 600px;
  margin: 0 auto 20px;
  padding: 14px 16px;
  background: rgba(245, 158, 11, 0.06);
  border: 1px solid rgba(245, 158, 11, 0.15);
  border-radius: 12px;
  color: #f59e0b;
  font-size: 12px;
  line-height: 1.6;
`;

const DEXSCREENER_WATCHLIST_URL = 'https://dexscreener.com/watchlists/arb-inc';

interface FooterProps {
  showDisclaimer?: boolean;
  showSocial?: boolean;
}

export default function Footer({ showDisclaimer = true, showSocial = true }: FooterProps) {
  return (
    <FooterContainer>
      {showSocial && (
        <SocialLinks>
          <SocialLink href="https://t.me/ArbitrageInception" target="_blank" rel="noopener noreferrer" aria-label="Join our Telegram">
            <FaTelegram size={18} /> Telegram
          </SocialLink>
          <SocialLink href="https://x.com/Arbitrageincept" target="_blank" rel="noopener noreferrer" aria-label="Follow us on X">
            <FaTwitter size={18} /> X (Twitter)
          </SocialLink>
          <SocialLink href={DEXSCREENER_WATCHLIST_URL} target="_blank" rel="noopener noreferrer" aria-label="View on DexScreener">
            <FaChartLine size={18} /> DexScreener
          </SocialLink>
          <SocialLink href="https://arbitrage-inc.exchange" aria-label="Visit our website">
            <FaGlobe size={18} /> Website
          </SocialLink>
        </SocialLinks>
      )}

      <FooterGrid>
        <FooterSection>
          <FooterSectionTitle>Protocol</FooterSectionTitle>
          <FooterLink href="/swap">Swap</FooterLink>
          <FooterLink href="/swap-all">Swap All</FooterLink>
          <FooterLink href="/zap">Zap</FooterLink>
          <FooterLink href="/bridge">Bridge</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterSectionTitle>Tools</FooterSectionTitle>
          <FooterLink href="/limit-orders">Limit Orders</FooterLink>
          <FooterLink href="/about">About</FooterLink>
          <FooterLink href="/contact">Contact</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterSectionTitle>Resources</FooterSection>
          <ExternalLink href={DEXSCREENER_WATCHLIST_URL} target="_blank" rel="noopener noreferrer">DexScreener</ExternalLink>
          <ExternalLink href="https://pancakeswap.finance" target="_blank" rel="noopener noreferrer">PancakeSwap</ExternalLink>
          <ExternalLink href="https://kyberswap.com" target="_blank" rel="noopener noreferrer">KyberSwap</ExternalLink>
        </FooterSection>

        <FooterSection>
          <FooterSectionTitle>Legal</FooterSectionTitle>
          <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
          <FooterLink href="/terms-of-service">Terms of Service</FooterLink>
          <FooterLink href="/cookie-policy">Cookie Policy</FooterLink>
        </FooterSection>
      </FooterGrid>

      {showDisclaimer && (
        <Disclaimer>
          <strong>⚠️ Risk Disclaimer:</strong> Cryptocurrency trading involves high risk. Arbitrage Inception provides a frontend interface and is not responsible for any financial losses. Please trade responsibly.
        </Disclaimer>
      )}

      <FooterLinks>
        <Link href="/privacy-policy">Privacy</Link>
        <Link href="/terms-of-service">Terms</Link>
        <Link href="/cookie-policy">Cookies</Link>
        <Link href="/contact">Contact</Link>
      </FooterLinks>

      <p>© {new Date().getFullYear()} Arbitrage Inception. All rights reserved.</p>
    </FooterContainer>
  );
}
