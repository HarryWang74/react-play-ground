import { ThemeProvider } from './context/ThemeProvider'
import { ThemeToggle } from './components/ThemeToggle'

function demo() {
  return (
    <ThemeProvider defaultTheme="light">
      <h1>Context + Provider + CustomHook + Reducer</h1>
      <ThemeToggle />
    </ThemeProvider>
  )
}

export default demo
