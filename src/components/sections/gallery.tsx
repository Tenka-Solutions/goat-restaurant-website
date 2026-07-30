import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";
import { gallery } from "@/content/site-content";

export function Gallery() {
  return (
    <section className="bg-ink px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Momentos G.O.A.T."
          title="La mesa está servida."
          align="center"
          dark
        />
        <div className="mt-14 grid auto-rows-[14rem] grid-cols-2 gap-3 sm:auto-rows-[18rem] lg:grid-cols-4">
          {gallery.map((image, index) => (
            <figure
              key={`${image.src}-${index}`}
              className={`relative overflow-hidden bg-ink-soft ${
                index === 0
                  ? "col-span-2 row-span-2"
                  : index === 2
                    ? "col-span-2"
                    : ""
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={
                  index === 0
                    ? "(max-width: 1024px) 100vw, 50vw"
                    : "(max-width: 640px) 50vw, 25vw"
                }
                className="object-cover transition-transform duration-700 hover:scale-[1.025]"
                style={{ objectPosition: image.position }}
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
