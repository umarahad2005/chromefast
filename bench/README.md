# Proof: what does an AI agent pay to "see" a page?

A reproducible benchmark on 5 public pages: the cost of **screenshots** vs the **accessibility tree** vs **page text**, measured in real Google Chrome via Playwright.

```bash
cd bench && npm install && npm run bench     # writes results.md + results.json
```

## Results (2026-11-17, Chrome 156, viewport 1280×800, median of 3 runs)

| Page | Screenshot: 1 screen | Screens to see whole page → tokens | Full accessibility tree | Page text (whole page) | Locate one element (scoped tree) |
|---|---|---|---|---|---|
| Hacker News front page | 148 ms · ~1,366 tok | 2 → ~2,732 | 151 ms · ~10,254 | **9 ms · ~1,058** | link "new": **39 ms · ~9 tok** |
| Wikipedia big table | 218 ms · ~1,366 | 34 → ~46,444 | 1,101 ms · ~70,476 | **39 ms · ~14,539** | heading: **58 ms · ~18 tok** |
| GitHub repo page | 426 ms · ~1,366 | 11 → ~15,026 | 231 ms · ~7,672 | **16 ms · ~2,325** | link "Issues": **51 ms · ~15 tok** |
| TodoMVC web app | 106 ms · ~1,366 | 1 → ~1,366 | 19 ms · ~110 | **6 ms · ~37** | textbox: **14 ms · ~9 tok** |
| W3C ARIA data grid | 147 ms · ~1,366 | 38 → ~51,908 | 203 ms · ~10,365 | **21 ms · ~7,250** | grid: **37 ms · ~468 tok** |

Raw data: [`results.md`](results.md), [`results.json`](results.json).

## What this proves (and what it doesn't)

1. **Reading page text is the cheapest way to read a page.** To read the whole page, text cost **2.6× to 37× fewer tokens** than the screenshots needed to see the same content, and was captured **10–25× faster** (6–39 ms vs 106–426 ms).
2. **Locating one element by role/name costs almost nothing.** 9–468 tokens and 14–58 ms, versus ~1,366 tokens for every screenshot an agent takes to find a button by eye — and it returns an exact reference to click.
3. **Dumping the whole tree is NOT always cheaper.** On Hacker News the full tree (~10k tokens) costs 7× one screenshot; on the Wikipedia table it is ~70k tokens. That is why ChromeFast says *text first, then a scoped `find`*, and *never dump the whole tree*.
4. Not measured here: model accuracy. Screenshots also risk misreading small numbers; text and refs do not — but this benchmark only measures cost and speed.

**How tokens are estimated:** images ≈ width × height / 750 (Anthropic's published estimate); text ≈ characters / 4 (rule of thumb; real tokenizers vary, especially for non-English text). Times are raw local capture times; in a real agent loop, each extra tool call also adds a model round-trip, which makes fewer, cheaper reads matter even more.

## Field note: a heavy logged-in dashboard

While editing location targeting in a live ad-manager account with Claude in Chrome (no account data shared here), the screenshot call **timed out at 30 s six times** ("renderer may be frozen"). In the same session, `find` and `get_page_text` kept working: the agent removed 7 list items by reference across two ad sets, read back the results as text, and published — without needing a single successful screenshot for those steps. That experience is where ChromeFast's rule *"if screenshots freeze, stop screenshotting"* comes from.

## Add your numbers
Run it on your own pages (edit `PAGES` in `measure.mjs`) and open an issue with the results.
