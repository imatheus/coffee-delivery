import { Moon, Sun } from '@phosphor-icons/react'
import { useTheme } from '../../hooks/useTheme'
import { ToggleButton } from './styles'

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  const label = isDark ? 'Ativar modo claro' : 'Ativar modo escuro'

  return (
    <ToggleButton
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      aria-pressed={isDark}
      title={label}
    >
      {isDark ? (
        <Sun size={20} weight="fill" aria-hidden="true" />
      ) : (
        <Moon size={20} weight="fill" aria-hidden="true" />
      )}
    </ToggleButton>
  )
}
