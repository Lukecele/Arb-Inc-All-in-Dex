'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styled from 'styled-components';
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

const HeaderContainer = styled.header`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  flex-wrap: wrap;
  gap: 12px;
  position: sticky;
  top: 0;
  z-index: ${theme.zIndex.sticky};
  background: rgba(10, 10, 18, 0.8);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid ${theme.colors.border.DEFAULT};
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

const Logo = styled.img`
  width: 36px;
  height: 36px;
  border-radius: ${theme.borderRadius.full};
  box-shadow: ${theme.shadows.glow};
  @media (min-width: 769px) {
    width: 48px;
    height: 48px;
  }
`;

const SiteTitle = styled.span`
  font-size: 16px;
  font-weight: 700;
  background: ${theme.colors.primary.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media (min-width: 769px) {
    font-size: 24px;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 4px;
  background: rgba(255, 255, 255, 0.03);
  padding: 6px 10px;
  border-radius: 100px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  flex-wrap: wrap;
  justify-content: center;
  @media (max-width: 768px) {
    gap: 3px;
    padding: 5px 8px;
    border-radius: 16px;
  }
`;

const NavLinkStyled = styled(Link)<{ $active?: boolean }>`
  color: ${props => props.$active ? theme.colors.accent.DEFAULT : theme.colors.text.secondary};
  text-decoration: none;
  font-weight: 500;
  font-size: 13px;
  padding: 7px 14px;
  border-radius: 100px;
  transition: ${theme.transitions.fast};
  white-space: nowrap;
  background: ${props => props.$active ? 'rgba(40, 224, 185, 0.1)' : 'transparent'};
  &:hover {
    color: ${theme.colors.text.primary};
    background: rgba(255, 255, 255, 0.06);
  }
  @media (max-width: 768px) {
    font-size: 12px;
    padding: 5px 10px;
  }
`;

const StatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: 100px;
  font-size: 11px;
  color: ${theme.colors.status.success};
  font-weight: 600;
  flex-shrink: 0;
`;

const StatusDot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${theme.colors.status.success};
  box-shadow: 0 0 6px ${theme.colors.status.success};
  animation: pulse 2s ease-in-out infinite;
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
`;

interface HeaderProps {
  activePage?: string;
  showStatus?: boolean;
  walletSection?: React.ReactNode;
}

export default function Header({ activePage, showStatus = true, walletSection }: HeaderProps) {
  const pathname = usePathname();
  const currentPage = activePage || pathname;

  return (
    <HeaderContainer>
      <LogoSection href="/" aria-label="Go to homepage">
        <Logo
          src="https://cdn.dexscreener.com/cms/images/3db2502d596330f75db19c4275c3acd833d9f35d370a39ed28933073d75edc7f?width=800&height=800&quality=95&format=auto"
          alt="Arbitrage Inception logo"
        />
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

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
        {showStatus && (
          <StatusBadge aria-label="Protocol status: active">
            <StatusDot />
            Active
          </StatusBadge>
        )}
        {walletSection}
      </div>
    </HeaderContainer>
  );
}
