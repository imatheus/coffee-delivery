import { sharedThemeTokens, type AppTheme } from './light'

export const darkTheme: AppTheme = {
  mode: 'dark',
  ...sharedThemeTokens,
  colors: {
    background: '#141113',
    surfaceCard: '#1F1B1E',
    surfaceInput: '#282327',
    surfaceButton: '#302A2F',
    surfaceHover: '#3E363D',
    border: '#342E33',
    borderStrong: '#4A4148',

    title: '#F5F2F0',
    subtitle: '#E4DEDC',
    text: '#CCC4C0',
    label: '#A89F9B',
    white: '#FFFFFF',

    yellow: '#E5B53B',
    yellowDark: '#F5C443',
    yellowLight: '#3B2F17',
    yellowText: '#F8D477',

    purple: '#8B5CF6',
    purpleDark: '#A78BFA',
    purpleLight: '#2C2147',
    purpleText: '#D5C4FF',

    error: '#FF7878',
    errorBg: '#3A1B1F',
    success: '#51CF66',
    successBg: '#163321',

    heroGlowYellow: 'rgba(229, 181, 59, 0.12)',
    heroGlowPurple: 'rgba(139, 92, 246, 0.16)',
    shadowColor: 'rgba(0, 0, 0, 0.42)',
  },
}
