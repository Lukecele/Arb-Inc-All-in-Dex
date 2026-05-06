'use client';
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
`;
const H1 = styled.h1`color: #a855f7; font-size: 2rem; margin-bottom: 8px;`;
const H2 = styled.h2`color: #c4b5fd; font-size: 1.15rem; margin: 2rem 0 0.5rem;`;
const P = styled.p`color: #94a3b8; margin-bottom: 1rem;`;
const UL = styled.ul`color: #94a3b8; margin-bottom: 1rem; padding-left: 1.5rem;`;
const Updated = styled.p`color: #64748b; font-size: 0.85rem; margin-bottom: 2.5rem;`;

export default function CookiePolicyPage() {
  return (
    <Wrapper>
      <Content>
        <H1>Cookie Policy</H1>
        <Updated>Last updated: May 2025</Updated>

        <H2>1. What Are Cookies</H2>
        <P>
          Cookies are small text files placed on your device when you visit a website.
          They are widely used to make websites function properly and to remember your preferences.
        </P>

        <H2>2. Cookies We Use</H2>
        <P>
          This website uses <strong>only strictly necessary cookies</strong>. We do not use
          analytics, tracking, advertising, or third-party profiling cookies of any kind.
        </P>
        <UL>
          <li><strong>Session cookies:</strong> Maintain your wallet connection state during a browsing session.</li>
          <li><strong>Preference cookies:</strong> Remember UI choices such as theme or language (stored locally).</li>
          <li><strong>Security tokens:</strong> Prevent cross-site request forgery (CSRF) and protect form submissions.</li>
          <li><strong>EEA disclaimer flag:</strong> Records whether you have acknowledged the risk notice (localStorage only, not transmitted).</li>
        </UL>

        <H2>3. Cookies We Do NOT Use</H2>
        <P>We explicitly do <strong>not</strong> deploy:</P>
        <UL>
          <li>Google Analytics or any analytics tracking</li>
          <li>Facebook Pixel or social media trackers</li>
          <li>Advertising or retargeting cookies</li>
          <li>Third-party performance monitoring cookies</li>
          <li>Coinzilla or any ad network cookies</li>
        </UL>

        <H2>4. Legal Basis (GDPR Art. 6)</H2>
        <P>
          Strictly necessary cookies are processed on the basis of <strong>legitimate interest</strong> (Art. 6(1)(f) GDPR)
          as they are essential for the website to function. No consent is required for these cookies under
          the ePrivacy Directive Recital 66.
        </P>

        <H2>5. Data Retention</H2>
        <P>
          Session cookies are deleted when you close your browser. localStorage items (EEA disclaimer flag)
          persist until you clear your browser storage. No cookie data is transmitted to external servers.
        </P>

        <H2>6. Your Controls</H2>
        <P>
          You can delete or block cookies at any time via your browser settings. Blocking strictly necessary
          cookies may prevent wallet connection features from working correctly.
        </P>

        <H2>7. Changes to This Policy</H2>
        <P>
          Any updates to this policy will be published via public commit to the GitHub repository.
          The date at the top of this page reflects the most recent revision.
        </P>
      </Content>
    </Wrapper>
  );
}
