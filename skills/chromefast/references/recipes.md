# Recipes

## 1. Read a dashboard number (no screenshot)
```
browser_batch:
  navigate  <dashboard URL with date/filter params>
  wait 5
  get_page_text
```
Quote the values with the date range. If the value is missing from the text, the table is virtualized → recipe 2.

## 2. Virtualized table (only visible rows/columns render)
1. `find` "horizontal scrollbar of the results table" (or the table container).
2. `computer left_click_drag` the scrollbar to the right in steps; after each step `get_page_text` (or a `zoom` on the row if the text is not exposed).
3. Merge the columns you read. State which ones you could not see.

## 3. Remove / edit items in a list (refs go stale)
```
find "Remove button for <item A>"  → click
find "Remove button for <item B>"  → click      # re-find every time
read_page ref_id=<list>             → verify the remaining items
```

## 4. Fill a form
1. `read_page filter:"interactive"` on the form container → get refs for each field.
2. `form_input` each field by ref.
3. Read the form back with `read_page` to verify.
4. **Ask the user before clicking Submit.**

## 5. Multi-step editors (ad managers, CMS, settings panels)
- Open the editor by direct URL when one exists (IDs in the query string).
- Expand a section with `find` → click; then `find` inside it.
- After saving, read the status text ("Processing", "Unpublished edits", "Active") with `get_page_text` instead of a screenshot.
- Any "Publish", "Save & apply", budget or billing step → ask first.

## 6. When to screenshot
- A map pin, chart, thumbnail or video frame must be checked.
- You need to confirm visual layout (cropping, overlap).
- `find` and `read_page` failed twice on the same control.
Use `scale: 0.5–0.7` or `zoom` on the region of interest.

## 7. Get the shareable link of something
Open its detail page and read the URL from the tab context (or from a "View on …" / "Copy link" control) instead of screenshotting the address bar.
