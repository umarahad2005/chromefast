---
title: "I let my AI agent run our Meta Ads Manager. Screenshots kept freezing — page text didn't."
tags: ai, claude, marketing, opensource
---

# I let my AI agent run our Meta Ads Manager. Screenshots kept freezing — page text didn't.

I run ads for a small travel business. I started using Claude Code with Claude in Chrome to do real work inside **our logged-in Meta Ads Manager**: read results by date, split location targeting between two ad sets, publish, and collect the ad post links for our team.

The usual agent loop is *screenshot → guess → click → screenshot*. On Ads Manager's heavy editor, the screenshot call **timed out at 30 seconds six times** in one session. What kept working was reading the page as **text** and the **accessibility tree** — the same structure screen readers and Windows UI Automation use. The agent found "Remove button for <place>" by name, clicked it by reference, read the list back as text, and published.

So I packaged that habit into **ChromeFast**.

## Not a new idea — a new focus
Reading the accessibility tree isn't new: Microsoft's **Playwright MCP** is built on accessibility snapshots. ChromeFast builds on that idea for a specific job: **your real logged-in browser and business dashboards**, with one rule set that works in Claude Code, Codex, Cursor and Antigravity, plus safety gates before anything that spends money or publishes.

## The numbers (reproducible)
I benchmarked 5 public pages in real Chrome:
- Reading the **whole page as text** cost **2.6×–37× fewer tokens** than the screenshots needed to see it, and was **5.6×–27× faster** to capture than a single screenshot.
- **Locating one button** by role/name cost **~9–470 tokens**, versus ~1,366 for every screenshot.
- Honest surprise: dumping the **full tree** can cost *more* than a screenshot (10k–70k tokens on big pages). So the rule is **text first, then a scoped find — never the whole tree.**

## What's in the repo
- Claude Code **skill + plugin**, `page-reader` and `page-operator` agents, `/chromefast:read` and `/chromefast:do`
- **Dashboard recipes**: Meta Ads Manager (live-tested), Google Ads, GA4, Search Console, Shopify admin (testers wanted)
- `AGENTS.md` for Codex/Antigravity/Windsurf, Cursor rules, installers
- the benchmark, so you can check the numbers yourself

👉 **https://github.com/umarahad2005/chromefast** — if it saves you time, a ⭐ helps others find it. And if you can test a 🧪 recipe on your own dashboard, I'd love a PR.
