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

function checkLngIsAvailable(locale: string) {
  return availableLanguages.some((lng) => lng.value === locale);
}

export function getLanguage(locale: string): string {
  if (checkLngIsAvailable(locale)) return locale;
  if (locale.startsWith("en")) {
    return "en-US";
  }
  if (locale.startsWith("zh")) {
    return "zh-CN";
  }
  return "en-US";
}
