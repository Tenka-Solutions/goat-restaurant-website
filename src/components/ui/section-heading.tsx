type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  body?: string;
  align?: "left" | "center";
  dark?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
  dark = false,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <p
        className={`mb-4 text-xs font-semibold uppercase tracking-[0.26em] ${
          dark ? "text-sky-light" : "text-blue-deep"
        }`}
      >
        <span
          className={`mr-3 inline-block h-px w-8 align-middle ${
            dark ? "bg-sky" : "bg-gold-dark"
          }`}
          aria-hidden="true"
        />
        {eyebrow}
      </p>
      <h2
        className={`text-balance font-display text-5xl leading-[0.95] tracking-[0.02em] sm:text-6xl lg:text-7xl ${
          dark ? "text-ivory" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {body && (
        <p
          className={`mt-6 max-w-xl text-pretty text-base leading-7 sm:text-lg ${
            centered ? "mx-auto" : ""
          } ${dark ? "text-ivory/68" : "text-ink/65"}`}
        >
          {body}
        </p>
      )}
    </div>
  );
}
