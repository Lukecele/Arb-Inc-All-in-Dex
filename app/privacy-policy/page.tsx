"use client";

import styled, { createGlobalStyle } from "styled-components";
import theme from "../styles/theme";

const GlobalStyle = createGlobalStyle`
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: ${theme.typography.fontFamily}; background: linear-gradient(135deg, ${theme.colors.background.primary} 0%, #1a1a3e 50%, ${theme.colors.background.secondary} 100%); color: #FFFFFF; min-height: 100vh; }
`;
const Container = styled.div`min-height:100vh;display:flex;flex-direction:column;align-items:center;padding:20px 15px;@media(min-width:769px){padding:40px 20px;}`;
const PageHeader = styled.header`width:100%;max-width:1200px;display:flex;justify-content:space-between;align-items:center;padding:15px 0;flex-wrap:wrap;gap:10px;border-bottom:1px solid ${theme.colors.border.DEFAULT};`;
const LogoSection = styled.div`display:flex;align-items:center;gap:12px;`;
const Logo = styled.img`width:40px;height:40px;border-radius:${theme.borderRadius.full};box-shadow:${theme.shadows.glow};`;
const SiteTitle = styled.h1`font-size:18px;font-weight:700;background:${theme.colors.primary.gradient};-webkit-background-clip:text;-webkit-text-fill-color:transparent;`;
const Nav = styled.nav`display:flex;gap:12px;background:${theme.colors.glass.medium};padding:10px 20px;border-radius:50px;border:1px solid ${theme.colors.border.DEFAULT};@media(max-width:768px){gap:8px;padding:8px 16px;}`;
const NavLink = styled.a`color:${theme.colors.text.secondary};text-decoration:none;font-weight:500;font-size:14px;padding:8px 16px;border-radius:20px;transition:${theme.transitions.fast};&:hover{color:${theme.colors.text.primary};background:${theme.colors.glass.heavy};}`;
const MainContent = styled.main`
  flex:1;width:100%;max-width:800px;padding:40px 20px;color:#ffffff;line-height:1.8;font-family:sans-serif;
  h1{color:#f3ba2f;font-size:2rem;margin-bottom:10px;}
  h2{color:#f3ba2f;font-size:1.4rem;margin-top:30px;margin-bottom:15px;}
  h3{color:#c8a400;font-size:1.05rem;margin-top:18px;margin-bottom:10px;}
  p{margin-bottom:15px;color:#e0e0e0;}
  ul{padding-left:20px;margin-bottom:15px;}
  li{margin-bottom:8px;color:#e0e0e0;}
  .last-updated{color:#888;font-size:0.9rem;margin-bottom:30px;}
  a{color:#28E0B9;}
  table{width:100%;border-collapse:collapse;margin-bottom:20px;}
  th{background:rgba(243,186,47,0.1);color:#f3ba2f;padding:10px;text-align:left;border:1px solid rgba(255,255,255,0.1);}
  td{padding:10px;border:1px solid rgba(255,255,255,0.1);color:#e0e0e0;}
`;
const PageFooter = styled.footer`width:100%;max-width:1200px;padding:40px 0;text-align:center;color:${theme.colors.text.muted};font-size:14px;`;
const FooterLinks = styled.div`display:flex;justify-content:center;gap:20px;margin-bottom:15px;flex-wrap:wrap;a{color:${theme.colors.accent.DEFAULT};text-decoration:none;&:hover{text-decoration:underline;}}`;
const Disclaimer = styled.div`max-width:600px;margin:0 auto 20px;padding:15px;background:rgba(255,152,0,0.1);border:1px solid rgba(255,152,0,0.3);border-radius:8px;color:#FF9901;font-size:12px;line-height:1.5;`;

