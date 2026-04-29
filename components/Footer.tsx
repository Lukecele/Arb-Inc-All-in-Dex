'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { FaTelegram, FaTwitter, FaChartLine, FaGlobe } from 'react-icons/fa';
import theme from '../app/styles/theme';

const FooterContainer = styled.footer`
  width: 100%;
  max-width: 1200px;
  margin: 64px auto 0;
  padding: 56px 24px 36px;
  text-align: center;
  color: ${theme.colors.text.muted};
  font-size: 13px;
  position: relative;
  &::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(124,58,237,0.5), rgba(236,72,153,0.4), transparent); }
`;

const FooterBrand = styled.div` margin-bottom: 40px; `;
const FooterBrandTitle = styled.div` font-size: 20px; font-weight: 800; background: ${theme.colors.primary.gradient}; -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 8px; `;
const FooterBrandTagline = styled.div` font-size: 13px; color: ${theme.colors.text.muted}; `;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  margin-bottom: 48px;
  @media (min-width: 768px) { grid-template-columns: repeat(4, 1fr); text-align: left; }
`;

const FooterSection = styled.div``;
const FooterSectionTitle = styled.h3` font-size: 12px; font-weight: 700; color: ${theme.colors.text.accent}; margin-bottom: 16px; text-transform: uppercase; `;

const FooterLink = styled(Link)`
  display: block;
  color: ${theme.colors.text.secondary};
  text-decoration: none;
  font-size: 13px;
  padding: 5px 0;
  &:hover { color: #fff; }
`;

const SocialLinks = styled.div` display: flex; justify-content: center; gap: 12px; margin-bottom: 48px; flex-wrap: wrap; `;
const SocialLink = styled.a` display: flex; align-items: center; gap: 8px; padding: 10px 20px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 14px; color: #fff; text-decoration: none; font-size: 13px; transition: all 0.2s; &:hover { transform: translateY(-2px); border-color: #8B5CF6; } `;

const Divider = styled.div` height: 1px; background: rgba(255,255,255,0.05); margin-bottom: 28px; `;

export default function Footer({ showSocial = true }) {
  return (
    <FooterContainer>
      <FooterBrand>
        <FooterBrandTitle>Arbitrage Inception</FooterBrandTitle>
        <FooterBrandTagline>All-in-One DeFi Aggregator on BNB Smart Chain</FooterBrandTagline>
      </FooterBrand>

      {showSocial && (
        <SocialLinks>
          <SocialLink href="https://t.me/ArbitrageInception" target="_blank" rel="noopener noreferrer"><FaTelegram /> Telegram</SocialLink>
          <SocialLink href="https://x.com/Arbitrageincept" target="_blank" rel="noopener noreferrer"><FaTwitter /> X</SocialLink>
          <SocialLink href="https://dexscreener.com/bsc/0x630b9c39d46314a3268d75bb25fd79df4581d1af" target="_blank" rel="noopener noreferrer"><FaChartLine /> Charts</SocialLink>
        </SocialLinks>
      )}

      <FooterGrid>
        <FooterSection>
          <FooterSectionTitle>Protocol</FooterSectionTitle>
          <FooterLink href="/swap-all">Swap</FooterLink>
          <FooterLink href="/zap">Zap</FooterLink>
          <FooterLink href="/bridge">Bridge</FooterLink>
        </FooterSection>
        <FooterSection>
          <FooterSectionTitle>Info</FooterSectionTitle>
          <FooterLink href="/#protocol-specs">Technical Specs</FooterLink> {/* <-- Ghost Busted! */}
          <FooterLink href="/rewards">Rewards</FooterLink>
          <FooterLink href="/contact">Contact</FooterLink>
        </FooterSection>
        <FooterSection>
          <FooterSectionTitle>Legal</FooterSectionTitle>
          <FooterLink href="/privacy-policy">Privacy</FooterLink>
          <FooterLink href="/terms-of-service">Terms</FooterLink>
        </FooterSection>
      </FooterGrid>
      <Divider />
      <p style={{ fontSize: '12px', color: '#475569' }}>© {new Date().getFullYear()} Arbitrage Inception. All rights reserved.</p>
    </FooterContainer>
  );
}
