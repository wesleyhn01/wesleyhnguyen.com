import adapter from '@sveltejs/adapter-vercel';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			// Every route is prerendered, so this ships static HTML to Vercel and keeps
			// the custom 404 page. Swap in adapter-static to host anywhere else.
			//
			// The runtime is pinned because the adapter only auto-detects Node 20, 22,
			// and 24, and local Node is newer than that.
			adapter: adapter({ runtime: 'nodejs22.x' })
		})
	]
});
