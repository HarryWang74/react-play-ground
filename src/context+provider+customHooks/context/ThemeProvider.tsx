import { useState, useCallback, type ReactNode } from 'react'
import {
  ThemeContext,
  type Theme,
  type ThemeContextValue,
} from './ThemeContext'

interface ThemeProviderProps {
  children: ReactNode
  defaultTheme?: Theme
}

export function ThemeProvider({
  children,
  defaultTheme = 'light',
}: ThemeProviderProps) {
  // manages state
  const [theme, setThemeState] = useState<Theme>(defaultTheme)
  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme)
  }, [])

  // a method child can use to update provider state
  const toggleTheme = useCallback(() => {
    setThemeState((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }, [])

  // get ThemeContextValue pass to provider
  const value: ThemeContextValue = {
    theme,
    toggleTheme,
    setTheme,
  }

  return (
    // When create a context using createContext, React gives you two things:
    // ThemeContext: the context object itself
    // ThemeContext.Provider is a React component that wraps part of your component tree and injects a value into the context. Any child component inside this tree can then consume that value using useContext(ThemeContext) — or your custom hook like useTheme().
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  )
}
