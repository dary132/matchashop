# Kuroha — Matcha shop

A modern, minimalist ecommerce site for single-origin Japanese matcha. Next.js 14 (App Router), TypeScript, Tailwind, Stripe Checkout, Zustand cart with localStorage persistence.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Stripe

Without a Stripe key, checkout falls back to a mocked confirmation redirect — useful for design walkthroughs. To enable real payments, copy `.env.example` to `.env` and set:

```
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

Get a test key from https://dashboard.stripe.com/test/apikeys. The route uses Stripe-hosted Checkout, so no card UI lives in this codebase.

## Structure

- `app/` — App Router pages (home, shop, PDP, cart, confirmation) + `/api/checkout` route
- `components/` — Nav, Footer, ProductCard, ShopGrid, CartView, AddToCart, NewsletterForm, ConfirmationView
- `data/products.json` — eight teas across three grades and three prefectures
- `lib/products.ts` — product lookup helpers + USD formatter
- `lib/cart-store.ts` — Zustand store, persisted to localStorage
- `types/product.ts` — Product and CartLine types

## Catalog

To add or edit teas, modify `data/products.json`. New entries appear in `/shop` immediately; PDP routes are generated via `generateStaticParams`.

## Design tokens

Defined in `tailwind.config.ts`:

- `paper` — warm whites / washi
- `ink` — sumi black + greys + hairline
- `matcha` — 50–900 deep green scale (500 is the brand accent)
- `clay` — earthen accent

Fonts: Cormorant Garamond (serif), Inter (sans), Noto Sans JP (Japanese accents).

## Build

```bash
npm run build && npm start
```
