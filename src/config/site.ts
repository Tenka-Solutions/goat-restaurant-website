import type { BusinessDetails } from "@/types/site";

const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

export const siteConfig = {
  name: "G.O.A.T.",
  fullName: "G.O.A.T. Argentine Grill & Bakery",
  siteUrl: configuredUrl || "https://goatrestaurantsutah.com",
  isProvisionalUrl: !configuredUrl,
  menuQrPath: "/qr/goat-menu-qr.png",
  menuPdfPath: "/menu/goat-menu.pdf",
  brandLogoPath: "/brand/goat-logo-transparent.png",
  cloverOrderingUrl: "https://goat-argentine-grill-orem.cloveronline.com/",
} as const;

// TODO(client): Complete every null/empty value before launch.
export const businessDetails: BusinessDetails = {
  address: "845 North 100 West, Suite 104, Orem, UT 84057",
  phone: "(801) 548-7910",
  email: "info@goatargentinegrill.com",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=845+North+100+West+Suite+104+Orem+UT+84057",
  openingHours: [],
  instagram: "https://www.instagram.com/goatrestaurant.utah/",
  facebook: "https://www.facebook.com/goatrestaurant.utah/",
  tiktok: "https://www.tiktok.com/@goatrestaurant.utah",
};
