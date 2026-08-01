import type { PromotionEvent } from "@/types/site";

export function getVisiblePromotions(items: PromotionEvent[], now = new Date()) {
  const time = now.getTime();
  return items
    .filter((item) => {
      if (!item.published) return false;
      const start = new Date(item.startDate).getTime();
      const end = item.endDate ? new Date(item.endDate).getTime() : Number.POSITIVE_INFINITY;
      if (!Number.isFinite(start) || (item.endDate && !Number.isFinite(end)) || end < time) return false;
      return item.type === "event" || start <= time;
    })
    .sort((a, b) => b.priority - a.priority || new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
}

export function localize<T extends Record<"en" | "es", string>>(value: T | undefined, locale: "en" | "es") {
  return value?.[locale] || value?.en || "";
}
