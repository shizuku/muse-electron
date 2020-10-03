export const translate = (
  locale: string,
  strings: Record<string, Record<string, string>>
) => {
  return (key: string) => {
    return strings[locale][key] || key;
  };
};
