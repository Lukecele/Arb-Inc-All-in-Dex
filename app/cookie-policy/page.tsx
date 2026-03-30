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

export default function CookiePolicyPage() {
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
            <NavLink href="/limit-orders">Limit Orders</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </Nav>
        </Header>

        <MainContent>
          <h1>Cookie Policy</h1>
          <p className="last-updated">Last Updated: March 25, 2026</p>

          <h2>1. What Are Cookies</h2>
          <p>
            Cookies are small text files that are placed on your device (computer, tablet, or mobile) when you visit our website. They are widely used to make websites work more efficiently and to provide information to website owners.
          </p>

          <h2>2. How We Use Cookies</h2>
          <p>We use cookies on https://arbitrage-inc.exchange for the following purposes:</p>
          <ul>
            <li><strong>Essential Cookies:</strong> These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and wallet connection persistence.</li>
            <li><strong>Analytics Cookies:</strong> These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.</li>
            <li><strong>Preference Cookies:</strong> These cookies allow the website to remember choices you make (such as your preferred language or region) and provide enhanced, more personal features.</li>
          </ul>

          <h2>3. Types of Cookies We Use</h2>
          
          <p><strong>3.1 Strictly Necessary Cookies</strong></p>
          <p>These cookies are essential for you to browse the website and use its features, such as accessing secure areas. Consent is not required for these cookies.</p>
          <ul>
            <li>Session management</li>
            <li>Wallet connection state</li>
            <li>Security tokens</li>
          </ul>

          <p><strong>3.2 Performance and Analytics Cookies</strong></p>
          <p>These cookies collect information about how you use our website, like which pages you visited and which links you clicked on. This information is aggregated and anonymous.</p>
          <ul>
            <li>Page visit statistics</li>
            <li>Error logging</li>
            <li>Performance monitoring</li>
          </ul>

          <p><strong>3.3 Functionality Cookies</strong></p>
          <p>These cookies allow our website to remember choices you have made in the past.</p>
          <ul>
            <li>User preferences</li>
            <li>Language settings</li>
            <li>Display preferences</li>
          </ul>

          <h2>4. Third-Party Cookies</h2>
          <p>
            Some cookies are placed by third-party services that appear on our pages. We do not control these third-party cookies. You can block them by updating your browser settings or using third-party opt-out tools.
          </p>
          <p>Third-party services that may set cookies include:</p>
          <ul>
            <li>WalletConnect (for wallet connections)</li>
            <li>Analytics providers</li>
            <li>CDN services</li>
          </ul>

          <h2>5. Managing Cookies</h2>
          <p>
            Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may impact your overall user experience.
          </p>
          <p>To manage cookies in your browser:</p>
          <ul>
            <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies</li>
            <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</li>
            <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
            <li><strong>Edge:</strong> Settings → Cookies and site permissions</li>
          </ul>

          <h2>6. Cookie Retention</h2>
          <p>
            Cookies are retained for different periods depending on their purpose:
          </p>
          <ul>
            <li><strong>Session cookies:</strong> Deleted when you close your browser</li>
            <li><strong>Persistent cookies:</strong> Remain until they expire or you delete them (typically 1-24 months)</li>
          </ul>

          <h2>7. Your Rights (GDPR)</h2>
          <p>
            If you are located in the European Economic Area (EEA), you have the right to:
          </p>
          <ul>
            <li>Give or withdraw consent for non-essential cookies</li>
            <li>Access information about which cookies are being used</li>
            <li>Request deletion of cookie data</li>
          </ul>

          <h2>8. Updates to This Policy</h2>
          <p>
            We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.
          </p>

          <h2>9. Contact Us</h2>
          <p>
            If you have any questions about our use of cookies, please contact us at our <a href="/contact" style={{ color: '#28E0B9' }}>Contact Page</a>.
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