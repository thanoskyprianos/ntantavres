import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './Layout.tsx';
import {
  ActiveCollabs,
  AuthPage,
  BabysitterPage,
  CardDetailPage,
  EditActiveCollab,
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

const router = createBrowserRouter([
  {
    element: <Layout />,
    // TODO: re-add this
    // errorElement: (
    //   <Layout>
    //     <ErrorPage />
    //   </Layout>
    // ),
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
    ],
  },
]);

export const Routing = () => {
  return <RouterProvider router={router} />;
};
