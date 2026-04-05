'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
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

const LOGO_URL = '/logo.jpg';

const HeaderContainer = styled.header`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(7, 7, 21, 0.85);
  backdrop-filter: blur(24px) saturate(180%);
  box-shadow: 0 1px 0 rgba(124, 58, 237, 0.25);
  @media (min-width: 769px) { padding: 16px 0; }
`;

const LogoSection = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
`;

const LogoWrapper = styled.div`
  position: relative;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 0 15px rgba(139, 92, 246, 0.3);
  @media (min-width: 769px) { width: 44px; height: 44px; }
`;

const SiteTitle = styled.span`
  font-size: 16px;
  font-weight: 800;
  background: linear-gradient(135deg, #8B5CF6, #EC4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media (min-width: 769px) { font-size: 22px; }
`;

const Nav = styled.nav`
  display: none;
  @media (min-width: 769px) {
    display: flex;
    gap: 4px;
    background: rgba(255, 255, 255, 0.03);
    padding: 5px 10px;
    border-radius: 100px;
    border: 1px solid rgba(255, 255, 255, 0.07);
  }
`;

const NavLinkStyled = styled(Link)<{ $active?: boolean }>`
  color: ${props => props.$active ? '#fff' : '#94a3b8'};
  text-decoration: none;
  font-size: 13px;
  padding: 6px 14px;
  border-radius: 100px;
  background: ${props => props.$active ? 'rgba(124, 58, 237, 0.4)' : 'transparent'};
  transition: all 0.2s ease;
  &:hover { background: rgba(255, 255, 255, 0.07); color: #fff; }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10B981;
  box-shadow: 0 0 8px #10B981;
  animation: pulseLight 2s ease-in-out infinite;
  @keyframes pulseLight {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(0.9); }
  }
`;

const SkipLink = styled.a`
  position: absolute;
  top: -100px;
  left: 0;
  background: #8B5CF6;
  color: white;
  padding: 10px;
  z-index: 10000;
  transition: top 0.2s;
  &:focus { top: 0; }
`;

const HamburgerBtn = styled.button`
  display: flex;
  @media (min-width: 769px) { display: none; }
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 8px;
  border-radius: 8px;
  color: white;
  cursor: pointer;
`;

const MobileOverlay = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  background: #030309;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  padding: 20px;
  transform: ${props => props.$open ? 'translateX(0)' : 'translateX(100%)'};
  transition: transform 0.3s ease-in-out;
`;

export default function Header({ activePage, showStatus = true, walletSection }: any) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const currentYear = mounted ? new Date().getFullYear() : '';

  return (
    <>
      <a href="#main-content" id="skip-link" className="sr-only focus:not-sr-only">Skip to main content</a>
      <HeaderContainer>
        <LogoSection href="/" onClick={() => setMenuOpen(false)}>
          <LogoWrapper>
            <Image
              src={LOGO_URL}
              alt="Logo"
              width={44}
              height={44}
              priority
              style={{ objectFit: 'cover' }}
            />
          </LogoWrapper>
          <SiteTitle>Arbitrage Inception</SiteTitle>
        </LogoSection>

        <Nav>
          {navItems.map((item) => (
            <NavLinkStyled
              key={item.href}
              href={item.href}
              $active={pathname === item.href}
            >
              {item.label}
            </NavLinkStyled>
          ))}
        </Nav>

        <RightSection>
          {showStatus && mounted && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10B981', fontSize: '11px', fontWeight: 600 }}>
              <StatusDot /> Active
            </div>
          )}
          <HamburgerBtn aria-label="Menu Navigazione"  onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </HamburgerBtn>
          {walletSection}
        </RightSection>
      </HeaderContainer>

      <MobileOverlay $open={menuOpen}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
          <SiteTitle>Menu</SiteTitle>
          <HamburgerBtn aria-label="Menu Navigazione"  onClick={() => setMenuOpen(false)}><FaTimes /></HamburgerBtn>
        </div>
        {navItems.map((item) => (
          <Link 
            key={item.href} 
            href={item.href} 
            onClick={() => setMenuOpen(false)}
            style={{ padding: '15px', fontSize: '20px', color: pathname === item.href ? '#8B5CF6' : '#fff', textDecoration: 'none' }}
          >
            {item.label}
          </Link>
        ))}
        <div style={{ marginTop: 'auto', textAlign: 'center', color: '#cbd5e1', fontSize: '12px' }}>
          © {currentYear} Arbitrage Inception
        </div>
      </MobileOverlay>
    </>
  );
}
