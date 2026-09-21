"use client";

import { useState, type FormEvent } from "react";
import { getDictionary } from "@/content/dictionaries";
import type { Locale } from "@/types/site";

type State = { status: "idle" | "sending" | "success" | "error"; message?: string; errors?: Record<string, string> };

export function EventInquiryForm({ locale }: { locale: Locale }) {
  const copy = getDictionary(locale).eventInquiry;
  const [state, setState] = useState<State>({ status: "idle" });
  const minDate = new Date().toISOString().slice(0, 10);
  const field = "mt-2 min-h-12 w-full border border-ink/25 bg-transparent px-4 py-3 text-base text-ink outline-none focus:border-blue-deep focus:ring-2 focus:ring-sky/40";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    const payload = { ...values, locale, consent: values.consent === "on" };
    setState({ status: "sending" });
    try {
      const response = await fetch("/api/event-inquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const result = await response.json();
      if (!response.ok) {
        setState({ status: "error", message: result.code === "not_configured" ? copy.configError : result.code === "validation" ? copy.validation : copy.genericError, errors: result.errors });
        return;
      }
      form.reset();
      setState({ status: "success", message: copy.success });
    } catch {
      setState({ status: "error", message: copy.genericError });
    }
  }

  return <form noValidate onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
    <label className="text-sm font-semibold">{copy.name}<input className={field} name="name" required maxLength={80} aria-invalid={Boolean(state.errors?.name)} aria-describedby={state.errors?.name ? "event-name-error" : undefined} />{state.errors?.name && <span id="event-name-error" className="mt-1 block text-xs text-red-800">{state.errors.name}</span>}</label>
    <label className="text-sm font-semibold">{copy.email}<input className={field} name="email" type="email" required maxLength={254} autoComplete="email" aria-invalid={Boolean(state.errors?.email)} />{state.errors?.email && <span className="mt-1 block text-xs text-red-800">{state.errors.email}</span>}</label>
    <label className="text-sm font-semibold">{copy.phone}<input className={field} name="phone" type="tel" required maxLength={40} autoComplete="tel" aria-invalid={Boolean(state.errors?.phone)} />{state.errors?.phone && <span className="mt-1 block text-xs text-red-800">{state.errors.phone}</span>}</label>
    <label className="text-sm font-semibold">{copy.preferredDate}<input className={field} name="preferredDate" type="date" required min={minDate} aria-invalid={Boolean(state.errors?.preferredDate)} />{state.errors?.preferredDate && <span className="mt-1 block text-xs text-red-800">{state.errors.preferredDate}</span>}</label>
    <label className="text-sm font-semibold">{copy.guests}<input className={field} name="guests" type="number" required min="1" max="500" step="1" inputMode="numeric" aria-invalid={Boolean(state.errors?.guests)} />{state.errors?.guests && <span className="mt-1 block text-xs text-red-800">{state.errors.guests}</span>}</label>
    <label className="text-sm font-semibold">{copy.eventType}<select className={field} name="eventType" required defaultValue="" aria-invalid={Boolean(state.errors?.eventType)}><option value="" disabled>{copy.eventTypePlaceholder}</option>{copy.eventTypes.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select>{state.errors?.eventType && <span className="mt-1 block text-xs text-red-800">{state.errors.eventType}</span>}</label>
    <label className="text-sm font-semibold sm:col-span-2">{copy.message}<textarea className={`${field} min-h-36 resize-y`} name="message" maxLength={3000} aria-invalid={Boolean(state.errors?.message)} />{state.errors?.message && <span className="mt-1 block text-xs text-red-800">{state.errors.message}</span>}</label>
    <label className="absolute -left-[9999px]" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
    <label className="flex cursor-pointer items-start gap-3 py-1 pr-2 text-sm leading-6 text-ink/80 sm:col-span-2"><input className="mt-0.5 size-5 shrink-0 accent-blue-deep" type="checkbox" name="consent" required />{copy.consent}</label>{state.errors?.consent && <span className="text-xs text-red-800 sm:col-span-2">{state.errors.consent}</span>}
    <div className="flex flex-wrap items-center gap-5 sm:col-span-2"><button disabled={state.status === "sending"} className="inline-flex min-h-12 items-center justify-center bg-ink px-7 text-xs font-bold uppercase tracking-[.18em] text-ivory hover:bg-blue-deep disabled:opacity-50">{state.status === "sending" ? copy.sending : copy.submit}</button><p role="status" aria-live="polite" className={state.status === "error" ? "text-sm text-red-800" : "text-sm text-blue-deep"}>{state.message}</p></div>
  </form>;
}
