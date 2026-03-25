'use client'

import styled, { createGlobalStyle } from 'styled-components'
import theme from '../styles/theme'

const GlobalStyle = createGlobalStyle`
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: ${theme.typography.fontFamily};
    background: linear-gradient(135deg, ${theme.colors.background.primary} 0%, #1a1a3e 50%, ${theme.colors.background.secondary} 100%);
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

const Header = styled.header`
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
  gap: 12px;
  background: ${theme.colors.glass.medium};
  padding: 10px 20px;
  border-radius: 50px;
  border: 1px solid ${theme.colors.border.DEFAULT};
  @media (max-width: 768px) {
    gap: 8px;
    padding: 8px 16px;
  }
`

const NavLink = styled.a`
  color: ${theme.colors.text.secondary};
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  padding: 8px 16px;
  border-radius: 20px;
  transition: ${theme.transitions.fast};
  &:hover {
    color: ${theme.colors.text.primary};
    background: ${theme.colors.glass.heavy};
  }
`

const MainContent = styled.main`
  flex: 1;
  width: 100%;
  max-width: 800px;
  padding: 40px 20px;
  color: #ffffff;
  line-height: 1.8;
  font-family: sans-serif;

  h1 {
    color: #f3ba2f;
    font-size: 2rem;
    margin-bottom: 20px;
  }

  p {
    margin-bottom: 15px;
    color: #e0e0e0;
  }
`

const ContactCard = styled.div`
  background: ${theme.colors.glass.light};
  border: 1px solid ${theme.colors.border.DEFAULT};
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 20px;

  h2 {
    color: #f3ba2f;
    font-size: 1.2rem;
    margin-bottom: 15px;
  }

  a {
    color: #28E0B9;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
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
  padding: 12px 20px;
  background: ${theme.colors.glass.medium};
  border: 1px solid ${theme.colors.border.DEFAULT};
  border-radius: 12px;
  color: ${theme.colors.text.primary};
  text-decoration: none;
  font-weight: 500;
  transition: ${theme.transitions.fast};

  &:hover {
    background: ${theme.colors.glass.heavy};
    border-color: ${theme.colors.accent.DEFAULT};
  }
`

const Footer = styled.footer`
  width: 100%;
  max-width: 1200px;
  padding: 40px 0;
  text-align: center;
  color: ${theme.colors.text.muted};
  font-size: 14px;
`

const FooterLinks = styled.div`
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
        <Header>
          <LogoSection>
            <Logo src="https://cdn.dexscreener.com/cms/images/3db2502d596330f75db19c4275c3acd833d9f35d370a39ed28933073d75edc7f?width=800&height=800&quality=95&format=auto" alt="Arbitrage Inception" />
            <Title>Arbitrage Inception</Title>
          </LogoSection>
          <Nav>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/swap">Swap (Custom)</NavLink>
            <NavLink href="/swap-all">Swap All</NavLink>
            <NavLink href="/zap">Zap</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </Nav>
        </Header>

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
              <SocialLink href="https://twitter.com/ArbitrageInception" target="_blank" rel="noopener noreferrer">
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
              <li style={{ marginBottom: '8px' }}>• <a href="https://www.coingecko.com/en/coins/arbitrage-inception" target="_blank" rel="noopener noreferrer">CoinGecko - ARBINc</a></li>
              <li>• <a href="https://dexscreener.com/bsc/arbinc" target="_blank" rel="noopener noreferrer">DexScreener - ARBINc</a></li>
            </ul>
          </ContactCard>

          <ContactCard>
            <h2>⚠️ Important Notice</h2>
            <p>
              Please do NOT send cryptocurrency to any address claiming to be from Arbitrage Inception support. We will NEVER ask for your private keys, seed phrases, or wallet passwords. Our team will only communicate through official channels listed on this page.
            </p>
          </ContactCard>
        </MainContent>

        <Footer>
          <FooterLinks>
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-of-service">Terms of Service</a>
            <a href="/cookie-policy">Cookie Policy</a>
            <a href="/contact">Contact</a>
          </FooterLinks>
          <Disclaimer>
            <strong>⚠️ Risk Disclaimer:</strong> Cryptocurrency trading involves high risk. Arbitrage Inception provides a frontend interface powered by KyberSwap Protocol and is not responsible for any financial losses. Please trade responsibly.
          </Disclaimer>
          <p>Powered by KyberSwap Protocol. Arbitrage Inception provides a customized interface to access decentralized liquidity pools on the BNB Smart Chain.</p>
          <p style={{ marginTop: '10px' }}>© 2026 Arbitrage Inception. All rights reserved.</p>
        </Footer>
      </Container>
    </>
  )
}