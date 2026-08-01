import { PromotionsGrid } from "@/components/promotions-grid";
import { getDictionary } from "@/content/dictionaries";
import { getVisiblePromotions } from "@/lib/promotions";
import { getPromotionEvents } from "@/sanity/lib/client";
import type { Locale } from "@/types/site";

export async function PromotionsPage({ locale }: { locale: Locale }) {
  const copy = getDictionary(locale).promotions;
  const items = getVisiblePromotions(await getPromotionEvents());
  return <main id="content" className="min-h-[65vh] bg-ink px-5 py-20 text-ivory sm:px-8 lg:px-12"><div className="mx-auto max-w-7xl"><p className="text-xs font-bold uppercase tracking-[.24em] text-sky-light">{copy.eyebrow}</p><h1 className="mt-4 font-display text-7xl leading-none sm:text-8xl">{copy.title}</h1><div className="mt-14">{items.length ? <PromotionsGrid items={items} locale={locale} /> : <div className="border-y border-ivory/10 py-14"><p className="text-lg text-ivory/60">{copy.empty}</p></div>}</div></div></main>;
}
