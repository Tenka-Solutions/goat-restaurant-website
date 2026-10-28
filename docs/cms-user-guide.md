# G.O.A.T. website content management — quick guide

The customer-facing site is at `https://goatrestaurantsutah.com`.
Staff can sign in to the **G.O.A.T. Content** Studio at `https://goatrestaurantsutah.com/studio` using an invited Sanity account.

## Menu items and categories

- **Menu Items:** open a dish to update its English/Spanish name, description, price, optional photo, sort order, or **Show on website** status.
- **Menu Categories:** edit bilingual category details, their order, or visibility.
- For a dish photo, upload an image and enter both English and Spanish alt text.
- Use **Publish** after editing. A saved draft alone is not visible on the public menu.
- To temporarily remove an unavailable dish, turn off **Show on website** and publish, rather than deleting the item.
- The live public menu reads published Sanity documents. The legacy TypeScript menu is a fallback if Sanity is unavailable or returns no renderable menu items.

## Homepage images

Open **Homepage images**. The six editable placements are the Hero, four Flavours cards, and Experience.

- Upload approved restaurant photography to each desired image field.
- Fill in the English and Spanish alternative text for Hero and Experience.
- Click **Publish**. An empty or incomplete image field falls back to the current default image.

## Promotions and Events

Staff can manage marketing promotions and restaurant-run events from their respective Studio sections. These are distinct from customer event inquiries; inquiries arrive by email.

## Publishing and troubleshooting

The website normally refreshes published CMS changes within approximately five minutes. Reload the public page after publishing.

If changes appear to save but cannot be published, check the member's Sanity **role** first. After a Growth Trial expires, Sanity automatically downgrades to Free and converts non-admin team members to **Viewer**. A Viewer cannot edit or publish content. Free supports two human roles: **Administrator** (can publish and manage project settings) and **Viewer** (read-only). The restricted **Editor** role is available on paid Growth/Enterprise plans. See the official Sanity [Growth trial](https://www.sanity.io/docs/platform-management/growth-plan-trial) and [Roles](https://www.sanity.io/docs/user-guides/roles) documentation.

For production, the project owner must consciously choose one of these paths:

1. **Free:** grant the trusted restaurant owner **Administrator** access, acknowledging that it includes project-settings and member-management privileges.
2. **Growth:** pay for the necessary editor seats and assign the customer **Editor** rather than Administrator.

Do not share the developer's login or expose server-side Sanity tokens to the browser. A Studio navigation menu is not a substitute for project permissions.

Before changing roles, confirm the actual plan and the customer's current role under [Sanity Manage](https://www.sanity.io/manage/project/g8zw5af0), **Members** and **Plan**. No dataset migration or reseeding is required to fix a Viewer-only permission issue.
