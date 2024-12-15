import { Header } from '../components/Header.tsx';
import { Outlet, useNavigation } from 'react-router-dom';
import { Footer } from '../pages/footer/Footer.tsx';
import { BreadcrumbsWrapper as Breadcrumbs } from '../components/BreadcrumbsWrapper.tsx';
import { Box, Stack } from '@mui/material';
import { LoadingSpinner } from '../components/LoadingSpinner.tsx';
import { ReactElement } from 'react';

export const Layout = ({ children }: { children?: ReactElement }) => {
  const { state } = useNavigation();

  return (
    <Stack sx={{ minHeight: '100vh', justifyContent: 'space-between' }}>
      <Box>
        <Header />
        {state !== 'loading' && <Breadcrumbs sx={{ margin: '15px' }} />}
        {state === 'loading' ? (
          <LoadingSpinner sx={{ margin: '15px' }} />
        ) : (
          (children ?? <Outlet />)
        )}
      </Box>
      <Footer sx={{ marginTop: '15px' }} />
    </Stack>
  );
};
