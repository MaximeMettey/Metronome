import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import en from './locales/en.json';
import fr from './locales/fr.json';
import es from './locales/es.json';
import de from './locales/de.json';
import it from './locales/it.json';
import pt from './locales/pt.json';

const resources = {
  en: { translation: en },
  fr: { translation: fr },
  es: { translation: es },
  de: { translation: de },
  it: { translation: it },
  pt: { translation: pt },
};

// Get device language - compatible with Expo SDK 54
const getDeviceLanguage = (): string => {
  try {
    // Try new API (Expo SDK 54+)
    const locales = Localization.getLocales();
    if (locales && locales.length > 0 && locales[0].languageCode) {
      return locales[0].languageCode;
    }
  } catch (error) {
    // Fallback for older versions or if getLocales fails
    try {
      if (Localization.locale && typeof Localization.locale === 'string') {
        return Localization.locale.split('-')[0];
      }
    } catch (e) {
      console.warn('Failed to get device locale:', e);
    }
  }
  return 'en'; // Default fallback
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getDeviceLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    compatibilityJSON: 'v3',
  });

export default i18n;
