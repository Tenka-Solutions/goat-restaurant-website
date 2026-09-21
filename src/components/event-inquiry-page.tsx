import { EventInquiryForm } from "@/components/event-inquiry-form";
import { getDictionary } from "@/content/dictionaries";
import type { Locale } from "@/types/site";

export function EventInquiryPage({ locale }: { locale: Locale }) {
  const copy = getDictionary(locale).eventInquiry;
  return <main id="content" className="bg-ivory px-5 py-20 text-ink sm:px-8 lg:px-12 lg:py-28">
    <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.75fr_1.25fr]">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[.24em] text-blue-deep">G.O.A.T.</p>
        <h1 className="mt-4 font-display text-6xl leading-none sm:text-7xl">{copy.title}</h1>
        <p className="mt-5 max-w-md leading-7 text-ink/65">{copy.intro}</p>
        <p className="mt-6 max-w-md border-l-2 border-sky pl-4 text-sm leading-6 text-ink/75">{copy.notice}</p>
      </div>
      <EventInquiryForm locale={locale} />
    </div>
  </main>;
}
