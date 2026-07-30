import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/content/site-content";

export function Story() {
  return (
    <section
      id="experiencia"
      className="overflow-hidden bg-ivory text-ink lg:grid lg:grid-cols-2"
    >
      <div className="relative min-h-[26rem] sm:min-h-[34rem] lg:min-h-[46rem]">
        <Image
          src="/images/restaurant-experience.png"
          alt="Grupo de amigos compartiendo una comida argentina frente a la parrilla"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
        <div className="absolute bottom-0 right-0 bg-sky px-6 py-4 text-ink sm:px-8 sm:py-5">
          <p className="font-display text-3xl tracking-wide">Bienvenidos</p>
          <p className="text-[0.58rem] font-bold uppercase tracking-[0.2em]">
            Siempre hay lugar en la mesa
          </p>
        </div>
      </div>

      <div className="flex items-center px-5 py-20 sm:px-10 lg:px-16 lg:py-24 xl:px-24">
        <div>
          <SectionHeading
            eyebrow={siteConfig.story.eyebrow}
            title={siteConfig.story.title}
            body={siteConfig.story.body}
          />
          <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-ink/15 pt-8">
            <div>
              <dt className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-blue-deep">
                Cocina
              </dt>
              <dd className="mt-2 font-display text-2xl tracking-wide">
                Honesta & artesanal
              </dd>
            </div>
            <div>
              <dt className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-blue-deep">
                Ambiente
              </dt>
              <dd className="mt-2 font-display text-2xl tracking-wide">
                Cálido & cercano
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
