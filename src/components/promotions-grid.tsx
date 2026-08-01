import Image from "next/image";
import { getDictionary } from "@/content/dictionaries";
import { localize } from "@/lib/promotions";
import type { Locale, PromotionEvent } from "@/types/site";

export function PromotionsGrid({ items, locale }: { items: PromotionEvent[]; locale: Locale }) {
  const copy = getDictionary(locale).promotions;
  return <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{items.map((item) => <article key={item._id} className="border border-ivory/15 bg-ink-soft">
    {item.imageUrl && <div className="relative aspect-[4/3] overflow-hidden"><Image src={item.imageUrl} alt={localize(item.alt, locale)} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" /></div>}
    <div className="p-6"><p className="text-[.62rem] font-bold uppercase tracking-[.2em] text-sky-light">{item.type === "event" ? copy.event : copy.promotion}</p><h3 className="mt-2 font-display text-4xl tracking-wide">{localize(item.title, locale)}</h3>{item.dateTime && <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-gold">{localize(item.dateTime, locale)}</p>}<p className="mt-4 text-sm leading-6 text-ivory/65">{localize(item.description, locale)}</p>{item.cta && item.link && <a className="mt-5 inline-block text-xs font-bold uppercase tracking-[.16em] text-sky underline underline-offset-4" href={item.link}>{localize(item.cta, locale)}</a>}</div>
  </article>)}</div>;
}
