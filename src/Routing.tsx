import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { BreadcrumbsWrapper as Breadcrumbs } from './components/BreadcrumbsWrapper';
import { Header } from './components/Header';
import { theme } from './config/theme.config';
import { HomePage } from './pages/HomePage';
import { ParentPage } from './pages/parent/ParentPage.tsx';
import { BabysitterPage } from './pages/babysitter/BabysitterPage.tsx';
import { QuestionsPage } from './pages/questions/QuestionsPage.tsx';
import { TitleSetter } from './components/TitleSetter.tsx';
import { AuthPage } from './pages/auth/AuthPage.tsx';
import { useTranslation } from 'react-i18next';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { localeTextMap } from './config/i18n.ts';

export const Routing = () => {
  const { i18n } = useTranslation();

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={localeTextMap.get(i18n.resolvedLanguage || 'en-US')}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <TitleSetter />
          <Header />
          <Breadcrumbs sx={{ margin: '15px' }} />
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="parent">
              <Route index element={<ParentPage />} />
            </Route>
            <Route path="babysitter">
              <Route index element={<BabysitterPage />} />
            </Route>
            <Route path="questions">
              <Route index element={<QuestionsPage />} />
            </Route>
            <Route path="auth">
              <Route index element={<AuthPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </LocalizationProvider>
  );
};
