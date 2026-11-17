// Records short clips of the benchmark pages in a fresh Chrome profile (no logins, no personal tabs).
// Run: node record-demo.mjs <outDir>
// Each clip: page loads, then scrolls; the TodoMVC clip also types into the textbox found by role.
import { chromium } from 'playwright';
import { mkdirSync, renameSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const out = process.argv[2] || './demo-clips';
mkdirSync(out, { recursive: true });
const size = { width: 1280, height: 800 };
const PAGES = [
  ['hn', 'https://news.ycombinator.com/'],
  ['wiki', 'https://en.wikipedia.org/wiki/List_of_countries_and_dependencies_by_population'],
  ['github', 'https://github.com/microsoft/playwright'],
  ['todo', 'https://demo.playwright.dev/todomvc/'],
  ['grid', 'https://www.w3.org/WAI/ARIA/apg/patterns/grid/examples/data-grids/'],
];

const browser = await chromium.launch({ channel: 'chrome' });
const only = process.argv[3] ? process.argv[3].split(',') : null;
for (const [name, url] of PAGES) {
  if (only && !only.includes(name)) continue;
  const dir = join(out, '_tmp_' + name);
  const ctx = await browser.newContext({ viewport: size, recordVideo: { dir, size } });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'commit', timeout: 90000 });
  await page.waitForLoadState('domcontentloaded', { timeout: 90000 }).catch(() => {});
  await page.waitForTimeout(2500);
  if (name === 'todo') {
    const box = page.getByRole('textbox', { name: 'What needs to be done?' });
    await box.click();
    for (const t of ['Read page text first', 'Find one element by role', 'Screenshot last']) {
      await box.pressSequentially(t, { delay: 45 });
      await box.press('Enter');
      await page.waitForTimeout(300);
    }
    await page.waitForTimeout(1200);
  } else {
    for (let i = 0; i < 40; i++) { await page.mouse.wheel(0, 45); await page.waitForTimeout(60); }
    await page.waitForTimeout(800);
  }
  await ctx.close();
  const f = readdirSync(dir).find((x) => x.endsWith('.webm'));
  renameSync(join(dir, f), join(out, name + '.webm'));
  console.log('recorded', name);
}
await browser.close();
