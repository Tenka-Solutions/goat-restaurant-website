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

const fallbackImages: HomePageImages = {
  hero: { src: "/images/hero-grill.png", alt: { en: "Argentine grilled beef beside the fire", es: "Corte argentino a la parrilla junto al fuego" } },
  flavours: [
    { src: "/images/hero-grill.png" },
    { src: "/images/bakery-table.png" },
    { src: "/images/bakery-table.png" },
    { src: "/images/restaurant-experience.png" },
  ],
  experience: { src: "/images/restaurant-experience.png", alt: { en: "Friends sharing a meal by the grill", es: "Amigos compartiendo una comida junto a la parrilla" } },
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
