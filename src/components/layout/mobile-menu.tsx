"use client";

import Link from "next/link";
import { useState } from "react";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import type { Locale } from "@/types/site";

type Item = { label: string; href: string };

export function MobileMenu({ locale, items, cta, labels }: { locale: Locale; items: Item[]; cta: Item; labels: { open: string; close: string; nav: string } }) {
  const [open, setOpen] = useState(false);
  return <div className="xl:hidden">
    <button type="button" className="relative z-50 grid size-11 place-items-center border border-ivory/20 text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky" aria-label={open ? labels.close : labels.open} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((value) => !value)}>
      <span className="flex w-5 flex-col gap-1.5" aria-hidden="true"><span className={`h-px bg-current transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`} /><span className={`h-px bg-current transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} /></span>
    </button>
    <div id="mobile-navigation" className={`fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink px-6 pb-8 pt-24 transition-[opacity,visibility] ${open ? "visible opacity-100" : "invisible opacity-0"}`}>
      <nav aria-label={labels.nav}><ul className="divide-y divide-ivory/10 border-y border-ivory/10">{items.map((entry) => <li key={entry.href}><Link className="block py-4 font-display text-3xl tracking-wide text-ivory hover:text-sky" href={entry.href} onClick={() => setOpen(false)}>{entry.label}</Link></li>)}</ul></nav>
      <div className="mt-6"><LanguageSwitcher locale={locale} /></div>
      <Link className="mt-8 inline-flex min-h-12 items-center justify-center bg-sky px-6 text-xs font-bold uppercase tracking-[0.18em] text-ink" href={cta.href} onClick={() => setOpen(false)}>{cta.label}</Link>
    </div>
  </div>;
}
