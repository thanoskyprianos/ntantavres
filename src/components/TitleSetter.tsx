import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export const TitleSetter = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const titles = new Map<string, string>([
    ['', 'NtantaVres'],
    ['parent', t('title.parent')],
    ['babysitter', t('title.babysitter')],
    ['questions', t('title.questions')],
  ]);

  useEffect(() => {
    document.title =
      titles.get(location.pathname.split('/')[1]) || 'NtantaVres';
  }, [location, t]);

  return <></>;
};
