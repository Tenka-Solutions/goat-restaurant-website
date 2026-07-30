import { Essence } from "@/components/sections/essence";
import { FinalCta } from "@/components/sections/final-cta";
import { Flavours } from "@/components/sections/flavours";
import { Gallery } from "@/components/sections/gallery";
import { Hero } from "@/components/sections/hero";
import { Story } from "@/components/sections/story";
import { Visit } from "@/components/sections/visit";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export default function Home() {
  return (
    <>
      <a
        href="#contenido"
        className="fixed left-4 top-3 z-[60] -translate-y-20 bg-sky px-4 py-3 text-xs font-bold uppercase tracking-wider text-ink transition-transform focus:translate-y-0"
      >
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido">
        <Hero />
        <Essence />
        <Flavours />
        <Story />
        <Gallery />
        <Visit />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
