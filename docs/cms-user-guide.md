# G.O.A.T. CMS user guide

The Studio contains **Promotions**, **Events**, **Menu Categories**, and **Menu Items**. It cannot edit the home hero, navigation, institutional copy, footer, styles or global metadata.

## Sign in

1. Open `https://YOUR-DOMAIN.com/studio`.
2. Sign in with the Sanity account invited by the project administrator.
3. Choose the appropriate content section from the left column.

If Studio says it is not configured, the deployment administrator must add the Sanity environment variables first.

## Create a promotion or event

1. Open the relevant list and select **Create**.
2. Choose the correct type: Promotion or Event.
3. Complete the English title and description first; English is the primary editorial language.
4. Complete the Spanish title and description. Both languages are required.
5. Generate or enter a short slug.
6. Upload one landscape image. Use the crop/hotspot control to keep the important subject visible.
7. Write meaningful image alt text in English and Spanish; describe the image rather than repeating the title.
8. Optionally add CTA text in both languages and a valid link.

## Schedule and publish

1. Set the start date and time.
2. Add an end date when the content should disappear. The end cannot be earlier than the start.
3. Add the public-facing date/time wording in both languages when relevant.
4. Set priority from 0–100. Higher numbers appear first.
5. Turn on **Show on website**.
6. Select **Publish** in Sanity. Changes can take up to five minutes to appear because the site caches public reads.

Future events may appear before their start date. Future promotions appear only once started. Expired content disappears automatically.

## Withdraw content

Turn off **Show on website** and publish again, or use Sanity’s unpublish action. Deleting is unnecessary and makes recovery harder.

## Menu management (Phase 1 foundation)

Menu Categories have bilingual names, an optional bilingual description, a stable website anchor, and a display order. Menu Items have bilingual names and optional descriptions, a category, display order, an optional numeric USD price, optional bilingual price note, and optional image with bilingual alt text.

Use lower display-order numbers first. Create a category before assigning items to it. Use **Show on website** to hide a category or item without deleting it. Publishing and showing are separate: content must be published in Sanity and have **Show on website** enabled before a later public-menu release can display it.

Phase 1 does not connect the public menu to Sanity. The live menu still uses `src/content/menu.ts`; do not treat Studio menu edits as live until the future cutover is announced.

## Menu seed procedure (not yet executed)

The repository includes a deterministic draft seed based on the current local menu and the approved menu updates. It uses fixed IDs, so rerunning it updates the same Sanity drafts without duplication. It never publishes documents.

When a Sanity administrator is ready to seed the intended dataset, review the code and run:

```bash
npx sanity exec scripts/seed-menu.ts --with-user-token
```

Review all resulting drafts in Studio before publishing. Do not run this against production until the menu cutover plan has been approved.

## Permissions limitation

The Studio navigation and schema expose promotions, events, menu categories, and menu items, but that is an interface restriction, not a substitute for provider permissions. Exact role granularity depends on the Sanity plan. The project administrator must assign the narrowest available role; some fine-grained roles may require a paid plan.
