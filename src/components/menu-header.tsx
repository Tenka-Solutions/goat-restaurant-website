import Image from "next/image";
import { MenuActions } from "@/components/menu-actions";
import { siteConfig } from "@/config/site";
import { getDictionary } from "@/content/dictionaries";
import type { Locale } from "@/types/site";

export function MenuHeader({ locale }: { locale: Locale }) {
  const copy = getDictionary(locale).menu;
  const showDevelopmentNotice = process.env.NODE_ENV === "development" && siteConfig.isProvisionalUrl;

  return (
    <header id="top" className="border-b border-ivory/10 px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,1fr)_auto]">
        <div className="text-center">
          <Image src={siteConfig.brandLogoPath} width={1024} height={1024} sizes="(max-width: 640px) 96px, (max-width: 1024px) 112px, 144px" alt={copy.logoAlt} priority className="mx-auto mb-6 size-24 object-contain sm:size-28 lg:size-36" />
          <p className="text-xs font-semibold uppercase tracking-[.25em] text-sky-light">{copy.eyebrow}</p>
          <h1 className="mt-4 font-display text-7xl leading-none sm:text-8xl">{copy.title}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-ivory/65">{copy.intro}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={siteConfig.menuPdfPath} target="_blank" className="inline-flex min-h-11 items-center justify-center bg-gold px-5 text-xs font-bold uppercase tracking-[.15em] text-ink">{copy.pdf}</a>
            <MenuActions share={copy.share} shared={copy.shared} />
          </div>
        </div>
        <figure className="mx-auto w-full max-w-64 border border-gold/35 bg-ivory p-5 text-center text-ink lg:mx-0">
          <Image src={siteConfig.menuQrPath} width={1200} height={1200} sizes="(max-width: 1024px) 192px, 208px" alt={copy.qrAlt} className="mx-auto size-48 max-w-full object-contain lg:size-52" />
          <figcaption className="mt-4">
            <strong className="block font-display text-2xl tracking-wide">{copy.qrTitle}</strong>
            <span className="mt-1 block text-xs leading-5 text-ink/60">{copy.qrBody}</span>
            {showDevelopmentNotice && <span className="mt-2 block text-[.65rem] leading-4 text-red-800">{copy.qrDevelopment}</span>}
          </figcaption>
        </figure>
      </div>
    </header>
  );
}
