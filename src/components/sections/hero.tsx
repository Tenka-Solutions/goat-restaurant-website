import Image from "next/image";
import { siteConfig } from "@/content/site-content";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[43rem] items-end overflow-hidden bg-ink pb-16 pt-32 sm:min-h-[48rem] sm:pb-20 lg:min-h-[52rem] lg:items-center lg:pb-0"
    >
      <Image
        src="/images/hero-grill.png"
        alt="Corte argentino a la parrilla servido junto al fuego"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[68%_center]"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,8,.97)_0%,rgba(8,8,8,.86)_38%,rgba(8,8,8,.2)_74%),linear-gradient(0deg,rgba(8,8,8,.8)_0%,transparent_55%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/70 to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-[90rem] px-5 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.26em] text-sky-light">
            <span className="h-px w-9 bg-sky" aria-hidden="true" />
            {siteConfig.hero.eyebrow}
          </p>
          <h1 className="text-balance font-display text-[4.25rem] leading-[0.87] tracking-[0.01em] text-ivory sm:text-[6rem] lg:text-[7.5rem]">
            <span className="block">El sabor</span>
            <span className="argentina-text block">argentino</span>
            <span className="block text-gold">empieza en</span>
            <span className="block text-gold">el fuego.</span>
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-base leading-7 text-ivory/72 sm:text-lg">
            {siteConfig.hero.description}
          </p>
          <div className="mt-9 flex flex-col gap-3 min-[420px]:flex-row">
            <a
              href="#sabores"
              className="inline-flex min-h-13 items-center justify-center bg-gold px-7 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-ink transition-colors hover:bg-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky"
            >
              Descubre nuestros sabores
            </a>
            <a
              href="#visitanos"
              className="inline-flex min-h-13 items-center justify-center border border-sky/75 px-7 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-sky-light transition-colors hover:bg-sky hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky"
            >
              Planifica tu visita
            </a>
          </div>
        </div>
      </div>

      <p className="absolute bottom-8 right-10 hidden -rotate-90 origin-bottom-right text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-ivory/35 xl:block">
        Parrilla · Bakery · Café
      </p>
    </section>
  );
}
