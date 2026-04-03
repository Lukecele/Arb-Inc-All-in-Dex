'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';

const Banner = styled.div<{ $visible: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, rgba(7, 7, 21, 0.98), rgba(15, 15, 35, 0.98));
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-top: 1px solid rgba(124, 58, 237, 0.3);
  padding: 20px;
  z-index: 99999;
  transform: translateY(${props => props.$visible ? '0' : '100%'});
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 -4px 32px rgba(0, 0, 0, 0.4);
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  text-align: center;
  
  @media (min-width: 768px) {
    flex-direction: row;
    text-align: left;
    justify-content: space-between;
    align-items: center;
  }
`;

const Text = styled.div`
  color: #9ca3af;
  font-size: 14px;
  line-height: 1.6;
  
  a {
    color: #8B5CF6;
    text-decoration: underline;
    
    &:hover {
      color: #a78bfa;
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 12px;
  flex-shrink: 0;
`;

const Button = styled.button<{ $primary?: boolean }>`
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${props => props.$primary ? `
    background: linear-gradient(135deg, #8B5CF6, #7C3AED);
    border: none;
    color: #fff;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 16px rgba(124, 58, 246, 0.4);
    }
  ` : `
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: #9ca3af;
    
    &:hover {
      border-color: rgba(255, 255, 255, 0.3);
      color: #fff;
    }
  `}
`;

const COOKIE_CONSENT_KEY = 'cookie_consent_accepted';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Delay showing banner slightly for better UX
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'all');
    setVisible(false);
  };

  const acceptEssential = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'essential');
    setVisible(false);
  };

  // Don't render anything on server or if already accepted
  if (!mounted) return null;

  return (
    <Banner $visible={visible} role="dialog" aria-label="Cookie consent">
      <Content>
        <Text>
          We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.{' '}
          <a href="/cookie-policy">Learn more</a>
        </Text>
        <Buttons>
          <Button onClick={acceptEssential}>Essential Only</Button>
          <Button $primary onClick={acceptAll}>Accept All</Button>
        </Buttons>
      </Content>
    </Banner>
  );
}