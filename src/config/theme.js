/**
 * Theme configuration with 3 color palettes
 * Mobile-first design system
 */

export const themes = {
  default: {
    name: 'Default',
    colors: {
      // Primary colors
      primary: '#1a365d',      // Deep blue - trust, professionalism
      primaryLight: '#2c5282',
      primaryDark: '#0f2027',
      
      // Secondary colors
      secondary: '#0ea5e9',    // Teal/cyan - innovation
      secondaryLight: '#38bdf8',
      secondaryDark: '#0284c7',
      
      // Accent colors
      accent: '#f97316',       // Orange - CTA buttons
      accentLight: '#fb923c',
      accentDark: '#ea580c',
      
      // Status colors
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
      info: '#3b82f6',
      
      // Neutral colors
      background: '#ffffff',
      surface: '#f8fafc',
      surfaceElevated: '#ffffff',
      text: '#1e293b',
      textSecondary: '#64748b',
      textMuted: '#94a3b8',
      border: '#e2e8f0',
      divider: '#cbd5e1',
    },
  },
  
  light: {
    name: 'Light',
    colors: {
      // Primary colors
      primary: '#2563eb',      // Bright blue
      primaryLight: '#3b82f6',
      primaryDark: '#1d4ed8',
      
      // Secondary colors
      secondary: '#06b6d4',    // Cyan
      secondaryLight: '#22d3ee',
      secondaryDark: '#0891b2',
      
      // Accent colors
      accent: '#f59e0b',       // Amber
      accentLight: '#fbbf24',
      accentDark: '#d97706',
      
      // Status colors
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
      info: '#3b82f6',
      
      // Neutral colors
      background: '#ffffff',
      surface: '#f1f5f9',
      surfaceElevated: '#ffffff',
      text: '#0f172a',
      textSecondary: '#475569',
      textMuted: '#94a3b8',
      border: '#e2e8f0',
      divider: '#cbd5e1',
    },
  },
  
  dark: {
    name: 'Dark',
    colors: {
      // Primary colors
      primary: '#3b82f6',      // Bright blue
      primaryLight: '#60a5fa',
      primaryDark: '#2563eb',
      
      // Secondary colors
      secondary: '#06b6d4',    // Cyan
      secondaryLight: '#22d3ee',
      secondaryDark: '#0891b2',
      
      // Accent colors
      accent: '#f97316',       // Orange
      accentLight: '#fb923c',
      accentDark: '#ea580c',
      
      // Status colors
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
      info: '#3b82f6',
      
      // Neutral colors
      background: '#0f172a',    // Dark slate
      surface: '#1e293b',
      surfaceElevated: '#334155',
      text: '#f1f5f9',
      textSecondary: '#cbd5e1',
      textMuted: '#94a3b8',
      border: '#334155',
      divider: '#475569',
    },
  },
};

// Typography scale (mobile-first)
export const typography = {
  fontFamily: {
    heading: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", "Roboto", sans-serif',
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", sans-serif',
    mono: 'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace',
  },
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
};

// Spacing scale (4px base unit, mobile-first)
export const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
};

// Border radius
export const borderRadius = {
  none: '0',
  sm: '0.125rem',   // 2px
  base: '0.25rem',  // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  full: '9999px',
};

// Shadows
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
};

// Breakpoints (mobile-first)
export const breakpoints = {
  sm: '640px',   // Small devices (landscape phones)
  md: '768px',   // Medium devices (tablets)
  lg: '1024px', // Large devices (desktops)
  xl: '1280px', // Extra large devices
  '2xl': '1536px', // 2X large devices
};

// Transitions
export const transitions = {
  fast: '150ms ease-in-out',
  base: '200ms ease-in-out',
  slow: '300ms ease-in-out',
};

export default {
  themes,
  typography,
  spacing,
  borderRadius,
  shadows,
  breakpoints,
  transitions,
};

