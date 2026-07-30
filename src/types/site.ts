export type NavItem = {
  label: string;
  href: `#${string}`;
};

export type Highlight = {
  name: string;
  eyebrow: string;
  description: string;
  image: string;
  alt: string;
  position?: string;
};

export type GalleryImage = {
  src: string;
  alt: string;
  position?: string;
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
