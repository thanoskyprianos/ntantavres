import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export const TitleSetter = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const titles = new Map<string, string>([
    ['parent', t('title.parent')],
    ['babysitter', t('title.babysitter')],
    ['questions', t('title.questions')],
    ['auth', t('title.auth')],
  ]);

  useEffect(() => {
    let title = titles.get(location.pathname.split('/')[1]);
    if (title) {
      title = title + ' - NtantaVres';
    }

    document.title = title || 'NtantaVres';
  }, [location, t]);

  return <></>;
};
