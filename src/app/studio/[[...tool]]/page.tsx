import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export const dynamic = "force-static";

export default function StudioPage() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.NEXT_PUBLIC_SANITY_DATASET) {
    return <main className="grid min-h-screen place-items-center bg-ink p-6 text-ivory"><div className="max-w-xl border border-gold/40 p-8"><h1 className="font-display text-5xl">Studio not configured</h1><p className="mt-4 leading-7 text-ivory/70">Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET, then restart the application.</p></div></main>;
  }
  return <NextStudio config={config} />;
}
