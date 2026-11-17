# Recipe: Shopify admin

**Status: 🧪 not yet live-tested** — please confirm and send fixes.

## URLs
| Need | URL pattern |
|---|---|
| Orders | `https://admin.shopify.com/store/<STORE_HANDLE>/orders` |
| One order | `…/orders/<ORDER_ID>` |
| Products | `…/products` · one product `…/products/<PRODUCT_ID>` |
| Analytics | `…/analytics` |
| Customers | `…/customers` |

## Read
1. `get_page_text` on Orders → order number, date, customer, total, payment and fulfilment status.
2. Use the search box (`find "Search orders"` → `form_input`) instead of scrolling long lists.
3. Analytics cards: read the numbers as text; charts are visual only.

## Edit (always ask before saving)
- Product price/stock: `find "Price"` → `form_input` → read back → **ask before Save**.
- Never refund, cancel, capture payment, or fulfil without explicit user approval of that exact order and amount.

## Gotchas
- Customer data is personal: don't paste names/emails/phones into other tools or URLs.
- Test orders in development stores are fine to explore; live stores — read-only by default.
