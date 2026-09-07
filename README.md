# G.O.A.T. Argentine Grill & Bakery

Bilingual marketing site for G.O.A.T., with a native web menu, a restricted promotions/events CMS, contact form and an on-screen menu QR. English is primary. The project intentionally excludes ordering, checkout, payments, internal reservations, customer accounts and a general-purpose admin panel.

## Stack

- Next.js 15 App Router, React 19 and strict TypeScript
- Tailwind CSS with existing G.O.A.T. colour/type tokens
- Local Bebas Neue and Montserrat files through Fontsource
- Sanity Studio 4 + `next-sanity` 11 for promotions/events only
- Resend HTTP API for email (no message database)
- Vitest for focused unit tests; `qrcode` as a development-only generator

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Redirects to `/en` |
| `/en`, `/es` | Localized home pages |
| `/menu` | Stable redirect to `/en/menu`; QR destination |
| `/en/menu`, `/es/menu` | Native restaurant menu and bakery area |
| `/en/promotions`, `/es/promociones` | Active promotions and upcoming events |
| `/studio` | Restricted Sanity editing interface |
| `/api/contact` | Validated contact endpoint |

The language switch uses real links, maps equivalent pages, and preserves query strings and hashes. Static copy lives in `src/content/en` and `src/content/es`; menu data lives in typed `src/content/menu.ts`. Middleware provides the locale to the root layout so `<html lang>` is correct.

## Local setup

Requires Node.js 20+.

```bash
npm install
Copy-Item .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. Missing integrations do not block development/build: promotions are empty, Studio explains what is missing, and the contact endpoint returns a controlled configuration error rather than a false success.

## Environment variables

```dotenv
NEXT_PUBLIC_SITE_URL=https://your-domain.example
NEXT_PUBLIC_RESERVATION_URL=https://optional-booking-provider.example
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_VERSION=2025-02-19
RESEND_API_KEY=re_...
CONTACT_RECIPIENT_EMAIL=team@example.com
CONTACT_FROM_EMAIL=G.O.A.T. <website@verified-domain.example>
```

`NEXT_PUBLIC_RESERVATION_URL` is optional; without it, the CTA goes to the contact form. Do not expose Resend credentials or any Sanity write token. Public Sanity reads need no token when the dataset is public.

## Menu and bakery

The web menu is semantic HTML, responsive and indexable. Source copy/prices came from `docs/source-menu/G.O.A.T.pdf`; the original is published at `public/menu/goat-menu.pdf`. Review unresolved content in `docs/menu-content-review.md` before launch. Update products in `src/content/menu.ts`; prices intentionally remain formatted strings.

The PDF contains no bakery catalogue. The bakery area therefore shows approved-style placeholder copy until confirmed products arrive.

## Sanity setup

1. Create a Sanity project/dataset (or use the client’s existing project).
2. Add the three Sanity environment values locally and in hosting.
3. Add the deployed domain and local origin to Sanity CORS settings with credentials enabled for Studio.
4. Visit `/studio`, sign in and invite client editors.
5. Assign the narrowest provider role available. Schema/navigation limits the UI to Promotions and Events, but fine-grained security depends on the Sanity plan.

The schema requires bilingual content, image/alt text, slug, type, start date, priority and publishing state. Public reads revalidate every five minutes. See `docs/cms-user-guide.md`.

## Contact form

Client and server validation cover required fields, email shape and size limits. The endpoint uses a honeypot, a best-effort in-memory rate limit and a 12 KB request cap. It sends plain text through Resend, uses the visitor as reply-to, logs no personal data and stores nothing.

The in-memory limit is per runtime instance; high-traffic or multi-region deployments should replace it with a managed edge limiter. Configure all three private email variables and verify the sender domain before testing delivery.

## Brand assets

The official circular source is kept at `docs/brand-source/goat-logo.png`. It is a 1024×1024 RGBA PNG with real transparency, so it was copied without pixel changes to `public/brand/goat-logo-transparent.png`; matching SHA-256 hashes confirm that the public asset is byte-identical to the client source. Next.js optimizes delivery through `next/image`.

The logo is used in the navbar, as the primary mark above the localized menu title and as a discreet 80 px footer mark. The existing simplified favicon remains in use because the detailed circular artwork and fine lettering do not reproduce reliably at small favicon sizes. Replace the source and public files together if a final SVG or revised transparent PNG becomes available, keeping the same square proportions and transparent exterior.

## QR generation

The menu page displays the committed 1200 px PNG as a responsive, non-clickable image with localized alternative text. The public interface offers no QR download button or technical URL. The SVG and PNG remain project assets so developers can update and test print materials internally:

```bash
$env:NEXT_PUBLIC_SITE_URL='https://your-real-domain.example'
npm run qr:generate
```

This encodes `NEXT_PUBLIC_SITE_URL + /menu`. The committed files encode `https://goatrestaurantsutah.com/menu`. Regenerate them whenever the public site URL changes. Prefer SVG for print, preserve the quiet zone, print at least 25 mm wide, avoid distortion, and test the final physical proof on multiple phones.

## Validation

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Responsive checks target 320, 375, 768, 1024, 1440 and 1920 px. Run the production server with `npm start` after building.

With the server running, automate viewport width, document language and horizontal-overflow checks using Edge (override `BROWSER_PATH` on other systems):

```bash
$env:RESPONSIVE_BASE_URL='http://127.0.0.1:3000'
npm run test:responsive
```

## Deployment

### Vercel

Import the repository, set the environment variables for Production/Preview as appropriate, deploy with the detected Next.js settings, configure the production domain in Sanity CORS, then regenerate and commit the production QR.

### Other Next.js hosts

Use Node 20+, run `npm ci && npm run build`, and serve with `npm start`. Confirm support for Route Handlers, remote images from `cdn.sanity.io`, and outbound HTTPS to Sanity/Resend. Cloudflare requires a Next.js adapter compatible with this exact Next version; verify Route Handler and Studio support before choosing it.

## Third-party costs and pending data

Sanity and Resend offer entry plans, but quotas/features/prices can change; review current provider terms. Costs may arise from CMS seats, role granularity, API/CDN use, asset storage or email volume. Hosting/domain fees are separate and paid by the client. No claim is made that any service remains free indefinitely.

All missing business details and approvals are listed in `docs/client-content-checklist.md`.
