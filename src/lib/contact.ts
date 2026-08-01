import type { Locale } from "@/types/site";

export type ContactPayload = { name: string; email: string; phone?: string; subject: string; message: string; consent: boolean; website?: string; locale: Locale };
export type ContactErrors = Partial<Record<keyof ContactPayload, string>>;

const limits = { name: 80, email: 254, phone: 40, subject: 120, message: 3000, website: 100 } as const;

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").slice(0, max + 1) : "";
}

export function validateContact(input: unknown): { data?: ContactPayload; errors: ContactErrors } {
  const source = typeof input === "object" && input ? input as Record<string, unknown> : {};
  const locale: Locale = source.locale === "es" ? "es" : "en";
  const data: ContactPayload = { name: clean(source.name, limits.name), email: clean(source.email, limits.email).toLowerCase(), phone: clean(source.phone, limits.phone), subject: clean(source.subject, limits.subject), message: clean(source.message, limits.message), website: clean(source.website, limits.website), consent: source.consent === true, locale };
  const required = locale === "es" ? "Campo obligatorio" : "Required field";
  const errors: ContactErrors = {};
  if (!data.name || data.name.length > limits.name) errors.name = required;
  if (!data.email || data.email.length > limits.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = locale === "es" ? "Ingresa un correo válido" : "Enter a valid email";
  if (data.phone && data.phone.length > limits.phone) errors.phone = locale === "es" ? "Teléfono demasiado largo" : "Phone is too long";
  if (!data.subject || data.subject.length > limits.subject) errors.subject = required;
  if (!data.message || data.message.length < 10 || data.message.length > limits.message) errors.message = locale === "es" ? "Escribe entre 10 y 3000 caracteres" : "Enter 10 to 3000 characters";
  if (!data.consent) errors.consent = locale === "es" ? "Debes aceptar para continuar" : "You must agree to continue";
  return Object.keys(errors).length ? { errors } : { data, errors };
}

export function contactEmailText(data: ContactPayload) {
  return [`New G.O.A.T. website inquiry`, `Name: ${data.name}`, `Email: ${data.email}`, `Phone: ${data.phone || "Not provided"}`, `Subject: ${data.subject}`, "", data.message].join("\n");
}
