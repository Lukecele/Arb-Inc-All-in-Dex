'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa';

export const navItems = [
  { href: '/', label: 'Home' },
  { href: '/swap-all', label: 'Swap All' },
  { href: '/zap', label: 'Zap' },
  { href: '/bridge', label: 'Bridge' },
  { href: '/limit-orders', label: 'Limit Orders' },
  { href: '/rewards', label: 'Rewards' },
  { href: '/contact', label: 'Contact' },
];

const LOGO_URL = '/logo.jpg';

const HeaderWrapper = styled.header`
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(7, 7, 21, 0.85);
  backdrop-filter: blur(24px) saturate(180%);
  box-shadow: 0 1px 0 rgba(124, 58, 237, 0.2);
`;

const HeaderInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 20px;
  height: 64px;
  @media (min-width: 769px) { padding: 0 24px; height: 72px; }
`;

const LogoSection = styled(Link)`
  display: flex;
  align-items: center; gap: 10px; text-decoration: none; flex-shrink: 0;
`;

const LogoWrapper = styled.div`
  width: 32px; height: 32px; border-radius: 50%; overflow: hidden;
  border: 1px solid rgba(139, 92, 246, 0.3);
  @media (min-width: 769px) { width: 40px; height: 40px; }
`;

const SiteTitle = styled.span`
  font-size: 14px; font-weight: 800; color: #fff;
  background: linear-gradient(135deg, #8B5CF6, #EC4899);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  @media (min-width: 769px) { font-size: 18px; }
`;

const Nav = styled.nav`
  display: none;
  @media (min-width: 992px) {
    display: flex; align-items: center; gap: 2px;
    background: rgba(255, 255, 255, 0.03); padding: 4px; border-radius: 100px;
  }
`;

const NavLinkStyled = styled(Link)<{ $active?: boolean }>`
  color: ${props => props.$active ? '#fff' : '#94a3b8'};
  text-decoration: none; font-size: 12px; font-weight: 500; padding: 6px 12px; border-radius: 100px;
  background: ${props => props.$active ? 'rgba(124, 58, 237, 0.5)' : 'transparent'};
  &:hover { color: #fff; background: rgba(255, 255, 255, 0.05); }
`;

const HamburgerBtn = styled.button`
  display: flex; align-items: center; justify-content: center; background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1); padding: 8px; border-radius: 8px; color: white;
  @media (min-width: 992px) { display: none !important; }
`;

const MobileOverlay = styled.div<{ $open: boolean }>`
  position: fixed; inset: 0; background: #030309; z-index: 2000;
  display: flex; flex-direction: column; padding: 24px;
  transform: ${props => props.$open ? 'translateX(0)' : 'translateX(100%)'};
  transition: transform 0.3s ease;
`;

export default function Header({ showStatus = true, walletSection }: any) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <HeaderWrapper>
        <HeaderInner>
          <LogoSection href="/" onClick={() => setMenuOpen(false)}>
            <LogoWrapper>
              <Image src={LOGO_URL} alt="Logo" width={40} height={40} priority style={{ objectFit: 'cover' }} />
            </LogoWrapper>
            <SiteTitle>Arbitrage Inception</SiteTitle>
          </LogoSection>

          <Nav>
            {navItems.map((item) => (
              <NavLinkStyled key={item.href} href={item.href} $active={pathname === item.href}>
                {item.label}
              </NavLinkStyled>
            ))}
          </Nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {walletSection}
            <HamburgerBtn onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes /> : <FaBars />}
            </HamburgerBtn>
          </div>
        </HeaderInner>
      </HeaderWrapper>

      <MobileOverlay $open={menuOpen}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
          <SiteTitle>Menu</SiteTitle>
          <HamburgerBtn onClick={() => setMenuOpen(false)}><FaTimes /></HamburgerBtn>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}
              style={{ padding: '16px', fontSize: '18px', fontWeight: '600', color: pathname === item.href ? '#8B5CF6' : '#fff', textDecoration: 'none' }}>
              {item.label}
            </Link>
          ))}
        </div>
      </MobileOverlay>
    </>
  );
}
