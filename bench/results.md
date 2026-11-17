# Benchmark results

2026-11-17 · Google Chrome via Playwright · viewport 1280×800 · median of 3 runs

| Page | Screenshot: 1 screen | Screens to see whole page → tokens | Accessibility tree (whole page) | Page text (whole page) | Locate one element by role (scoped tree) | Actionable elements in tree |
|---|---|---|---|---|---|---|
| [Hacker News front page (list)](https://news.ycombinator.com/) | 148 ms · ~1366 tok | 2 → ~2,732 tok | 151 ms · ~10,254 tok | 9 ms · ~1,058 tok | link "new": 39 ms · ~9 tok | 469 |
| [Wikipedia big table (countries by population)](https://en.wikipedia.org/wiki/List_of_countries_and_dependencies_by_population) | 218 ms · ~1366 tok | 34 → ~46,444 tok | 1101 ms · ~70,476 tok | 39 ms · ~14,539 tok | heading "List of countries and dependencies by population": 58 ms · ~18 tok | 3112 |
| [GitHub repo page (app-like)](https://github.com/microsoft/playwright) | 426 ms · ~1366 tok | 11 → ~15,026 tok | 231 ms · ~7,672 tok | 16 ms · ~2,325 tok | link "Issues": 51 ms · ~15 tok | 305 |
| [TodoMVC demo (web app)](https://demo.playwright.dev/todomvc/) | 106 ms · ~1366 tok | 1 → ~1,366 tok | 19 ms · ~110 tok | 6 ms · ~37 tok | textbox "What needs to be done?": 14 ms · ~9 tok | 4 |
| [W3C ARIA data grid example](https://www.w3.org/WAI/ARIA/apg/patterns/grid/examples/data-grids/) | 147 ms · ~1366 tok | 38 → ~51,908 tok | 203 ms · ~10,365 tok | 21 ms · ~7,250 tok | grid: 37 ms · ~468 tok | 284 |
