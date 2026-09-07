import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { LocalizedHero } from "@/components/localized-hero";
import { PromotionsGrid } from "@/components/promotions-grid";
import { SectionHeading } from "@/components/ui/section-heading";
import { businessDetails } from "@/config/site";
import { getDictionary } from "@/content/dictionaries";
import { localizedPath } from "@/i18n/routing";
import { getPromotionEvents } from "@/sanity/lib/client";
import { getVisiblePromotions } from "@/lib/promotions";
import type { Locale } from "@/types/site";

const images = ["/images/hero-grill.png", "/images/bakery-table.png", "/images/bakery-table.png", "/images/restaurant-experience.png"];

export async function HomePage({ locale }: { locale: Locale }) {
  const copy = getDictionary(locale);
  const promotions = getVisiblePromotions(await getPromotionEvents()).slice(0, 3);
  return <main id="content">
    <LocalizedHero locale={locale} />
    <section id="essence" className="bg-ivory px-5 py-24 text-ink sm:px-8 lg:px-12 lg:py-32"><div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2"><SectionHeading eyebrow={copy.essence.eyebrow} title={copy.essence.title} body={copy.essence.body} /><blockquote className="border-l-2 border-sky px-7 py-8"><p className="font-display text-4xl leading-tight tracking-wide">“{copy.essence.quote}”</p><cite className="mt-6 block text-xs not-italic uppercase tracking-[.18em] text-gold-dark">{copy.essence.quoteBy}</cite></blockquote></div><div className="mx-auto mt-16 grid max-w-7xl border-t border-ink/15 md:grid-cols-3">{copy.essence.pillars.map(([title, body], index) => <article key={title} className={`py-8 md:px-8 ${index ? "border-t border-ink/15 md:border-l md:border-t-0" : ""}`}><span className="text-xs font-bold text-sky">0{index + 1}</span><h3 className="mt-4 font-display text-4xl">{title}</h3><p className="mt-3 text-sm leading-6 text-ink/60">{body}</p></article>)}</div></section>
    <section className="bg-ink-soft px-5 py-24 sm:px-8 lg:px-12"><div className="mx-auto max-w-7xl"><SectionHeading eyebrow={copy.flavours.eyebrow} title={copy.flavours.title} body={copy.flavours.body} dark /><div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{copy.flavours.items.map((title, index) => <article key={title} className="group relative min-h-80 overflow-hidden bg-ink"><Image src={images[index]} alt="" fill sizes="(max-width: 640px) 100vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent" /><h3 className="absolute bottom-6 left-6 font-display text-4xl text-ivory">{title}</h3></article>)}</div></div></section>
    <section id="experience" className="grid bg-ivory text-ink lg:grid-cols-2"><div className="relative min-h-96 lg:min-h-[38rem]"><Image src="/images/restaurant-experience.png" alt={locale === "en" ? "Friends sharing a meal by the grill" : "Amigos compartiendo una comida junto a la parrilla"} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" /></div><div className="flex items-center px-5 py-20 sm:px-10 lg:px-16"><SectionHeading eyebrow={copy.story.eyebrow} title={copy.story.title} body={copy.story.body} /></div></section>
    {promotions.length > 0 && <section className="bg-ink px-5 py-24 sm:px-8 lg:px-12"><div className="mx-auto max-w-7xl"><div className="mb-12 flex flex-wrap items-end justify-between gap-5"><SectionHeading eyebrow={copy.promotions.eyebrow} title={copy.promotions.title} dark /><Link className="text-xs font-bold uppercase tracking-[.18em] text-sky underline underline-offset-4" href={localizedPath(locale, "promotions")}>{copy.promotions.viewAll}</Link></div><PromotionsGrid items={promotions} locale={locale} /></div></section>}
    <section id="visit" className="bg-ink-soft px-5 py-24 sm:px-8 lg:px-12"><div className="mx-auto max-w-7xl"><SectionHeading eyebrow={copy.visit.eyebrow} title={copy.visit.title} dark /><div className="mt-12 grid gap-5 md:grid-cols-3">{[[copy.visit.address, businessDetails.address], [copy.visit.hours, businessDetails.openingHours.join(" · ") || copy.visit.hoursComingSoon], [copy.visit.contact, businessDetails.phone || businessDetails.email]].filter((entry): entry is [string, string] => Boolean(entry[1])).map(([label, value]) => <article key={label} className="border-t border-gold/50 pt-5"><h3 className="text-xs font-bold uppercase tracking-[.2em] text-gold">{label}</h3><p className="mt-4 text-sm leading-6 text-ivory/65">{value}</p></article>)}</div></div></section>
    <ContactForm locale={locale} />
  </main>;
}
