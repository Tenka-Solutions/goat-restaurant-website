import { describe, expect, it } from "vitest";
import { getHomePageImages } from "./lib/client";
import { normalizeHomePageImages, type SanityHomePageImages } from "./home-page-images";

const completeImages: SanityHomePageImages = {
  heroImage: { url: "https://cdn.sanity.io/hero.jpg" },
  heroImageAlt: { en: "Hero in English", es: "Hero en Espanol" },
  flavoursCard1Image: { url: "https://cdn.sanity.io/card-1.jpg" },
  flavoursCard2Image: { url: "https://cdn.sanity.io/card-2.jpg" },
  flavoursCard3Image: { url: "https://cdn.sanity.io/card-3.jpg" },
  flavoursCard4Image: { url: "https://cdn.sanity.io/card-4.jpg" },
  experienceImage: { url: "https://cdn.sanity.io/experience.jpg" },
  experienceImageAlt: { en: "Experience in English", es: "Experiencia en Espanol" },
};

describe("homepage image normalization", () => {
  it("uses complete CMS data for all independently editable slots", () => {
    const result = normalizeHomePageImages(completeImages);
    expect(result.hero).toEqual({ src: "https://cdn.sanity.io/hero.jpg", alt: completeImages.heroImageAlt });
    expect(result.flavours.map((image) => image.src)).toEqual([
      "https://cdn.sanity.io/card-1.jpg",
      "https://cdn.sanity.io/card-2.jpg",
      "https://cdn.sanity.io/card-3.jpg",
      "https://cdn.sanity.io/card-4.jpg",
    ]);
    expect(result.experience).toEqual({ src: "https://cdn.sanity.io/experience.jpg", alt: completeImages.experienceImageAlt });
  });

  it("uses all static fallbacks when the singleton is missing", () => {
    const result = normalizeHomePageImages();
    expect(result.hero.src).toBe("/images/hero-grill.png");
    expect(result.flavours.map((image) => image.src)).toEqual(["/images/hero-grill.png", "/images/bakery-table.png", "/images/bakery-table.png", "/images/restaurant-experience.png"]);
    expect(result.experience.src).toBe("/images/restaurant-experience.png");
  });

  it("falls back only for missing individual slots and semantic images without both alt values", () => {
    const result = normalizeHomePageImages({
      heroImage: { url: "https://cdn.sanity.io/hero.jpg" },
      heroImageAlt: { en: "Only English" },
      flavoursCard2Image: { url: "https://cdn.sanity.io/card-2.jpg" },
      experienceImage: { url: "https://cdn.sanity.io/experience.jpg" },
      experienceImageAlt: { en: "Experience in English", es: "Experiencia en Espanol" },
    });
    expect(result.hero.src).toBe("/images/hero-grill.png");
    expect(result.flavours.map((image) => image.src)).toEqual(["/images/hero-grill.png", "https://cdn.sanity.io/card-2.jpg", "/images/bakery-table.png", "/images/restaurant-experience.png"]);
    expect(result.experience.src).toBe("https://cdn.sanity.io/experience.jpg");
  });

  it("keeps card images decorative and preserves locale-safe semantic alt text", () => {
    const result = normalizeHomePageImages(completeImages);
    expect("alt" in result.flavours[0]).toBe(false);
    expect(result.hero.alt.en).toBe("Hero in English");
    expect(result.hero.alt.es).toBe("Hero en Espanol");
    expect(result.experience.alt.en).toBe("Experience in English");
    expect(result.experience.alt.es).toBe("Experiencia en Espanol");
  });

  it("uses static fallbacks when the Sanity read fails", async () => {
    const result = await getHomePageImages(async () => { throw new Error("Sanity unavailable"); });
    expect(result.hero.src).toBe("/images/hero-grill.png");
    expect(result.experience.src).toBe("/images/restaurant-experience.png");
  });
});
