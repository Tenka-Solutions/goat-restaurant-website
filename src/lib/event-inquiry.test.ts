import { describe, expect, it } from "vitest";
import { eventInquiryEmailText, validateEventInquiry } from "./event-inquiry";

const valid = { name: "Ada Lovelace", email: "ADA@example.com", phone: "+1 (801) 555-0123", preferredDate: "2026-10-10", guests: "24", eventType: "birthday", message: "Dinner for our family.", consent: true, locale: "en" };

describe("event inquiry validation", () => {
  it("normalizes a valid inquiry", () => {
    const result = validateEventInquiry(valid, "2026-09-21");
    expect(result.errors).toEqual({});
    expect(result.data).toMatchObject({ email: "ada@example.com", guests: 24, eventType: "birthday" });
  });
  it("requires the requested fields", () => {
    const result = validateEventInquiry({ locale: "en" }, "2026-09-21");
    expect(result.errors).toMatchObject({ name: "Required field", phone: "Enter a valid phone number", consent: "You must agree to continue" });
  });
  it("rejects malformed email, invalid guests, date, event type, consent, and locale", () => {
    const result = validateEventInquiry({ ...valid, email: "wrong", guests: "501", preferredDate: "2026-02-29", eventType: "wedding", consent: false, locale: "fr" }, "2026-09-21");
    expect(result.errors).toMatchObject({ email: "Enter a valid email", guests: "Enter 1 to 500 guests", preferredDate: "Enter a valid date that is not in the past", eventType: "Required field", consent: "You must agree to continue", locale: "Invalid locale" });
  });
  it("rejects past dates but accepts today", () => {
    expect(validateEventInquiry({ ...valid, preferredDate: "2026-09-20" }, "2026-09-21").errors.preferredDate).toBeTruthy();
    expect(validateEventInquiry({ ...valid, preferredDate: "2026-09-21" }, "2026-09-21").data?.preferredDate).toBe("2026-09-21");
  });
  it("formats a readable plain-text email", () => {
    const result = validateEventInquiry(valid, "2026-09-21");
    expect(eventInquiryEmailText(result.data!)).toContain("Preferred date: 2026-10-10");
  });
});
