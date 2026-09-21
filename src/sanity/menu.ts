import type { Locale, LocalizedText } from "@/types/site";

export type SanityMenuCategory = {
  _id: string;
  name?: Partial<LocalizedText>;
  description?: Partial<LocalizedText>;
  anchor?: { current?: string };
  sortOrder?: number;
  showOnWebsite?: boolean;
};

export type SanityMenuItem = {
  _id: string;
  name?: Partial<LocalizedText>;
  description?: Partial<LocalizedText>;
  category?: { _ref?: string };
  sortOrder?: number;
  showOnWebsite?: boolean;
  price?: number | null;
  priceNote?: Partial<LocalizedText>;
  image?: { url?: string; alt?: Partial<LocalizedText> };
};

export type SiteMenuItem = {
  id: string;
  name: LocalizedText;
  description?: LocalizedText;
  price: number | null;
  formattedPrice?: string;
  priceNote?: LocalizedText;
  image?: { url: string; alt: LocalizedText };
};

export type SiteMenuCategory = {
  id: string;
  anchor: string;
  name: LocalizedText;
  description?: LocalizedText;
  items: SiteMenuItem[];
};

function localized(value?: Partial<LocalizedText>): LocalizedText {
  return { en: value?.en?.trim() || "", es: value?.es?.trim() || "" };
}

function optionalLocalized(value?: Partial<LocalizedText>) {
  const result = localized(value);
  return result.en || result.es ? result : undefined;
}

function validAnchor(value?: string) {
  return Boolean(value && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value));
}

export function formatUsd(price: number | null | undefined, locale: Locale = "en") {
  if (typeof price !== "number" || !Number.isFinite(price) || price < 0) return undefined;
  return new Intl.NumberFormat(locale === "es" ? "es-US" : "en-US", { style: "currency", currency: "USD" }).format(price);
}

export function transformSanityMenu(categories: SanityMenuCategory[], items: SanityMenuItem[]): SiteMenuCategory[] {
  const visibleCategories = categories
    .filter((category) => category.showOnWebsite && validAnchor(category.anchor?.current))
    .map((category) => ({ ...category, name: localized(category.name), description: optionalLocalized(category.description), anchor: category.anchor!.current! }))
    .filter((category) => category.name.en && category.name.es)
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0) || a.anchor.localeCompare(b.anchor));

  const categoryIds = new Set(visibleCategories.map((category) => category._id));
  const itemsByCategory = new Map<string, SiteMenuItem[]>();
  for (const item of items) {
    const categoryId = item.category?._ref;
    const name = localized(item.name);
    if (!item.showOnWebsite || !categoryId || !categoryIds.has(categoryId) || !name.en || !name.es) continue;
    const price = typeof item.price === "number" && Number.isFinite(item.price) && item.price >= 0 ? item.price : null;
    const alt = optionalLocalized(item.image?.alt);
    const normalized: SiteMenuItem = { id: item._id, name, description: optionalLocalized(item.description), price, formattedPrice: formatUsd(price), priceNote: optionalLocalized(item.priceNote), image: item.image?.url && alt?.en && alt.es ? { url: item.image.url, alt } : undefined };
    const list = itemsByCategory.get(categoryId) ?? [];
    list.push(normalized);
    itemsByCategory.set(categoryId, list);
  }

  return visibleCategories.map((category) => ({ id: category._id, anchor: category.anchor, name: category.name, description: category.description, items: (itemsByCategory.get(category._id) ?? []).sort((a, b) => {
    const sourceA = items.find((item) => item._id === a.id);
    const sourceB = items.find((item) => item._id === b.id);
    return (sourceA?.sortOrder ?? 0) - (sourceB?.sortOrder ?? 0) || a.id.localeCompare(b.id);
  }) }));
}
