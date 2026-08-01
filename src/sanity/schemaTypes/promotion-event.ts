import { defineField, defineType } from "sanity";

export const promotionEvent = defineType({
  name: "promotionEvent",
  title: "Promotion / Event",
  type: "document",
  groups: [{ name: "content", title: "Bilingual content", default: true }, { name: "schedule", title: "Schedule & publishing" }],
  fields: [
    defineField({ name: "type", title: "Type", type: "string", options: { list: [{ title: "Promotion", value: "promotion" }, { title: "Event", value: "event" }], layout: "radio" }, validation: (rule) => rule.required(), group: "content" }),
    defineField({ name: "title", title: "Title", type: "localizedString", validation: (rule) => rule.required(), group: "content" }),
    defineField({ name: "description", title: "Description", type: "localizedText", validation: (rule) => rule.required(), group: "content" }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title.en", maxLength: 80 }, validation: (rule) => rule.required(), group: "content" }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true }, validation: (rule) => rule.required(), group: "content" }),
    defineField({ name: "alt", title: "Image alt text", type: "localizedString", validation: (rule) => rule.required(), group: "content" }),
    defineField({ name: "cta", title: "Optional CTA", type: "localizedString", group: "content" }),
    defineField({ name: "link", title: "Optional CTA link", type: "url", validation: (rule) => rule.uri({ allowRelative: true, scheme: ["http", "https", "mailto", "tel"] }), group: "content" }),
    defineField({ name: "startDate", title: "Start date", type: "datetime", validation: (rule) => rule.required(), group: "schedule" }),
    defineField({ name: "endDate", title: "End date", type: "datetime", validation: (rule) => rule.custom((end, context) => !end || !context.document?.startDate || new Date(end) >= new Date(String(context.document.startDate)) || "End must be after start"), group: "schedule" }),
    defineField({ name: "dateTime", title: "Public date / time wording", type: "localizedString", description: "Example: Friday, 7:00 PM / Viernes, 19:00", group: "schedule" }),
    defineField({ name: "priority", title: "Priority", type: "number", initialValue: 0, validation: (rule) => rule.required().integer().min(0).max(100), group: "schedule" }),
    defineField({ name: "published", title: "Show on website", type: "boolean", initialValue: false, validation: (rule) => rule.required(), group: "schedule" }),
  ],
  preview: { select: { title: "title.en", subtitle: "type", media: "image" }, prepare: ({ title, subtitle, media }) => ({ title: title || "Untitled", subtitle: subtitle === "event" ? "Event" : "Promotion", media }) },
  orderings: [{ title: "Priority, highest first", name: "priorityDesc", by: [{ field: "priority", direction: "desc" }, { field: "startDate", direction: "asc" }] }],
});
