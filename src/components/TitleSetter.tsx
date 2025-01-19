import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export const TitleSetter = () => {
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    let title = t(`title.${location.pathname.split('/')[1]}`, {
      defaultValue: 'undefined',
    });
    if (title !== 'undefined') {
      title = title + ' - NtantaVres';
      document.title = title;
    } else {
      document.title = 'NtantaVres';
    }
  }, [location, t]);

  return <></>;
};
