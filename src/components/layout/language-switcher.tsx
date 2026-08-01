"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { equivalentPath } from "@/i18n/routing";
import type { Locale } from "@/types/site";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const search = useSearchParams();
  const [hash, setHash] = useState("");
  useEffect(() => setHash(window.location.hash), [pathname]);
  return (
    <nav aria-label="Language" className="flex items-center gap-1 text-[0.65rem] font-bold tracking-[0.16em]">
      {(["en", "es"] as const).map((target, index) => {
        const query = search.toString();
        const href = `${equivalentPath(pathname, target)}${query ? `?${query}` : ""}${hash}`;
        return <span className="contents" key={target}>{index > 0 && <span aria-hidden="true" className="text-ivory/30">/</span>}<Link href={href} hrefLang={target} lang={target} aria-current={locale === target ? "page" : undefined} className={locale === target ? "text-sky underline underline-offset-4" : "text-ivory/60 hover:text-ivory"}>{target.toUpperCase()}</Link></span>;
      })}
    </nav>
  );
}
