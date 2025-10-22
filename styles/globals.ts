/**
 * React Native Global Theme Constants
 * Converted from web CSS variables to React Native TypeScript theme objects
 * 
 * These theme constants can be used throughout the app for consistent styling
 */

// Font constants
export const fonts = {
  size: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  weight: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
};

// Spacing constants (used for padding, margin, etc.)
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
  '3xl': 48,
};

// Border radius constants
export const borderRadius = {
  none: 0,
  sm: 4,
  md: 6,
  lg: 8,
  xl: 10,
  '2xl': 12,
  full: 9999,
};

// Theme colors for light and dark modes
export const themeColors = {
  light: {
    background: '#ffffff',
    foreground: '#0a0a0a', // oklch(0.145 0 0) converted
    card: '#ffffff',
    cardForeground: '#0a0a0a',
    popover: '#ffffff',
    popoverForeground: '#0a0a0a',
    primary: '#030213',
    primaryForeground: '#ffffff',
    secondary: '#f3f3f5',
    secondaryForeground: '#030213',
    muted: '#ececf0',
    mutedForeground: '#717182',
    accent: '#e9ebef',
    accentForeground: '#030213',
    destructive: '#d4183d',
    destructiveForeground: '#ffffff',
    border: 'rgba(0, 0, 0, 0.1)',
    input: 'transparent',
    inputBackground: '#f3f3f5',
    switchBackground: '#cbced4',
    ring: '#a3a3a3',
    
    // Chart colors
    chart1: '#e67e22', // oklch(0.646 0.222 41.116) converted
    chart2: '#3498db', // oklch(0.6 0.118 184.704) converted
    chart3: '#2c3e50', // oklch(0.398 0.07 227.392) converted
    chart4: '#f1c40f', // oklch(0.828 0.189 84.429) converted
    chart5: '#e74c3c', // oklch(0.769 0.188 70.08) converted
    
    // Sidebar colors
    sidebar: '#fafafa',
    sidebarForeground: '#0a0a0a',
    sidebarPrimary: '#030213',
    sidebarPrimaryForeground: '#fafafa',
    sidebarAccent: '#f5f5f5',
    sidebarAccentForeground: '#1a1a1a',
    sidebarBorder: '#e5e5e5',
    sidebarRing: '#a3a3a3',
  },
  dark: {
    background: '#0a0a0a', // oklch(0.145 0 0)
    foreground: '#fafafa', // oklch(0.985 0 0)
    card: '#0a0a0a',
    cardForeground: '#fafafa',
    popover: '#0a0a0a',
    popoverForeground: '#fafafa',
    primary: '#fafafa',
    primaryForeground: '#1a1a1a',
    secondary: '#262626', // oklch(0.269 0 0)
    secondaryForeground: '#fafafa',
    muted: '#262626',
    mutedForeground: '#a3a3a3',
    accent: '#262626',
    accentForeground: '#fafafa',
    destructive: '#7f1d1d',
    destructiveForeground: '#fca5a5',
    border: '#262626',
    input: '#262626',
    inputBackground: '#1a1a1a',
    switchBackground: '#404040',
    ring: '#525252',
    
    // Chart colors
    chart1: '#8b5cf6', // oklch(0.488 0.243 264.376)
    chart2: '#10b981', // oklch(0.696 0.17 162.48)
    chart3: '#f59e0b', // oklch(0.769 0.188 70.08)
    chart4: '#ec4899', // oklch(0.627 0.265 303.9)
    chart5: '#f97316', // oklch(0.645 0.246 16.439)
    
    // Sidebar colors
    sidebar: '#1a1a1a',
    sidebarForeground: '#fafafa',
    sidebarPrimary: '#8b5cf6',
    sidebarPrimaryForeground: '#fafafa',
    sidebarAccent: '#262626',
    sidebarAccentForeground: '#fafafa',
    sidebarBorder: '#262626',
    sidebarRing: '#525252',
  },
} as const;

// Helper function to get theme colors based on color scheme
export const getThemeColors = (colorScheme: 'light' | 'dark') => {
  return themeColors[colorScheme];
};

// Typography presets for React Native Text components
export const typography = {
  h1: {
    fontSize: fonts.size['3xl'],
    fontWeight: fonts.weight.medium,
    lineHeight: fonts.size['3xl'] * 1.5,
  },
  h2: {
    fontSize: fonts.size['2xl'],
    fontWeight: fonts.weight.medium,
    lineHeight: fonts.size['2xl'] * 1.5,
  },
  h3: {
    fontSize: fonts.size.xl,
    fontWeight: fonts.weight.medium,
    lineHeight: fonts.size.xl * 1.5,
  },
  h4: {
    fontSize: fonts.size.lg,
    fontWeight: fonts.weight.medium,
    lineHeight: fonts.size.lg * 1.5,
  },
  p: {
    fontSize: fonts.size.base,
    fontWeight: fonts.weight.normal,
    lineHeight: fonts.size.base * 1.5,
  },
  label: {
    fontSize: fonts.size.base,
    fontWeight: fonts.weight.medium,
    lineHeight: fonts.size.base * 1.5,
  },
  button: {
    fontSize: fonts.size.base,
    fontWeight: fonts.weight.medium,
    lineHeight: fonts.size.base * 1.5,
  },
  input: {
    fontSize: fonts.size.base,
    fontWeight: fonts.weight.normal,
    lineHeight: fonts.size.base * 1.5,
  },
  small: {
    fontSize: fonts.size.sm,
    fontWeight: fonts.weight.normal,
    lineHeight: fonts.size.sm * 1.5,
  },
} as const;

// Default export for backward compatibility
export default {
  fonts,
  spacing,
  borderRadius,
  themeColors,
  getThemeColors,
  typography,
};

