import i18next from 'i18next';
import Backend from 'i18next-http-backend';
// import Backend from 'i18next-locize-backend';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18next
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        supportedLngs: ['en', 'de', 'ar'],
        fallbackLng: 'en',
        debug: true,
        saveMissing: true,
        detection: {
            order: ['cookie', 'localStorage', 'htmlTag', 'path', 'subdomain'],
            caches: ['localStorage', 'cookie'],
        },
        backend: {
            loadPath: 'http://localhost:8000/api/language/{{lng}}', // Replace with your backend API endpoint
        },
        // backend:{
        //     projectId:'',
        //     apiKey:''
        // }
        // resources: {
        //     en: {
        //         translation: {
        //             "welcome": "hello world",
        //             description:'Edit <1>src/App.jsx</1> and save to test HMR'
        //         }
        //     },
        //     de: {
        //         translation: {
        //             "welcome": "Hallo Wereld",
        //             description:'Bewerk <1>src/App.jsx</1> en sla op om HMR te testen'
        //         }
        //     },
        // },

        // interpolation:{     //for resolving the cross size scripting issues,but react will take care of this issues
        //     escapeValue:false
        // }
    });


export default i18next