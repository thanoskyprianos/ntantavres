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

export const Routing = () => {
  return (
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
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};
