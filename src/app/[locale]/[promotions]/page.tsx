import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PromotionsPage } from "@/components/promotions-page";
import { EventInquiryPage } from "@/components/event-inquiry-page";
import { siteConfig } from "@/config/site";
import { getDictionary } from "@/content/dictionaries";
import { isLocale, localizedPath } from "@/i18n/routing";

function isPromotionSegment(locale: "en" | "es", segment: string) { return segment === (locale === "en" ? "promotions" : "promociones"); }
function isEventInquirySegment(locale: "en" | "es", segment: string) { return segment === (locale === "en" ? "book-your-event" : "reserva-tu-evento"); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string; promotions: string }> }): Promise<Metadata> {
  const { locale, promotions } = await params; if (!isLocale(locale)) return {};
  const copy = getDictionary(locale).metadata;
  if (isEventInquirySegment(locale, promotions)) {
    const canonical = localizedPath(locale, "eventInquiry");
    return { title: copy.eventInquiryTitle, description: copy.eventInquiryDescription, alternates: { canonical, languages: { "en-US": "/en/book-your-event", es: "/es/reserva-tu-evento", "x-default": "/en/book-your-event" } }, openGraph: { title: copy.eventInquiryTitle, description: copy.eventInquiryDescription, url: canonical, locale: locale === "en" ? "en_US" : "es_ES", siteName: siteConfig.fullName } };
  }
  if (!isPromotionSegment(locale, promotions)) return {};
  const canonical = localizedPath(locale, "promotions");
  return { title: copy.promotionsTitle, description: copy.promotionsDescription, alternates: { canonical, languages: { "en-US": "/en/promotions", es: "/es/promociones", "x-default": "/en/promotions" } }, openGraph: { title: copy.promotionsTitle, description: copy.promotionsDescription, url: canonical, locale: locale === "en" ? "en_US" : "es_ES", siteName: siteConfig.fullName } };
}

export default async function Page({ params }: { params: Promise<{ locale: string; promotions: string }> }) { const { locale, promotions } = await params; if (!isLocale(locale)) notFound(); if (isEventInquirySegment(locale, promotions)) return <EventInquiryPage locale={locale} />; if (!isPromotionSegment(locale, promotions)) notFound(); return <PromotionsPage locale={locale} />; }
