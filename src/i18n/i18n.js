import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import languageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n.use(Backend)
    .use(languageDetector)
    .use(initReactI18next)
    .init({
        backend: {
            loadPath: './i18n/{{ns}}/{{lng}}.json',
        },
        fallbackLng: 'en',
        debug: false,
        ns: ['common', 'step1', 'step2', 'step3', 'step4'],

        interpolation: {
            formatSeparator: ',',
        },
    });

export default i18n;
