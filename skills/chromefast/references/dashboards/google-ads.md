# Recipe: Google Ads

**Status: 🧪 not yet live-tested** — written from the product's public structure. Please open an issue/PR with corrections.

## URLs
| Need | URL pattern |
|---|---|
| Campaigns | `https://ads.google.com/aw/campaigns?ocid=<CUSTOMER_OCID>` (open once, then reuse the exact URL from the tab) |
| Ad groups / Ads / Keywords | `…/aw/adgroups?…`, `…/aw/ads?…`, `…/aw/keywords?…` with the same `ocid` (and `campaignId=` when inside one campaign) |

The date range is held in the UI state; set it once with the date picker, then reuse the tab's URL.

## Read results
1. `get_page_text` — the grid usually exposes cell text. Look for the "Total" rows.
2. Many columns → the grid scrolls horizontally; drag the scrollbar and read again.
3. Prefer the built-in **Download** (CSV) only if the user asked for a file — ask before downloading.

## Edit
- Budgets, bids, pausing: `find "Edit budget for <campaign>"` → `form_input` → read back → **ask before Save**.
- "Recommendations / Apply all" banners: never apply without the user's explicit approval.

## Gotchas
- Account switcher: confirm the account name in `get_page_text` before reading numbers.
- Some cells show "—" during data refresh; wait and re-read rather than reporting 0.
