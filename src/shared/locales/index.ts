import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { enUS } from "./en-US";
import { zhCN } from "./zh-CN";

export const getAvaliableLangauge = (): { value: string; label: string }[] => {
  return [
    { value: "en-US", label: "English" },
    { value: "zh-CN", label: "简体中文" },
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
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
