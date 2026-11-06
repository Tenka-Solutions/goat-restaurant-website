import { describe, expect, it } from "vitest";
import { dictionaries } from "./dictionaries";
import { businessDetails, siteConfig } from "@/config/site";
import { menuCategories } from "./menu";

describe("bilingual content", () => {
  it("uses the client-approved official menu and Clover URLs", () => {
    expect(siteConfig.publicMenuUrl).toBe("https://menu.igniscreativeco.com/");
    expect(siteConfig.cloverOrderingUrl).toBe("https://goat-argentine-grill-orem-ut.cloveronline.com/menu/all");
  });
  it("lists all three day groups in each language for the confirmed schedule", () => {
    expect(businessDetails.openingHours).toEqual(["8:00 AM - 10:00 PM", "8:00 AM - 12:00 AM", "8:00 AM - 6:00 PM"]);
    expect(dictionaries.en.visit.days).toHaveLength(3);
    expect(dictionaries.es.visit.days).toHaveLength(3);
  });
  it("uses the restaurant phone number rather than a personal mobile number", () => {
    expect(businessDetails.phone).toBe("(801) 301-2098");
  });
  it("serializes dictionaries without object leaks", () => { expect(JSON.stringify(dictionaries)).not.toContain("undefined"); expect(dictionaries.en.hero.title).toHaveLength(4); });
  it("assigns the Argentine accent by semantic intent in each locale", () => {
    expect(dictionaries.en.hero.title.find((line) => line.style === "argentina")?.text).toBe("Argentine");
    expect(dictionaries.en.hero.title.find((line) => line.text === "flavour")?.style).toBe("default");
    expect(dictionaries.es.hero.title.find((line) => line.style === "argentina")?.text).toBe("argentino");
  });
  it("provides localized event inquiry copy without implying confirmation", () => {
    expect(dictionaries.en.eventInquiry.title).toBe("Book your event");
    expect(dictionaries.es.eventInquiry.title).toBe("Reserva tu evento");
    expect(dictionaries.en.eventInquiry.submit).toBe("Send request");
    expect(dictionaries.es.eventInquiry.submit).toBe("Enviar solicitud");
    expect(dictionaries.en.eventInquiry.success).toContain("does not confirm a reservation");
    expect(dictionaries.es.eventInquiry.success).toContain("no confirma una reserva");
  });
  it("has unique category and product ids", () => { const ids = menuCategories.flatMap((category) => [category.id, ...category.items.map((item) => item.id)]); expect(new Set(ids).size).toBe(ids.length); });
  it("provides both languages for public menu text", () => { for (const category of menuCategories) { expect(category.title.en).toBeTruthy(); expect(category.title.es).toBeTruthy(); for (const item of category.items) { expect(item.name.en).toBeTruthy(); expect(item.name.es).toBeTruthy(); } } });
});
