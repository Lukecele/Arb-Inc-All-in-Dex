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
`

const MainContent = styled.main`
  flex: 1;
  width: 100%;
  max-width: 800px;
  padding: 40px 20px;
  color: #ffffff;
`

const ContactCard = styled.div`
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 20px;
  padding: 28px 24px;
  margin-bottom: 16px;
  h2 { color: #a78bfa; font-size: 1.05rem; margin-bottom: 14px; }
  a { color: #34d399; text-decoration: none; }
`

export default function ContactPage() {
  return (
    <>
      <GlobalStyle />
      <Container>
        <SharedHeader activePage="/contact" />
        
        {/* Banner UNICO 3 */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '30px 0 10px 0', minHeight: '250px' }}>
          <span id="ct_cTsuCksMpJ3"></span>
        </div>

        <MainContent>
          <h1>Contact Us</h1>
          <p style={{ color: '#8a8a9a', marginBottom: '30px' }}>Reach out to us through our official channels.</p>

          <ContactCard>
            <h2>📧 Email Support</h2>
            <a href="mailto:luca.celebrano1@gmail.com">luca.celebrano1@gmail.com</a>
          </ContactCard>

          <ContactCard>
            <h2>📱 Community</h2>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <a href="https://t.me/ArbitrageInception" target="_blank" style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>Telegram</a>
              <a href="https://x.com/Arbitrageincept" target="_blank" style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>Twitter</a>
            </div>
          </ContactCard>
        </MainContent>

        {/* Banner UNICO 4 */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '20px 0 40px 0', minHeight: '250px' }}>
          <span id="ct_ct6kxn0fBVV"></span>
        </div>

        <SharedFooter />
      </Container>
    </>
  )
}
