import { locales, type Locale } from "@/types/site";

export { locales };
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export const routes = {
  home: { en: "/en", es: "/es" },
  menu: { en: "/en/menu", es: "/es/menu" },
  promotions: { en: "/en/promotions", es: "/es/promociones" },
} as const;

export type RouteKey = keyof typeof routes;

export function localizedPath(locale: Locale, route: RouteKey) {
  return routes[route][locale];
}

export function equivalentPath(pathname: string, locale: Locale) {
  const match = Object.values(routes).find((route) =>
    Object.values(route).includes(pathname as never),
  );
  return match?.[locale] ?? routes.home[locale];
}
