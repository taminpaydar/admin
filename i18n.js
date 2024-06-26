

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import fa from "./src/locales/fa.json"

const resources = {
 fa

}

i18n
  .use(initReactI18next)
  .init({
    
    resources,
    lng: 'fa',
     supportedLngs: ["fa"],

    interpolation: {
      escapeValue: false
    }
  });


export default i18n;