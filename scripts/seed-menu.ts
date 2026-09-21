import { getCliClient } from "sanity/cli";
import { buildMenuSeed } from "../src/sanity/menu-seed";

const client = getCliClient({ apiVersion: process.env.SANITY_API_VERSION || "2025-02-19" });
const documents = buildMenuSeed();

// This script creates/updates drafts only. Review and publish them in Studio before a later menu-page cutover.
await client.transaction(documents.map((document) => ({ createOrReplace: { ...document, _id: `drafts.${document._id}` } }))).commit();
console.log(`Seeded ${documents.length} menu drafts. No published documents were changed.`);
