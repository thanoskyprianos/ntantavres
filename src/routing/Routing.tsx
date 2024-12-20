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
  ActiveCollabs,
  AuthPage,
  BabysitterPage,
  BabysitterProfilePage,
  CardDetailPage,
  EditActiveCollab,
  HomePage,
  InfoParents,
  JobPosting,
  ParentPage,
  ParentProfilePage,
  QuestionsPage,
  Ratings,
  ScheduledMeetings,
  TempRequests,
  TempRequestCompletion,
  PaymentPage
} from './lazy.routes.ts';
import { ErrorPage } from '../pages/ErrorPage.tsx';

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: (
      <Layout>
        <ErrorPage />
      </Layout>
    ),
    children: [
      {
        path: '/',
        lazy: HomePage,
      },
      {
        path: '/parent',
        children: [
          {
            index: true,
            lazy: ParentPage,
          },
          {
            path: 'profile',
            lazy: ParentProfilePage,
          },
          {
            path: 'createOrEdit',
            lazy: JobPosting,
          },
          {
            path: 'editInfo',
            lazy: InfoParents,
          },
          {
            path: 'activeCollabs',
            lazy: ActiveCollabs,
          },
          {
            path: 'tempRequest',
            lazy: TempRequests,
          },
          {
            path: 'scheduledMeetings',
            lazy: ScheduledMeetings,
          },
          {
            path: 'editCollab',
            lazy: EditActiveCollab,
          },
          {
            path: 'tempRequestCompletion',
            lazy: TempRequestCompletion,
          },
          {
            path: 'paymentPage',
            lazy: PaymentPage,
          },
        ],
      },
      {
        path: '/babysitter',
        children: [
          {
            index: true,
            lazy: BabysitterPage,
          },
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
      {
        path: '/interested',
        lazy: CardDetailPage,
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
