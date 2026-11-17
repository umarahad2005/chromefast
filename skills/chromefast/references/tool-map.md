# Tool map — the same ladder on every browser stack

| Rung | Claude in Chrome | Playwright MCP | Chrome DevTools MCP | Plain Playwright / Puppeteer code |
|---|---|---|---|---|
| Read text | `get_page_text` | `browser_snapshot` (text is in the snapshot) | `take_snapshot` | `page.innerText('body')`, `locator.allInnerTexts()` |
| Locate by meaning | `find` | pick a `ref` from `browser_snapshot` | pick a `uid` from `take_snapshot` | `page.getByRole('button', { name: 'Publish' })` |
| Inspect a region | `read_page` + `ref_id` | `browser_snapshot` | `take_snapshot` | `page.accessibility.snapshot({ root })` / `ariaSnapshot()` |
| Act by reference | `computer` + `ref`, `form_input` | `browser_click`, `browser_type`, `browser_select_option` (with `ref`) | `click`, `fill`, `fill_form` (with `uid`) | `locator.click()`, `locator.fill()` |
| Batch | `browser_batch` | sequential calls; keep them few | sequential calls; keep them few | one script |
| Look | `screenshot` (`scale`), `zoom` | `browser_take_screenshot` | `take_screenshot` | `page.screenshot({ clip })` |

## Writing code instead of driving a browser?
Prefer role-based locators (`getByRole`, `getByLabel`, `getByText`) over CSS/XPath and over coordinates. They read the same accessibility tree, so they survive layout changes.

## Antigravity, Cursor, Windsurf, Gemini CLI, Codex
These agents ship their own browser tools or use one of the MCP servers above. The rule is the same: **snapshot / accessibility tree → act by ref → screenshot last**. Paste `rules/chromefast-rules.md` into the agent's rules or `AGENTS.md`.
