import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "@/content/dictionaries";
import { localizedPath } from "@/i18n/routing";
import type { Locale } from "@/types/site";

const heroLineClass = {
  default: "text-ivory",
  argentina: "argentina-text",
  gold: "text-gold",
} as const;

export function LocalizedHero({ locale }: { locale: Locale }) {
  const copy = getDictionary(locale).hero;

  return (
    <section id="top" className="relative flex min-h-[43rem] items-center overflow-hidden bg-ink px-5 py-24 sm:px-8 lg:min-h-[49rem] lg:px-12">
      <Image src="/images/hero-grill.png" alt={locale === "en" ? "Argentine grilled beef beside the fire" : "Corte argentino a la parrilla junto al fuego"} fill priority sizes="100vw" className="object-cover object-[68%_center]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,8,.97)_0%,rgba(8,8,8,.84)_42%,rgba(8,8,8,.18)_78%)]" />
      <div className="relative mx-auto w-full max-w-[90rem]">
        <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[.26em] text-sky-light"><span className="h-px w-9 bg-sky" />{copy.eyebrow}</p>
        <h1 className="max-w-3xl font-display text-[4.1rem] leading-[.88] tracking-[.01em] text-ivory sm:text-8xl lg:text-[7.5rem]">
          {copy.title.map((line) => <span key={line.text} className={`block ${heroLineClass[line.style]}`}>{line.text}</span>)}
        </h1>
        <p className="mt-6 max-w-xl text-base leading-7 text-ivory/72 sm:text-lg">{copy.description}</p>
        <div className="mt-9 flex flex-col gap-3 min-[420px]:flex-row">
          <Link href={localizedPath(locale, "menu")} className="inline-flex min-h-13 items-center justify-center bg-gold px-7 text-xs font-bold uppercase tracking-[.18em] text-ink hover:bg-ivory">{copy.primary}</Link>
          <a href="#visit" className="inline-flex min-h-13 items-center justify-center border border-sky/75 px-7 text-xs font-bold uppercase tracking-[.18em] text-sky-light hover:bg-sky hover:text-ink">{copy.secondary}</a>
        </div>
      </div>
    </section>
  );
}
