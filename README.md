# wesleyhnguyen.com

Personal portfolio site built with SvelteKit and prerendered to static files.

- `/`: bio, current focus, and project index
- `/project/contract-monitor/`: Federal Contract Opportunity Monitor
- `/project/sast/`: SAST Vulnerability Management Platform
- `/project/reverse-split/`: Reverse Split Arbitrage Bot
- `/project/`: permanent redirect to `/project/contract-monitor/`

Every URL ends in a trailing slash. Requests without one receive a permanent redirect to the
slashed form.

## Structure

Home page copy lives in `src/lib/content.ts`. Each project has one data file in
`src/lib/projects/`, typed as `Project` in `src/lib/projects/types.ts`, and both the home page card
and the project page read from that file, so the two cannot disagree. The `status` field accepts
only `Shipped`, `In progress`, or `Archived`, and `tradeoffs` accepts two to four entries; any
other value fails `npm run check`.

Adding a project means creating its data file, adding it to the ordered list in
`src/lib/projects/index.ts`, and creating a route under `src/routes/project/<slug>/` that passes
the project into `src/lib/components/ProjectWriteup.svelte`.

Every page renders its head tags through `src/lib/components/Seo.svelte`. It takes a title and
description, defaults the share image to `static/og.png`, and derives the canonical URL and
`og:url` from the current path. Page titles follow the pattern `Page Name | Wesley Nguyen`, and
the `og:title` always matches the title.

## Development

```bash
npm install
npm run dev
```

```bash
npm run build     # Vercel output in .vercel/output/
npm run preview   # serve the built output
npm run check     # svelte-check
```

## Deployment

Deploys to Vercel with `@sveltejs/adapter-vercel`. Every route is prerendered, so Vercel serves
plain HTML; the only serverless function is the catch-all rendering the 404 page.

The runtime is pinned to `nodejs22.x` in `vite.config.ts` because the adapter only auto-detects
Node 20, 22, and 24, and fails the build on anything newer.

To host elsewhere, swap in `@sveltejs/adapter-static` (already installed) in `vite.config.ts`:

```ts
import adapter from '@sveltejs/adapter-static';

adapter: adapter({ fallback: '404.html' });
```

That writes a plain `build/` folder for GitHub Pages, Netlify, Cloudflare Pages, or any static
host. The two adapters are mutually exclusive on Vercel.

## Design

- White-through-gray palette with one teal-to-indigo gradient for accents
- Geist and Geist Mono, self-hosted through `@fontsource`, so no external font requests
- Scroll-reveal animations that respect `prefers-reduced-motion` and never hide content when
  JavaScript is off
