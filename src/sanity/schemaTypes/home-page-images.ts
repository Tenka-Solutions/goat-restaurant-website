import { defineField, defineType } from "sanity";

const localizedAltValidation = (imageField: "heroImage" | "experienceImage") => (value: unknown, context: { document?: Record<string, unknown> }) => {
  const alt = value as { en?: string; es?: string } | undefined;
  return !context.document?.[imageField] || (alt?.en && alt.es) ? true : "English and Spanish alt text are required when an image is used";
};

export const homePageImages = defineType({
  name: "homePageImages",
  title: "Homepage images",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "flavours", title: "Flavours cards" },
    { name: "experience", title: "Experience" },
  ],
  fields: [
    defineField({ name: "heroImage", title: "Hero image", type: "image", options: { hotspot: true }, group: "hero" }),
    defineField({ name: "heroImageAlt", title: "Hero image alt text", type: "localizedString", group: "hero", hidden: ({ document }) => !document?.heroImage, validation: (rule) => rule.custom(localizedAltValidation("heroImage")) }),
    defineField({ name: "flavoursCard1Image", title: "Flavours card 1 image", type: "image", options: { hotspot: true }, group: "flavours" }),
    defineField({ name: "flavoursCard2Image", title: "Flavours card 2 image", type: "image", options: { hotspot: true }, group: "flavours" }),
    defineField({ name: "flavoursCard3Image", title: "Flavours card 3 image", type: "image", options: { hotspot: true }, group: "flavours" }),
    defineField({ name: "flavoursCard4Image", title: "Flavours card 4 image", type: "image", options: { hotspot: true }, group: "flavours" }),
    defineField({ name: "experienceImage", title: "Experience image", type: "image", options: { hotspot: true }, group: "experience" }),
    defineField({ name: "experienceImageAlt", title: "Experience image alt text", type: "localizedString", group: "experience", hidden: ({ document }) => !document?.experienceImage, validation: (rule) => rule.custom(localizedAltValidation("experienceImage")) }),
  ],
  preview: { prepare: () => ({ title: "Homepage images" }) },
});
