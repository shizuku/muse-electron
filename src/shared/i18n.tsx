import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources:{
    en: { appName: "Muse", hello: "Hello" },
    zh: { appName: "音声", hello: "你好" },
  },
  lng: "en",
  fallbackLng: "en",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
