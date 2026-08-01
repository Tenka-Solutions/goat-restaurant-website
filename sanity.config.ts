"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemaTypes";

export default defineConfig({
  name: "goat-promotions",
  title: "G.O.A.T. Promotions & Events",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  basePath: "/studio",
  plugins: [structureTool({ structure: (S) => S.list().title("Content").items([
    S.listItem().title("Promotions").child(S.documentList().title("Promotions").filter('_type == "promotionEvent" && type == "promotion"')),
    S.listItem().title("Events").child(S.documentList().title("Events").filter('_type == "promotionEvent" && type == "event"')),
  ]) })],
  schema: { types: schemaTypes },
});
