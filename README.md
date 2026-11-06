# G.O.A.T. Argentine Grill & Bakery

Bilingual restaurant website for G.O.A.T., with links to the restaurant-managed external menu and Clover pickup ordering, a Sanity-managed homepage gallery/promotions, and contact/event inquiry forms. English is primary. The project intentionally excludes ordering, checkout, payments, internal reservations, customer accounts and a general-purpose admin panel.

## Stack

- Next.js 15 App Router, React 19 and strict TypeScript
- Tailwind CSS with existing G.O.A.T. colour/type tokens
- Local Bebas Neue and Montserrat files through Fontsource
- Sanity Studio 4 + `next-sanity` 11 for promotions/events and Phase 1 menu management
- Resend HTTP API for email (no message database)
- Vitest for focused unit tests; `qrcode` as a development-only generator

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Redirects to `/en` |
| `/en`, `/es` | Localized home pages |
| `/menu` | Legacy QR destination; redirects to the approved external menu |
| `/en/menu`, `/es/menu` | Legacy localized menu URLs; redirect to the approved external menu |
| `/en/promotions`, `/es/promociones` | Active promotions and upcoming events |
| `/en/book-your-event`, `/es/reserva-tu-evento` | Event inquiry form (availability is confirmed by the restaurant) |
| `/studio` | Restricted Sanity editing interface |
| `/api/contact` | Validated contact endpoint |
| `/api/event-inquiry` | Validated event inquiry endpoint |

The language switch uses real links, maps equivalent pages, and preserves query strings and hashes. Static copy lives in `src/content/en` and `src/content/es`. As of November 2026, the public restaurant menu is maintained externally; legacy menu code and Sanity menu documents are not shown on the public website. Middleware provides the locale to the root layout so `<html lang>` is correct.

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

## Public menu and pickup ordering

- Official menu: `https://menu.igniscreativeco.com/`.
- Pickup ordering: `https://goat-argentine-grill-orem-ut.cloveronline.com/menu/all`.
- The first-party public menu pages were retired at the restaurant's request to prevent clients from seeing outdated products/prices. `/menu`, `/en/menu` and `/es/menu` now redirect to the official external menu.
- The outdated static menu PDF was removed from `public/menu`. Existing QR files under `public/qr` encode the stable first-party `/menu` URL, which redirects to the official menu.
- The old internal menu implementation, content fixtures and Sanity menu documents remain in the repository/dataset for historical reference, but are no longer rendered or editable through the customer-facing Studio navigation.
- Sanity Studio remains responsible for homepage image slots, marketing promotions and restaurant-run events. See `docs/cms-user-guide.md`.
- Homepage defaults now use six approved real restaurant photographs from the client's November 2026 media folder (optimized WebP assets in `public/images/`). Each fully populated Sanity image slot can override the corresponding default. The fourth flavour card now features Sunday pasta and gnocchi on the 29th.
- Changes to the official external menu and the Clover merchant logo must be made by the restaurant through those separate services, not in this repository.

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

## Event inquiries

The event form is a separate inquiry flow: it sends the requested details as plain text through Resend and never confirms availability automatically. It uses the same private email configuration as the contact form, including `CONTACT_RECIPIENT_EMAIL`, and has the same honeypot, request cap, and best-effort rate limiting protections.

## Brand assets

The official circular source is kept at `docs/brand-source/goat-logo.png`. It is a 1024×1024 RGBA PNG with real transparency, so it was copied without pixel changes to `public/brand/goat-logo-transparent.png`; matching SHA-256 hashes confirm that the public asset is byte-identical to the client source. Next.js optimizes delivery through `next/image`.

The logo is used in the navbar and footer, and the same brand asset is available for the restaurant's external merchant services. The existing simplified favicon remains in use because the detailed circular artwork and fine lettering do not reproduce reliably at small favicon sizes. Replace the source and public files together if a final SVG or revised transparent PNG becomes available, keeping the same square proportions and transparent exterior.

## QR generation

The menu page displays the committed 1200 px PNG as a responsive, non-clickable image with localized alternative text. The public interface offers no QR download button or technical URL. The SVG and PNG remain project assets so developers can update and test print materials internally:

```bash
$env:NEXT_PUBLIC_SITE_URL='https://your-real-domain.example'
npm run qr:generate
```

This encodes `NEXT_PUBLIC_SITE_URL + /menu`. The committed files encode `https://goatrestaurantsutah.com/menu`. That stable URL redirects to the current restaurant-managed menu. Regenerate them only if the public site URL changes. Prefer SVG for print, preserve the quiet zone, print at least 25 mm wide, avoid distortion, and test the final physical proof on multiple phones.

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
