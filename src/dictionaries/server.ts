import { Locale } from "@/config/i18n.config";
import { defaultDictionary } from "./default";

export const getDictionaryServer = (lang: Locale) => {
  return defaultDictionary[lang] ?? defaultDictionary["pt-BR"];
};
