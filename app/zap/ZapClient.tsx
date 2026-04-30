'use client';
import React from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: #030014;
  padding-left: 300px; /* Spazio per Sidebar Desktop */
  
  @media (max-width: 991px) {
    padding-left: 0;
    padding-top: 70px; /* Spazio per Header Mobile */
  }
`;

const ContentContainer = styled.div`
  padding: 40px 20px;
  max-width: 1000px;
  margin: 0 auto;
`;

export default function ZapClient() {
  return (
    <PageWrapper>
      <Header />
      <ContentContainer>
        <h1 style={{textAlign: 'center', color: '#a855f7', marginBottom: '30px'}}>Liquidity Zap</h1>
        {/* Qui incolla il tuo widget KyberSwap esistente o il codice del Zap */}
        <div style={{background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '16px', border: '1px solid #333'}}>
          <p style={{color: '#94a3b8', textAlign: 'center'}}>KyberSwap Zap Widget Loading...</p>
          {/* IL TUO CODICE WIDGET VA QUI */}
        </div>
      </ContentContainer>
    </PageWrapper>
  );
}
