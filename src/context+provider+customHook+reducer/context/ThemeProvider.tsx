import { useReducer, useCallback, type ReactNode } from 'react'
import {
  ThemeContext,
  type Theme,
  type ThemeContextValue,
} from './ThemeContext'
import { themeReducer, createInitialThemeState } from './themeReducer'

interface ThemeProviderProps {
  children: ReactNode
  defaultTheme?: Theme
}

export function ThemeProvider({
  children,
  defaultTheme = 'light',
}: ThemeProviderProps) {
  // Use reducer with separate reducer function
  const [state, dispatch] = useReducer(
    themeReducer,
    createInitialThemeState(defaultTheme)
  )

  // Action creators wrapped in useCallback
  const setTheme = useCallback((newTheme: Theme) => {
    dispatch({ type: 'SET_THEME', payload: newTheme })
  }, [])

  const toggleTheme = useCallback(() => {
    dispatch({ type: 'TOGGLE_THEME' })
  }, [])

  // Context value
  const value: ThemeContextValue = {
    theme: state.theme,
    toggleTheme,
    setTheme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
