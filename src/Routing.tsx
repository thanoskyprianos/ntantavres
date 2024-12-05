import { Button } from '@mui/material';
import { ThemeProvider, useColorScheme } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { BreadcrumbsWrapper as Breadcrumbs } from './components/BreadcrumbsWrapper';
import { Header } from './components/Header';
import { theme } from './config/theme.config';
import { HomePage } from './pages/HomePage';

const Switch = () => {
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return <></>;
  }

  return (
    <>
      <Button
        variant="outlined"
        onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
      >
        {mode === 'dark' ? 'light' : 'dark'}
      </Button>
    </>
  );
};

export const Routing = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Breadcrumbs />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
        <Switch />
      </BrowserRouter>
    </ThemeProvider>
  );
};
