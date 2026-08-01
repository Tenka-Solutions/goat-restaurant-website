import { describe, expect, it } from "vitest";
import { dictionaries } from "./dictionaries";
import { menuCategories } from "./menu";

describe("bilingual content", () => {
  it("serializes dictionaries without object leaks", () => { expect(JSON.stringify(dictionaries)).not.toContain("undefined"); expect(dictionaries.en.hero.title).toHaveLength(4); });
  it("assigns the Argentine accent by semantic intent in each locale", () => {
    expect(dictionaries.en.hero.title.find((line) => line.style === "argentina")?.text).toBe("Argentine");
    expect(dictionaries.en.hero.title.find((line) => line.text === "flavour")?.style).toBe("default");
    expect(dictionaries.es.hero.title.find((line) => line.style === "argentina")?.text).toBe("argentino");
  });
  it("has unique category and product ids", () => { const ids = menuCategories.flatMap((category) => [category.id, ...category.items.map((item) => item.id)]); expect(new Set(ids).size).toBe(ids.length); });
  it("provides both languages for public menu text", () => { for (const category of menuCategories) { expect(category.title.en).toBeTruthy(); expect(category.title.es).toBeTruthy(); for (const item of category.items) { expect(item.name.en).toBeTruthy(); expect(item.name.es).toBeTruthy(); } } });
});
