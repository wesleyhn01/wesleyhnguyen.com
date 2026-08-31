# Personal site

A two-page portfolio site built with SvelteKit and prerendered to static files.

- `/` for the landing page, short bio, now (learning and goal), current project, and fun fact
- `/project/` for a quick read on the Federal Contract Opportunity Monitor

## Editing your content

Everything you would want to change lives in [`src/lib/content.ts`](src/lib/content.ts). Anything
marked `PLACEHOLDER` is filler: the "currently learning" line, the goal line, and the repository URL
under `project.links`. Replace those strings and both pages update. Name, role, bio, fun fact, and
social links are already filled in, and the project section is already written.

Browser tab titles come from `site.seo.homeTab` and `site.seo.projectTab`. The longer `site.seo.title`
is used for search results and link previews instead.

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

```bash
npm run build     # Vercel output in .vercel/output/
npm run preview   # serve the built output
npm run check     # svelte-check
```

## Deploying

The site deploys to Vercel with `@sveltejs/adapter-vercel`. Every route is prerendered, so Vercel
serves plain HTML; the only serverless function is the catch-all that renders the 404 page.

The runtime is pinned to `nodejs22.x` in `vite.config.ts`. That is deliberate: the adapter only
auto-detects Node 20, 22, and 24, and it fails the build on anything newer. Bump the pin when Vercel
adds a newer runtime, not before.

### Hosting somewhere else

`@sveltejs/adapter-static` is still installed. Swap the import in `vite.config.ts`:

```ts
import adapter from '@sveltejs/adapter-static';
// ...
adapter: adapter({ fallback: '404.html' });
```

That writes a plain `build/` folder for GitHub Pages, Netlify, Cloudflare Pages, or any static host.
Note that `adapter-static` refuses to run on Vercel with any options set, so the two configurations
are mutually exclusive. For GitHub Pages from a project repo (`user.github.io/repo`), also set the
base path:

```ts
kit: {
	paths: { base: '/repo-name' }
}
```

## Design notes

- Palette: white through gray, with one teal to indigo gradient used for accents such as buttons,
  key numbers, and the wash behind each hero. Numbers use a tighter blue to indigo ramp so short
  strings still read as a gradient.
- Type: Geist for body and headings, Geist Mono for labels and data. Both are self-hosted through
  `@fontsource`, so there are no external font requests.
- `src/lib/components/RunStrip.svelte` draws one day of the monitor's 24 hourly runs. It animates
  once on load and renders complete for anyone with reduced motion enabled.
