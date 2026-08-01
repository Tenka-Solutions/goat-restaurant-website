import { createClient } from "next-sanity";
import type { PromotionEvent } from "@/types/site";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.SANITY_API_VERSION || "2025-02-19";

export const isSanityConfigured = Boolean(projectId && dataset);

const client = isSanityConfigured ? createClient({ projectId: projectId!, dataset: dataset!, apiVersion, useCdn: true }) : null;

const query = `*[_type == "promotionEvent" && published == true] {
  _id, type, "slug": slug.current, title, description, alt,
  "imageUrl": image.asset->url, startDate, endDate, dateTime, cta, link,
  "priority": coalesce(priority, 0), published
}`;

export async function getPromotionEvents(): Promise<PromotionEvent[]> {
  if (!client) return [];
  try {
    return await client.fetch<PromotionEvent[]>(query, {}, { next: { revalidate: 300 } });
  } catch {
    return [];
  }
}
