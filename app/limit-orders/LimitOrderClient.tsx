'use client';
import React from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: #030014;
  padding-left: 300px;
  display: flex;
  flex-direction: column;

  @media (max-width: 991px) {
    padding-left: 0;
    padding-top: 70px;
  }
`;

const WidgetWrapper = styled.div`
  width: 100%;
  max-width: 480px; /* <--- Ottimale per Limit Orders */
  margin: 60px auto;
  background: #0b081a;
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 20px;
  overflow: hidden;
`;

export default function LimitOrderClient() {
  return (
    <PageWrapper>
      <Header />
      <div className="notranslate" translate="no" style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <WidgetWrapper>
           {/* Inserisci qui il widget Limit Order */}
           <div className="notranslate" translate="no" style={{height: '650px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b'}}>
             KyberSwap Limit Orders
           </div>
        </WidgetWrapper>
      </div>
    </PageWrapper>
  );
}
