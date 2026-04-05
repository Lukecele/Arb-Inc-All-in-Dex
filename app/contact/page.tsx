'use client'

import SharedHeader from '../../components/Header'
import SharedFooter from '../../components/Footer'

import styled, { createGlobalStyle } from 'styled-components'
import theme from '../styles/theme'

const GlobalStyle = createGlobalStyle`
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: ${theme.typography.fontFamily};
    background: ${theme.colors.background.primary};
    color: #FFFFFF;
    min-height: 100vh;
  }
`

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 15px;
  @media (min-width: 769px) {
    padding: 40px 20px;
  }
`

const PageHeader = styled.header`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  flex-wrap: wrap;
  gap: 10px;
  border-bottom: 1px solid ${theme.colors.border.DEFAULT};
`

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const Logo = styled.img`
  width: 40px;
  height: 40px;
  border-radius: ${theme.borderRadius.full};
  box-shadow: ${theme.shadows.glow};
`

const Title = styled.h1`
  font-size: 18px;
  font-weight: 700;
  background: ${theme.colors.primary.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const Nav = styled.nav`
  display: flex;
  gap: 4px;
  background: rgba(255, 255, 255, 0.04);
  padding: 6px 12px;
  border-radius: 100px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  @media (max-width: 768px) {
    gap: 3px;
    padding: 6px 10px;
    flex-wrap: wrap;
    justify-content: center;
    border-radius: 20px;
  }
`

const NavLink = styled.a`
  color: ${theme.colors.text.secondary};
  text-decoration: none;
  font-weight: 500;
  font-size: 13px;
  padding: 7px 13px;
  border-radius: 100px;
  white-space: nowrap;
  transition: ${theme.transitions.fast};
  &:hover {
    color: ${theme.colors.text.primary};
    background: rgba(255, 255, 255, 0.08);
  }
`

const MainContent = styled.main`
  flex: 1;
  width: 100%;
  max-width: 800px;
  padding: 40px 20px;
  color: #ffffff;
  line-height: 1.8;
  font-family: 'Inter', -apple-system, sans-serif;

  h1 {
    color: #a78bfa;
    font-size: 2rem;
    font-weight: 800;
    margin-bottom: 24px;
    letter-spacing: -0.02em;
  }

  p {
    margin-bottom: 15px;
    color: #8a8a9a;
  }
`

const ContactCard = styled.div`
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 20px;
  padding: 28px 24px;
  margin-bottom: 16px;
  transition: border-color 0.2s ease;
  &:hover {
    border-color: rgba(139, 92, 246, 0.2);
  }

  h2 {
    color: #a78bfa;
    font-size: 1.05rem;
    font-weight: 700;
    margin-bottom: 14px;
    letter-spacing: -0.01em;
  }

  a {
    color: #34d399;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
      color: #6ee7b7;
    }
  }
`

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  margin-top: 10px;
`

const SocialLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 20px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 14px;
  color: ${theme.colors.text.primary};
  text-decoration: none;
  font-weight: 500;
  transition: ${theme.transitions.fast};

  &:hover {
    background: ${theme.colors.glass.heavy};
    border-color: ${theme.colors.accent.DEFAULT};
  }
`

const PageFooter = styled.footer`
  width: 100%;
  max-width: 1200px;
  padding: 40px 0;
  text-align: center;
  color: ${theme.colors.text.muted};
  font-size: 14px;
`

const PageFooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 15px;
  flex-wrap: wrap;

  a {
    color: ${theme.colors.accent.DEFAULT};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`

const Disclaimer = styled.div`
  max-width: 600px;
  margin: 0 auto 20px;
  padding: 15px;
  background: rgba(255, 152, 0, 0.1);
  border: 1px solid rgba(255, 152, 0, 0.3);
  border-radius: 8px;
  color: #FF9901;
  font-size: 12px;
  line-height: 1.5;
`

export default function ContactPage() {
  return (
    <>
      <GlobalStyle />
      <Container>
        <SharedHeader activePage="/contact" />
          <LogoSection>
            <Logo src="https://arbitrage-inc.exchange/logo-animato.gif" alt="Arbitrage Inception" />
            <Title>Arbitrage Inception</Title>
          </LogoSection>
          <Nav>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/swap">Swap (Custom)</NavLink>
            <NavLink href="/swap-all">Swap All</NavLink>
            <NavLink href="/zap">Zap</NavLink>
            <NavLink href="/bridge">Bridge</NavLink>
            <NavLink href="/limit-orders">Limit Orders</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </Nav>
        

        <MainContent>
          <h1>Contact Us</h1>
          <p>
            Have questions, feedback, or need support? We&apos;re here to help. Reach out to us through any of the channels below.
          </p>

          <ContactCard>
            <h2>📧 Email Support</h2>
            <p>
              For general inquiries, technical support, or partnership requests, email us at:
            </p>
            <p style={{ fontSize: '1.2rem', marginTop: '10px' }}>
              <a href="mailto:luca.celebrano1@gmail.com">luca.celebrano1@gmail.com</a>
            </p>
          </ContactCard>

          <ContactCard>
            <h2>🌐 Social Media</h2>
            <p>
              Follow us for updates, announcements, and community discussions:
            </p>
            <SocialLinks>
              <SocialLink href="https://x.com/Arbitrageincept" target="_blank" rel="noopener noreferrer">
                𝕏 Twitter
              </SocialLink>
              <SocialLink href="https://t.me/ArbitrageInception" target="_blank" rel="noopener noreferrer">
                📱 Telegram
              </SocialLink>
            </SocialLinks>
          </ContactCard>

          <ContactCard>
            <h2>📋 Support Hours</h2>
            <p>
              Our team monitors support inquiries during the following hours:
            </p>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: '10px' }}>
              <li style={{ marginBottom: '8px' }}>• <strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM UTC</li>
              <li style={{ marginBottom: '8px' }}>• <strong>Weekend:</strong> Limited support available</li>
              <li>• <strong>Response Time:</strong> Within 24-48 hours</li>
            </ul>
          </ContactCard>

          <ContactCard>
            <h2>🔗 Useful Links</h2>
            <p>
              Quick access to important resources:
            </p>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: '10px' }}>
              <li style={{ marginBottom: '8px' }}>• <a href="https://docs.kyberswap.com/" target="_blank" rel="noopener noreferrer">KyberSwap Documentation</a></li>
              <li>• <a href="https://dexscreener.com/watchlist/KvE6lgnr30b0Z2yFhxlB" target="_blank" rel="noopener noreferrer">DexScreener - Watchlist</a></li>
            </ul>
          </ContactCard>

          <ContactCard>
            <h2>⚠️ Important Notice</h2>
            <p>
              Please do NOT send cryptocurrency to any address claiming to be from Arbitrage Inception support. We will NEVER ask for your private keys, seed phrases, or wallet passwords. Our team will only communicate through official channels listed on this page.
            </p>
          </ContactCard>
        </MainContent>

        <SharedFooter />
          <PageFooterLinks>
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-of-service">Terms of Service</a>
            <a href="/cookie-policy">Cookie Policy</a>
            <a href="/contact">Contact</a>
          </PageFooterLinks>
          <Disclaimer>
            <strong>⚠️ Risk Disclaimer:</strong> Cryptocurrency trading involves high risk. Arbitrage Inception provides a frontend interface powered by KyberSwap Protocol and is not responsible for any financial losses. Please trade responsibly.
          </Disclaimer>
          <p>Powered by KyberSwap Protocol. Arbitrage Inception provides a customized interface to access decentralized liquidity pools on the BNB Smart Chain.</p>
          <p style={{ marginTop: '10px' }}>© 2026 Arbitrage Inception. All rights reserved.</p>
        
      </Container>
    </>
  )
}