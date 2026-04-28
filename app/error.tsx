'use client';

import { useEffect } from 'react';
import styled from 'styled-components';

const ErrorWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #030014;
  color: white;
  font-family: 'Inter', sans-serif;
`;

const Button = styled.button`
  background: #a855f7;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 20px;
`;

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorWrapper>
      <h2 style={{fontSize: '2rem'}}>Stabilizing Protocol...</h2>
      <p style={{color: '#94a3b8'}}>A minor ghost in the shell was detected.</p>
      <Button onClick={() => reset()}>Refresh Navigation</Button>
    </ErrorWrapper>
  );
}
