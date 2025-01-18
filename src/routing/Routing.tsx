import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './Layout.tsx';
import {
  AuthPage,
  BabysitterPage,
  CardDetailPage,
  CollaborationPage,
  HomePage,
  ParentPage,
  PaymentPage,
  ProfilePage,
  QuestionsPage,
  Ratings,
  ScheduledMeetings,
  TempRequestCompletion,
  TempRequests,
} from './lazy.routes.ts';
import { ErrorPage } from '@pages/ErrorPage.tsx';

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
            path: 'tempRequest',
            lazy: TempRequests,
          },
          {
            path: 'scheduledMeetings',
            lazy: ScheduledMeetings,
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
      {
        path: '/profile/:uid',
        lazy: ProfilePage,
      },
      {
        path: '/collaboration/:cid',
        lazy: CollaborationPage,
      },
    ],
  },
]);

export const Routing = () => {
  return <RouterProvider router={router} />;
};
