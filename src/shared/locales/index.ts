import { resources } from "./resources";

export const availableLanguages = [
  {
    value: "en-US",
    label: "English",
  },
  {
    value: "zh-CN",
    lable: "简体中文",
  },
];

export type Translator = (k: string) => string;

export function getTranslator(locale: string): Translator {
  return (key: string) => {
    return resources[locale][key] || key;
  };
}
