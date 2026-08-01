import { describe, expect, it } from "vitest";
import { getVisiblePromotions, localize } from "./promotions";
import type { PromotionEvent } from "@/types/site";

const base: PromotionEvent = { _id: "1", type: "promotion", slug: "one", title: { en: "One", es: "Uno" }, description: { en: "Description", es: "Descripción" }, alt: { en: "Image", es: "Imagen" }, startDate: "2026-01-01T00:00:00Z", endDate: "2026-12-31T00:00:00Z", priority: 1, published: true };

describe("promotion visibility", () => {
  const now = new Date("2026-07-31T12:00:00Z");
  it("removes drafts and expired promotions", () => { const items = [base, { ...base, _id: "2", published: false }, { ...base, _id: "3", endDate: "2025-01-01T00:00:00Z" }]; expect(getVisiblePromotions(items, now).map((item) => item._id)).toEqual(["1"]); });
  it("allows upcoming events but not upcoming promotions", () => { const future = { ...base, startDate: "2026-09-01T00:00:00Z", endDate: undefined }; expect(getVisiblePromotions([{ ...future, _id: "p" }, { ...future, _id: "e", type: "event" }], now).map((item) => item._id)).toEqual(["e"]); });
  it("sorts by priority then start date", () => { const higher = { ...base, _id: "2", priority: 10 }; expect(getVisiblePromotions([base, higher], now)[0]._id).toBe("2"); });
  it("uses English as controlled fallback", () => { expect(localize({ en: "English", es: "" }, "es")).toBe("English"); });
});
