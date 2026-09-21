import { afterEach, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "./route";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

it("uses CONTACT_RECIPIENT_EMAIL for existing contact delivery", async () => {
  vi.stubEnv("RESEND_API_KEY", "test-key");
  vi.stubEnv("CONTACT_RECIPIENT_EMAIL", "team@example.com");
  vi.stubEnv("CONTACT_FROM_EMAIL", "G.O.A.T. <website@example.com>");
  vi.stubEnv("CONTACT_TO_EMAIL", "wrong@example.com");
  const fetchMock = vi.fn().mockResolvedValue(new Response("{}", { status: 200 }));
  vi.stubGlobal("fetch", fetchMock);
  const request = new NextRequest("http://localhost/api/contact", { method: "POST", headers: { "content-type": "application/json", "x-forwarded-for": "203.0.113.20" }, body: JSON.stringify({ name: "Ada", email: "ada@example.com", subject: "Hello", message: "A sufficiently long message", consent: true, locale: "en" }) });
  const response = await POST(request);
  expect(response.status).toBe(200);
  const options = fetchMock.mock.calls[0][1] as RequestInit;
  expect(JSON.parse(options.body as string).to).toEqual(["team@example.com"]);
});