export default function PrivacyPolicyPage() {
	return (
		<>
			<GlobalStyle />
			<Container>
				<PageHeader>
					<LogoSection>
						<Logo src="/logo.jpg" alt="Arbitrage Inception" />
						<SiteTitle>Arbitrage Inception</SiteTitle>
					</LogoSection>
					<Nav>
						<NavLink href="/">Home</NavLink>
						<NavLink href="/swap-all">Swap</NavLink>
						<NavLink href="/zap">Zap</NavLink>
						<NavLink href="/bridge">Bridge</NavLink>
						<NavLink href="/limit-orders">Limit Orders</NavLink>
						<NavLink href="/rewards">Rewards</NavLink>
						<NavLink href="/contact">Contact</NavLink>
					</Nav>
				</PageHeader>

				<MainContent>
					<h1>Privacy Policy</h1>
					<p className="last-updated">
						Last Updated: May 6, 2026 — pursuant to Art. 13 Reg. EU 2016/679
						(GDPR) and D.Lgs. 196/2003 as amended by D.Lgs. 101/2018
					</p>

					<h2>1. Data Controller</h2>
					<p>
						This platform is operated by <strong>Arbitrage Inception</strong>,
						an anonymous, community-driven open-source project (MIT License)
						with no registered legal entity. For privacy-related requests, reach
						us via:{" "}
						<a
							href="https://t.me/ArbitrageInception"
							target="_blank"
							rel="noopener noreferrer"
						>
							Telegram
						</a>{" "}
						or{" "}
						<a
							href="https://github.com/Lukecele/Arb-Inc-All-in-Dex/issues"
							target="_blank"
							rel="noopener noreferrer"
						>
							GitHub Issues
						</a>
						. We will respond within 30 days as required by Art. 12 GDPR.
					</p>
					<p>
						No Data Protection Officer (DPO) has been appointed as the
						processing does not fall within the mandatory cases under Art. 37
						GDPR.
					</p>

					<h2>2. Data Processed, Purposes, and Legal Bases</h2>

					<h3>2.1 Technical Navigation Data</h3>
					<p>
						Systems automatically collect data implicit in internet
						communications:
					</p>
					<ul>
						<li>IP address (anonymized where possible)</li>
						<li>Browser type and version</li>
						<li>Operating system and device type</li>
						<li>Pages visited and time spent</li>
						<li>Referring website</li>
					</ul>
					<p>
						<strong>Legal basis:</strong> Legitimate interest (Art. 6(1)(f)
						GDPR) — platform security and functionality.
					</p>
					<p>
						<strong>Retention:</strong> Maximum 12 months, unless required by
						law.
					</p>

					<h3>2.2 Blockchain Wallet Address</h3>
					<p>
						When you connect a crypto wallet, the public address becomes visible
						to the interface. Wallet addresses are publicly available on-chain.
						We process this data solely to enable the service you requested.
					</p>
					<p>
						<strong>Legal basis:</strong> Performance of requested service (Art.
						6(1)(b) GDPR).
					</p>

					<h3>2.3 Analytics Data (Google Analytics 4)</h3>
					<p>
						The platform uses Google Analytics 4 with IP anonymization enabled.
						Data collected is aggregated and does not directly identify
						individual users.
					</p>
					<p>
						<strong>Legal basis:</strong> Consent (Art. 6(1)(a) GDPR) — obtained
						via cookie banner.
					</p>
					<p>
						<strong>Extra-EU transfer:</strong> Google LLC (USA) — covered by
						Standard Contractual Clauses (SCC) per EU Commission Decision
						2021/914.{" "}
						<a
							href="https://tools.google.com/dlpage/gaoptout"
							target="_blank"
							rel="noopener noreferrer"
						>
							Opt-out here
						</a>
						.
					</p>

					<h2>3. What We Do NOT Collect</h2>
					<p>
						We do not store private keys, seed phrases, or wallet passwords. All
						transactions are executed directly on-chain via the user&apos;s own
						wallet. No party associated with this project has access to user
						funds.
					</p>

					<h2>4. Data Sharing</h2>
					<p>
						Personal data is not sold or transferred to third parties for
						commercial purposes. Data may be shared with:
					</p>
					<ul>
						<li>
							Technical service providers (hosting, CDN) to the extent strictly
							necessary
						</li>
						<li>Public authorities upon lawful request</li>
						<li>Google LLC (Analytics) — with SCC guarantees</li>
					</ul>

					<h2>5. Your Rights (Arts. 15–22 GDPR)</h2>
					<ul>
						<li>
							<strong>Access (Art. 15):</strong> Obtain confirmation of
							processing and a copy of your data
						</li>
						<li>
							<strong>Rectification (Art. 16):</strong> Correct inaccurate
							personal data
						</li>
						<li>
							<strong>Erasure / Right to be Forgotten (Art. 17)</strong>
						</li>
						<li>
							<strong>Restriction of Processing (Art. 18)</strong>
						</li>
						<li>
							<strong>Data Portability (Art. 20)</strong>
						</li>
						<li>
							<strong>Objection (Art. 21):</strong> Object to processing based
							on legitimate interest
						</li>
						<li>
							<strong>Withdrawal of Consent:</strong> Withdraw at any time
							without prejudice to prior lawful processing
						</li>
					</ul>
					<p>
						Exercise your rights via{" "}
						<a
							href="https://t.me/ArbitrageInception"
							target="_blank"
							rel="noopener noreferrer"
						>
							Telegram
						</a>{" "}
						or{" "}
						<a
							href="https://github.com/Lukecele/Arb-Inc-All-in-Dex/issues"
							target="_blank"
							rel="noopener noreferrer"
						>
							GitHub Issues
						</a>
						.
					</p>

					<h2>6. Right to Lodge a Complaint</h2>
					<p>
						Italian users may lodge a complaint with the{" "}
						<strong>Garante per la Protezione dei Dati Personali</strong>:{" "}
						<a
							href="https://www.garanteprivacy.it"
							target="_blank"
							rel="noopener noreferrer"
						>
							www.garanteprivacy.it
						</a>{" "}
						— garante@gpdp.it — Tel: +39 06 69677 1
					</p>

					<h2>7. Cookies</h2>
					<p>
						See our <a href="/cookie-policy">Cookie Policy</a> for full details.
					</p>

					<h2>8. Minors</h2>
					<p>
						The platform is not intended for users under 18. We do not knowingly
						collect data from minors. Contact us immediately if you believe a
						minor has provided data.
					</p>

					<h2>9. Policy Updates</h2>
					<p>
						Significant changes will be announced via the GitHub repository with
						at least 30 days notice. The current version is always available at
						this address.
					</p>

					<h2>10. Contact</h2>
					<p>
						Privacy questions:{" "}
						<a
							href="https://t.me/ArbitrageInception"
							target="_blank"
							rel="noopener noreferrer"
						>
							Telegram Community
						</a>{" "}
						or{" "}
						<a
							href="https://github.com/Lukecele/Arb-Inc-All-in-Dex/issues"
							target="_blank"
							rel="noopener noreferrer"
						>
							GitHub Issues
						</a>
						.
					</p>
				</MainContent>

				<PageFooter>
					<FooterLinks>
						<a href="/privacy-policy">Privacy Policy</a>
						<a href="/terms-of-service">Terms of Service</a>
						<a href="/cookie-policy">Cookie Policy</a>
						<a href="/contact">Contact</a>
					</FooterLinks>
					<Disclaimer>
						<strong>⚠️ Risk Disclaimer:</strong> Cryptocurrency trading involves
						high risk. Arbitrage Inception is an open-source frontend interface
						(MIT License). No party is responsible for financial losses. Trade
						responsibly.
					</Disclaimer>
					<p>
						© {new Date().getFullYear()} Arbitrage Inception Contributors — MIT
						License
					</p>
				</PageFooter>
			</Container>
		</>
	);
}
