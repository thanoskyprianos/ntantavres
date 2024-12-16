const lazyRoute = (path: string, componentName: string) => async () => {
  const importFn = () => import(path);
  const module = await importFn();
  return { Component: module[componentName] };
};

export const HomePage = lazyRoute('../pages/HomePage.tsx', 'HomePage');
export const ParentPage = lazyRoute(
  '../pages/parent/ParentPage.tsx',
  'ParentPage'
);
export const ParentProfilePage = lazyRoute(
  '../pages/parent/ParentProfilePage.tsx',
  'ParentProfilePage'
);
export const JobPosting = lazyRoute(
  '../pages/parent/JobPosting.tsx',
  'JobPosting'
);
export const InfoParents = lazyRoute(
  '../pages/parent/InfoParents.tsx',
  'InfoParents'
);
export const BabysitterPage = lazyRoute(
  '../pages/babysitter/BabysitterPage.tsx',
  'BabysitterPage'
);
export const BabysitterProfilePage = lazyRoute(
  '../pages/babysitter/BabysitterProfilePage.tsx',
  'BabysitterProfilePage'
);
export const QuestionsPage = lazyRoute(
  '../pages/questions/QuestionsPage.tsx',
  'QuestionsPage'
);
export const AuthPage = lazyRoute('../pages/auth/AuthPage.tsx', 'AuthPage');
export const Ratings = lazyRoute('../pages/ratings/Ratings.tsx', 'Ratings');
export const ActiveCollabs = lazyRoute(
  '../pages/parent/ActiveCollabs.tsx',
  'ActiveCollabs'
);
export const TempRequests = lazyRoute(
  '../pages/parent/TempRequests.tsx',
  'TempRequests'
);
export const TempRequestCompletion = lazyRoute(
  '../pages/parent/TempRequestCompletion.tsx',
  'TempRequestCompletion'
);
export const CardDetailPage = lazyRoute(
  '../CardDetailPage.tsx',
  'CardDetailPage'
);
export const ScheduledMeetings = lazyRoute(
  '../pages/parent/ScheduledMeetings.tsx',
  'ScheduledMeetings'
);
export const EditActiveCollab = lazyRoute(
  '../pages/parent/EditActiveCollab.tsx',
  'EditActiveCollab'
);
