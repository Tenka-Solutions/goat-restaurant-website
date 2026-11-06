import { notFound, redirect } from "next/navigation";
import { siteConfig } from "@/config/site";
import { isLocale } from "@/i18n/routing";

export default async function LocalizedMenuRedirect({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  redirect(siteConfig.publicMenuUrl);
}
