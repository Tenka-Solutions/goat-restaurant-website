import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";
import { highlights } from "@/content/site-content";

export function Flavours() {
  return (
    <section
      id="sabores"
      className="bg-ink-soft px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Lo que nos mueve"
          title="Sabores con historia."
          body="De las brasas al horno, una selección que recorre distintas formas de sentarse a una mesa argentina."
          dark
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item, index) => (
            <article
              key={item.name}
              className={`group relative min-h-[27rem] overflow-hidden bg-ink ${
                index % 2 === 1 ? "lg:translate-y-10" : ""
              }`}
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                style={{ objectPosition: item.position }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-sky-light">
                  {item.eyebrow}
                </p>
                <h3 className="mt-2 font-display text-4xl tracking-wide text-ivory">
                  {item.name}
                </h3>
                <p className="mt-3 max-h-0 overflow-hidden text-sm leading-6 text-ivory/70 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100 group-focus-within:max-h-24 group-focus-within:opacity-100 lg:block">
                  {item.description}
                </p>
                <p className="mt-3 text-sm leading-6 text-ivory/65 lg:hidden">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
