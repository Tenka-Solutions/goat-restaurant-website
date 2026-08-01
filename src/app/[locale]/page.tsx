import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomePage } from "@/components/home-page";
import { siteConfig } from "@/config/site";
import { getDictionary } from "@/content/dictionaries";
import { isLocale, localizedPath } from "@/i18n/routing";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params; if (!isLocale(locale)) return {};
  const copy = getDictionary(locale).metadata;
  const canonical = localizedPath(locale, "home");
  return { title: copy.homeTitle, description: copy.homeDescription, alternates: { canonical, languages: { "en-US": "/en", "es": "/es", "x-default": "/en" } }, openGraph: { type: "website", locale: locale === "en" ? "en_US" : "es_ES", url: canonical, siteName: siteConfig.fullName, title: copy.homeTitle, description: copy.homeDescription, images: [{ url: "/images/hero-grill.png", width: 1792, height: 1024, alt: siteConfig.fullName }] } };
}

export default async function LocalizedHome({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; if (!isLocale(locale)) notFound(); return <HomePage locale={locale} />; }
