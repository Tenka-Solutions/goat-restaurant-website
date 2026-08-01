export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];

export type LocalizedText = Record<Locale, string>;

export type MenuItem = {
  id: string;
  name: LocalizedText;
  description?: LocalizedText;
  price?: string;
  notes?: LocalizedText;
  provisional?: boolean;
  available?: boolean;
};

export type MenuCategory = {
  id: string;
  title: LocalizedText;
  description?: LocalizedText;
  items: MenuItem[];
};

export type PromotionEvent = {
  _id: string;
  type: "promotion" | "event";
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  alt: LocalizedText;
  imageUrl?: string;
  startDate: string;
  endDate?: string;
  dateTime?: LocalizedText;
  cta?: LocalizedText;
  link?: string;
  priority: number;
  published: boolean;
};

export type BusinessDetails = {
  address: string | null;
  phone: string | null;
  email: string | null;
  mapUrl: string | null;
  openingHours: string[];
  instagram: string | null;
  facebook: string | null;
  tiktok: string | null;
};

// Kept for the original section components, which remain available for future reuse.
export type NavItem = { label: string; href: `#${string}` };
export type Highlight = { name: string; eyebrow: string; description: string; image: string; alt: string; position?: string };
export type GalleryImage = { src: string; alt: string; position?: string };
