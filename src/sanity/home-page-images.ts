import type { LocalizedText } from "@/types/site";

type SanityImage = { url?: string };

export type SanityHomePageImages = {
  heroImage?: SanityImage;
  heroImageAlt?: Partial<LocalizedText>;
  flavoursCard1Image?: SanityImage;
  flavoursCard2Image?: SanityImage;
  flavoursCard3Image?: SanityImage;
  flavoursCard4Image?: SanityImage;
  experienceImage?: SanityImage;
  experienceImageAlt?: Partial<LocalizedText>;
};

export type HomePageImages = {
  hero: { src: string; alt: LocalizedText };
  flavours: [{ src: string }, { src: string }, { src: string }, { src: string }];
  experience: { src: string; alt: LocalizedText };
};

// Approved restaurant photographs supplied in November 2026.
// A complete published CMS image still takes precedence for each slot.
const fallbackImages: HomePageImages = {
  hero: {
    src: "/images/hero-real.webp",
    alt: {
      en: "Burger and fries served at G.O.A.T. beneath the restaurant logo",
      es: "Hamburguesa y papas fritas servidas en G.O.A.T. bajo el logo del restaurante",
    },
  },
  flavours: [
    { src: "/images/grill-real.webp" },
    { src: "/images/empanadas-real.webp" },
    { src: "/images/bakery-real.webp" },
    { src: "/images/gnocchi-real.webp" },
  ],
  experience: {
    src: "/images/experience-real.webp",
    alt: {
      en: "G.O.A.T. baker holding a tray of freshly baked empanadas and pastries",
      es: "Panadero de G.O.A.T. mostrando una bandeja de empanadas y productos recién horneados",
    },
  },
};

function localized(value?: Partial<LocalizedText>): LocalizedText | undefined {
  const en = value?.en?.trim();
  const es = value?.es?.trim();
  return en && es ? { en, es } : undefined;
}

function semanticImage(image: SanityImage | undefined, alt: Partial<LocalizedText> | undefined, fallback: { src: string; alt: LocalizedText }) {
  const normalizedAlt = localized(alt);
  return image?.url && normalizedAlt ? { src: image.url, alt: normalizedAlt } : fallback;
}

function decorativeImage(image: SanityImage | undefined, fallback: { src: string }) {
  return image?.url ? { src: image.url } : fallback;
}

export function normalizeHomePageImages(source?: SanityHomePageImages | null): HomePageImages {
  return {
    hero: semanticImage(source?.heroImage, source?.heroImageAlt, fallbackImages.hero),
    flavours: [
      decorativeImage(source?.flavoursCard1Image, fallbackImages.flavours[0]),
      decorativeImage(source?.flavoursCard2Image, fallbackImages.flavours[1]),
      decorativeImage(source?.flavoursCard3Image, fallbackImages.flavours[2]),
      decorativeImage(source?.flavoursCard4Image, fallbackImages.flavours[3]),
    ],
    experience: semanticImage(source?.experienceImage, source?.experienceImageAlt, fallbackImages.experience),
  };
}
