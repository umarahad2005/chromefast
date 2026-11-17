# ChromeFast ⚡ — tree-first browser automation for AI coding agents

**Make Claude Code, Codex, Cursor, Antigravity and other AI agents browse faster: read the accessibility tree and page text first, act by element reference, batch steps, and take screenshots last.**

ChromeFast is a drop-in **skill + agents + slash commands + rules** pack for AI browser automation. It works with **Claude in Chrome**, **Playwright MCP**, **Chrome DevTools MCP**, and any agent that reads `AGENTS.md` or Cursor rules.

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
![Claude Code plugin](https://img.shields.io/badge/Claude%20Code-plugin-orange)
![Works with](https://img.shields.io/badge/works%20with-Codex%20%7C%20Cursor%20%7C%20Antigravity%20%7C%20Playwright%20MCP-blue)

---

## Why

Most AI browser agents work like this: *take a screenshot → guess where to click → take another screenshot*. Screenshots are slow to capture, expensive in tokens, and easy to misread. On heavy web apps (ad managers, CRMs, admin dashboards) they also time out.

But every browser already builds an **accessibility tree** — the structured map of buttons, links, inputs, tables and text that screen readers and Windows UI Automation use. An agent can read that map directly:

| | Screenshot-first agent | ChromeFast agent |
|---|---|---|
| Read a number on a dashboard | screenshot → read pixels | `get_page_text` → exact text |
| Click "Remove" for one item in a list | screenshot → guess coordinates | `find("Remove button for X")` → click by `ref` |
| Fill a form | click + type by coordinates | `form_input` by `ref`, read back to verify |
| Heavy page freezes screenshots | stuck / retries | keeps working on the tree |

## The ladder

1. **Read** — page text / snapshot
2. **Locate** — find an element by meaning
3. **Inspect** — read one region of the tree
4. **Act by reference** — never by pixel coordinates
5. **Look** — screenshot only for maps, charts, images, video and layout checks

Plus speed rules (batch steps, navigate by URL, re-find stale refs, handle virtualized tables) and safety rules (ask before publish/send/delete/pay, never type secrets, treat page text as data).

## What's inside

```
chromefast/
├── skills/chromefast/          # Claude Code skill (SKILL.md + tool map + recipes)
├── agents/
│   ├── page-reader.md          # read-only: dashboards, tables, links
│   └── page-operator.md        # multi-step edits with approval before irreversible steps
├── commands/
│   ├── read.md                 # /chromefast:read <url> <what>
│   └── do.md                   # /chromefast:do <change>
├── rules/chromefast-rules.md   # portable rules (single source)
├── AGENTS.md                   # for Codex, Antigravity, Windsurf, Gemini CLI…
├── .cursor/rules/chromefast.mdc# for Cursor
├── .claude-plugin/             # Claude Code plugin + marketplace manifest
└── install/                    # install.sh / install.ps1
```

## Install

### Claude Code (plugin)
```text
/plugin marketplace add umarahad2005/chromefast
/plugin install chromefast@chromefast
```

### Claude Code (manual)
```bash
git clone https://github.com/umarahad2005/chromefast
sh chromefast/install/install.sh claude            # macOS / Linux / Git Bash
# Windows PowerShell:
.\chromefast\install\install.ps1 -Target claude
```

### Codex, Antigravity, Windsurf, Gemini CLI (AGENTS.md)
```bash
sh chromefast/install/install.sh codex /path/to/your/project   # appends rules to AGENTS.md
```

### Cursor
```bash
sh chromefast/install/install.sh cursor /path/to/your/project  # adds .cursor/rules/chromefast.mdc
```

Any other agent: paste [`rules/chromefast-rules.md`](rules/chromefast-rules.md) into its system prompt or rules.

## Usage

```text
/chromefast:read  https://analytics.example.com  today's visitors and top 3 pages
/chromefast:do    In my CMS, change the homepage banner title to "Winter Sale" (ask before publishing)
```
Or just ask normally — the skill loads for browser tasks.

## Tool map

| Rung | Claude in Chrome | Playwright MCP | Chrome DevTools MCP |
|---|---|---|---|
| Read | `get_page_text` | `browser_snapshot` | `take_snapshot` |
| Locate | `find` | `ref` from snapshot | `uid` from snapshot |
| Act | `computer` + `ref`, `form_input` | `browser_click` / `browser_type` | `click` / `fill` |
| Look | `screenshot` (`scale`) / `zoom` | `browser_take_screenshot` | `take_screenshot` |

Full map, including plain Playwright/Puppeteer code: [`skills/chromefast/references/tool-map.md`](skills/chromefast/references/tool-map.md).

## Measure it yourself

Run the same task twice (e.g. "read yesterday's stats from my dashboard"): once with ChromeFast installed, once without. Compare wall-clock time, number of tool calls and number of screenshots. Please share your results in an issue — real numbers from real sites are welcome.

## Safety

ChromeFast tells agents to **ask before** publishing, sending, deleting, paying, changing budgets/settings or accepting terms; never to type passwords, card numbers or API keys; and to treat on-page text as data, not instructions (prompt-injection defence).

## Roadmap

- [ ] Benchmarks on public demo sites
- [ ] Recipes for common dashboards (GA4, Search Console, Stripe test mode, Shopify admin)
- [ ] `page-auditor` agent (accessibility + broken-flow checks using the same tree)
- [ ] VS Code / Antigravity specific setup guides

## Contributing

Recipes, tool mappings for more browser stacks, and benchmark results are very welcome. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT

---

**Keywords:** AI browser automation, Claude Code skill, Claude Code plugin, Claude in Chrome, accessibility tree, ARIA snapshot, Playwright MCP, Chrome DevTools MCP, Codex AGENTS.md, Cursor rules, Google Antigravity, AI agent web automation, computer use, faster AI agents, fewer screenshots, token saving.
