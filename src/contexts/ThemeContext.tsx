import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { darkTheme } from '../styles/themes/dark'
import { lightTheme } from '../styles/themes/light'
import type { ThemeMode } from '../types/theme'

export const THEME_STORAGE_KEY = '@coffee-delivery:theme-v1'

export interface ThemeContextValue {
  themeMode: ThemeMode
  isDark: boolean
  toggleTheme: () => void
  setThemeMode: (mode: ThemeMode) => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

function getInitialThemeMode(): ThemeMode {
  if (typeof window === 'undefined') {
    return 'light'
  }

  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') {
      return stored
    }
  } catch {
    // Fallback seguro caso o navegador bloqueie o acesso ao localStorage
  }

  if (
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return 'dark'
  }

  return 'light'
}

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(getInitialThemeMode)

  useEffect(() => {
    document.documentElement.dataset.theme = themeMode
    document.documentElement.style.colorScheme = themeMode

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, themeMode)
    } catch {
      // Ignora erro de escrita caso o storage esteja indisponível
    }
  }, [themeMode])

  const toggleTheme = useCallback(() => {
    setThemeModeState((current) => (current === 'light' ? 'dark' : 'light'))
  }, [])

  const setThemeMode = useCallback((mode: ThemeMode) => {
    setThemeModeState(mode)
  }, [])

  const activeTheme = themeMode === 'dark' ? darkTheme : lightTheme

  const contextValue = useMemo<ThemeContextValue>(
    () => ({
      themeMode,
      isDark: themeMode === 'dark',
      toggleTheme,
      setThemeMode,
    }),
    [themeMode, toggleTheme, setThemeMode],
  )

  return (
    <ThemeContext.Provider value={contextValue}>
      <StyledThemeProvider theme={activeTheme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  )
}
