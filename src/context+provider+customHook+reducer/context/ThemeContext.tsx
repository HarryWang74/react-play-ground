import React from 'react'

// Declares type
export type Theme = 'light' | 'dark'

// Declares action types for reducer
export type ThemeAction =
  | { type: 'TOGGLE_THEME' }
  | { type: 'SET_THEME'; payload: Theme }

// Declares state interface
export interface ThemeState {
  theme: Theme
}

// Declares context interface
export interface ThemeContextValue {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

// Declares context
export const ThemeContext = React.createContext<ThemeContextValue | undefined>(
  undefined
)
