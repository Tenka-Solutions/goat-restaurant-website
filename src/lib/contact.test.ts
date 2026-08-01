import { describe, expect, it } from "vitest";
import { contactEmailText, validateContact } from "./contact";

const valid = { name: "Ada", email: "ADA@example.com", subject: "Hello", message: "A sufficiently long message", consent: true, locale: "en" };

describe("contact validation", () => {
  it("normalizes valid contact data", () => { const result = validateContact(valid); expect(result.errors).toEqual({}); expect(result.data?.email).toBe("ada@example.com"); });
  it("returns localized errors", () => { const result = validateContact({ locale: "es" }); expect(result.errors.name).toBe("Campo obligatorio"); });
  it("rejects oversized messages", () => { const result = validateContact({ ...valid, message: "x".repeat(3001) }); expect(result.data).toBeUndefined(); });
  it("creates plain text without HTML rendering", () => { const result = validateContact({ ...valid, message: "<script>alert(1)</script> message" }); expect(contactEmailText(result.data!)).toContain("<script>"); });
});
