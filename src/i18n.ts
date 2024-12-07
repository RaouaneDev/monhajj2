import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import des traductions
import translationFR from './locales/fr/translation.json';
import translationAR from './locales/ar/translation.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false;
    defaultNS: 'translation';
    resources: {
      translation: typeof translationFR;
    };
  }
}

const resources = {
  fr: {
    translation: translationFR,
  },
  ar: {
    translation: translationAR,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false,
    },
    returnNull: false,
  });

export default i18n;
