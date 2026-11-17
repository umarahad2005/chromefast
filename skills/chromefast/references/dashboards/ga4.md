# Recipe: Google Analytics 4 (GA4)

**Status: 🧪 not yet live-tested** — please confirm and send fixes.

## URLs
| Need | URL pattern |
|---|---|
| Property home | `https://analytics.google.com/analytics/web/#/p<PROPERTY_ID>/reports/intelligenthome` |
| Any report | open it once in the UI, then reuse the URL (it contains `p<PROPERTY_ID>/reports/...`) |
| Date range | GA4 report URLs can carry `_u.date00=YYYYMMDD&_u.date01=YYYYMMDD` (inside the `#` fragment) — verify on your property |

## Read numbers
1. `get_page_text` — scorecards (Users, Sessions, Key events) appear as text.
2. Tables: text is exposed; long tables paginate — use the "rows per page" control or the next-page button by `find`.
3. Charts are canvas/SVG: read the **table under the chart**, not the chart. Screenshot only if the user wants the visual.

## Gotchas
- Data for "today" is partial and can lag; state the date range and timezone shown in the UI.
- Sampling / thresholding notices appear as text near the report title — include them in the answer.
- Explorations are heavier pages; prefer standard reports for quick reads.
