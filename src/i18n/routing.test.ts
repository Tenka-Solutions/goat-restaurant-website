import { describe, expect, it } from "vitest";
import { equivalentPath, isLocale, localizedPath } from "./routing";

describe("locale routing", () => {
  it("accepts only supported locales", () => { expect(isLocale("en")).toBe(true); expect(isLocale("fr")).toBe(false); });
  it("maps equivalent menu routes", () => { expect(equivalentPath("/en/menu", "es")).toBe("/es/menu"); });
  it("maps translated promotion slugs", () => { expect(equivalentPath("/es/promociones", "en")).toBe("/en/promotions"); });
  it("builds canonical localized paths", () => { expect(localizedPath("en", "home")).toBe("/en"); });
});
