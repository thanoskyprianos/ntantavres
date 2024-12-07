import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import translation_en from './translations/en/translation_en.json';
import translation_el from './translations/el/translation_el.json';
import translation_de from './translations/de/translation_de.json';
import languages from './translations/languages.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en-US',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      'en-US': {
        translation: translation_en,
        languages: languages,
      },
      'el-GR': {
        translation: translation_el,
        languages: languages,
      },
      'de-DE': {
        translation: translation_de,
        languages: languages,
      },
    },
  });

export const langs = ['en-US', 'el-GR', 'de-DE'];
