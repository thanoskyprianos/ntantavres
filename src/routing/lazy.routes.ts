export const lazyRoute = (path: string, componentName: string) => async () => {
  const importFn = () => import(path.replace('@', '../'));
  const module = await importFn();
  return { Component: module[componentName] };
};

export const HomePage = lazyRoute('@pages/HomePage.tsx', 'HomePage');
export const ParentPage = lazyRoute(
  '@pages/parent/ParentPage.tsx',
  'ParentPage'
);
export const BabysitterPage = lazyRoute(
  '@pages/babysitter/BabysitterPage.tsx',
  'BabysitterPage'
);
export const QuestionsPage = lazyRoute(
  '@pages/questions/QuestionsPage.tsx',
  'QuestionsPage'
);
export const AuthPage = lazyRoute('@pages/auth/AuthPage.tsx', 'AuthPage');
export const Ratings = lazyRoute('@pages/ratings/Ratings.tsx', 'Ratings');
export const ActiveCollabs = lazyRoute(
  '@pages/parent/ActiveCollabs.tsx',
  'ActiveCollabs'
);
export const TempRequests = lazyRoute(
  '@pages/parent/TempRequests.tsx',
  'TempRequests'
);
export const TempRequestCompletion = lazyRoute(
  '@pages/parent/TempRequestCompletion.tsx',
  'TempRequestCompletion'
);
export const CardDetailPage = lazyRoute(
  '@CardDetailPage.tsx',
  'CardDetailPage'
);
export const ScheduledMeetings = lazyRoute(
  '@pages/parent/ScheduledMeetings.tsx',
  'ScheduledMeetings'
);
export const EditActiveCollab = lazyRoute(
  '@pages/parent/EditActiveCollab.tsx',
  'EditActiveCollab'
);
export const PaymentPage = lazyRoute(
  '@pages/parent/PaymentPage.tsx',
  'PaymentPage'
);

export const ProfilePage = lazyRoute(
  '@pages/profile/ProfilePage.tsx',
  'ProfilePage'
);
