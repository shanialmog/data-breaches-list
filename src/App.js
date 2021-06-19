import { useEffect, useState } from 'react'
import Breaches from './components/Breaches'
import './App.css'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

function App() {
  const [palette, setPalette] = useState('light')

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setPalette('dark')
    }
  }, [])

  const onThemeSwitchChange = (e, newValue) => {
    setPalette(newValue ? 'dark' : 'light')
  }

  const theme = createMuiTheme({
    palette: {
      type: palette
    }
  })

  return (
    <div>
      <FormControlLabel
        control={
          <Switch
            checked={palette === 'dark'}
            onChange={onThemeSwitchChange}
            color="primary"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        }
        label="Dark Mode"
      />
      <ThemeProvider theme={theme}>
        <Breaches />
      </ThemeProvider>
    </div>
  )
}

export default App
