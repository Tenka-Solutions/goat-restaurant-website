import Image from "next/image";

import { siteConfig } from "@/config/site";

type BrandMarkProps = {
  compact?: boolean;
  inverse?: boolean;
};

export function BrandMark({
  compact = false,
  inverse = false,
}: BrandMarkProps) {
  return (
    <span className="inline-flex items-center gap-3" aria-label="G.O.A.T. Argentine Grill & Bakery">
      <Image
        src={siteConfig.brandLogoPath}
        width={1024}
        height={1024}
        sizes="64px"
        alt=""
        aria-hidden="true"
        className="size-14 object-contain lg:size-16"
        priority
      />

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