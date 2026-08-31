<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>WN {page.status}</title>
</svelte:head>

<section>
	<div class="shell">
		<p class="eyebrow">Error {page.status}</p>
		<h1>Nothing at this address.</h1>
		<p class="prose">{page.error?.message ?? 'The page you asked for is not here.'}</p>
		<div class="actions">
			<a class="btn btn-primary" href="/">
				Back home <span class="arrow" aria-hidden="true">→</span>
			</a>
			<a class="btn btn-ghost" href="/project/">Current project</a>
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
