export function FinalCta() {
  return (
    <section className="argentina-banner relative isolate overflow-hidden px-5 py-20 text-center text-ink sm:px-8 lg:py-24">
      <div
        className="argentina-banner-pattern pointer-events-none absolute inset-0 z-0 opacity-10"
        aria-hidden="true"
      />
      <svg
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 size-16 -translate-x-1/2 -translate-y-1/2 text-gold opacity-25 sm:size-20"
        viewBox="0 0 80 80"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="40" cy="40" r="10" fill="currentColor" />
        <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M40 12v10M40 58v10M12 40h10M58 40h10" />
          <path d="m20.2 20.2 7.1 7.1M52.7 52.7l7.1 7.1M59.8 20.2l-7.1 7.1M27.3 52.7l-7.1 7.1" />
          <path d="m29.3 14.2 3.8 9.2M46.9 56.6l3.8 9.2M14.2 50.7l9.2-3.8M56.6 33.1l9.2-3.8" />
          <path d="m50.7 14.2-3.8 9.2M33.1 56.6l-3.8 9.2M14.2 29.3l9.2 3.8M56.6 46.9l9.2 3.8" />
        </g>
      </svg>
      <p className="relative z-10 text-xs font-bold uppercase tracking-[0.26em]">
        El fuego ya está encendido
      </p>
      <h2 className="relative z-10 mx-auto mt-4 max-w-3xl text-balance font-display text-5xl leading-none tracking-wide sm:text-7xl">
        Ven con hambre. Quédate por la experiencia.
      </h2>
      <a
        href="#visitanos"
        className="relative z-10 mt-8 inline-flex min-h-13 items-center justify-center bg-ink px-8 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-blue-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
      >
        Información de visita
      </a>
    </section>
  );
}
