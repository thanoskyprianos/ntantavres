import { Breadcrumbs, Link, SxProps, Theme, Typography } from '@mui/material';
import { Link as RouterLink, LinkProps, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface BreadcrumbsProps {
  sx: SxProps<Theme>;
}

const LinkRouter = (props: LinkProps) => {
  return <Link {...props} component={RouterLink} />;
};

export const BreadcrumbsWrapper = ({ sx }: BreadcrumbsProps) => {
  const { t } = useTranslation();
  const location = useLocation();
  const breadcrumbs: string[] = location.pathname.split('/').filter(x => x);
  console.log(breadcrumbs);

  if (!breadcrumbs.length) {
    return <></>;
  }

  return (
    <Breadcrumbs separator=">" sx={sx}>
      {breadcrumbs.length ? (
        <LinkRouter to="/">
          <Typography variant="subtitle2">{t('breadcrumbs.home')}</Typography>
        </LinkRouter>
      ) : (
        <Typography variant="subtitle2">{t('breadcrumbs.home')}</Typography>
      )}
      {breadcrumbs.map((path, i) =>
        i !== breadcrumbs.length - 1 ? (
          <LinkRouter to={{ pathname: `/${path}` }} key={path}>
            <Typography variant="subtitle2">
              {t(`breadcrumbs.${path}`)}
            </Typography>
          </LinkRouter>
        ) : (
          <Typography variant="subtitle2" key={path}>
            {t(`breadcrumbs.${path}`)}
          </Typography>
        )
      )}
    </Breadcrumbs>
  );
};
