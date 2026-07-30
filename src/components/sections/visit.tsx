import { SectionHeading } from "@/components/ui/section-heading";
import { businessDetails } from "@/content/site-content";

function PendingValue({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3 max-w-xs text-sm leading-6 text-ivory/45">{children}</p>
  );
}

export function Visit() {
  return (
    <section
      id="visitanos"
      className="relative overflow-hidden bg-ink-soft px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
    >
      <div
        className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(117,170,219,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(117,170,219,.05)_1px,transparent_1px)] [background-size:64px_64px]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
          <SectionHeading
            eyebrow="Ven a conocernos"
            title="Tu lugar en la mesa."
            body="La información definitiva de ubicación, horarios y contacto se publicará aquí en cuanto sea confirmada."
            dark
          />

          <div className="grid gap-px bg-ivory/10 sm:grid-cols-2">
            <article className="bg-ink p-7 sm:p-9">
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-gold">
                Ubicación
              </p>
              {businessDetails.address ? (
                <>
                  <address className="mt-3 text-lg not-italic text-ivory">
                    {businessDetails.address}
                  </address>
                  {businessDetails.mapUrl && (
                    <a
                      href={businessDetails.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-block text-xs font-bold uppercase tracking-[0.15em] text-sky underline-offset-4 hover:underline"
                    >
                      Abrir mapa ↗
                    </a>
                  )}
                </>
              ) : (
                <PendingValue>Dirección por confirmar.</PendingValue>
              )}
            </article>

            <article className="bg-ink p-7 sm:p-9">
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-gold">
                Horarios
              </p>
              {businessDetails.openingHours.length > 0 ? (
                <ul className="mt-3 space-y-2 text-sm text-ivory/70">
                  {businessDetails.openingHours.map((hours) => (
                    <li key={hours}>{hours}</li>
                  ))}
                </ul>
              ) : (
                <PendingValue>Horarios por confirmar.</PendingValue>
              )}
            </article>

            <article className="bg-ink p-7 sm:p-9">
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-gold">
                Teléfono
              </p>
              {businessDetails.phone ? (
                <a
                  className="mt-3 inline-block text-lg text-ivory transition-colors hover:text-sky"
                  href={`tel:${businessDetails.phone}`}
                >
                  {businessDetails.phone}
                </a>
              ) : (
                <PendingValue>Número por confirmar.</PendingValue>
              )}
            </article>

            <article className="bg-ink p-7 sm:p-9">
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-gold">
                Correo
              </p>
              {businessDetails.email ? (
                <a
                  className="mt-3 inline-block break-all text-lg text-ivory transition-colors hover:text-sky"
                  href={`mailto:${businessDetails.email}`}
                >
                  {businessDetails.email}
                </a>
              ) : (
                <PendingValue>Correo por confirmar.</PendingValue>
              )}
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
