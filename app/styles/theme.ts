// Modern Design System - Arbitrage Inception
// "Midnight Prism" — Premium DeFi aesthetic

export const theme = {
  colors: {
    // Primary brand colors — Electric Violet
    primary: {
      DEFAULT: '#7C3AED',
      light: '#A78BFA',
      dark: '#6D28D9',
      gradient: 'linear-gradient(135deg, #7C3AED 0%, #9333EA 50%, #EC4899 100%)',
      gradientHoriz: 'linear-gradient(90deg, #7C3AED, #9333EA, #EC4899)',
    },

    // Accent colors
    accent: {
      DEFAULT: '#06B6D4',
      light: '#67E8F9',
      dark: '#0891B2',
      pink: '#EC4899',
      gold: '#F59E0B',
      goldLight: '#FCD34D',
    },

    // Background layers — deep midnight blue-black
    background: {
      DEFAULT: '#030309',
      primary: '#070715',
      secondary: '#0c0c1e',
      tertiary: '#121228',
      overlay: 'rgba(3, 3, 9, 0.92)',
    },

    // Text hierarchy
    text: {
      primary: '#F8FAFC',
      secondary: '#94A3B8',
      muted: '#6B7280',
      accent: '#C4B5FD',
      gold: '#FCD34D',
    },

    // Status colors
    status: {
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#3B82F6',
    },

    // Borders
    border: {
      DEFAULT: 'rgba(255, 255, 255, 0.08)',
      hover: 'rgba(124, 58, 237, 0.5)',
      focus: '#7C3AED',
      gradient: 'linear-gradient(135deg, rgba(124,58,237,0.6), rgba(236,72,153,0.4))',
    },

    // Glass effect backgrounds
    glass: {
      light: 'rgba(255, 255, 255, 0.025)',
      medium: 'rgba(255, 255, 255, 0.05)',
      heavy: 'rgba(255, 255, 255, 0.09)',
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
      '4xl': '56px',
      hero: '72px',
    },
    weights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      black: 900,
    },
    lineHeights: {
      tight: 1.15,
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

  // Shadows with glow
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.5)',
    DEFAULT: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
    md: '0 10px 15px -3px rgba(0, 0, 0, 0.6)',
    lg: '0 20px 25px -5px rgba(0, 0, 0, 0.7)',
    glow: '0 0 25px rgba(124, 58, 237, 0.35), 0 0 80px rgba(124, 58, 237, 0.12)',
    glowStrong: '0 0 40px rgba(124, 58, 237, 0.5), 0 0 100px rgba(124, 58, 237, 0.2)',
    glowCyan: '0 0 25px rgba(6, 182, 212, 0.3), 0 0 60px rgba(6, 182, 212, 0.1)',
    glowGold: '0 0 20px rgba(245, 158, 11, 0.35), 0 0 60px rgba(245, 158, 11, 0.1)',
    innerGlow: 'inset 0 0 30px rgba(124, 58, 237, 0.08)',
    card: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
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
