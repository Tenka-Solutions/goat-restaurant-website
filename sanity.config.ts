"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemaTypes";

export default defineConfig({
  name: "goat-content",
  title: "G.O.A.T. Content",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  basePath: "/studio",
  plugins: [structureTool({ structure: (S) => S.list().title("Content").items([
    S.listItem().title("Promotions").child(S.documentList().title("Promotions").filter('_type == "promotionEvent" && type == "promotion"')),
    S.listItem().title("Events").child(S.documentList().title("Events").filter('_type == "promotionEvent" && type == "event"')),
    S.divider(),
    S.listItem().title("Homepage images").child(S.document().schemaType("homePageImages").documentId("homePageImages").title("Homepage images")),
    S.divider(),
    S.listItem().title("Menu Categories").child(S.documentTypeList("menuCategory").title("Menu Categories").defaultOrdering([{ field: "sortOrder", direction: "asc" }])),
    S.listItem().title("Menu Items").child(S.documentTypeList("menuItem").title("Menu Items").defaultOrdering([{ field: "sortOrder", direction: "asc" }])),
  ]) })],
  schema: { types: schemaTypes },
});
