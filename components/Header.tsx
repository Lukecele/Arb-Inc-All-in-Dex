'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import styled from 'styled-components'

const Sidebar = styled.aside`
  width: 260px; background: #08080c; height: 100vh; position: fixed;
  left: 0; top: 0; border-right: 1px solid rgba(139, 92, 246, 0.1);
  display: flex; flex-direction: column; padding: 2rem 1.2rem; z-index: 1000;
  @media (max-width: 1024px) { display: none; }
`

const MobileMenu = styled.div<{ $isOpen: boolean }>`
  position: fixed; top: 0; left: 0; width: 100%; height: 100vh;
  background: #08080c; z-index: 2000; padding: 2rem;
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  flex-direction: column;
  @media (min-width: 1025px) { display: none; }
`

const TopBar = styled.header`
  position: fixed; top: 0; left: 260px; right: 0; height: 60px;
  display: flex; justify-content: flex-end; align-items: center;
  padding: 0 2rem; z-index: 900; background: transparent;
  @media (max-width: 1024px) { 
    left: 0; 
    justify-content: space-between; 
    padding: 0 1rem; 
    background: rgba(3, 0, 20, 0.8); 
    backdrop-filter: blur(10px); 
  }
`

const Hamburger = styled.button`
  display: none; background: none; border: none; color: white; cursor: pointer;
  @media (max-width: 1024px) { display: flex; align-items: center; justify-content: center; }
  svg { width: 28px; height: 28px; }
`

const NavLink = styled(Link)<{ $active: boolean }>`
  display: flex; align-items: center; gap: 12px; padding: 10px 16px;
  border-radius: 10px; text-decoration: none; font-size: 14px;
  color: ${({ $active }) => ($active ? '#fff' : '#94a3b8')};
  background: ${({ $active }) => ($active ? 'rgba(139, 92, 246, 0.12)' : 'transparent')};
  margin-bottom: 4px; transition: 0.2s ease;
  &:hover { color: #fff; background: rgba(139, 92, 246, 0.05); }
  svg { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 2; }
`

const Icons = {
  Home: () => <svg viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
  Swap: () => <svg viewBox="0 0 24 24"><path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>,
  Bridge: () => <svg viewBox="0 0 24 24"><path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
  Zap: () => <svg viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  Limit: () => <svg viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>,
  Rewards: () => <svg viewBox="0 0 24 24"><path d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5a2 2 0 10-2 2h2zm0 0h3a2 2 0 110 4h-3m0-4h-3a2 2 0 100 4h3m0 0v10" /></svg>,
  Contact: () => <svg viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
}

export default function Header({ activePage, walletSection }: any) {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Chiudi il menù solo se cambia la pagina
  useEffect(() => { setIsMenuOpen(false); }, [pathname]);

  const navItems = [
    { name: 'Home', href: '/', Icon: Icons.Home },
    { name: 'Swap', href: '/swap-all', Icon: Icons.Swap },
    { name: 'Bridge', href: '/bridge', Icon: Icons.Bridge },
    { name: 'Zap', href: '/zap', Icon: Icons.Zap },
    { name: 'Limit Orders', href: '/limit-orders', Icon: Icons.Limit },
    { name: 'Rewards', href: '/rewards', Icon: Icons.Rewards },
    { name: 'Contact', href: '/contact', Icon: Icons.Contact },
  ]

  return (
    <>
      {/* SIDEBAR DESKTOP - Totalmente isolata */}
      <Sidebar>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '2.5rem' }}>
          <Image src="/logo.jpg" alt="Logo" width={38} height={38} style={{ borderRadius: '50%' }} />
          <div style={{ lineHeight: 1.1 }}>
            <div style={{ fontWeight: 700, color: '#fff', fontSize: '16px' }}>Arbitrage</div>
            <div style={{ fontSize: '8px', color: '#a855f7', letterSpacing: '2px', fontWeight: 800 }}>INCEPTION</div>
          </div>
        </Link>
        <nav>{navItems.map((item) => (
          <NavLink key={item.href} href={item.href} $active={pathname === item.href || activePage === item.href}>
            <item.Icon /> {item.name}
          </NavLink>
        ))}</nav>
      </Sidebar>

      {/* MENU MOBILE - Caricato solo quando necessario */}
      <MobileMenu $isOpen={isMenuOpen}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem' }}>
          <Hamburger onClick={() => setIsMenuOpen(false)}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </Hamburger>
        </div>
        <nav>
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href} $active={pathname === item.href || activePage === item.href}>
              <item.Icon /> {item.name}
            </NavLink>
          ))}
        </nav>
      </MobileMenu>

      <TopBar>
        {/* L'hamburger appare solo su mobile */}
        <Hamburger onClick={() => setIsMenuOpen(true)}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
        </Hamburger>
        
        {/* Il walletSection deve rimanere "stabile" */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {walletSection}
        </div>
      </TopBar>
    </>
  )
}
