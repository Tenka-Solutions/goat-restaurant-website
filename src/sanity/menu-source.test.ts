import { describe, expect, it } from "vitest";
import { getPublicMenu, hasRenderableMenu } from "./menu-source";
import type { SiteMenuCategory } from "./menu";

const sanityMenu: SiteMenuCategory[] = [{
  id: "category-main",
  anchor: "main",
  name: { en: "Main", es: "Principal" },
  items: [{ id: "cake", name: { en: "Birthday cake", es: "Torta de cumplea\u00f1os" }, price: null, priceNote: { en: "Inquire", es: "Consultar" } }],
}];

describe("public menu source", () => {
  it("uses a valid normalized Sanity menu and renders price-note-only items", async () => {
    const result = await getPublicMenu(async () => sanityMenu);
    expect(result).toEqual([{
      id: "main",
      title: { en: "Main", es: "Principal" },
      items: [{ id: "cake", name: { en: "Birthday cake", es: "Torta de cumplea\u00f1os" }, price: { en: "Inquire", es: "Consultar" } }],
    }]);
  });

  it("uses the legacy menu when Sanity is unavailable", async () => {
    const result = await getPublicMenu(async () => { throw new Error("Sanity unavailable"); });
    expect(result[0].id).toBe("appetizers");
    expect(result[0].items.length).toBeGreaterThan(0);
  });

  it("uses the legacy menu when Sanity returns no renderable content", async () => {
    const result = await getPublicMenu(async () => [{ ...sanityMenu[0], items: [] }]);
    expect(result[0].id).toBe("appetizers");
    expect(hasRenderableMenu([])).toBe(false);
    expect(hasRenderableMenu([{ ...sanityMenu[0], items: [] }])).toBe(false);
  });
});
