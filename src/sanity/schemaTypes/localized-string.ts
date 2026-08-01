import { defineField, defineType } from "sanity";

export const localizedString = defineType({
  name: "localizedString",
  title: "English / Español",
  type: "object",
  fields: [
    defineField({ name: "en", title: "English (primary)", type: "string", validation: (rule) => rule.required().error("English is required") }),
    defineField({ name: "es", title: "Español", type: "string", validation: (rule) => rule.required().error("Español es obligatorio") }),
  ],
});

export const localizedText = defineType({
  name: "localizedText",
  title: "English / Español",
  type: "object",
  fields: [
    defineField({ name: "en", title: "English (primary)", type: "text", rows: 4, validation: (rule) => rule.required().max(600) }),
    defineField({ name: "es", title: "Español", type: "text", rows: 4, validation: (rule) => rule.required().max(600) }),
  ],
});
