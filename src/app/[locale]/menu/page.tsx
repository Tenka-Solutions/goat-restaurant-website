import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MenuPage } from "@/components/menu-page";
import { siteConfig } from "@/config/site";
import { getDictionary } from "@/content/dictionaries";
import { isLocale, localizedPath } from "@/i18n/routing";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> { const { locale } = await params; if (!isLocale(locale)) return {}; const copy = getDictionary(locale).metadata; const canonical = localizedPath(locale, "menu"); return { title: copy.menuTitle, description: copy.menuDescription, alternates: { canonical, languages: { "en-US": "/en/menu", es: "/es/menu", "x-default": "/en/menu" } }, openGraph: { title: copy.menuTitle, description: copy.menuDescription, url: canonical, locale: locale === "en" ? "en_US" : "es_ES", siteName: siteConfig.fullName, images: ["/images/hero-grill.png"] } }; }

export default async function LocalizedMenu({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; if (!isLocale(locale)) notFound(); return <MenuPage locale={locale} />; }
