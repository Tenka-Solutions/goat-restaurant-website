import { getCliClient } from "sanity/cli";
import { buildMenuSeed, partitionMenuSeed } from "../src/sanity/menu-seed";

function validTarget(value: string | undefined) {
  return Boolean(value && value !== "placeholder" && !value.includes("YOUR_") && !value.includes("<"));
}

async function main() {
  const client = getCliClient({ apiVersion: process.env.SANITY_API_VERSION || "2025-02-19" });
  const { projectId, dataset } = client.config();
  console.log(`Target Sanity project: ${projectId || "<missing>"}; dataset: ${dataset || "<missing>"}`);
  if (!validTarget(projectId) || !validTarget(dataset)) throw new Error("Refusing to seed without a configured Sanity project ID and dataset");

  const { categories, items } = partitionMenuSeed(buildMenuSeed());
  await client.transaction(categories.map((document) => ({ createOrReplace: document }))).commit();
  await client.transaction(items.map((document) => ({ createOrReplace: document }))).commit();
  console.log(`Seed complete: wrote ${categories.length} menu categories and ${items.length} menu items to ${projectId}/${dataset}.`);
}

void main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
