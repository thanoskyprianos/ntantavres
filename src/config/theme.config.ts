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
        secondary: {
          main: '#ee9038',
          dark: '#e46300',
          light: '#fbcfa5',
          contrastText: '#001d78',
        },
        background: {
          default: '#e3f2fd',
          paper: '#ffffff',
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
        secondary: {
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
    MuiAppBar: {
      defaultProps: {
        enableColorOnDark: true,
      },
    },
  },
});
