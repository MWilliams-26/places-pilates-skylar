# Places Pilates: website mockup (Phase 1)

A responsive React + Vite concept site for Places Pilates (Skylar Soehner). Booking is a **prototype**: nothing is reserved and no payment is processed.

- Research, audit, platform comparison, strategy, discovery questions, roadmap: [`docs/RESEARCH.md`](docs/RESEARCH.md)
- Image and brand asset sources and licensing: [`docs/ASSETS.md`](docs/ASSETS.md)

## Develop

```sh
pnpm install
pnpm dev
pnpm build        # type-check and build to dist/
```

## Deploy a Cloudflare preview

`wrangler.jsonc` serves `dist/` as static assets with single-page-app fallback.

```sh
pnpm build
npx wrangler versions upload   # preview URL, does not change production
```

## Where things live

- `src/content.ts`: copy, class formats, provisional prices, feature switches (`features.studioInNav`)
- `src/booking/provider.ts`: switches the Schedule page from the prototype to a platform embed or link in Phase 2
- `src/pages/`: Home, About, Classes, Book (Schedule), Pricing, Community, Contact, Studio (preview at `/studio`)
- `src/styles/`: brand tokens (`theme.css`) and site styles (`site.css`)
- Engineering components (form fields, radio cards, chips, accordion, header with mobile menu, skip link) come from the pinned `@mwilliams/ui` package in `vendor/`
