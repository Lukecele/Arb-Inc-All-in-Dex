'use client';

import { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  gap: 8px;
  flexWrap: wrap;
  justifyContent: center;
`;

const Input = styled.input`
  padding: 10px 16px;
  borderRadius: 10px;
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.05);
  color: #fff;
  flex: 1 1 200px;
  fontSize: 14px;
  
  &:focus {
    outline: none;
    border-color: #8B5CF6;
    box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.3);
  }
  
  &::placeholder {
    color: rgba(255,255,255,0.4);
  }
`;

const Button = styled.button<{ $loading?: boolean }>`
  padding: 10px 24px;
  borderRadius: 10px;
  background: ${({ $loading }) => $loading 
    ? 'linear-gradient(135deg, #6B7280, #4B5563)' 
    : 'linear-gradient(135deg, #8B5CF6, #7C3AED)'};
  border: none;
  color: #fff;
  fontWeight: 600;
  cursor: ${({ $loading }) => $loading ? 'not-allowed' : 'pointer'};
  fontSize: 14px;
  opacity: ${({ $loading }) => $loading ? 0.7 : 1};
  transition: all 0.2s ease;
  
  &:hover {
    ${({ $loading }) => !$loading && `
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
    `}
  }
`;

const Message = styled.p<{ $error?: boolean }>`
  width: 100%;
  margin-top: 12px;
  font-size: 13px;
  color: ${({ $error }) => $error ? '#EF4444' : '#10B981'};
`;

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setStatus('error');
      setMessage('Please enter your email');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setMessage('Successfully subscribed! Thank you.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Subscription failed');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        aria-label="Email address"
        disabled={status === 'loading'}
      />
      <Button type="submit" $loading={status === 'loading'}>
        {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
      </Button>
      {message && <Message $error={status === 'error'} role="alert">{message}</Message>}
    </Form>
  );
}
