export const theme = {
  colors: {
    primary: '#8B5CF6',
    secondary: '#EC4899',
    gradient: 'linear-gradient(90deg, #8B5CF6, #EC4899)',
    gradientHover: 'linear-gradient(90deg, #7C3AED, #DB2777)',
    accent: '#28E0B9',
    background: {
      primary: '#0f0f1a',
      secondary: '#1a1a3e',
      tertiary: '#27262C',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#A9A9A9',
      muted: '#666666',
    },
    status: {
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      coming: '#8B5CF6',
      done: '#10B981',
    },
    border: 'rgba(255, 255, 255, 0.1)',
    card: 'rgba(255, 255, 255, 0.03)',
    glass: 'rgba(255, 255, 255, 0.05)',
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    sizes: {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '18px',
      xl: '24px',
      xxl: '32px',
      hero: '48px',
    },
    weights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    xxl: '32px',
    xxxl: '48px',
  },
  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    full: '9999px',
  },
  shadows: {
    subtle: '0 2px 8px rgba(0, 0, 0, 0.3)',
    medium: '0 4px 16px rgba(0, 0, 0, 0.4)',
    strong: '0 8px 32px rgba(0, 0, 0, 0.5)',
    glow: '0 0 20px rgba(139, 92, 246, 0.3)',
  },
  transitions: {
    fast: '150ms ease-out',
    normal: '200ms ease-out',
    slow: '300ms ease-out',
  },
}

export type Theme = typeof theme
