import Link from "next/link";
import { BrandMark } from "@/components/ui/brand-mark";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { siteConfig } from "@/config/site";
import { getDictionary } from "@/content/dictionaries";
import { localizedPath } from "@/i18n/routing";
import type { Locale } from "@/types/site";

export function Header({ locale }: { locale: Locale }) {
  const copy = getDictionary(locale);
  const home = localizedPath(locale, "home");
  const items = [
    { label: copy.navigation.essence, href: `${home}#essence` },
    { label: copy.navigation.menu, href: localizedPath(locale, "menu") },
    { label: copy.navigation.bakery, href: `${localizedPath(locale, "menu")}#bakery` },
    { label: copy.navigation.promotions, href: localizedPath(locale, "promotions") },
    { label: copy.navigation.experience, href: `${home}#experience` },
    { label: copy.navigation.visit, href: `${home}#visit` },
  ];
  const cta = { label: copy.ordering.cta, href: siteConfig.cloverOrderingUrl };

  return (
    <header className="relative z-30 border-b border-ivory/10 bg-ink/95">
      <div className="mx-auto flex h-20 max-w-[90rem] items-center justify-between px-5 sm:px-8 lg:h-24 lg:px-12">
        <Link href={home} className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky">
          <BrandMark inverse />
        </Link>
        <nav className="hidden xl:block" aria-label={copy.navigation.label}>
          <ul className="flex items-center gap-5 xl:gap-7">
            {items.map((entry) => <li key={entry.href}><Link className="link-underline py-3 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-ivory/75 hover:text-ivory xl:text-[0.65rem]" href={entry.href}>{entry.label}</Link></li>)}
          </ul>
        </nav>
        <div className="hidden items-center gap-5 xl:flex">
          <LanguageSwitcher locale={locale} />
          <a href={cta.href} target="_blank" rel="noopener noreferrer" data-cta="clover-ordering" className="inline-flex min-h-11 items-center border border-sky/80 px-4 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-sky-light hover:bg-sky hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky">{cta.label}</a>
        </div>
        <MobileMenu locale={locale} items={items} cta={cta} labels={{ open: copy.navigation.open, close: copy.navigation.close, nav: copy.navigation.label }} />
      </div>
    </header>
  );
}
