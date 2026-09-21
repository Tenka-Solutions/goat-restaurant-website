import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const createClient = vi.hoisted(() => vi.fn());

vi.mock("next-sanity", () => ({ createClient }));

describe("Sanity menu client", () => {
  const originalToken = process.env.SANITY_API_READ_TOKEN;

  beforeEach(() => {
    vi.resetModules();
    createClient.mockReset();
    createClient.mockReturnValue({ fetch: vi.fn() });
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = "g8zw5af0";
    process.env.NEXT_PUBLIC_SANITY_DATASET = "production";
    process.env.SANITY_API_VERSION = "2025-02-19";
    process.env.SANITY_API_READ_TOKEN = "test-read-token";
  });

  afterEach(() => {
    if (originalToken === undefined) delete process.env.SANITY_API_READ_TOKEN;
    else process.env.SANITY_API_READ_TOKEN = originalToken;
  });

  it("bypasses Sanity CDN so freshly published menu data cannot use a stale empty CDN response", async () => {
    await import("./client");
    expect(createClient).toHaveBeenCalledWith(expect.objectContaining({ projectId: "g8zw5af0", dataset: "production", useCdn: false, token: "test-read-token" }));
  });
});
