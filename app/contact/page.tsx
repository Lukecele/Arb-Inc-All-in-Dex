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

export default function ContactPage() {
  return (
    <>
      <GlobalStyle />
      <Container>
        {/* Header pulito e unico */}
        <SharedHeader activePage="/contact" />
        
        {/* 1. Cointraffic Banner (Top) con anti-skyscraper */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '30px 0 10px 0', minHeight: '250px' }}>
          <span id="ct_cTsuCksMpJ3"></span>
        </div>

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

        {/* 2. Cointraffic Banner (Bottom) con anti-skyscraper */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '20px 0 40px 0', minHeight: '250px' }}>
          <span id="ct_ct6kxn0fBVV"></span>
        </div>

        {/* Footer pulito e unico */}
        <SharedFooter />
        
      </Container>
    </>
  )
}
