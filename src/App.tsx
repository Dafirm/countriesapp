import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import React from 'react'
import Routes from './Routes'

import { darkTheme } from './theme/dark'
import { lightTheme } from './theme/light'
import { blueTheme } from './theme/blue'
import './App.css'

import TopNav from './components/TopNav/TopNav'

export const ThemeContext = React.createContext({
  mode: 'dark',
  setTheme: (nmde: Mode) => console.log('mode'),
})
export type Mode = 'dark' | 'light' | 'blue'

function App() {
  const [mode, setMode] = React.useState<Mode>('light')

  const handleSwitchThemes = (mode: Mode) => {
    // setMode(mode === 'light' ? 'dark' : 'light')
    switch (mode) {
    case 'light':
      return lightTheme
    case 'dark':
      return darkTheme
    case 'blue':
      return blueTheme

    default:
      return lightTheme
    }
  }
  const handleSwitchTheme = (mode: Mode) => {
    setMode(mode)
  }
  const theme = React.useMemo(
    () => createTheme(handleSwitchThemes(mode)),
    [mode]
  )
  return (
    <div className="App">
      <ThemeContext.Provider value={{ mode, setTheme: handleSwitchTheme }}>
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme />
          <TopNav />
          <Routes />
        </ThemeProvider>
      </ThemeContext.Provider>
    </div>
  )
}

export default App
