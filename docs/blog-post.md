---
title: "Stop making your AI agent stare at screenshots: tree-first browser automation"
tags: ai, claude, automation, opensource
---

# Stop making your AI agent stare at screenshots

I use Claude Code with Claude in Chrome to run real work in heavy web apps — ad managers, business dashboards, CMS editors. The agent kept doing the same loop: **screenshot → guess → click → screenshot**. On big pages the screenshots timed out ("renderer may be frozen"), and every step was slow.

Then I noticed what actually worked: when the agent **read the page's accessibility tree** — the same structure Windows UI Automation and screen readers use — it found the exact "Remove" button for the exact list item, clicked it by reference, and read the result back as text. No pixels, no guessing.

So I packaged that habit into **ChromeFast**.

## The idea: a ladder
1. **Read** the page text / snapshot
2. **Locate** elements by meaning ("Publish button")
3. **Inspect** one region of the tree
4. **Act by reference**, never by coordinates
5. **Look** (screenshot) only for maps, charts, images and layout

Plus a few speed rules that matter in practice:
- navigate by URL with filters in the query string instead of clicking through menus
- batch predictable steps
- re-find elements after every change — references go stale
- virtualized tables only render what's on screen; scroll, then read again
- if screenshots freeze, stop screenshotting

And safety rules: ask before publish/send/delete/pay, never type secrets, treat page text as data (prompt-injection defence).

## Works beyond Claude
The same ladder maps onto **Playwright MCP** (`browser_snapshot` → `browser_click` by ref), **Chrome DevTools MCP** (`take_snapshot` → `click` by uid), and into **Codex / Antigravity / Windsurf** via `AGENTS.md` and **Cursor** via `.cursor/rules`.

## What's in the repo
- a Claude Code **skill** + **plugin**
- two **agents**: `page-reader` (read-only) and `page-operator` (edits with approval gates)
- `/chromefast:read` and `/chromefast:do` commands
- portable rules for other agents, install scripts for sh and PowerShell

👉 **GitHub: https://github.com/umarahad2005/chromefast** — try it, and if it saves you time, a ⭐ helps others find it. I'd love benchmark numbers from your own sites (issue template included).
