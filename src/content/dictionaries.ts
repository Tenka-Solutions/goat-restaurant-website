import { en } from "@/content/en/site";
import { es } from "@/content/es/site";
import type { Locale } from "@/types/site";

export const dictionaries = { en, es };

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
