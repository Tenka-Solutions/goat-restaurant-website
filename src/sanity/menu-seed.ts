import { menuCategories } from "@/content/menu";
import type { LocalizedText, MenuCategory, MenuItem } from "@/types/site";

type SeedCategory = Omit<MenuCategory, "items"> & { sortOrder: number; items: Array<MenuItem & { priceAmount: number | null; priceNote?: LocalizedText; sortOrder: number }> };
type SeedDocument = { _id: string; _type: string } & Record<string, unknown>;

const localized = (en: string, es: string): LocalizedText => ({ en, es });

function priceAmount(value?: string) {
  const match = value?.match(/\$\s*(\d+(?:\.\d{1,2})?)/);
  return match ? Number(match[1]) : null;
}

function initialSeed(): SeedCategory[] {
  return menuCategories.map((category, categoryIndex) => ({
    ...category,
    sortOrder: categoryIndex,
    items: category.items.map((item, itemIndex) => ({ ...item, priceAmount: priceAmount(item.price), sortOrder: itemIndex })),
  }));
}

function findItem(categories: SeedCategory[], id: string) {
  const item = categories.flatMap((category) => category.items).find((entry) => entry.id === id);
  if (!item) throw new Error(`Expected legacy menu item ${id} was not found`);
  return item;
}

function findCategory(categories: SeedCategory[], id: string) {
  const category = categories.find((entry) => entry.id === id);
  if (!category) throw new Error(`Expected legacy menu category ${id} was not found`);
  return category;
}

function applyClientChanges(categories: SeedCategory[]) {
  findItem(categories, "milanese-spanish").priceAmount = 18.99;
  findItem(categories, "milanese-horseback").priceAmount = 17.99;
  findItem(categories, "milanese-napolitana").priceAmount = 19.99;

  // There is no Pellegrino entry in the local menu. Keep the distinct Mineral water item.
  findItem(categories, "bottled-water").priceAmount = 2;

  for (const id of ["fries", "creamed-corn", "house-rice"]) findItem(categories, id).priceAmount = null;
  const salads = [
    ["country-salad", localized("Del Campo", "Del Campo"), localized("lettuce, onion, and tomato", "lechuga, cebolla y tomate")],
    ["house-salad", localized("De la Casa", "De la Casa"), localized("mixed greens, hearts of palm, and berries", "mix verdes, palmitos y berries")],
    ["russian-salad", localized("Rusa", "Rusa"), localized("potatoes, mixed vegetables, hard-boiled egg, and mayonnaise", "papas, mix de verduras, huevo cocido y mayonesa")],
  ] as const;
  for (const [id, name, description] of salads) {
    const item = findItem(categories, id);
    item.name = name;
    item.description = description;
    item.priceAmount = 4;
  }

  const meats = [
    ["ribeye", localized("Rib-Eye", "Bife Ancho"), 24],
    ["short-ribs", localized("Short Ribs", "Asado de Tira"), 26],
    ["skirt-steak", localized("Skirt Steak", "Entraña"), 26],
    ["picanha", localized("Coulotte Steak", "Picaña"), 24],
  ] as const;
  for (const [id, name, price] of meats) {
    const item = findItem(categories, id);
    item.name = name;
    item.priceAmount = price;
  }
  findCategory(categories, "grilled-meats").description = localized("All meat dishes include one side.", "Todas las carnes incluyen un acompañamiento.");

  categories.push({
    id: "birthday-cakes",
    title: localized("Birthday cakes", "Torta de cumpleaños"),
    sortOrder: categories.length,
    items: ["15", "20", "30", "More"].map((size, index) => ({
      id: `birthday-cake-${size.toLowerCase()}`,
      name: localized(size === "More" ? "More people" : `${size} people`, size === "More" ? "Más personas" : `${size} personas`),
      priceAmount: null,
      priceNote: localized("Inquire", "Consultar"),
      sortOrder: index,
    })),
  });
}

export function buildMenuSeed(): SeedDocument[] {
  const categories = initialSeed();
  applyClientChanges(categories);
  return categories.flatMap((category) => {
    const categoryDocument: SeedDocument = {
      _id: `menuCategory.${category.id}`,
      _type: "menuCategory",
      name: category.title,
      ...(category.description ? { description: category.description } : {}),
      anchor: { _type: "slug", current: category.id },
      sortOrder: category.sortOrder,
      showOnWebsite: true,
    };
    const itemDocuments = category.items.map((item) => ({
      _id: `menuItem.${item.id}`,
      _type: "menuItem",
      name: item.name,
      ...(item.description ? { description: item.description } : {}),
      category: { _type: "reference", _ref: `menuCategory.${category.id}` },
      sortOrder: item.sortOrder,
      showOnWebsite: true,
      ...(item.priceAmount === null ? {} : { price: item.priceAmount }),
      ...(item.priceNote ? { priceNote: item.priceNote } : {}),
    }));
    return [categoryDocument, ...itemDocuments];
  });
}
