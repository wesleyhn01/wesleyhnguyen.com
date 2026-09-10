<script lang="ts">
	import type { Tradeoffs } from '$lib/projects';
	import { reveal } from '$lib/actions/reveal';

	let { entries }: { entries: Tradeoffs } = $props();
</script>

<section class="tradeoffs">
	<div class="shell">
		<div class="section-head" use:reveal>
			<h2>Tradeoffs</h2>
			<span class="trailing">What it cost and where it breaks</span>
		</div>

		<ul class="entries" role="list">
			{#each entries as entry, i (entry.heading)}
				<li use:reveal={i * 70}>
					<h3>{entry.heading}</h3>
					<p>{entry.detail}</p>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.entries {
		list-style: none;
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1.5rem 2.5rem;
		margin: 0;
		padding: 0;
	}

	.entries li {
		padding-top: 1rem;
		border-top: 1px solid var(--line-2);
	}

	h3 {
		font-size: 1rem;
	}

	p {
		margin-top: 0.5rem;
		font-size: 0.875rem;
		color: var(--ink-2);
		max-width: 48ch;
	}

	@media (max-width: 52rem) {
		.entries {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
