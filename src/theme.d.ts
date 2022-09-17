import { Theme } from '"mui/material/styles'

declare module '@mui/material/styles' {
  interface CustomTheme extends Theme {
    status: {
      danger: string
    }
  }

  // allow configuration using 'creataTheme'
  interface CustomTheme extends Theme {
    status?: {
      danger: string
    }
  }

  export function creataTheme(option?: CustomThemeOptions): CustomTheme
}
