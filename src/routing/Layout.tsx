import { Header } from '../components/Header.tsx';
import { Outlet, useNavigation } from 'react-router-dom';
import { Footer } from '../pages/footer/Footer.tsx';
import { BreadcrumbsWrapper as Breadcrumbs } from '../components/BreadcrumbsWrapper.tsx';
import { Box, CssBaseline, Stack } from '@mui/material';
import { LoadingSpinner } from '../components/LoadingSpinner.tsx';
import { ReactElement } from 'react';
import { AuthProvider } from '@/context/AuthProvider.tsx';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { localeTextMap } from '@config/i18n.ts';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@config/theme.config.ts';
import { SnackbarProvider } from '@/context/SnackbarProvider.tsx';
import { useTranslation } from 'react-i18next';

export const Layout = ({ children }: { children?: ReactElement }) => {
  const { state } = useNavigation();
  const { i18n } = useTranslation();

  return (
    <SnackbarProvider>
      <AuthProvider>
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          adapterLocale={localeTextMap.get(i18n.resolvedLanguage || 'en-US')}
        >
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Stack sx={{ minHeight: '100vh', justifyContent: 'space-between' }}>
              <Box>
                <Header />
                {state !== 'loading' && <Breadcrumbs sx={{ margin: '15px' }} />}
                {state === 'loading' ? (
                  <LoadingSpinner sx={{ margin: '15px' }} />
                ) : (
                  (children ?? <Outlet />)
                )}
              </Box>
              <Footer sx={{ marginTop: '15px' }} />
            </Stack>
          </ThemeProvider>
        </LocalizationProvider>
      </AuthProvider>
    </SnackbarProvider>
  );
};
