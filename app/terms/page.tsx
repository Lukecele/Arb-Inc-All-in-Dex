'use client';
import SharedHeader from '../../components/Header';
import SharedFooter from '../../components/Footer';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding-left: 260px;
  min-height: 100vh;
  background: #030014;
  @media (max-width: 1024px) { padding-left: 0; padding-top: 70px; }
`;
const Content = styled.main`
  max-width: 860px;
  margin: 0 auto;
  padding: 50px 24px;
  color: #e2e8f0;
  font-family: Inter, sans-serif;
  line-height: 1.8;
  h1 { color: #a855f7; font-size: 2rem; margin-bottom: 8px; }
  h2 { color: #c4b5fd; font-size: 1.15rem; margin: 2rem 0 0.5rem; }
  p { color: #94a3b8; margin-bottom: 1rem; }
  .warning { background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.3);
    border-radius: 10px; padding: 1rem 1.2rem; color: #fca5a5; margin: 1.5rem 0; }
  .updated { color: #64748b; font-size: 0.85rem; margin-bottom: 2.5rem; }
`;

export default function TermsPage() {
  return (
    <>
      <SharedHeader />
      <Wrapper>
        <Content>
          <h1>Terms of Service</h1>
          <p className="updated">Last updated: May 2025</p>

          <div className="warning">
            <strong>⚠️ Risk Warning:</strong> Crypto-assets are highly speculative and volatile.
            You may lose ALL of your invested capital. Displayed APR figures are historical
            calculations — not guaranteed future returns. This is NOT financial advice.
          </div>

          <h2>1. Nature of the Service</h2>
          <p>Arbitrage Inception provides a non-custodial, open-source frontend interface to interact
          with third-party decentralized protocols (KyberSwap, PancakeSwap, Mayan Finance).
          This interface does not hold, manage, or custody user funds at any time.</p>

          <h2>2. No Regulatory Authorization</h2>
          <p>This service has not been authorized or regulated by any financial authority,
          including Italy's Banca d'Italia, CONSOB, OAM, or any EU competent authority under
          MiCA Regulation (EU) 2023/1114. It operates as open-source software only.</p>

          <h2>3. Eligibility</h2>
          <p>By using this interface you confirm that: (a) you are not subject to sanctions by
          OFAC, EU, UN or any other regulatory body; (b) you are of legal age in your jurisdiction;
          (c) you understand the risks associated with decentralized finance.</p>

          <h2>4. Smart Contract Risk</h2>
          <p>All transactions interact with third-party smart contracts. These may contain bugs or
          vulnerabilities. No liability is assumed for losses due to hacks, exploits, slippage,
          failed transactions, or network failures.</p>

          <h2>5. APR & Yield Figures</h2>
          <p>Any APR, yield rate, or return figure displayed is a real-time mathematical calculation
          based on current on-chain protocol fees. These figures are highly variable, may reach 0%
          at any time, and do not constitute a promise or guarantee of future returns.</p>

          <h2>6. Open Source Software</h2>
          <p>This frontend is released under the MIT License. Anyone may inspect, fork, and deploy
          their own instance. The software is provided "as-is" with no warranty of any kind.</p>

          <h2>7. Token Tax Disclosure</h2>
          <p>The ARB Inc token carries a 4% buy/sell tax routed to the protocol treasury.
          Additionally, a 0.1% DEX interface fee is applied via the KyberSwap widget and routed
          to the protocol treasury for distribution to token holders.</p>

          <h2>8. No Liability</h2>
          <p>To the maximum extent permitted by law, no developer, contributor, or associated party
          shall be liable for any direct, indirect, incidental, or consequential damages arising
          from use of this interface.</p>

          <h2>9. Modifications</h2>
          <p>These terms may be updated at any time via commit to the public GitHub repository.
          Continued use after any update constitutes acceptance of the revised terms.</p>
        </Content>
      </Wrapper>
      <SharedFooter />
    </>
  );
}
