'use client';
import React from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: #030014;
  padding-left: 300px;
  
  @media (max-width: 991px) {
    padding-left: 0;
    padding-top: 70px;
  }
`;

export default function LimitOrderClient() {
  return (
    <PageWrapper>
      <Header />
      <div style={{padding: '40px 20px', maxWidth: '1000px', margin: '0 auto'}}>
        <h1 style={{textAlign: 'center', color: '#a855f7', marginBottom: '30px'}}>Limit Orders</h1>
        {/* Il tuo widget KyberSwap per Limit Orders va qui */}
      </div>
    </PageWrapper>
  );
}
