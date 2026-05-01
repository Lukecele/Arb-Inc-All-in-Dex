'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { FaTelegram, FaTwitter, FaChartLine } from 'react-icons/fa';
import theme from '../app/styles/theme';

const FooterContainer = styled.footer`
  width: 100%; max-width: 1200px; margin: 64px auto 0; padding: 56px 24px 36px;
  text-align: center; color: ${theme.colors.text.muted}; font-size: 13px; position: relative;
  &::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(124,58,237,0.5), transparent); }
`;

const FooterGrid = styled.div`
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; margin-bottom: 48px;
  @media (min-width: 768px) { grid-template-columns: repeat(3, 1fr); text-align: left; }
`;

const FooterSection = styled.div``; // <--- Mancava questa!

const FooterSectionTitle = styled.h3` font-size: 12px; font-weight: 700; color: #8B5CF6; margin-bottom: 16px; text-transform: uppercase; `;
const FooterLink = styled(Link)` display: block; color: #94a3b8; text-decoration: none; padding: 5px 0; &:hover { color: #fff; } `;

export default function Footer() {
  return (
    <FooterContainer>
      <div style={{ marginBottom: '40px' }}>
        <div style={{ fontSize: '20px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>Arbitrage Inception</div>
        <div style={{ color: '#64748b' }}>All-in-One DeFi Aggregator on BNB Smart Chain</div>
      </div>

      <FooterGrid>
        <FooterSection>
          <FooterSectionTitle>App</FooterSectionTitle>
          <FooterLink href="/swap-all">Swap</FooterLink>
          <FooterLink href="/zap">Zap</FooterLink>
          <FooterLink href="/bridge">Bridge</FooterLink>
        </FooterSection>
        <FooterSection>
          <FooterSectionTitle>Community</FooterSectionTitle>
          <FooterLink href="/rewards">Rewards</FooterLink>
          <a href="https://t.me/ArbitrageInception" aria-label="Telegram" style={{display:'block', color:'#94a3b8', textDecoration:'none', padding:'5px 0'}}>Telegram</a>
          <a href="https://x.com/Arbitrageincept" style={{display:'block', color:'#94a3b8', textDecoration:'none', padding:'5px 0'}}>Twitter</a>
        </FooterSection>
        <FooterSection>
          <FooterSectionTitle>Legal</FooterSectionTitle>
          <FooterLink href="/privacy-policy">Privacy</FooterLink>
          <FooterLink href="/terms-of-service">Terms</FooterLink>
          <FooterLink href="/contact">Contact</FooterLink>
        </FooterSection>
      </FooterGrid>
      
      <p style={{ fontSize: '12px', color: '#334155', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
        © {new Date().getFullYear()} Arbitrage Inception.
      </p>
    </FooterContainer>
  );
}
