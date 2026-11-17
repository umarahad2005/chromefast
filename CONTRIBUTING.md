# Contributing to ChromeFast

Thanks for helping make AI browser agents faster and safer.

## Good first contributions
- **Recipes** — a pattern that worked on a real web app (add to `skills/chromefast/references/recipes.md`). Keep it generic: no personal account IDs, emails or private URLs.
- **Tool mappings** — the ladder for another browser stack (Browser Use, Stagehand, Selenium, Antigravity's browser agent…) in `tool-map.md`.
- **Benchmarks** — same task with and without ChromeFast: time, tool calls, screenshots. Open an issue with your numbers and setup.

## Rules for changes
- `rules/chromefast-rules.md` is the single source. After editing it, regenerate `AGENTS.md` and `.cursor/rules/chromefast.mdc` (see `CHANGELOG.md` for the command) so they stay in sync.
- Keep the safety section intact. PRs that weaken "ask before irreversible actions" or "never type secrets" will not be merged.
- Keep `SKILL.md` short; put detail in `references/`.

## Pull requests
1. Fork → branch → change → PR.
2. Describe what you tested and with which agent/browser stack.
