import { createTheme } from '@mui/material';

export const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#1976d2',
          dark: '#1564c0',
          light: '#1e87e5',
          contrastText: '#e3f2fd',
        },
        background: {
          default: '#e3f2fd',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#3a3a3a',
          dark: '#121212',
          light: '#595959',
          contrastText: '#9acffa',
        },
        background: {
          default: '#121212',
        },
      },
    },
  },
  typography: {
    fontFamily: 'Ubuntu Mono',
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiSelect: {
      defaultProps: {
        disableUnderline: true,
      },
    },
    MuiAppBar: {
      defaultProps: {
        enableColorOnDark: true,
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});
