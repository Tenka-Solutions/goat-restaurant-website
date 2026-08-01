import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "@fontsource/bebas-neue/400.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { isLocale } from "@/i18n/routing";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: { default: siteConfig.fullName, template: `%s | ${siteConfig.name}` },
  icons: { icon: "/icon.svg" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#0D0D0D", width: "device-width", initialScale: 1 };

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const localeHeader = (await headers()).get("x-goat-locale") ?? "en";
  const locale = isLocale(localeHeader) ? localeHeader : "en";
  return <html lang={locale} className="scroll-smooth"><body>{children}</body></html>;
}
