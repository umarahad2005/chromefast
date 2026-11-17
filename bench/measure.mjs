// ChromeFast benchmark: screenshot vs accessibility tree vs page text, on public pages.
// Run:  cd bench && npm install && npm run bench
// Uses your installed Google Chrome (channel: 'chrome'). Writes results.json and results.md.
//
// Token estimates:
//   image tokens ≈ (width × height) / 750   (Anthropic's published estimate for images)
//   text tokens  ≈ characters / 4           (rough rule of thumb; real tokenizers vary)
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';

const VIEWPORT = { width: 1280, height: 800 };
const RUNS = 3;
const PAGES = [
  { name: 'Hacker News front page (list)', url: 'https://news.ycombinator.com/', target: ['link', 'new'] },
  { name: 'Wikipedia big table (countries by population)', url: 'https://en.wikipedia.org/wiki/List_of_countries_and_dependencies_by_population', target: ['heading', 'List of countries and dependencies by population'] },
  { name: 'GitHub repo page (app-like)', url: 'https://github.com/microsoft/playwright', target: ['link', 'Issues'] },
  { name: 'TodoMVC demo (web app)', url: 'https://demo.playwright.dev/todomvc/', target: ['textbox', 'What needs to be done?'] },
  { name: 'W3C ARIA data grid example', url: 'https://www.w3.org/WAI/ARIA/apg/patterns/grid/examples/data-grids/', target: ['grid', null] },
];

const median = (a) => { const s = [...a].sort((x, y) => x - y); return s[Math.floor(s.length / 2)]; };
const time = async (fn) => { const t = performance.now(); const r = await fn(); return [r, performance.now() - t]; };

const browser = await chromium.launch({ channel: 'chrome' });
const ctx = await browser.newContext({ viewport: VIEWPORT });
const rows = [];

for (const p of PAGES) {
  const page = await ctx.newPage();
  try {
    await page.goto(p.url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForTimeout(2000);
    const shotMs = [], treeMs = [], textMs = [];
    let shot, tree, text;
    for (let i = 0; i < RUNS; i++) {
      [shot] = await time(() => page.screenshot()).then(([r, ms]) => { shotMs.push(ms); return [r]; });
      [tree] = await time(() => page.locator('body').ariaSnapshot()).then(([r, ms]) => { treeMs.push(ms); return [r]; });
      [text] = await time(() => page.locator('body').innerText()).then(([r, ms]) => { textMs.push(ms); return [r]; });
    }
    const loc = page.getByRole(p.target[0], p.target[1] ? { name: p.target[1] } : {}).first();
    const findMs = [];
    let one;
    for (let i = 0; i < RUNS; i++) { const t = performance.now(); one = await loc.ariaSnapshot(); findMs.push(performance.now() - t); }
    const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    const screensToSeeAll = Math.max(1, Math.ceil(scrollHeight / VIEWPORT.height));
    const imgTokens = Math.ceil((VIEWPORT.width * VIEWPORT.height) / 750);
    const actionable = (tree.match(/^\s*- (button|link|textbox|checkbox|combobox|menuitem|tab|row|gridcell|cell)\b/gm) || []).length;
    rows.push({
      page: p.name, url: p.url,
      screenshot: { ms: Math.round(median(shotMs)), bytes: shot.length, tokensPerScreen: imgTokens, screensToSeeWholePage: screensToSeeAll, tokensWholePage: imgTokens * screensToSeeAll, clickTargetsWithRefs: 0 },
      tree: { ms: Math.round(median(treeMs)), chars: tree.length, tokens: Math.ceil(tree.length / 4), coversWholePage: true, actionableElements: actionable },
      locateOne: { target: `${p.target[0]}${p.target[1] ? ' "' + p.target[1] + '"' : ''}`, ms: Math.round(median(findMs)), tokens: Math.ceil(one.length / 4) },
      text: { ms: Math.round(median(textMs)), chars: text.length, tokens: Math.ceil(text.length / 4) },
    });
    console.log('ok', p.name);
  } catch (e) {
    rows.push({ page: p.name, url: p.url, error: e.message.split('\n')[0] });
    console.log('ERR', p.name, e.message.split('\n')[0]);
  } finally { await page.close(); }
}
await browser.close();

const meta = { date: new Date().toISOString(), chrome: browser.version?.() ?? 'chrome', viewport: VIEWPORT, runs: RUNS };
writeFileSync(new URL('./results.json', import.meta.url), JSON.stringify({ meta, rows }, null, 2));

let md = `# Benchmark results\n\n${meta.date.slice(0, 10)} · Google Chrome via Playwright · viewport ${VIEWPORT.width}×${VIEWPORT.height} · median of ${RUNS} runs\n\n`;
md += '| Page | Screenshot: 1 screen | Screens to see whole page → tokens | Accessibility tree (whole page) | Page text (whole page) | Locate one element by role (scoped tree) | Actionable elements in tree |\n|---|---|---|---|---|---|---|\n';
for (const r of rows) {
  if (r.error) { md += `| ${r.page} | error: ${r.error} | | | | |\n`; continue; }
  md += `| [${r.page}](${r.url}) | ${r.screenshot.ms} ms · ~${r.screenshot.tokensPerScreen} tok | ${r.screenshot.screensToSeeWholePage} → ~${r.screenshot.tokensWholePage.toLocaleString('en-US')} tok | ${r.tree.ms} ms · ~${r.tree.tokens.toLocaleString('en-US')} tok | ${r.text.ms} ms · ~${r.text.tokens.toLocaleString('en-US')} tok | ${r.locateOne.target}: ${r.locateOne.ms} ms · ~${r.locateOne.tokens.toLocaleString('en-US')} tok | ${r.tree.actionableElements} |\n`;
}
writeFileSync(new URL('./results.md', import.meta.url), md);
console.log(md);
