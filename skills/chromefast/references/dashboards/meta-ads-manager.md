# Recipe: Meta Ads Manager & Business Suite

**Status: ✅ live-tested** (Nov 2026, Claude in Chrome, real account — IDs below are placeholders).

## URLs (navigate directly, don't click through menus)
| Need | URL |
|---|---|
| Campaigns | `https://adsmanager.facebook.com/adsmanager/manage/campaigns?act=<AD_ACCOUNT_ID>&business_id=<BUSINESS_ID>` |
| Ad sets of one campaign | `…/manage/adsets?act=<ID>&business_id=<BID>&selected_campaign_ids=<CAMPAIGN_ID>` |
| Ads of one campaign | `…/manage/ads?act=<ID>&business_id=<BID>&selected_campaign_ids=<CAMPAIGN_ID>` |
| Date range | append `&date=YYYY-MM-DD_YYYY-MM-DD` — **the end date is exclusive** (`2026-11-13_2026-11-16` shows Nov 13–15) |
| Edit one ad set | `…/manage/adsets/edit/standalone?act=<ID>&business_id=<BID>&selected_campaign_ids=<CID>&selected_adset_ids=<ADSET_ID>` |
| Ad posts (real post links) | `https://business.facebook.com/latest/posts/ads_posts?business_id=<BID>` |

## Read today's results
1. `navigate` to the ad sets URL with `&date=…`.
2. `get_page_text` gives names, status and **the first columns only** — the table is virtualized.
3. Results / cost / spend / reach: drag the table's horizontal scrollbar (`left_click_drag` along the bar at the bottom of the grid) in 2–3 steps; after each, a `screenshot` at scale 0.7 or `zoom` on the rows. (These cells are often not exposed as text.)
4. Report per ad set + total, with the date range.

## Edit targeting (e.g. remove locations)
1. Open the edit URL → `find "Locations button"` → `scroll_to` + click to expand.
2. `read_page ref_id=<location list>` to list items.
3. `find "Remove button for <place>"` → click. **Re-find after every removal** (refs go stale; the remove button follows its item in the tree).
4. Read the list back with `get_page_text`.
5. **Ask before Publish.** After Publish, a "may get 0 conversations — increase budget?" dialog often appears: choose *Keep current budget* unless the user asked otherwise.
6. Status reads *Processing* → done. Check every edited ad set: a second ad set may still say *Unpublished edits* → **Review and publish**.

## Get shareable post links (for comments/social proof)
1. Business Suite → Content → **Ad Posts** (URL above). `get_page_text` lists captions + dates.
2. Click a row title (`find` → click). The tab URL now contains `content_id=<POST_ID>`.
3. `https://www.facebook.com/<POST_ID>` opens the post (reels redirect to `/reel/<id>`).
4. Duplicated ad sets create **separate posts** per ad — comments/likes are split.

## Gotchas
- Screenshots on the ad-set editor often **time out (30 s)**. Switch to `find` / `get_page_text` immediately.
- Location targeting no longer has "people living in"; only Include/Exclude.
- "Share a link" in Advanced preview is a 24-hour **preview** link, not a public post.
- Never read access tokens or call the Graph API from page scripts.
