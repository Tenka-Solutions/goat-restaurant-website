import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { isLocale, locales } from "@/i18n/routing";

export function generateStaticParams() { return locales.map((locale) => ({ locale })); }

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <><a href="#content" className="fixed left-4 top-3 z-[80] -translate-y-20 bg-sky px-4 py-3 text-xs font-bold uppercase tracking-wider text-ink focus:translate-y-0">{locale === "en" ? "Skip to content" : "Saltar al contenido"}</a><Header locale={locale} />{children}<Footer locale={locale} /></>;
}
