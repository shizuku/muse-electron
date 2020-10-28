import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enUS from "./en-US";
import zhCN from "./zh-CN";

export const getAvaliableLangauge = (): { value: string; label: string }[] => {
  return [
    { value: enUS.value, label: enUS.label },
    { value: zhCN.value, label: zhCN.label },
  ];
};

const resources = {
  "en-US": {
    translation: enUS,
  },
  "zh-CN": {
    translation: zhCN,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en-US",
  fallbackLng: "en-US",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
