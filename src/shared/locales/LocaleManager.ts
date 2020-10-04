import i18next, { InitOptions, TFunction } from "i18next";
import { getLanguage } from "../locales";

export default class LocaleManager {
  options: InitOptions;
  constructor(options: InitOptions = {}) {
    this.options = options;
    i18next.init({
      fallbackLng: "en-US",
      resources: options.resources,
    });
  }

  changeLanguage(lng: string): Promise<TFunction> {
    return i18next.changeLanguage(lng);
  }

  changeLanguageByLocale(locale: string): Promise<TFunction> {
    const lng = getLanguage(locale);
    return this.changeLanguage(lng);
  }

  getI18n() {
    return i18next;
  }
}
