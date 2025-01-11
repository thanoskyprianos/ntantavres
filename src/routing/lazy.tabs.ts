import { lazy } from 'react';

export const ParentInfo = lazy(() =>
  import('@components/tabs/parent/ParentInfo.tsx').then(module => ({
    default: module['ParentInfo'],
  }))
);

export const BabysitterInfo = lazy(() =>
  import('@components/tabs/babysitter/BabysitterInfo.tsx').then(module => ({
    default: module['BabysitterInfo'],
  }))
);

export const ParentSettings = lazy(() =>
  import('@components/tabs/parent/ParentSettings.tsx').then(module => ({
    default: module['ParentSettings'],
  }))
);
