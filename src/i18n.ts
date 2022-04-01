import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import commonEN from './locales/en/common.json';
import notificationsEN from './locales/en/notifications.json';
import errorsEN from './locales/en/errors.json';
import dateFormatsEN from './locales/en/dateFormats.json';

export const defaultNS = 'common';
export const resources = {
  en: {
    common: commonEN,
    errors: errorsEN,
    notifications: notificationsEN,
    dateFormats: dateFormatsEN,
  },
} as const;

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    lng: 'en',
    ns: [
      'common',
      'errors',
      'notifications',
      'dateFormats',
    ],
    defaultNS,
    resources,
  });
