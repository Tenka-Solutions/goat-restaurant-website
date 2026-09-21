import { defineField, defineType } from "sanity";

export const menuItem = defineType({
  name: "menuItem",
  title: "Menu Item",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Item name", type: "localizedString", validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Item description (optional)", type: "localizedText", options: { collapsible: true } }),
    defineField({ name: "category", title: "Menu category", type: "reference", to: [{ type: "menuCategory" }], validation: (rule) => rule.required() }),
    defineField({ name: "sortOrder", title: "Display order", type: "number", description: "Lower numbers appear first within the category.", initialValue: 0, validation: (rule) => rule.required().integer().min(0) }),
    defineField({ name: "showOnWebsite", title: "Show on website", type: "boolean", description: "A published item is visible only when this is turned on and its category is visible.", initialValue: false, validation: (rule) => rule.required() }),
    defineField({ name: "price", title: "Price (USD, optional)", type: "number", description: "Enter a numeric dollar amount, for example 18.99. Leave empty when no price is available.", validation: (rule) => rule.min(0).custom((value) => value === undefined || Math.abs(value * 100 - Math.round(value * 100)) < Number.EPSILON * Math.max(1, Math.abs(value * 100)) ? true : "Use no more than two decimal places") }),
    defineField({ name: "priceNote", title: "Price note (optional)", type: "localizedString", description: "For example: Inquire / Consultar." }),
    defineField({ name: "image", title: "Item image (optional)", type: "image", options: { hotspot: true } }),
    defineField({ name: "imageAlt", title: "Image alt text", type: "localizedString", description: "Required when an item image is used.", hidden: ({ document }) => !document?.image, validation: (rule) => rule.custom((value, context) => { const alt = value as { en?: string; es?: string } | undefined; return !context.document?.image || (alt?.en && alt.es) ? true : "English and Spanish alt text are required when an image is used"; }) }),
  ],
  preview: { select: { title: "name.en", subtitle: "category.name.en", media: "image", visible: "showOnWebsite" }, prepare: ({ title, subtitle, media, visible }) => ({ title: title || "Untitled item", subtitle: `${subtitle || "No category"} · ${visible ? "Shown" : "Hidden"}`, media }) },
  orderings: [{ title: "Category then display order", name: "categoryAndSortOrder", by: [{ field: "category", direction: "asc" }, { field: "sortOrder", direction: "asc" }] }],
});
