import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { ThemeProvider, useColorScheme } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { BreadcrumbsWrapper as Breadcrumbs } from './components/BreadcrumbsWrapper';
import { Header } from './components/Header';
import { theme } from './config/theme.config';
import { HomePage } from './pages/HomePage';
import { useTranslation } from 'react-i18next';
import { langs } from './config/i18n.ts';

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
  const { t, i18n } = useTranslation();

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

      <FormControl>
        <FormLabel>{t('language.label')}</FormLabel>
        <RadioGroup
          row
          defaultValue={i18n.resolvedLanguage}
          value={i18n.language}
          onChange={e => i18n.changeLanguage(e.target.value)}
        >
          {langs.map(lang => (
            <FormControlLabel
              control={<Radio />}
              label={t(`language.${lang}`)}
              value={lang}
              key={lang}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </ThemeProvider>
  );
};
