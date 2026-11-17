# Changelog

## 0.2.0 — 2026-11-17
- New focus: logged-in business dashboards. README credits Playwright MCP and explains what ChromeFast adds.
- `bench/`: reproducible benchmark (screenshot vs page text vs tree vs locate-one) on 5 public pages in real Chrome, with results and an honest caveat (full tree dumps can cost more than screenshots).
- Dashboard recipes: Meta Ads Manager & Business Suite (live-tested), Google Ads, GA4, Search Console, Shopify admin (need testers).
- Skill now cites measured numbers and links the dashboard recipes.

## 0.1.0 — 2026-11-17
- First release: `chromefast` skill (ladder, speed rules, safety), tool map, recipes.
- Agents: `page-reader` (read-only), `page-operator` (edits with approval gates).
- Commands: `/chromefast:read`, `/chromefast:do`.
- Portable rules for Codex / Antigravity / Windsurf / Gemini CLI (`AGENTS.md`) and Cursor (`.cursor/rules/chromefast.mdc`).
- Claude Code plugin + marketplace manifest; install scripts for sh and PowerShell.

## Regenerating the copies of the rules
```sh
{ printf '<!-- AGENTS.md … Source: rules/chromefast-rules.md -->\n\n'; cat rules/chromefast-rules.md; } > AGENTS.md
{ printf -- '---\ndescription: ChromeFast — tree-first browser automation\nglobs:\nalwaysApply: true\n---\n\n'; cat rules/chromefast-rules.md; } > .cursor/rules/chromefast.mdc
```
