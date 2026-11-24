import type { ThemeMode } from '../../types/theme'

export interface AppTheme {
  mode: ThemeMode
  colors: {
    background: string
    surfaceCard: string
    surfaceInput: string
    surfaceButton: string
    surfaceHover: string
    border: string
    borderStrong: string

    title: string
    subtitle: string
    text: string
    label: string
    white: string

    yellow: string
    yellowDark: string
    yellowLight: string
    yellowText: string

    purple: string
    purpleDark: string
    purpleLight: string
    purpleText: string

    error: string
    errorBg: string
    success: string
    successBg: string

    heroGlowYellow: string
    heroGlowPurple: string
    shadowColor: string
  }
  fonts: {
    display: string
    body: string
  }
  radii: {
    sm: string
    md: string
    card: string
    pill: string
  }
  breakpoints: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
  }
}

export const sharedThemeTokens = {
  fonts: {
    display: "'Baloo 2', system-ui, -apple-system, sans-serif",
    body: "'Roboto', system-ui, -apple-system, sans-serif",
  },
  radii: {
    sm: '4px',
    md: '6px',
    card: '6px 36px 6px 36px',
    pill: '9999px',
  },
  breakpoints: {
    xs: '320px',
    sm: '480px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
} as const

export const lightTheme: AppTheme = {
  mode: 'light',
  ...sharedThemeTokens,
  colors: {
    background: '#FAFAFA',
    surfaceCard: '#F3F2F2',
    surfaceInput: '#EDEDED',
    surfaceButton: '#E6E5E5',
    surfaceHover: '#D7D5D5',
    border: '#E6E5E5',
    borderStrong: '#D7D5D5',

    title: '#272221',
    subtitle: '#403937',
    text: '#574F4D',
    label: '#6B6563',
    white: '#FFFFFF',

    yellow: '#DBAC2C',
    yellowDark: '#C47F17',
    yellowLight: '#F1E9C9',
    yellowText: '#9A630F',

    purple: '#8047F8',
    purpleDark: '#4B2995',
    purpleLight: '#EBE5F9',
    purpleText: '#4B2995',

    error: '#C92A2A',
    errorBg: '#FFF5F5',
    success: '#2B8A3E',
    successBg: '#EBFBEE',

    heroGlowYellow: 'rgba(219, 172, 44, 0.16)',
    heroGlowPurple: 'rgba(128, 71, 248, 0.14)',
    shadowColor: 'rgba(39, 34, 33, 0.08)',
  },
}
