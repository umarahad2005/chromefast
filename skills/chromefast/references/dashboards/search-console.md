# Recipe: Google Search Console

**Status: 🧪 not yet live-tested** — please confirm and send fixes.

## URLs
| Need | URL pattern |
|---|---|
| Performance (domain property) | `https://search.google.com/search-console/performance/search-analytics?resource_id=sc-domain%3Aexample.com&num_of_days=28` |
| Performance (URL-prefix property) | same, with `resource_id=https%3A%2F%2Fexample.com%2F` |
| Indexing / pages | `https://search.google.com/search-console/index?resource_id=<same>` |

## Read
1. `navigate` with `num_of_days=7|28|90` instead of using the date picker.
2. `get_page_text` → total clicks, impressions, CTR, position (the four scorecards).
3. Queries/Pages table: text is exposed; paginate with the next-page button (`find`).

## Gotchas
- Data lags about 2–3 days; say so when reporting "this week".
- Turn on CTR/Position scorecards only if they are off — that is a UI toggle, not a setting change.
