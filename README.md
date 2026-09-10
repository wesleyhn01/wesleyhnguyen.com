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

All site copy lives in `src/lib/content.ts`: the home page content, the project cards, and the
project writeups. Each writeup shares one shape (overview, technologies, how it works, sources)
rendered by `src/lib/components/ProjectWriteup.svelte`, so adding a project page means adding an
entry to `writeups` and a thin route that passes it in.

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
