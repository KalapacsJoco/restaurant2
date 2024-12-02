import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importáljuk a JSON fordítási fájlokat
import enTranslation from './locales/en/translation.json';
import huTranslation from './locales/hu/translation.json';
import roTranslation from './locales/ro/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      hu: { translation: huTranslation },
      ro: { translation: roTranslation },
    },
    fallbackLng: 'hu',
    interpolation: {
      escapeValue: false, // React automatikusan escape-eli a stringeket
    },
  });

export default i18n;
