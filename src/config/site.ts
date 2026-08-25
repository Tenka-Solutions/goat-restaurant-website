import type { BusinessDetails } from "@/types/site";

const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

export const siteConfig = {
  name: "G.O.A.T.",
  fullName: "G.O.A.T. Argentine Grill & Bakery",
  siteUrl: configuredUrl || "https://example.com",
  isProvisionalUrl: !configuredUrl,
  menuQrPath: "/qr/goat-menu-qr.png",
  menuPdfPath: "/menu/goat-menu.pdf",
  brandLogoPath: "/brand/goat-logo-transparent.png",
  cloverOrderingUrl: "https://goat-argentine-grill-orem.cloveronline.com/",
} as const;

// TODO(client): Complete every null/empty value before launch.
export const businessDetails: BusinessDetails = {
  address: null,
  phone: null,
  email: null,
  mapUrl: null,
  openingHours: [],
  instagram: "https://www.instagram.com/goat_argentinian_grill/",
  facebook: null,
  tiktok: null,
};
