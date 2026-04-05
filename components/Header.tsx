'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import styled from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa';
import theme from '../app/styles/theme';

export const navItems = [
  { href: '/', label: 'Home' },
  { href: '/swap', label: 'Swap' },
  { href: '/swap-all', label: 'Swap All' },
  { href: '/zap', label: 'Zap' },
  { href: '/bridge', label: 'Bridge' },
  { href: '/limit-orders', label: 'Limit Orders' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const LOGO_URL = 'https://arbitrage-inc.exchange/logo.png';

/* ─── DESKTOP HEADER ─── */
const HeaderContainer = styled.header`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  flex-wrap: nowrap;
  gap: 12px;
  position: sticky;
  top: 0;
  z-index: ${theme.zIndex.sticky};
  background: rgba(7, 7, 21, 0.85);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  backdrop-filter: blur(24px) saturate(180%);
  box-shadow: 0 1px 0 rgba(124, 58, 237, 0.25), 0 4px 24px rgba(0, 0, 0, 0.4);
  @media (min-width: 769px) {
    padding: 16px 0;
  }
`;

const LogoSection = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  flex-shrink: 0;
`;

const LogoWrapper = styled.div`
  position: relative;
  width: 36px;
  height: 36px;
  border-radius: ${theme.borderRadius.full};
  overflow: hidden;
  box-shadow: ${theme.shadows.glow};
  outline: 2px solid rgba(124, 58, 237, 0.25);
  outline-offset: 2px;
  flex-shrink: 0;
  @media (min-width: 769px) {
    width: 44px;
    height: 44px;
  }
`;

const SiteTitle = styled.span`
  font-size: 16px;
  font-weight: 800;
  background: ${theme.colors.primary.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.02em;
  white-space: nowrap;
  @media (min-width: 769px) {
    font-size: 22px;
  }
`;

const Nav = styled.nav`
  display: none;
  @media (min-width: 769px) {
    display: flex;
    gap: 2px;
    background: rgba(255, 255, 255, 0.03);
    padding: 5px 8px;
    border-radius: 100px;
    border: 1px solid rgba(255, 255, 255, 0.07);
    -webkit-backdrop-filter: blur(16px);
    backdrop-filter: blur(16px);
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const NavLinkStyled = styled(Link)<{ $active?: boolean }>`
  color: ${props => props.$active ? '#fff' : theme.colors.text.secondary};
  text-decoration: none;
  font-weight: ${props => props.$active ? '600' : '500'};
  font-size: 13px;
  padding: 6px 13px;
  border-radius: 100px;
  transition: ${theme.transitions.fast};
  white-space: nowrap;
  background: ${props => props.$active
    ? 'linear-gradient(135deg, rgba(124,58,237,0.5), rgba(147,51,234,0.4), rgba(236,72,153,0.3))'
    : 'transparent'};
  box-shadow: ${props => props.$active ? '0 0 12px rgba(124,58,237,0.3)' : 'none'};
  &:hover {
    color: ${theme.colors.text.primary};
    background: rgba(255, 255, 255, 0.07);
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
`;

const StatusBadge = styled.div`
  display: none;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  background: rgba(16, 185, 129, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: 100px;
  font-size: 11px;
  color: ${theme.colors.status.success};
  font-weight: 600;
  letter-spacing: 0.04em;
  @media (min-width: 480px) {
    display: inline-flex;
  }
`;

const StatusDot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${theme.colors.status.success};
  box-shadow: 0 0 8px ${theme.colors.status.success};
  animation: pulse 2s ease-in-out infinite;
  @keyframes pulse {
    0%, 100% { opacity: 1; box-shadow: 0 0 8px #10B981; }
    50% { opacity: 0.5; box-shadow: 0 0 3px #10B981; }
  }
`;

/* ─── HAMBURGER BUTTON ─── */
const HamburgerBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  cursor: pointer;
  color: ${theme.colors.text.primary};
  transition: ${theme.transitions.fast};
  flex-shrink: 0;
  &:hover {
    background: rgba(124, 58, 237, 0.15);
    border-color: rgba(124, 58, 237, 0.35);
  }
  @media (min-width: 769px) {
    display: none;
  }
`;

/* ─── MOBILE OVERLAY ─── */
const MobileOverlay = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(3, 3, 9, 0.97);
  -webkit-backdrop-filter: blur(24px);
  backdrop-filter: blur(24px);
  z-index: ${theme.zIndex.modal};
  display: flex;
  flex-direction: column;
  padding: 24px 20px;
  transform: ${props => props.$open ? 'translateX(0)' : 'translateX(100%)'};
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

const MobileNavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
`;

const MobileNavLink = styled(Link)<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-radius: 14px;
  text-decoration: none;
  font-size: 18px;
  font-weight: ${props => props.$active ? '700' : '500'};
  color: ${props => props.$active ? '#fff' : theme.colors.text.secondary};
  background: ${props => props.$active
    ? 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(236,72,153,0.2))'
    : 'transparent'};
  border: 1px solid ${props => props.$active ? 'rgba(124,58,237,0.3)' : 'transparent'};
  transition: ${theme.transitions.fast};
  &:hover {
    color: ${theme.colors.text.primary};
    background: rgba(255,255,255,0.05);
  }
`;

const MobileFooter = styled.div`
  padding-top: 24px;
  border-top: 1px solid ${theme.colors.border.DEFAULT};
  font-size: 12px;
  color: ${theme.colors.text.muted};
  text-align: center;
`;

interface HeaderProps {
  activePage?: string;
  showStatus?: boolean;
  walletSection?: React.ReactNode;
}

export default function Header({ activePage, showStatus = true, walletSection }: HeaderProps) {
  const pathname = usePathname();
  const currentPage = activePage || pathname;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Skip navigation for accessibility */}
      <a 
        href="#main-content" 
        style={{
          position: 'absolute',
          left: '-9999px',
          top: 'auto',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
          zIndex: 9999,
        }}
        onFocus={(e) => {
          e.currentTarget.style.position = 'fixed';
          e.currentTarget.style.left = '10px';
          e.currentTarget.style.top = '10px';
          e.currentTarget.style.width = 'auto';
          e.currentTarget.style.height = 'auto';
          e.currentTarget.style.padding = '12px 24px';
          e.currentTarget.style.background = 'linear-gradient(135deg, #8B5CF6, #EC4899)';
          e.currentTarget.style.color = '#fff';
          e.currentTarget.style.borderRadius = '8px';
          e.currentTarget.style.fontWeight = '600';
          e.currentTarget.style.textDecoration = 'none';
          e.currentTarget.style.zIndex = '99999';
        }}
        onBlur={(e) => {
          e.currentTarget.style.position = 'absolute';
          e.currentTarget.style.left = '-9999px';
          e.currentTarget.style.width = '1px';
          e.currentTarget.style.height = '1px';
        }}
      >
        Skip to main content
      </a>
      <HeaderContainer>
        <LogoSection href="/" aria-label="Go to homepage" onClick={() => setMenuOpen(false)}>
          <LogoWrapper>
            <Image
              src={LOGO_URL}
              alt="Arbitrage Inception logo"
              width={44}
              height={44}
              priority
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </LogoWrapper>
          <SiteTitle>Arbitrage Inception</SiteTitle>
        </LogoSection>

        <Nav role="navigation" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLinkStyled
              key={item.href}
              href={item.href}
              $active={currentPage === item.href || (item.href !== '/' && currentPage?.startsWith(item.href))}
              aria-current={currentPage === item.href ? 'page' : undefined}
            >
              {item.label}
            </NavLinkStyled>
          ))}
        </Nav>

        <RightSection>
          {showStatus && (
            <StatusBadge aria-label="Protocol status: active">
              <StatusDot />
              Active
            </StatusBadge>
          )}
          <HamburgerBtn
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
          </HamburgerBtn>
          {walletSection}
        </RightSection>
      </HeaderContainer>

      {/* Mobile slide-in menu */}
      <MobileOverlay $open={menuOpen} role="dialog" aria-modal="true" aria-label="Navigation menu">
        <MobileHeader>
          <LogoSection href="/" onClick={() => setMenuOpen(false)}>
            <LogoWrapper>
              <Image
                src={LOGO_URL}
                alt="Arbitrage Inception logo"
                width={44}
                height={44}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </LogoWrapper>
            <SiteTitle>Arbitrage Inception</SiteTitle>
          </LogoSection>
          <HamburgerBtn onClick={() => setMenuOpen(false)} aria-label="Close menu" style={{ display: 'flex' }}>
            <FaTimes size={16} />
          </HamburgerBtn>
        </MobileHeader>

        <MobileNavList>
          {navItems.map((item) => (
            <MobileNavLink
              key={item.href}
              href={item.href}
              $active={currentPage === item.href || (item.href !== '/' && currentPage?.startsWith(item.href))}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </MobileNavLink>
          ))}
        </MobileNavList>

        <MobileFooter>
          <StatusBadge style={{ display: 'inline-flex', margin: '0 auto 12px' }}>
            <StatusDot />
            Protocol Active
          </StatusBadge>
          <div>© {new Date().getFullYear()} Arbitrage Inception</div>
        </MobileFooter>
      </MobileOverlay>
    </>
  );
}
