import { useTheme } from '../context/useTheme'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className={`theme-toggle theme-toggle--${theme}`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light' ? '🌙' : '☀️'}
      <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
    </button>
  )
}
