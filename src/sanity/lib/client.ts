import { createClient } from "next-sanity";
import type { PromotionEvent } from "@/types/site";
import { transformSanityMenu, type SanityMenuCategory, type SanityMenuItem, type SiteMenuCategory } from "@/sanity/menu";

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
