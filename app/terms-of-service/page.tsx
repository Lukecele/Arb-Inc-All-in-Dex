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
    margin-bottom: 10px;
  }

  h2 {
    color: #f3ba2f;
    font-size: 1.4rem;
    margin-top: 30px;
    margin-bottom: 15px;
  }

  p {
    margin-bottom: 15px;
    color: #e0e0e0;
  }

  ul {
    padding-left: 20px;
    margin-bottom: 15px;
  }

  li {
    margin-bottom: 8px;
    color: #e0e0e0;
  }

  .last-updated {
    color: #888;
    font-size: 0.9rem;
    margin-bottom: 30px;
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

export default function TermsOfServicePage() {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>
          <LogoSection>
            <Logo src="https://arbitrage-inc.exchange/logo.jpg" alt="Arbitrage Inception" />
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
        </Header>

        <MainContent>
          <h1>Terms of Service</h1>
          <p className="last-updated">Last Updated: March 25, 2026</p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Arbitrage Inception Platform (https://arbitrage-inc.exchange), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Platform.
          </p>

          <h2>2. Description of Service</h2>
          <p>
            Arbitrage Inception provides a customized frontend interface that allows users to interact with decentralized liquidity pools on the BNB Smart Chain via the KyberSwap Protocol. Our Platform facilitates token swaps and liquidity provision operations.
          </p>
          <p>
            <strong>Important:</strong> We are not a cryptocurrency exchange, broker, or financial institution. We do not custody, hold, or control any user funds. All transactions are executed directly on the blockchain through your connected wallet.
          </p>

          <h2>3. Eligibility</h2>
          <p>To use our Platform, you must:</p>
          <ul>
            <li>Be at least 18 years of age</li>
            <li>Not be a resident or national of any sanctioned country</li>
            <li>Not be on any government sanctions list</li>
            <li>Have the legal capacity to enter into these terms</li>
          </ul>

          <h2>4. Financial Risk Disclaimer</h2>
          <p>
            <strong>CRYPTOCURRENCY TRADING INVOLVES SUBSTANTIAL RISK OF LOSS AND IS NOT SUITABLE FOR EVERY INVESTOR.</strong>
          </p>
          <p>
            You acknowledge and agree that:
          </p>
          <ul>
            <li>Cryptocurrency markets are highly volatile and unpredictable</li>
            <li>You may lose all of your invested capital</li>
            <li>Past performance is not indicative of future results</li>
            <li>Smart contracts may contain bugs or vulnerabilities</li>
            <li>Arbitrage Inception is not responsible for any financial losses incurred</li>
            <li>You should consult with a qualified financial advisor before making investment decisions</li>
          </ul>

          <h2>5. User Responsibilities</h2>
          <p>You are solely responsible for:</p>
          <ul>
            <li>Maintaining the security of your wallet and private keys</li>
            <li>Verifying all transaction details before confirmation</li>
            <li>Ensuring compliance with applicable tax laws</li>
            <li>Understanding the risks of decentralized finance (DeFi)</li>
            <li>Any losses resulting from your use of the Platform</li>
          </ul>

          <h2>6. Prohibited Activities</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the Platform for any illegal purposes</li>
            <li>Attempt to manipulate or exploit the Platform</li>
            <li>Interfere with the proper functioning of the Platform</li>
            <li>Attempt to gain unauthorized access to any part of the Platform</li>
            <li>Use automated systems or bots without permission</li>
          </ul>

          <h2>7. Third-Party Services</h2>
          <p>
            Our Platform integrates with third-party services including KyberSwap Protocol, wallet providers, and blockchain networks. We are not responsible for the availability, accuracy, or practices of these third-party services.
          </p>

          <h2>8. Intellectual Property</h2>
          <p>
            All intellectual property rights in the Platform, including but not limited to logos, trademarks, and software, belong to Arbitrage Inception or its licensors. You may not use, copy, or distribute any content without our express written permission.
          </p>

          <h2>9. Limitation of Liability</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, ARBITRAGE INCEPTION SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR GOODWILL, ARISING FROM YOUR USE OF THE PLATFORM.
          </p>

          <h2>10. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless Arbitrage Inception, its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your use of the Platform or violation of these Terms.
          </p>

          <h2>11. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. Continued use of the Platform after any changes constitutes acceptance of the modified Terms.
          </p>

          <h2>12. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with applicable laws. Any disputes arising from these Terms shall be resolved through binding arbitration.
          </p>

          <h2>13. Contact</h2>
          <p>
            For questions about these Terms, please visit our <a href="/contact" style={{ color: '#28E0B9' }}>Contact Page</a>.
          </p>
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