'use client';
import React from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: #030014;
  padding-left: 300px; /* Spazio sidebar desktop */
  display: flex;
  flex-direction: column;
  
  @media (max-width: 991px) {
    padding-left: 0;
    padding-top: 70px;
  }
`;

const WidgetSection = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center; /* Centra orizzontalmente */
  justify-content: center; /* Centra verticalmente */
  padding: 40px 20px;
`;

const WidgetWrapper = styled.div`
  width: 100%;
  max-width: 450px; /* <--- Dimensione standard KyberSwap */
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(168, 85, 247, 0.2);
  border-radius: 24px;
  padding: 10px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
`;

export default function ZapClient() {
  return (
    <PageWrapper>
      <Header />
      <WidgetSection>
        <h2 style={{color: '#fff', marginBottom: '20px', fontSize: '1.5rem'}}>Liquidity Zap</h2>
        <WidgetWrapper>
          {/* Inserisci qui il tuo <iframe /> o componente KyberSwap */}
          <div   style={{height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b'}}>
             KyberSwap Zap Widget
          </div>
        </WidgetWrapper>
      </WidgetSection>
    </PageWrapper>
  );
}
