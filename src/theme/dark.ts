import { ThemeOptions } from '@mui/material'
import { yellow, red } from '@mui/material/colors'

export const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: yellow[900],
    },
    secondary: {
      main: red[900],
    },
  },
}
