import { Breadcrumbs, Link, Typography } from '@mui/material';
import { LinkProps, Link as RouterLink, useLocation } from 'react-router-dom';

const LinkRouter = (props: LinkProps) => {
  return <Link {...props} component={RouterLink} />;
};

export const BreadcrumbsWrapper = () => {
  const location = useLocation();
  const breadcrumbs: string[] = location.pathname
    .split('/')
    .filter(x => x)
    .map(path => path.charAt(0).toUpperCase() + path.slice(1));
  console.log(breadcrumbs);

  return (
    <Breadcrumbs separator=">">
      {breadcrumbs.length ? (
        <LinkRouter to="/">
          <Typography variant="subtitle2">Αρχική</Typography>
        </LinkRouter>
      ) : (
        <Typography variant="subtitle2">Αρχική</Typography>
      )}
      {breadcrumbs.map((path, i) =>
        i !== breadcrumbs.length - 1 ? (
          <LinkRouter to={{ pathname: `/${path}` }} key={path}>
            <Typography variant="subtitle2">{path}</Typography>
          </LinkRouter>
        ) : (
          <Typography variant="subtitle2" key={path}>
            {path}
          </Typography>
        )
      )}
    </Breadcrumbs>
  );
};
