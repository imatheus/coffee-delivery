import { useContext } from 'react'
import {
  ThemeContext,
  type ThemeContextValue,
} from '../contexts/themeContextValue'

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme deve ser utilizado dentro de um ThemeProvider.')
  }
  return context
}
