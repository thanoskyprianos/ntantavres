import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { theme } from '../config/theme.config.ts';
import { useTranslation } from 'react-i18next';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { localeTextMap } from '../config/i18n.ts';
import { Layout } from './Layout.tsx';
import {
  AuthPage,
  BabysitterPage,
  BabysitterProfilePage,
  HomePage,
  InfoParents,
  JobPosting,
  ParentPage,
  ParentProfilePage,
  QuestionsPage,
  Ratings,
} from './lazy.routes.ts';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        lazy: HomePage,
      },
      {
        path: '/parent',
        lazy: ParentPage,
        children: [
          {
            path: 'profile',
            lazy: ParentProfilePage,
          },
          {
            path: 'createORedit',
            lazy: JobPosting,
          },
          {
            path: 'editInfo',
            lazy: InfoParents,
          },
        ],
      },
      {
        path: '/babysitter',
        lazy: BabysitterPage,
        children: [
          {
            path: 'profile',
            lazy: BabysitterProfilePage,
          },
        ],
      },
      {
        path: '/questions',
        lazy: QuestionsPage,
      },
      {
        path: '/auth',
        lazy: AuthPage,
      },
      {
        path: '/ratings',
        lazy: Ratings,
      },
    ],
  },
]);

export const Routing = () => {
  const { i18n } = useTranslation();

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={localeTextMap.get(i18n.resolvedLanguage || 'en-US')}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </LocalizationProvider>
  );
};
