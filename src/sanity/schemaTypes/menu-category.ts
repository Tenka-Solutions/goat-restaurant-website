import { defineField, defineType } from "sanity";

export const menuCategory = defineType({
  name: "menuCategory",
  title: "Menu Category",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Category name", type: "localizedString", validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Category description (optional)", type: "localizedText", description: "Shown below the category heading.", options: { collapsible: true } }),
    defineField({ name: "anchor", title: "Website anchor", type: "slug", description: "Stable link target for this category. Change only when replacing an old category URL.", options: { source: "name.en", maxLength: 80 }, validation: (rule) => rule.required().custom((value) => value?.current && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.current) ? true : "Use lowercase letters, numbers, and hyphens") }),
    defineField({ name: "sortOrder", title: "Display order", type: "number", description: "Lower numbers appear first.", initialValue: 0, validation: (rule) => rule.required().integer().min(0) }),
    defineField({ name: "showOnWebsite", title: "Show on website", type: "boolean", description: "A published category is visible only when this is turned on.", initialValue: false, validation: (rule) => rule.required() }),
  ],
  preview: { select: { title: "name.en", subtitle: "anchor.current", visible: "showOnWebsite" }, prepare: ({ title, subtitle, visible }) => ({ title: title || "Untitled category", subtitle: `${subtitle || "No anchor"} · ${visible ? "Shown" : "Hidden"}` }) },
  orderings: [{ title: "Display order", name: "sortOrderAsc", by: [{ field: "sortOrder", direction: "asc" }, { field: "name.en", direction: "asc" }] }],
});
