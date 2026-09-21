import { createClient } from "next-sanity";
import type { PromotionEvent } from "@/types/site";
import { transformSanityMenu, type SanityMenuCategory, type SanityMenuItem, type SiteMenuCategory } from "@/sanity/menu";
import { normalizeHomePageImages, type HomePageImages, type SanityHomePageImages } from "@/sanity/home-page-images";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.SANITY_API_VERSION || "2025-02-19";
const token = process.env.SANITY_API_READ_TOKEN;

export const isSanityConfigured = Boolean(projectId && dataset);

const client = isSanityConfigured ? createClient({ projectId: projectId!, dataset: dataset!, apiVersion, useCdn: false, ...(token ? { token } : {}) }) : null;

const query = `*[_type == "promotionEvent" && published == true] {
  _id, type, "slug": slug.current, title, description, alt,
  "imageUrl": image.asset->url, startDate, endDate, dateTime, cta, link,
  "priority": coalesce(priority, 0), published
}`;

const menuCategoriesQuery = `*[_type == "menuCategory" && !(_id in path("drafts.**")) && showOnWebsite == true] {
  _id, name, description, anchor, sortOrder, showOnWebsite
}`;

const menuItemsQuery = `*[_type == "menuItem" && !(_id in path("drafts.**")) && showOnWebsite == true] {
  _id, name, description, category, sortOrder, showOnWebsite, price, priceNote,
  "image": { "url": image.asset->url, "alt": imageAlt }
}`;

const homePageImagesQuery = `*[_type == "homePageImages" && _id == "homePageImages" && !(_id in path("drafts.**"))][0] {
  "heroImage": { "url": heroImage.asset->url }, heroImageAlt,
  "flavoursCard1Image": { "url": flavoursCard1Image.asset->url },
  "flavoursCard2Image": { "url": flavoursCard2Image.asset->url },
  "flavoursCard3Image": { "url": flavoursCard3Image.asset->url },
  "flavoursCard4Image": { "url": flavoursCard4Image.asset->url },
  "experienceImage": { "url": experienceImage.asset->url }, experienceImageAlt
}`;

export async function getPromotionEvents(): Promise<PromotionEvent[]> {
  if (!client) return [];
  try {
    return await client.fetch<PromotionEvent[]>(query, {}, { next: { revalidate: 300 } });
  } catch {
    return [];
  }
}

export async function getMenuCategories(): Promise<SiteMenuCategory[]> {
  if (!client) return [];
  try {
    const [categories, items] = await Promise.all([
      client.fetch<SanityMenuCategory[]>(menuCategoriesQuery, {}, { next: { revalidate: 300 } }),
      client.fetch<SanityMenuItem[]>(menuItemsQuery, {}, { next: { revalidate: 300 } }),
    ]);
    return transformSanityMenu(categories, items);
  } catch {
    return [];
  }
}

async function loadHomePageImages(): Promise<SanityHomePageImages | null> {
  if (!client) return null;
  return client.fetch<SanityHomePageImages | null>(homePageImagesQuery, {}, { next: { revalidate: 300 } });
}

export async function getHomePageImages(load: () => Promise<SanityHomePageImages | null> = loadHomePageImages): Promise<HomePageImages> {
  try {
    return normalizeHomePageImages(await load());
  } catch {
    return normalizeHomePageImages();
  }
}
