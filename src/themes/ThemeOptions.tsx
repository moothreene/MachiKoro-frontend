import { ThemeOptions } from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
  components: {
    MuiButton: { 
      styleOverrides: { 
        root: { minWidth: 0 } 
      } 
    }
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#006077',
    },
    secondary: {
      main: '#1c1c1c',
    },
    background: {
      default: '#00afdc',
    },
  },
  typography: {
    h1: {
      fontFamily: 'Luckiest Guy',
    },
    h2: {
      fontFamily: 'Luckiest Guy',
    }
  },
};