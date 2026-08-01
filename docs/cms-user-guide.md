# G.O.A.T. CMS user guide

The Studio only contains **Promotions** and **Events**. It cannot edit the menu, home hero, navigation, institutional copy, footer, styles or global metadata.

## Sign in

1. Open `https://YOUR-DOMAIN.com/studio`.
2. Sign in with the Sanity account invited by the project administrator.
3. Choose **Promotions** or **Events** from the left column.

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

## Permissions limitation

The Studio navigation and schema expose only promotions/events, but that is an interface restriction, not a substitute for provider permissions. Exact role granularity depends on the Sanity plan. The project administrator must assign the narrowest available role; some fine-grained roles may require a paid plan.
