// Modern Design System - Arbitrage Inception
// Premium DeFi aesthetic inspired by Uniswap, Aave, Lido

export const theme = {
  colors: {
    // Primary brand colors
    primary: {
      DEFAULT: '#8B5CF6',
      light: '#A78BFA',
      dark: '#7C3AED',
      gradient: 'linear-gradient(135deg, #8B5CF6 0%, #C084FC 50%, #EC4899 100%)',
    },
    
    // Accent colors  
    accent: {
      DEFAULT: '#2DD4BF',
      light: '#5EEAD4',
      dark: '#14B8A6',
      pink: '#EC4899',
    },
    
    // Background layers - deeper, richer
    background: {
      DEFAULT: '#050508',
      primary: '#0a0a12',
      secondary: '#111118',
      tertiary: '#1a1a24',
      overlay: 'rgba(0, 0, 0, 0.85)',
    },
    
    // Text hierarchy
    text: {
      primary: '#fafafa',
      secondary: '#a1a1aa',
      muted: '#71717a',
      accent: '#c084fc',
    },
    
    // Status colors
    status: {
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
    
    // Borders
    border: {
      DEFAULT: 'rgba(255, 255, 255, 0.06)',
      hover: 'rgba(139, 92, 246, 0.4)',
      focus: '#8B5CF6',
    },
    
    // Glass effect backgrounds - subtler
    glass: {
      light: 'rgba(255, 255, 255, 0.02)',
      medium: 'rgba(255, 255, 255, 0.04)',
      heavy: 'rgba(255, 255, 255, 0.08)',
    },
  },
  
  // Typography
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    displayFont: "'Space Grotesk', sans-serif",
    sizes: {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '18px',
      xl: '24px',
      '2xl': '32px',
      '3xl': '40px',
      '4xl': '48px',
      hero: '56px',
    },
    weights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      black: 900,
    },
    lineHeights: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  
  // Spacing scale (4px base)
  spacing: {
    0: '0',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    8: '32px',
    10: '40px',
    12: '48px',
    16: '64px',
    20: '80px',
  },
  
  // Border radius
  borderRadius: {
    none: '0',
    sm: '6px',
    DEFAULT: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '32px',
    full: '9999px',
  },
  
  // Shadows with enhanced glow
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.4)',
    DEFAULT: '0 4px 6px -1px rgba(0, 0, 0, 0.4)',
    md: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
    lg: '0 20px 25px -5px rgba(0, 0, 0, 0.6)',
    glow: '0 0 20px rgba(139, 92, 246, 0.3), 0 0 60px rgba(139, 92, 246, 0.1)',
    glowStrong: '0 0 30px rgba(139, 92, 246, 0.4), 0 0 80px rgba(139, 92, 246, 0.15)',
    innerGlow: 'inset 0 0 20px rgba(139, 92, 246, 0.08)',
  },
  
  // Transitions
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    DEFAULT: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '400ms cubic-bezier(0.4, 0, 0.2, 1)',
    spring: '500ms cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
  
  // Z-index layers
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },
}

export type Theme = typeof theme

export default theme
