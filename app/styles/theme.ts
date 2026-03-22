// Modern Design System - Arbitrage Inception
// Inspired by shadcn-ui + DeFi aesthetic

export const theme = {
  colors: {
    // Primary brand colors
    primary: {
      DEFAULT: '#8B5CF6',
      light: '#A78BFA',
      dark: '#7C3AED',
      gradient: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
    },
    
    // Accent colors  
    accent: {
      DEFAULT: '#28E0B9',
      light: '#5EEAD4',
      dark: '#14B8A6',
      pink: '#EC4899',
    },
    
    // Background layers
    background: {
      DEFAULT: '#09090b',        // Deepest black
      primary: '#0f0f1a',        // Main background
      secondary: '#18181b',      // Card backgrounds
      tertiary: '#27272a',       // Elevated elements
      overlay: 'rgba(0, 0, 0, 0.8)',
    },
    
    // Text hierarchy
    text: {
      primary: '#fafafa',        // Highest contrast
      secondary: '#a1a1aa',      // Secondary info
      muted: '#71717a',          // Placeholder/muted
      accent: '#a78bfa',         // Accent text
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
      DEFAULT: 'rgba(255, 255, 255, 0.1)',
      hover: 'rgba(139, 92, 246, 0.5)',
      focus: '#8B5CF6',
    },
    
    // Glass effect backgrounds
    glass: {
      light: 'rgba(255, 255, 255, 0.03)',
      medium: 'rgba(255, 255, 255, 0.05)',
      heavy: 'rgba(255, 255, 255, 0.1)',
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
  
  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    DEFAULT: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
    md: '0 10px 15px -3px rgba(0, 0, 0, 0.4)',
    lg: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
    glow: '0 0 20px rgba(139, 92, 246, 0.4)',
    glowStrong: '0 0 40px rgba(139, 92, 246, 0.6)',
    innerGlow: 'inset 0 0 20px rgba(139, 92, 246, 0.1)',
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
