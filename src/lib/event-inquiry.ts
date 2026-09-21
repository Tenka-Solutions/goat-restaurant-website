import type { Locale } from "@/types/site";

export const eventTypeValues = ["birthday", "family-gathering", "corporate-event", "private-celebration", "other"] as const;
export type EventType = (typeof eventTypeValues)[number];

export type EventInquiryPayload = {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  guests: number;
  eventType: EventType;
  message?: string;
  consent: boolean;
  website?: string;
  locale: Locale;
};

export type EventInquiryErrors = Partial<Record<keyof EventInquiryPayload, string>>;

const limits = { name: 80, email: 254, phone: 40, message: 3000, website: 100 } as const;

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").slice(0, max + 1) : "";
}

function restaurantToday() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Denver", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
}

function isRealDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

export function validateEventInquiry(input: unknown, today = restaurantToday()): { data?: EventInquiryPayload; errors: EventInquiryErrors } {
  const source = typeof input === "object" && input ? input as Record<string, unknown> : {};
  const locale = source.locale === "en" || source.locale === "es" ? source.locale : undefined;
  const data = {
    name: clean(source.name, limits.name),
    email: clean(source.email, limits.email).toLowerCase(),
    phone: clean(source.phone, limits.phone),
    preferredDate: clean(source.preferredDate, 10),
    guests: clean(source.guests, 3),
    eventType: clean(source.eventType, 40),
    message: clean(source.message, limits.message),
    website: clean(source.website, limits.website),
    consent: source.consent === true,
    locale,
  };
  const spanish = locale === "es";
  const required = spanish ? "Campo obligatorio" : "Required field";
  const errors: EventInquiryErrors = {};
  if (!data.name || data.name.length > limits.name) errors.name = required;
  if (!data.email || data.email.length > limits.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = spanish ? "Ingresa un correo válido" : "Enter a valid email";
  const phoneDigits = data.phone.replace(/\D/g, "");
  if (!data.phone || data.phone.length > limits.phone || !/^[0-9+().\-\s]+$/.test(data.phone) || phoneDigits.length < 7 || phoneDigits.length > 15) errors.phone = spanish ? "Ingresa un teléfono válido" : "Enter a valid phone number";
  if (!isRealDate(data.preferredDate) || data.preferredDate < today) errors.preferredDate = spanish ? "Ingresa una fecha válida que no sea anterior a hoy" : "Enter a valid date that is not in the past";
  if (!/^\d+$/.test(data.guests) || Number(data.guests) < 1 || Number(data.guests) > 500) errors.guests = spanish ? "Ingresa entre 1 y 500 invitados" : "Enter 1 to 500 guests";
  if (!eventTypeValues.includes(data.eventType as EventType)) errors.eventType = required;
  if (data.message.length > limits.message) errors.message = spanish ? "El mensaje es demasiado largo" : "Message is too long";
  if (!data.consent) errors.consent = spanish ? "Debes aceptar para continuar" : "You must agree to continue";
  if (!locale) errors.locale = "Invalid locale";
  if (Object.keys(errors).length) return { errors };
  if (!locale) return { errors: { locale: "Invalid locale" } };

  return {
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      preferredDate: data.preferredDate,
      guests: Number(data.guests),
      eventType: data.eventType as EventType,
      message: data.message || undefined,
      website: data.website || undefined,
      consent: true,
      locale,
    },
    errors,
  };
}

export function eventInquiryEmailText(data: EventInquiryPayload) {
  return [
    "New G.O.A.T. event inquiry",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Preferred date: ${data.preferredDate}`,
    `Guests: ${data.guests}`,
    `Event type: ${data.eventType}`,
    `Locale: ${data.locale}`,
    "",
    data.message || "No additional message provided.",
  ].join("\n");
}
