import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PromotionsPage } from "@/components/promotions-page";
import { siteConfig } from "@/config/site";
import { getDictionary } from "@/content/dictionaries";
import { isLocale, localizedPath } from "@/i18n/routing";

function validSegment(locale: "en" | "es", segment: string) { return segment === (locale === "en" ? "promotions" : "promociones"); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string; promotions: string }> }): Promise<Metadata> {
  const { locale, promotions } = await params; if (!isLocale(locale) || !validSegment(locale, promotions)) return {};
  const copy = getDictionary(locale).metadata; const canonical = localizedPath(locale, "promotions");
  return { title: copy.promotionsTitle, description: copy.promotionsDescription, alternates: { canonical, languages: { "en-US": "/en/promotions", es: "/es/promociones", "x-default": "/en/promotions" } }, openGraph: { title: copy.promotionsTitle, description: copy.promotionsDescription, url: canonical, locale: locale === "en" ? "en_US" : "es_ES", siteName: siteConfig.fullName } };
}

export default async function Page({ params }: { params: Promise<{ locale: string; promotions: string }> }) { const { locale, promotions } = await params; if (!isLocale(locale) || !validSegment(locale, promotions)) notFound(); return <PromotionsPage locale={locale} />; }
