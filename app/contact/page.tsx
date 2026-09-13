"use client";

import styled, { createGlobalStyle } from "styled-components";
import SharedFooter from "../../components/Footer";
import SharedHeader from "../../components/Header";
import theme from "../styles/theme";

const GlobalStyle = createGlobalStyle`
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: ${theme.typography.fontFamily};
    background: ${theme.colors.background.primary};
    color: #FFFFFF;
    min-height: 100vh;
  }
`;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 15px;
  padding-left: 275px;
  @media (max-width: 1024px) {
    padding-left: 15px;
    padding-top: 70px;
  }
`;

const MainContent = styled.main`
  flex: 1;
  width: 100%;
  max-width: 800px;
  padding: 40px 20px;
  color: #ffffff;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: #ffffff;
`;

const PageSubtitle = styled.p`
  color: #94a3b8;
  margin-bottom: 36px;
  font-size: 1rem;
  line-height: 1.6;
`;

const ContactCard = styled.div`
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 20px;
  padding: 28px 24px;
  margin-bottom: 16px;

  h2 {
    color: #a78bfa;
    font-size: 1.05rem;
    margin-bottom: 14px;
  }

  p {
    color: #94a3b8;
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 16px;
  }

  a {
    color: #34d399;
    text-decoration: none;
    transition: opacity 0.2s;
    &:hover { opacity: 0.8; }
  }
`;

const SocialGrid = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;

  a {
    padding: 12px 20px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    font-size: 0.9rem;
    color: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.1);
    text-decoration: none;
    transition: all 0.2s;

    &:hover {
      background: rgba(168, 85, 247, 0.1);
      border-color: #a78bfa;
    }
  }
`;

const OpenSourceNote = styled.div`
  background: rgba(139, 92, 246, 0.06);
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 16px;
  padding: 24px;
  margin-top: 24px;

  h3 { color: #a855f7; font-size: 1rem; margin-bottom: 10px; }

  p {
    color: #94a3b8;
    font-size: 0.9rem;
    line-height: 1.6;
    margin: 0;
  }

  a { color: #34d399; text-decoration: none; }
`;

export default function ContactPage() {
	return (
		<>
			<GlobalStyle />
			<Container>
				<SharedHeader activePage="/contact" />

				<MainContent>
					<PageTitle>Contact &amp; Support</PageTitle>
					<PageSubtitle>
						Arbitrage Inception is a decentralized, open-source client interface
						maintained by independent community contributors. All support and
						protocol discussions are conducted through the community channels
						below.
					</PageSubtitle>

					<ContactCard>
						<h2>💬 Community Support (Primary)</h2>
						<p>
							The Telegram community is the fastest way to get help, report
							issues, or discuss the protocol. Questions are answered by
							community members and contributors.
						</p>
						<SocialGrid>
							<a
								href="https://t.me/ArbitrageInception"
								target="_blank"
								rel="noopener noreferrer"
							>
								Telegram Community
							</a>
							<a
								href="https://x.com/Arbitrageincept"
								target="_blank"
								rel="noopener noreferrer"
							>
								X / Twitter
							</a>
						</SocialGrid>
					</ContactCard>

					<ContactCard>
						<h2>🐛 Bug Reports &amp; Contributions</h2>
						<p>
							Found a bug or want to contribute? The codebase is fully
							open-source under the MIT License. Open an issue or pull request
							directly on GitHub.
						</p>
						<SocialGrid>
							<a
								href="https://github.com/Lukecele/Arb-Inc-All-in-Dex/issues"
								target="_blank"
								rel="noopener noreferrer"
							>
								GitHub Issues
							</a>
							<a
								href="https://github.com/Lukecele/Arb-Inc-All-in-Dex"
								target="_blank"
								rel="noopener noreferrer"
							>
								Source Code
							</a>
						</SocialGrid>
					</ContactCard>

					<ContactCard>
						<h2>🔒 Security Disclosures</h2>
						<p>
							For responsible disclosure of security vulnerabilities, open a
							confidential issue on GitHub or reach out privately via Telegram
							to community moderators.
						</p>
						<p style={{ color: "#ef4444", marginBottom: 0 }}>
							<strong>Warning:</strong> Arbitrage Inception will never ask for
							your private keys, seed phrases, or wallet passwords. Beware of
							impersonators.
						</p>
					</ContactCard>

					<OpenSourceNote>
						<h3>🔓 Open Source by Design</h3>
						<p>
							This project operates as independent, non-custodial open-source software
							with no corporate custody or central financial authority. The client code is
							released under the{" "}
							<a
								href="https://github.com/Lukecele/Arb-Inc-All-in-Dex/blob/main/LICENSE"
								target="_blank"
								rel="noopener noreferrer"
							>
								MIT License
							</a>
							, meaning anyone can audit, fork, deploy, or contribute freely.
							Transparency and smart contract immutability are the foundation of
							this protocol — inspect the code on GitHub.
						</p>
					</OpenSourceNote>
				</MainContent>

				<SharedFooter />
			</Container>
		</>
	);
}
