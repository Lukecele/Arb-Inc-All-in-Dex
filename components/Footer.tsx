'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { FaTelegram, FaTwitter, FaChartLine, FaGlobe } from 'react-icons/fa';
import theme from '../app/styles/theme';

const FooterContainer = styled.footer`
  width: 100%;
  max-width: 1200px;
  padding: 56px 0 36px;
  text-align: center;
  color: ${theme.colors.text.muted};
  font-size: 13px;
  margin-top: 64px;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(124,58,237,0.5), rgba(236,72,153,0.4), rgba(6,182,212,0.3), transparent);
  }
`;

const FooterBrand = styled.div`
  margin-bottom: 40px;
`;

const FooterBrandTitle = styled.div`
  font-size: 20px;
  font-weight: 800;
  background: ${theme.colors.primary.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.02em;
  margin-bottom: 8px;
`;

const FooterBrandTagline = styled.div`
  font-size: 13px;
  color: ${theme.colors.text.muted};
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  text-align: left;
  margin-bottom: 48px;
  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const FooterSection = styled.div``;

const FooterSectionTitle = styled.h4`
  font-size: 12px;
  font-weight: 700;
  color: ${theme.colors.text.accent};
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const FooterLink = styled(Link)`
  display: block;
  color: ${theme.colors.text.secondary};
  text-decoration: none;
  font-size: 13px;
  padding: 5px 0;
  transition: ${theme.transitions.fast};
  &:hover {
    color: ${theme.colors.text.primary};
    padding-left: 4px;
  }
`;

const ExternalLink = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${theme.colors.text.secondary};
  text-decoration: none;
  font-size: 13px;
  padding: 5px 0;
  transition: ${theme.transitions.fast};
  &:hover {
    color: ${theme.colors.text.primary};
    padding-left: 4px;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 48px;
  flex-wrap: wrap;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: ${theme.colors.glass.light};
  border: 1px solid ${theme.colors.border.DEFAULT};
  border-radius: 14px;
  color: ${theme.colors.text.secondary};
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
  transition: ${theme.transitions.DEFAULT};
  &:hover {
    background: linear-gradient(135deg, rgba(124,58,237,0.12), rgba(236,72,153,0.08));
    border-color: rgba(124,58,237,0.35);
    color: ${theme.colors.text.primary};
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(124,58,237,0.15);
  }
`;

const Divider = styled.div`
  height: 1px;
  background: ${theme.colors.border.DEFAULT};
  margin-bottom: 28px;
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  a {
    color: ${theme.colors.text.muted};
    text-decoration: none;
    font-size: 12px;
    transition: ${theme.transitions.fast};
    &:hover { color: ${theme.colors.text.secondary}; }
  }
`;

const Disclaimer = styled.div`
  max-width: 600px;
  margin: 0 auto 24px;
  padding: 14px 18px;
  background: rgba(245, 158, 11, 0.05);
  border: 1px solid rgba(245, 158, 11, 0.15);
  border-radius: 12px;
  color: rgba(245, 158, 11, 0.85);
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
      <FooterBrand>
        <FooterBrandTitle>Arbitrage Inception</FooterBrandTitle>
        <FooterBrandTagline>All-in-One DeFi Aggregator on BNB Smart Chain</FooterBrandTagline>
      </FooterBrand>

      {showSocial && (
        <SocialLinks>
          <SocialLink href="https://t.me/ArbitrageInception" target="_blank" rel="noopener noreferrer">
            <FaTelegram size={16} /> Telegram
          </SocialLink>
          <SocialLink href="https://x.com/Arbitrageincept" target="_blank" rel="noopener noreferrer">
            <FaTwitter size={16} /> X (Twitter)
          </SocialLink>
          <SocialLink href={DEXSCREENER_WATCHLIST_URL} target="_blank" rel="noopener noreferrer">
            <FaChartLine size={16} /> DexScreener
          </SocialLink>
          <SocialLink href="https://arbitrage-inc.exchange">
            <FaGlobe size={16} /> Website
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
          <FooterSectionTitle>Resources</FooterSectionTitle>
          <ExternalLink href="https://pancakeswap.finance" target="_blank" rel="noopener noreferrer">PancakeSwap</ExternalLink>
          <ExternalLink href="https://kyberswap.com" target="_blank" rel="noopener noreferrer">KyberSwap</ExternalLink>
          <ExternalLink href="https://docs.arbitrage-inc.exchange" target="_blank" rel="noopener noreferrer">Documentation</ExternalLink>
        </FooterSection>
        <FooterSection>
          <FooterSectionTitle>Legal</FooterSectionTitle>
          <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
          <FooterLink href="/terms-of-service">Terms of Service</FooterLink>
          <FooterLink href="/cookie-policy">Cookie Policy</FooterLink>
        </FooterSection>
      </FooterGrid>

      <Divider />

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

      <p style={{ fontSize: '12px', color: '#334155' }}>
        © {new Date().getFullYear()} Arbitrage Inception. All rights reserved.
      </p>
    </FooterContainer>
  );
}
