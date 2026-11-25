import { createContext } from 'react'
import type { ThemeMode } from '../types/theme'

export const THEME_STORAGE_KEY = '@coffee-delivery:theme-v1'

export interface ThemeContextValue {
  themeMode: ThemeMode
  isDark: boolean
  toggleTheme: () => void
  setThemeMode: (mode: ThemeMode) => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)
