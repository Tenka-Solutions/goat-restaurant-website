type BrandMarkProps = {
  compact?: boolean;
  inverse?: boolean;
};

export function BrandMark({
  compact = false,
  inverse = false,
}: BrandMarkProps) {
  return (
    <span className="inline-flex items-center gap-3" aria-label="G.O.A.T.">
      <span
        className={`font-display text-[2rem] leading-none tracking-[0.08em] ${
          inverse ? "text-ivory" : "text-ink"
        }`}
      >
        G.O.A.T.
      </span>
      {!compact && (
        <>
          <span className="h-8 w-px bg-sky/70" aria-hidden="true" />
          <span
            className={`max-w-24 text-[0.55rem] font-semibold uppercase leading-[1.35] tracking-[0.18em] ${
              inverse ? "text-ivory/65" : "text-ink/60"
            }`}
          >
            Argentine Grill & Bakery
          </span>
        </>
      )}
    </span>
  );
}
