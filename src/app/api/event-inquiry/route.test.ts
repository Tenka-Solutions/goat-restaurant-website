import { afterEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "./route";

const valid = { name: "Ada", email: "ada@example.com", phone: "+1 801 555 0123", preferredDate: "2099-10-10", guests: "12", eventType: "birthday", consent: true, locale: "en" };

function request(body: object, ip = "203.0.113.10") {
  return new NextRequest("http://localhost/api/event-inquiry", { method: "POST", headers: { "content-type": "application/json", "x-forwarded-for": ip }, body: JSON.stringify(body) });
}

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("event inquiry route", () => {
  it("silently accepts honeypot submissions before email configuration", async () => {
    const response = await POST(request({ ...valid, website: "spam.example" }));
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ ok: true });
  });

  it("returns a configuration error when email is not configured", async () => {
    const response = await POST(request(valid, "203.0.113.11"));
    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({ code: "not_configured" });
  });

  it("sends a valid inquiry through Resend with reply-to", async () => {
    vi.stubEnv("RESEND_API_KEY", "test-key");
    vi.stubEnv("CONTACT_RECIPIENT_EMAIL", "team@example.com");
    vi.stubEnv("CONTACT_FROM_EMAIL", "G.O.A.T. <website@example.com>");
    const fetchMock = vi.fn().mockResolvedValue(new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    const response = await POST(request(valid, "203.0.113.12"));
    expect(response.status).toBe(200);
    const options = fetchMock.mock.calls[0][1] as RequestInit;
    expect(JSON.parse(options.body as string)).toMatchObject({ to: ["team@example.com"], reply_to: "ada@example.com", subject: "[G.O.A.T. Event Inquiry] Ada - 2099-10-10" });
  });

  it("returns a provider error when Resend rejects the request", async () => {
    vi.stubEnv("RESEND_API_KEY", "test-key");
    vi.stubEnv("CONTACT_RECIPIENT_EMAIL", "team@example.com");
    vi.stubEnv("CONTACT_FROM_EMAIL", "G.O.A.T. <website@example.com>");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("no", { status: 500 })));
    const response = await POST(request(valid, "203.0.113.13"));
    expect(response.status).toBe(502);
    await expect(response.json()).resolves.toEqual({ code: "provider_error" });
  });
});
