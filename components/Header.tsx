'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  FaBars, FaTimes, FaHome, FaExchangeAlt, FaBolt, 
  FaLink, FaClock, FaGem, FaEnvelope, FaChevronRight 
} from 'react-icons/fa';

const navItems = [
  { href: '/', label: 'Home', icon: <FaHome /> },
  { href: '/swap-all', label: 'Swap All', icon: <FaExchangeAlt /> },
  { href: '/zap', label: 'Zap', icon: <FaBolt /> },
  { href: '/bridge', label: 'Bridge', icon: <FaLink /> },
  { href: '/limit-orders', label: 'Limit Orders', icon: <FaClock /> },
  { href: '/rewards', label: 'Rewards', icon: <FaGem /> },
  { href: '/contact', label: 'Contact', icon: <FaEnvelope /> },
];

const SidebarWrapper = styled.aside<{ $isOpen: boolean }>`
  position: fixed;
  left: 0; top: 0; bottom: 0;
  width: 300px;
  background: rgba(7, 7, 21, 0.98);
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(124, 58, 237, 0.2);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  padding: 30px 20px;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  @media (max-width: 991px) {
    transform: ${props => props.$isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  }
`;

const MobileHeader = styled.div`
  display: none;
  @media (max-width: 991px) {
    display: flex; position: fixed; top: 0; left: 0; right: 0;
    height: 64px; background: #070715; border-bottom: 1px solid rgba(124, 58, 237, 0.2);
    z-index: 999; align-items: center; justify-content: space-between; padding: 0 20px;
  }
`;

const NavLinkStyled = styled(Link)<{ $active?: boolean }>`
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 18px; border-radius: 12px;
  color: ${props => props.$active ? '#fff' : '#94a3b8'};
  background: ${props => props.$active ? 'rgba(124, 58, 237, 0.15)' : 'transparent'};
  text-decoration: none; font-size: 16px;
  font-weight: 600; transition: all 0.2s;
  &:hover { color: #fff; background: rgba(255, 255, 255, 0.05); transform: translateX(4px); }
  .icon-text { display: flex; align-items: center; gap: 14px; svg { font-size: 20px; } }
`;

export default function Header({ walletSection }: any) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => setIsOpen(false), [pathname]);

  return (
    <>
      <MobileHeader>
        <Link href="/" style={{color:'#fff', fontWeight:800, textDecoration:'none'}}>ARB INC</Link>
        <button aria-label="Open Menu" onClick={()=>setIsOpen(true)} style={{background:'none', border:'none', color:'#fff', fontSize:'24px'}}><FaBars /></button>
      </MobileHeader>
      {isOpen && <div onClick={()=>setIsOpen(false)} style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', zIndex:998}} />}
      <SidebarWrapper $isOpen={isOpen}>
        <Link href="/" style={{display:'flex', alignItems:'center', gap:'12px', textDecoration:'none', marginBottom:'40px'}}>
          <Image src="/logo.jpg" alt="Logo" width={44} height={44} style={{borderRadius:'50%'}} />
          <div style={{display:'flex', flexDirection:'column'}}><span style={{fontWeight:800, color:'#fff', fontSize:'18px'}}>Arbitrage</span><span style={{fontSize:'10px', color:'#a855f7', letterSpacing:'2px'}}>INCEPTION</span></div>
        </Link>
        <nav style={{display:'flex', flexDirection:'column', gap:'8px', flexGrow:1}}>
          {navItems.map((item) => (
            <NavLinkStyled key={item.href} href={item.href} $active={pathname === item.href}>
              <div className="icon-text">{item.icon} {item.label}</div>
              {pathname === item.href && <FaChevronRight style={{fontSize:'10px'}} />}
            </NavLinkStyled>
          ))}
        </nav>
        <div style={{marginTop:'20px'}}>{walletSection}</div>
      </SidebarWrapper>
    </>
  );
}
