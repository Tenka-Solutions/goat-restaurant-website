"use client";

import { useState } from "react";

export function MenuActions({ share, shared }: { share: string; shared: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try { await navigator.clipboard.writeText(window.location.href); setCopied(true); window.setTimeout(() => setCopied(false), 2000); }
    catch { window.prompt(share, window.location.href); }
  }
  return <button type="button" onClick={copy} className="inline-flex min-h-11 items-center justify-center border border-ivory/25 px-5 text-xs font-bold uppercase tracking-[.15em] text-ivory hover:border-sky hover:text-sky" aria-live="polite">{copied ? shared : share}</button>;
}
