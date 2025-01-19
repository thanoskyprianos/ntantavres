import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './Layout.tsx';
import {
  AuthPage,
  BabysitterPage,
  CollaborationPage,
  HomePage,
  ParentPage,
  ProfilePage,
  QuestionsPage,
  Ratings,
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
        path: '/ratings/:uid',
        lazy: Ratings,
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
