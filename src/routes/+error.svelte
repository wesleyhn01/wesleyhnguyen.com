<script lang="ts">
	import { page } from '$app/state';
	import { site } from '$lib/content';
	import Seo from '$lib/components/Seo.svelte';

	const heading = $derived(page.status === 404 ? 'Page not found' : `Error ${page.status}`);
	const message = $derived(page.error?.message ?? 'The page you asked for is not here.');
</script>

<Seo title="{heading} | {site.name}" description={message} noindex />

<section>
	<div class="shell">
		<p class="eyebrow">Error {page.status}</p>
		<h1>Nothing at this address.</h1>
		<p class="prose">{message}</p>
		<div class="actions">
			<a class="btn btn-primary" href="/">
				Back home <span class="arrow" aria-hidden="true">→</span>
			</a>
			<a class="btn btn-ghost" href="/#projects">Projects</a>
		</div>
	</div>
</section>

<style>
	section {
		padding-block: clamp(4rem, 12vw, 9rem) calc(var(--step) * 1.2);
	}

	h1 {
		font-size: clamp(2rem, 1.2rem + 3.6vw, 3.4rem);
		margin: 1.25rem 0 1rem;
		max-width: 18ch;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.75rem;
		margin-top: 2rem;
	}
</style>
