"use client";

import { useState, type FormEvent } from "react";
import { getDictionary } from "@/content/dictionaries";
import type { Locale } from "@/types/site";

type State = { status: "idle" | "sending" | "success" | "error"; message?: string; errors?: Record<string, string> };

export function ContactForm({ locale }: { locale: Locale }) {
  const copy = getDictionary(locale).contact;
  const [state, setState] = useState<State>({ status: "idle" });
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    const payload = { ...values, locale, consent: values.consent === "on" };
    setState({ status: "sending" });
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const result = await response.json();
      if (!response.ok) { setState({ status: "error", message: result.code === "not_configured" ? copy.configError : result.code === "validation" ? copy.validation : copy.genericError, errors: result.errors }); return; }
      form.reset(); setState({ status: "success", message: copy.success });
    } catch { setState({ status: "error", message: copy.genericError }); }
  }
  const field = "mt-2 min-h-12 w-full border border-ink/25 bg-transparent px-4 py-3 text-base text-ink outline-none focus:border-blue-deep focus:ring-2 focus:ring-sky/40";
  return <section id="contact" className="bg-ivory px-5 py-20 text-ink sm:px-8 lg:px-12"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.75fr_1.25fr]"><div><p className="text-xs font-semibold uppercase tracking-[.24em] text-blue-deep">G.O.A.T.</p><h2 className="mt-4 font-display text-6xl leading-none">{copy.title}</h2><p className="mt-5 max-w-md leading-7 text-ink/65">{copy.intro}</p></div><form noValidate onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
    <label className="text-sm font-semibold">{copy.name}<input className={field} name="name" required maxLength={80} aria-invalid={Boolean(state.errors?.name)} aria-describedby={state.errors?.name ? "name-error" : undefined} />{state.errors?.name && <span id="name-error" className="mt-1 block text-xs text-red-800">{state.errors.name}</span>}</label>
    <label className="text-sm font-semibold">{copy.email}<input className={field} name="email" type="email" required maxLength={254} aria-invalid={Boolean(state.errors?.email)} />{state.errors?.email && <span className="mt-1 block text-xs text-red-800">{state.errors.email}</span>}</label>
    <label className="text-sm font-semibold">{copy.phone}<input className={field} name="phone" type="tel" maxLength={40} /></label>
    <label className="text-sm font-semibold">{copy.subject}<select className={field} name="subject" required defaultValue=""><option value="" disabled>—</option>{copy.subjectOptions.map((option) => <option key={option}>{option}</option>)}</select>{state.errors?.subject && <span className="mt-1 block text-xs text-red-800">{state.errors.subject}</span>}</label>
    <label className="text-sm font-semibold sm:col-span-2">{copy.message}<textarea className={`${field} min-h-36 resize-y`} name="message" required minLength={10} maxLength={3000} />{state.errors?.message && <span className="mt-1 block text-xs text-red-800">{state.errors.message}</span>}</label>
    <label className="absolute -left-[9999px]" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
    <label className="flex items-start gap-3 text-sm leading-6 sm:col-span-2"><input className="mt-1 size-4 accent-blue-deep" type="checkbox" name="consent" required />{copy.consent}</label>{state.errors?.consent && <span className="text-xs text-red-800 sm:col-span-2">{state.errors.consent}</span>}
    <div className="flex flex-wrap items-center gap-5 sm:col-span-2"><button disabled={state.status === "sending"} className="inline-flex min-h-12 items-center justify-center bg-ink px-7 text-xs font-bold uppercase tracking-[.18em] text-ivory hover:bg-blue-deep disabled:opacity-50">{state.status === "sending" ? copy.sending : copy.submit}</button><p role="status" aria-live="polite" className={state.status === "error" ? "text-sm text-red-800" : "text-sm text-blue-deep"}>{state.message}</p></div>
  </form></div></section>;
}
