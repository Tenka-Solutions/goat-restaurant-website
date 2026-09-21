import { describe, expect, it } from "vitest";
import { buildMenuSeed, partitionMenuSeed } from "./menu-seed";
import { formatUsd, transformSanityMenu, type SanityMenuCategory, type SanityMenuItem } from "./menu";

const category = (overrides: Partial<SanityMenuCategory> = {}): SanityMenuCategory => ({ _id: "category-a", name: { en: "First", es: "Primero" }, description: { en: "English description", es: "Descripción en español" }, anchor: { current: "first" }, sortOrder: 2, showOnWebsite: true, ...overrides });
const item = (overrides: Partial<SanityMenuItem> = {}): SanityMenuItem => ({ _id: "item-a", name: { en: "Item", es: "Artículo" }, description: { en: "English item", es: "Artículo en español" }, category: { _ref: "category-a" }, sortOrder: 1, showOnWebsite: true, price: 18.99, priceNote: { en: "Each", es: "Cada uno" }, ...overrides });

describe("Sanity menu transformation", () => {
  it("orders categories and items and preserves bilingual content", () => {
    const result = transformSanityMenu([category(), category({ _id: "category-b", anchor: { current: "second" }, sortOrder: 1, name: { en: "Second", es: "Segundo" } })], [item(), item({ _id: "item-b", sortOrder: 0 })]);
    expect(result.map((entry) => entry.anchor)).toEqual(["second", "first"]);
    expect(result[1].items.map((entry) => entry.id)).toEqual(["item-b", "item-a"]);
    expect(result[1].name.es).toBe("Primero");
    expect(result[1].description?.en).toBe("English description");
    expect(result[1].items[0].description?.es).toBe("Artículo en español");
  });

  it("formats valid optional USD prices and preserves price notes", () => {
    const result = transformSanityMenu([category()], [item()]);
    expect(result[0].items[0]).toMatchObject({ price: 18.99, formattedPrice: "$18.99", priceNote: { en: "Each", es: "Cada uno" } });
    expect(formatUsd(null)).toBeUndefined();
    expect(transformSanityMenu([category()], [item({ price: null })])[0].items[0].formattedPrice).toBeUndefined();
    expect(transformSanityMenu([category()], [item({ price: null, priceNote: { en: "Inquire", es: "Consultar" } })])[0].items[0]).toMatchObject({ price: null, priceNote: { en: "Inquire", es: "Consultar" } });
  });

  it("retains only images with an asset URL and bilingual alt text", () => {
    const validImage = { url: "https://cdn.sanity.io/item.jpg", alt: { en: "Item image", es: "Imagen del producto" } };
    expect(transformSanityMenu([category()], [item({ image: validImage })])[0].items[0].image).toEqual(validImage);
    expect(transformSanityMenu([category()], [item({ image: { url: "https://cdn.sanity.io/item.jpg", alt: { en: "Item image" } } })])[0].items[0].image).toBeUndefined();
    expect(transformSanityMenu([category()], [item({ image: { alt: { en: "Item image", es: "Imagen del producto" } } })])[0].items[0].image).toBeUndefined();
  });

  it("excludes hidden or invalid menu content and requires stable anchors", () => {
    expect(transformSanityMenu([category({ showOnWebsite: false })], [item()])).toEqual([]);
    expect(transformSanityMenu([category({ anchor: { current: "Not Stable" } })], [item()])).toEqual([]);
    expect(transformSanityMenu([category()], [item({ showOnWebsite: false }), item({ _id: "orphan", category: { _ref: "missing" } })])[0].items).toEqual([]);
  });
});

describe("menu seed", () => {
  const documents = buildMenuSeed();
  const document = (id: string) => documents.find((entry) => entry._id === id)!;

  it("uses deterministic document ids and category anchors", () => {
    expect(document("menuCategory.grilled-meats").anchor).toEqual({ _type: "slug", current: "grilled-meats" });
    expect(document("menuItem.ribeye").category).toEqual({ _type: "reference", _ref: "menuCategory.grilled-meats" });
  });

  it("separates canonical categories from items with strong category references", () => {
    const { categories, items } = partitionMenuSeed(documents);
    expect(categories).toHaveLength(16);
    expect(items).toHaveLength(86);
    expect(items.every((entry) => (entry.category as { _ref?: string; _weak?: boolean })._ref?.startsWith("menuCategory.") && (entry.category as { _weak?: boolean })._weak !== true)).toBe(true);
  });

  it("applies the latest requested prices and leaves sides unpriced", () => {
    expect(document("menuItem.milanese-spanish").price).toBe(18.99);
    expect(document("menuItem.milanese-horseback").price).toBe(17.99);
    expect(document("menuItem.milanese-napolitana").price).toBe(19.99);
    expect(document("menuItem.bottled-water").price).toBe(2);
    for (const id of ["country-salad", "house-salad", "russian-salad"]) expect(document(`menuItem.${id}`).price).toBe(4);
    expect(document("menuItem.ribeye").price).toBe(24);
    expect(document("menuItem.short-ribs").price).toBe(26);
    expect(document("menuItem.skirt-steak").price).toBe(26);
    expect(document("menuItem.picanha").price).toBe(24);
    for (const id of ["fries", "creamed-corn", "house-rice"]) expect(document(`menuItem.${id}`).price).toBeUndefined();
  });

  it("adds unpriced birthday cakes with bilingual inquiry notes", () => {
    const cake = document("menuItem.birthday-cake-15");
    expect(cake.price).toBeUndefined();
    expect(cake.priceNote).toEqual({ en: "Inquire", es: "Consultar" });
    expect(document("menuCategory.birthday-cakes").name).toEqual({ en: "Birthday cakes", es: "Torta de cumpleaños" });
  });
});
