import { ThemeOptions } from '@mui/material'
import { purple } from '@mui/material/colors'

// you can customise any property. check the theme object to know what is available
export const blueTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    background: { paper: purple[100], default: purple[100] },
    primary: {
      main: purple['A400'],
    },
  },
}
