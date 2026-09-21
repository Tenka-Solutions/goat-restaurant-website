import { menuCategories as legacyMenuCategories } from "@/content/menu";
import { getMenuCategories } from "@/sanity/lib/client";
import type { LocalizedText, MenuCategory } from "@/types/site";
import type { SiteMenuCategory } from "@/sanity/menu";

export type PublicMenuItem = {
  id: string;
  name: LocalizedText;
  description?: LocalizedText;
  price?: LocalizedText;
};

export type PublicMenuCategory = {
  id: string;
  title: LocalizedText;
  description?: LocalizedText;
  items: PublicMenuItem[];
};

function priceLabel(formattedPrice: string | undefined, priceNote?: LocalizedText): LocalizedText | undefined {
  if (!formattedPrice && !priceNote) return undefined;
  return {
    en: [formattedPrice, priceNote?.en].filter(Boolean).join(" "),
    es: [formattedPrice, priceNote?.es].filter(Boolean).join(" "),
  };
}

function fromSanity(categories: SiteMenuCategory[]): PublicMenuCategory[] {
  return categories.map((category) => ({
    id: category.anchor,
    title: category.name,
    description: category.description,
    items: category.items.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: priceLabel(item.formattedPrice, item.priceNote),
    })),
  }));
}

function fromLegacy(categories: MenuCategory[]): PublicMenuCategory[] {
  return categories.map((category) => ({
    id: category.id,
    title: category.title,
    description: category.description,
    items: category.items
      .filter((item) => item.available !== false)
      .map((item) => ({ id: item.id, name: item.name, description: item.description, price: item.price ? { en: item.price, es: item.price } : undefined })),
  }));
}

export function hasRenderableMenu(categories: SiteMenuCategory[]) {
  return categories.some((category) => category.items.length > 0);
}

export async function getPublicMenu(loadSanityMenu: () => Promise<SiteMenuCategory[]> = getMenuCategories): Promise<PublicMenuCategory[]> {
  try {
    const sanityMenu = await loadSanityMenu();
    if (hasRenderableMenu(sanityMenu)) return fromSanity(sanityMenu);
  } catch {
    // The legacy menu keeps the public route available during a Sanity outage.
  }
  return fromLegacy(legacyMenuCategories);
}
