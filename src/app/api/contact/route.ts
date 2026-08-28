import { NextRequest, NextResponse } from "next/server";
import { contactEmailText, validateContact } from "@/lib/contact";

const attempts = new Map<string, { count: number; reset: number }>();
const WINDOW = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;

function isRateLimited(ip: string) {
  const now = Date.now();
  const current = attempts.get(ip);
  if (!current || current.reset < now) { attempts.set(ip, { count: 1, reset: now + WINDOW }); return false; }
  current.count += 1;
  return current.count > MAX_ATTEMPTS;
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 12_000) return NextResponse.json({ code: "too_large" }, { status: 413 });
  let input: unknown;
  try { input = await request.json(); } catch { return NextResponse.json({ code: "invalid" }, { status: 400 }); }
  const result = validateContact(input);
  if (!result.data) return NextResponse.json({ code: "validation", errors: result.errors }, { status: 400 });
  if (result.data.website) return NextResponse.json({ ok: true });
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) return NextResponse.json({ code: "rate_limited" }, { status: 429 });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.Info@goatargentinegrill.com;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) return NextResponse.json({ code: "not_configured" }, { status: 503 });

  try {
    const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" }, body: JSON.stringify({ from, to: [to], reply_to: result.data.email, subject: `[G.O.A.T.] ${result.data.subject}`, text: contactEmailText(result.data) }), signal: AbortSignal.timeout(10_000) });
    if (!response.ok) return NextResponse.json({ code: "provider_error" }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ code: "provider_error" }, { status: 502 }); }
}
