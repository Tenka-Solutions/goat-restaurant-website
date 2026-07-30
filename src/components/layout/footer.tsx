import { BrandMark } from "@/components/ui/brand-mark";
import {
  businessDetails,
  navigation,
  siteConfig,
} from "@/content/site-content";

export function Footer() {
  const socialLinks = [
    ["Instagram", businessDetails.instagram],
    ["Facebook", businessDetails.facebook],
    ["TikTok", businessDetails.tiktok],
  ].filter((item): item is [string, string] => Boolean(item[1]));

  return (
    <footer className="border-t border-ivory/10 bg-ink px-5 pb-8 pt-14 text-ivory sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <BrandMark inverse />
          <p className="mt-5 max-w-sm text-sm leading-6 text-ivory/55">
            Parrilla argentina, panadería artesanal y café. Una mesa hecha
            para compartir.
          </p>
        </div>

        <div>
          <p className="mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gold">
            Explora
          </p>
          <ul className="space-y-3 text-sm text-ivory/65">
            {navigation.map((item) => (
              <li key={item.href}>
                <a className="transition-colors hover:text-sky" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gold">
            Conecta
          </p>
          {socialLinks.length > 0 ? (
            <ul className="space-y-3 text-sm text-ivory/65">
              {socialLinks.map(([label, href]) => (
                <li key={label}>
                  <a
                    className="transition-colors hover:text-sky"
                    href={href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-ivory/45">Redes sociales próximamente.</p>
          )}
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-7xl flex-col gap-3 border-t border-ivory/10 pt-7 text-[0.65rem] uppercase tracking-[0.15em] text-ivory/35 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {siteConfig.fullName}
        </p>
        <a className="transition-colors hover:text-sky" href="#inicio">
          Volver arriba ↑
        </a>
      </div>
    </footer>
  );
}
