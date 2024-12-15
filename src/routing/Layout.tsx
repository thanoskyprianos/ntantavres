import { Header } from '../components/Header.tsx';
import { Outlet, useNavigation } from 'react-router-dom';
import { Footer } from '../pages/footer/Footer.tsx';
import { BreadcrumbsWrapper as Breadcrumbs } from '../components/BreadcrumbsWrapper.tsx';

export const Layout = () => {
  const { state } = useNavigation();

  return (
    <>
      <Header />
      <Breadcrumbs sx={{ margin: '15px' }} />
      {state === 'loading' ? <p>Loading...</p> : <Outlet />}
      <Footer />
    </>
  );
};
