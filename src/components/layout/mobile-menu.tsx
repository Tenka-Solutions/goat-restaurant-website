"use client";

import { useState } from "react";
import { navigation, siteConfig } from "@/content/site-content";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="relative z-50 grid size-11 place-items-center border border-ivory/20 text-ivory transition-colors hover:border-sky focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen((current) => !current)}
      >
        <span className="sr-only">{open ? "Cerrar menú" : "Abrir menú"}</span>
        <span className="flex w-5 flex-col gap-1.5" aria-hidden="true">
          <span
            className={`h-px w-full bg-current transition-transform ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-full bg-current transition-transform ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </span>
      </button>

      <div
        id="mobile-navigation"
        className={`fixed inset-0 z-40 flex flex-col bg-ink px-6 pb-8 pt-28 transition-[opacity,visibility] duration-300 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav aria-label="Navegación móvil">
          <ul className="divide-y divide-ivory/10 border-y border-ivory/10">
            {navigation.map((item, index) => (
              <li key={item.href}>
                <a
                  className="flex items-center justify-between py-5 font-display text-4xl tracking-wide text-ivory transition-colors hover:text-sky"
                  href={item.href}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                  <span className="font-sans text-xs text-gold" aria-hidden="true">
                    0{index + 1}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          className="mt-auto inline-flex min-h-12 items-center justify-center bg-sky px-6 text-xs font-bold uppercase tracking-[0.18em] text-ink transition-colors hover:bg-sky-light"
          href={siteConfig.reservationCta.href}
          onClick={() => setOpen(false)}
        >
          {siteConfig.reservationCta.label}
        </a>
      </div>
    </div>
  );
}
