'use client';

import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '40px', 
          textAlign: 'center', 
          background: '#030309', 
          minHeight: '100vh', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <h1 style={{ color: '#EF4444', marginBottom: '16px', fontSize: '32px' }}>Something went wrong</h1>
          <p style={{ color: '#94A3B8', marginBottom: '24px', maxWidth: '500px', lineHeight: 1.6 }}>
            We apologize for the inconvenience. Please try refreshing the page.
          </p>
          <button 
            onClick={() => window.location.reload()}
            style={{ 
              padding: '12px 32px', 
              background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)', 
              border: 'none', 
              color: '#fff', 
              borderRadius: '10px', 
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '16px'
            }}
          >
            Refresh Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
