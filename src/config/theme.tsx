import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'Nanum Gothic, sans-serif',
      fontSize: "1rem",
      color: 'hsl(0, 0%, 100%)',
    },
  },
  palette: {
    primary: {
      main: 'hsl(0, 0%, 100%)',
      dark: 'hsl(223, 28%, 10%)',
    },
    secondary: {
      main: 'hsl(0, 0%, 75%)',
    },
  },
})
