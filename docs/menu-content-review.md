# Menu content review

Source reviewed: `docs/source-menu/G.O.A.T.pdf` (10 pages). Review date: 2026-07-31.

The website preserves prices as strings and marks draft translations with `provisional: true`. No ambiguous commercial wording should be treated as approved until the client signs off on this document.

## Price and alignment questions

- Empanadas says `$ 3.49 EACH - $35 DOC`. Confirm whether `DOC` means dozen (`DOZ`) and whether the dozen price is exactly `$35`.
- Milanese prices appear in a separate column: `$19.99`, `$18.99`, `$17.99`. The web currently maps them in order to Napolitana, A la Española and A Caballo; confirm.
- Pasta prices appear separated from their names. The web maps `$18.99` ravioli, `$17.99` cannelloni, `$15.99` lasagna and `$15.99` gnocchi; confirm.
- Seafood prices are visually displaced. The web maps `$23.99` Frutti di Mare, `$21.99` salmon, `$18.99` garlic shrimp and `$17.99` Pacific hake; confirm.
- All three tarts are interpreted as `$12`; confirm.
- Kids prices are visually displaced. The web maps `$5.99` pizza, `$4.99` mac & cheese, `$6.99` milanese and `$11.99` skirt steak; confirm.
- Coffee prices are mapped by line order: dulce de leche coffee `$5.99`, cappuccino `$5.99`, mocaccino `$4.99`, latte `$4.99`, Americano `$3.99`, espresso `$3.99`; confirm.
- All six teas/infusions are interpreted as `$2.50`; confirm.
- The menu does not state currency. Confirm currency and whether tax is included.

## Spelling, names and incomplete wording

- `RIB-EYES` should likely be singular `rib-eye`; confirm the public product name.
- `SHORT-RIBES` likely means `short ribs`; confirm.
- `LATE` likely means `latte`; the Spanish transcription remains “Late” and the English draft uses “Latte”.
- `EXPRESO` may intentionally be Spanish, but “espresso” is the standard coffee name; confirm.
- `sandwichs` should likely be `sándwiches` / `sandwiches`.
- `G.OA.T.` is missing a period in the burger name; the web normalizes the brand to `G.O.A.T.`.
- `LAZAÑA`, `CAPUCCINO`, `HIERBA` (for yerba mate), `ARUGULA`, `MORRON`, `AZUCAR`, `PÚRE`, `acompańamiento`, `guarniación`, `gurniciones`, `champińones` and `NIŃOS` require spelling review.
- The garlic-shrimp description breaks mid-word (`s` / `azonados`) in the PDF; the web joins the sentence provisionally.
- The mate-service line ends with `EQUIPO DE MATE` without punctuation or a clear statement of whether the equipment is included, loaned or sold.
- `A SU PALADAR`, `DE DIEZ` and `DE LA PATRIA` are editorial headings whose intended English voice needs approval.
- `Vigilante`, `pastafrola`, `humita`, `chivito`, `lomito`, `choripán`, `mate cocido` and `pascualina` are retained culinary names; confirm whether descriptions are needed for English-speaking guests.

## Description discrepancies

- The Picada heading lists cheeses, ham, nuts and bread; its description lists four cheeses, salami and prosciutto but omits nuts and bread. Confirm included items.
- “Todos las carnes/milanesas/hamburguesas” contains agreement errors and uses both Spanish `guarnición` and English `side`.
- The salmon says two sides while grilled meats and milanese say one side. Confirm serving rules.
- `Frutti di mare` is described only as “pasta frutti di mare”; ingredients/allergens are unknown.
- Pizza and empanada flavour separators are inconsistent, making some combinations unclear. The website interprets `queso / jamón-queso / mechada-queso / carne / pollo / espinaca-ricotta / humita`; confirm each SKU.
- Natural juice text can be read as three flavours: pineapple-mint, horchata, and raspberry lemonade. Confirm that interpretation and whether “raspberry” should be translated.

## Missing information

- No bakery product catalogue appears in the PDF, so the website shows a coming-soon editorial state and invents no products.
- No allergen, dietary, availability, portion-size (except kids skirt steak), tax, service-charge or price-change disclaimer is supplied.
- Product availability and add-on compatibility are not specified.
- The opening cover contains `Test 1` and `PRUEBA DE MENÚ`; confirm these are proofing labels and should be removed from the final PDF.
- The Instagram handle appears as `@goat_argentinian_grill`; confirm it remains current.

## Translation status

All English menu translations are working drafts derived from the Spanish PDF, not client-approved commercial copy. Items marked with `provisional: true` in `src/content/menu.ts` retain that status for internal review without displaying it to visitors. Culinary terminology, descriptions and prices should be reviewed before launch.
