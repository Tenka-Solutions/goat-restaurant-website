import Image from "next/image";
import Link from "next/link";
import { businessDetails, siteConfig } from "@/config/site";
import { getDictionary } from "@/content/dictionaries";
import { localizedPath } from "@/i18n/routing";
import type { Locale } from "@/types/site";

export function Footer({ locale }: { locale: Locale }) {
  const copy = getDictionary(locale);
  const links = [
    { label: copy.ordering.cta, href: siteConfig.cloverOrderingUrl, external: true },
    { label: copy.navigation.menu, href: localizedPath(locale, "menu"), external: false },
    { label: copy.navigation.promotions, href: localizedPath(locale, "promotions"), external: false },
    { label: copy.navigation.visit, href: `${localizedPath(locale, "home")}#visit`, external: false },
  ];
  const socials = [["Instagram", businessDetails.instagram], ["Facebook", businessDetails.facebook], ["TikTok", businessDetails.tiktok]].filter((entry): entry is [string, string] => Boolean(entry[1]));

  return (
    <footer className="border-t border-ivory/10 bg-ink px-5 pb-8 pt-14 text-ivory sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Image src={siteConfig.brandLogoPath} width={1024} height={1024} sizes="80px" alt={copy.menu.logoAlt} className="size-20 object-contain" />
          <p className="mt-5 max-w-sm text-sm leading-6 text-ivory/55">{copy.footer.description}</p>
        </div>
        <div>
          <p className="mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gold">{copy.footer.explore}</p>
          <ul className="space-y-3 text-sm text-ivory/65">{links.map((link) => <li key={link.href}>{link.external ? <a href={link.href} target="_blank" rel="noopener noreferrer" data-cta="clover-ordering" className="hover:text-sky focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky">{link.label}</a> : <Link href={link.href} className="hover:text-sky">{link.label}</Link>}</li>)}</ul>
        </div>
        <div>
          <p className="mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gold">{copy.footer.connect}</p>
          {socials.length ? <ul className="space-y-3 text-sm text-ivory/65">{socials.map(([label, href]) => <li key={label}><a href={href} target="_blank" rel="noreferrer" className="hover:text-sky">{label}</a></li>)}</ul> : <p className="text-sm text-ivory/45">{copy.footer.socialsPending}</p>}
        </div>
      </div>
      <div className="mx-auto mt-14 flex max-w-7xl flex-col gap-3 border-t border-ivory/10 pt-7 text-[0.65rem] uppercase tracking-[0.15em] text-ivory/35 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} {siteConfig.fullName}</p>
        <a href="#top" className="hover:text-sky">{copy.footer.back} ↑</a>
      </div>
    </footer>
  );
}
