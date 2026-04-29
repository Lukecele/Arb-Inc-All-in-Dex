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

const ProfileCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 30px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  gap: 25px;
  
  @media (max-width: 600px) {
    flex-direction: column;
    text-align: center;
  }

  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-cover: cover;
    border: 3px solid #a78bfa;
    box-shadow: 0 0 15px rgba(167, 139, 250, 0.3);
  }

  .info {
    h1 { font-size: 1.8rem; margin-bottom: 5px; color: #ffffff; }
    h3 { font-size: 0.9rem; color: #a78bfa; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; }
    p { color: #8a8a9a; line-height: 1.5; font-size: 1rem; }
  }
`

const ContactCard = styled.div`
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 20px;
  padding: 28px 24px;
  margin-bottom: 16px;
  h2 { color: #a78bfa; font-size: 1.05rem; margin-bottom: 14px; }
  a { 
    color: #34d399; 
    text-decoration: none; 
    transition: opacity 0.2s;
    &:hover { opacity: 0.8; }
  }
`

const SocialGrid = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 15px;
  flex-wrap: wrap;

  a {
    padding: 12px 20px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    font-size: 0.9rem;
    color: #ffffff !important;
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 8px;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: #a78bfa;
    }
  }
`

export default function ContactPage() {
  return (
    <>
      <GlobalStyle />
      <Container>
        <SharedHeader activePage="/contact" />
        
        <MainContent>
          {/* Profilo Personale */}
          <ProfileCard>
            <img src="/doc.jpg" alt="Luca Celebrano" />
            <div className="info">
              <h3>Medical Student</h3>
              <h1>Luca Celebrano</h1>
              <p>Medical student passionate about decentralized finance and arbitrage systems. Bridging the gap between medical precision and technological innovation.</p>
            </div>
          </ProfileCard>

          <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Contact Channels</h2>

          <ContactCard>
            <h2>📧 Email Support</h2>
            <a href="mailto:luca.celebrano1@gmail.com">luca.celebrano1@gmail.com</a>
          </ContactCard>

          <ContactCard>
            <h2>📱 Community & Social</h2>
            <SocialGrid>
              <a href="https://t.me/ArbitrageInception" target="_blank">Telegram</a>
              <a href="https://x.com/Arbitrageincept" target="_blank">Twitter</a>
              <a href="https://www.facebook.com/luca.celebrano" target="_blank">Facebook</a>
              <a href="https://www.linkedin.com/in/luca-celebrano-24a289247" target="_blank">LinkedIn</a>
            </SocialGrid>
          </ContactCard>
        </MainContent>

        <SharedFooter />
      </Container>
    </>
  )
}
