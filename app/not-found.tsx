import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import styled from 'styled-components'
import { FaHome, FaSearch } from 'react-icons/fa'

export default function NotFound() {
  return (
    <Container>
      <Header activePage="/" />
      <Content>
        <ErrorCode>404</ErrorCode>
        <Title>Page Not Found</Title>
        <Description>
          Oops! The page you're looking for doesn't exist or has been moved.
        </Description>
        <LinksContainer>
          <StyledLink href="/">
            <FaHome size={18} />
            Back to Home
          </StyledLink>
          <StyledLink href="/swap">
            <FaSearch size={18} />
            Go to Swap
          </StyledLink>
        </LinksContainer>
      </Content>
      <Footer />
    </Container>
  )
}

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #0a0a0f 0%, #12121a 100%);
`

const Content = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
`

const ErrorCode = styled.h1`
  font-size: 120px;
  font-weight: 700;
  background: linear-gradient(135deg, #20B8CD 0%, #6366f1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 80px;
  }
`

const Title = styled.h2`
  font-size: 32px;
  color: #ffffff;
  margin: 20px 0 10px;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`

const Description = styled.p`
  font-size: 16px;
  color: #a1a1aa;
  max-width: 400px;
  margin-bottom: 40px;
`

const LinksContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
`

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: linear-gradient(135deg, #20B8CD 0%, #6366f1 100%);
  color: #ffffff;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  transition: transform 0.2s, opacity 0.2s;

  &:hover {
    transform: translateY(-2px);
    opacity: 0.9;
  }
`
