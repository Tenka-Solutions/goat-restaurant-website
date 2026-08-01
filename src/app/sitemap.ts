import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { routes } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [routes.home.en, routes.home.es, routes.menu.en, routes.menu.es, routes.promotions.en, routes.promotions.es];
  return paths.map((path) => ({ url: `${siteConfig.siteUrl}${path}`, changeFrequency: path.includes("menu") ? "weekly" : "monthly", priority: path === "/en" ? 1 : 0.8 }));
}
