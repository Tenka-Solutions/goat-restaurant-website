import { navigation, siteConfig } from "@/content/site-content";
import { BrandMark } from "@/components/ui/brand-mark";
import { MobileMenu } from "@/components/layout/mobile-menu";

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-30 border-b border-ivory/10">
      <div className="mx-auto flex h-20 max-w-[90rem] items-center justify-between px-5 sm:px-8 lg:h-24 lg:px-12">
        <a
          href="#inicio"
          className="rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky"
        >
          <BrandMark inverse />
        </a>

        <nav className="hidden lg:block" aria-label="Navegación principal">
          <ul className="flex items-center gap-7 lg:gap-10">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="link-underline py-3 text-[0.67rem] font-semibold uppercase tracking-[0.18em] text-ivory/75 transition-colors hover:text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <a
            href={siteConfig.reservationCta.href}
            className="inline-flex min-h-11 items-center whitespace-nowrap border border-sky/80 px-4 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-sky-light transition-colors hover:bg-sky hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky lg:px-5 lg:text-[0.65rem] lg:tracking-[0.18em]"
          >
            {siteConfig.reservationCta.label}
          </a>
        </div>

        <MobileMenu />
      </div>
    </header>
  );
}
