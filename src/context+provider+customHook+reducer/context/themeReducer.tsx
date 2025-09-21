import type { Theme, ThemeAction, ThemeState } from './ThemeContext'

// Reducer function
export function themeReducer(
  state: ThemeState,
  action: ThemeAction
): ThemeState {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      }
    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload,
      }
    default:
      return state
  }
}

// Initial state factory
export function createInitialThemeState(
  defaultTheme: Theme = 'light'
): ThemeState {
  return {
    theme: defaultTheme,
  }
}
