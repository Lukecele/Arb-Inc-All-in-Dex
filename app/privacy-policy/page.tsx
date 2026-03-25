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

export default function PrivacyPolicyPage() {
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
          <h1>Privacy Policy</h1>
          <p className="last-updated">Last Updated: March 25, 2026</p>

          <h2>1. Introduction</h2>
          <p>
            Welcome to Arbitrage Inception (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We operate the website https://arbitrage-inc.exchange (the &quot;Platform&quot;). This Privacy Policy explains how we collect, use, and protect your information when you use our Platform.
          </p>
          <p>
            Arbitrage Inception provides a customized frontend interface to access decentralized liquidity pools on the BNB Smart Chain via the KyberSwap Protocol. We are not a custodian of your funds and do not have access to your private keys.
          </p>

          <h2>2. Information We Collect</h2>
          <p><strong>2.1 Information You Provide Directly</strong></p>
          <ul>
            <li>Wallet address when you connect your cryptocurrency wallet</li>
            <li>Transaction data visible on the blockchain</li>
            <li>Information you provide when contacting us</li>
          </ul>

          <p><strong>2.2 Automatically Collected Information</strong></p>
          <ul>
            <li>IP address (for security and analytics purposes)</li>
            <li>Browser type and version</li>
            <li>Device information</li>
            <li>Pages visited and time spent on the Platform</li>
            <li>Referring website</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use the collected information to:</p>
          <ul>
            <li>Provide and maintain the Platform</li>
            <li>Process transactions initiated through our interface</li>
            <li>Improve user experience and platform functionality</li>
            <li>Detect and prevent fraud or abuse</li>
            <li>Comply with legal obligations</li>
            <li>Communicate with you about updates or support</li>
          </ul>

          <h2>4. Data Storage and Security</h2>
          <p>
            We do not store your private keys, seed phrases, or wallet credentials. All transactions are executed directly on the blockchain through your connected wallet. We implement reasonable security measures to protect the limited data we collect, but cannot guarantee absolute security of data transmitted over the internet.
          </p>

          <h2>5. Third-Party Services</h2>
          <p>Our Platform integrates with third-party services including:</p>
          <ul>
            <li><strong>KyberSwap Protocol:</strong> For liquidity and swap functionality</li>
            <li><strong>Wallet Providers:</strong> MetaMask, WalletConnect, and others</li>
            <li><strong>Analytics Services:</strong> For platform usage analysis</li>
          </ul>
          <p>
            These third-party services have their own privacy policies, and we encourage you to review them.
          </p>

          <h2>6. Cookies</h2>
          <p>
            We use cookies and similar tracking technologies to enhance your experience. For detailed information about our use of cookies, please see our <a href="/cookie-policy" style={{ color: '#28E0B9' }}>Cookie Policy</a>.
          </p>

          <h2>7. Your Rights</h2>
          <p>Depending on your location, you may have the right to:</p>
          <ul>
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to processing of your data</li>
            <li>Request data portability</li>
          </ul>

          <h2>8. Children&apos;s Privacy</h2>
          <p>
            Our Platform is not intended for individuals under the age of 18. We do not knowingly collect personal information from children.
          </p>

          <h2>9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date.
          </p>

          <h2>10. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at our <a href="/contact" style={{ color: '#28E0B9' }}>Contact Page</a>.
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