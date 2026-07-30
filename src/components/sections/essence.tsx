import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/content/site-content";

const pillars = [
  {
    number: "01",
    title: "Brasas",
    text: "Fuego real, tiempo preciso y sabores que hablan por sí solos.",
  },
  {
    number: "02",
    title: "Masa",
    text: "El oficio paciente de amasar, fermentar y hornear cada día.",
  },
  {
    number: "03",
    title: "Encuentro",
    text: "La mesa como lugar de pausa, conversación y comunidad.",
  },
];

export function Essence() {
  return (
    <section
      id="esencia"
      className="relative overflow-hidden bg-ivory px-5 py-24 text-ink sm:px-8 sm:py-28 lg:px-12 lg:py-36"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)] lg:gap-16 xl:gap-24">
          <SectionHeading
            eyebrow={siteConfig.experience.eyebrow}
            title={siteConfig.experience.title}
            body={siteConfig.experience.body}
          />

          <div className="relative isolate overflow-hidden border-l-2 border-sky px-6 py-5 sm:px-8 sm:py-7 lg:min-h-80 lg:px-10 lg:py-12 xl:min-h-96">
            <span
              className="pointer-events-none absolute bottom-3 right-8 z-0 hidden select-none whitespace-nowrap font-display text-[clamp(6rem,8vw,8.5rem)] leading-[0.8] tracking-[0.03em] text-ink/[0.05] xl:block"
              aria-hidden="true"
            >
              GOAT
            </span>

            <blockquote className="relative z-10 flex h-full max-w-xl flex-col justify-center xl:pb-28">
              <p className="text-balance font-display text-3xl leading-[1.08] tracking-wide text-ink/80 sm:text-4xl lg:text-[2.35rem] xl:text-[2.75rem]">
                “La cocina no termina cuando sale el plato. Termina cuando la
                mesa se llena.”
              </p>
              <cite className="mt-6 block text-[0.65rem] font-semibold not-italic uppercase leading-5 tracking-[0.2em] text-gold-dark">
                Espíritu G.O.A.T. · Texto editorial editable
              </cite>
            </blockquote>
          </div>
        </div>

        <div className="mt-20 grid items-stretch border-t border-ink/15 md:grid-cols-3 lg:mt-24">
          {pillars.map((pillar, index) => (
            <article
              key={pillar.title}
              className={`flex h-full flex-col py-8 md:px-8 md:py-10 lg:px-10 ${
                index > 0
                  ? "border-t border-ink/15 md:border-l md:border-t-0"
                  : ""
              }`}
            >
              <span className="text-[0.65rem] font-bold tracking-[0.2em] text-sky">
                {pillar.number}
              </span>
              <h3 className="mt-5 font-display text-4xl tracking-wide">
                {pillar.title}
              </h3>
              <p className="mt-3 max-w-xs text-sm leading-6 text-ink/60">
                {pillar.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
