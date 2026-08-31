<script lang="ts">
	import { onMount } from 'svelte';

	/**
	 * One day of the monitor's schedule: 24 hourly runs, left to right.
	 * Most runs find nothing new, which is what the deduplication stage buys,
	 * so only a few cells resolve to a match.
	 */
	const MATCH_HOURS = [3, 9, 10, 16, 21];
	const HOURS = 24;

	let fired = $state(0);
	let done = $state(false);

	const matched = $derived(MATCH_HOURS.filter((h) => h < fired).length);

	onMount(() => {
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduced) {
			fired = HOURS;
			done = true;
			return;
		}

		let timer: ReturnType<typeof setTimeout>;
		const tick = () => {
			if (fired >= HOURS) {
				done = true;
				return;
			}
			fired += 1;
			timer = setTimeout(tick, MATCH_HOURS.includes(fired - 1) ? 240 : 68);
		};
		timer = setTimeout(tick, 350);
		return () => clearTimeout(timer);
	});

	function cellState(hour: number) {
		if (hour >= fired) return 'pending';
		return MATCH_HOURS.includes(hour) ? 'match' : 'clear';
	}
</script>

<figure class="strip card">
	<header>
		<p class="eyebrow">A day of runs</p>
		<p class="counter"><span class="num grad-num">{matched}</span> new</p>
	</header>

	<div
		class="cells"
		role="img"
		aria-label="24 hourly checks in a day, 5 of which surfaced a new opportunity."
	>
		{#each Array(HOURS) as _, hour (hour)}
			<span class="cell {cellState(hour)}" class:now={hour === fired - 1 && !done}></span>
		{/each}
	</div>

	<div class="axis" aria-hidden="true">
		<span>00:00</span>
		<span>12:00</span>
		<span>23:00</span>
	</div>

	<figcaption>
		<span class="legend"><span class="key clear"></span>checked, nothing new</span>
		<span class="legend"><span class="key match"></span>new opportunity, alerted once</span>
	</figcaption>
</figure>

<style>
	.strip {
		margin: 0;
		padding: 1.1rem 1.2rem 1rem;
	}

	header {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 0.9rem;
	}

	.counter {
		font-family: var(--mono);
		font-size: var(--label);
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--ink-3);
	}

	.counter .num {
		font-size: 0.8125rem;
		font-weight: 600;
	}

	.cells {
		display: grid;
		grid-template-columns: repeat(24, 1fr);
		gap: 3px;
		height: 3.25rem;
	}

	.cell {
		border-radius: 3px;
		background: var(--bg-3);
		position: relative;
		overflow: hidden;
	}

	.cell::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: 3px;
		transform: scaleY(0);
		transform-origin: bottom;
		transition: transform 260ms var(--ease);
	}

	.cell.clear::after {
		background: #d6d6dc;
		transform: scaleY(0.32);
	}

	.cell.match::after {
		background: var(--grad);
		transform: scaleY(1);
	}

	.cell.now {
		box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.35);
	}

	.axis {
		display: flex;
		justify-content: space-between;
		margin-top: 0.5rem;
		font-family: var(--mono);
		font-size: 0.625rem;
		color: var(--ink-3);
	}

	figcaption {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem 1rem;
		margin-top: 0.9rem;
		padding-top: 0.8rem;
		border-top: 1px solid var(--line);
		font-family: var(--mono);
		font-size: 0.625rem;
		color: var(--ink-3);
	}

	.legend {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		white-space: nowrap;
	}

	.key {
		display: inline-block;
		width: 0.65rem;
		height: 0.65rem;
		border-radius: 3px;
		flex: none;
	}

	.key.clear {
		background: #d6d6dc;
	}

	.key.match {
		background: var(--grad);
	}

	@media (max-width: 34rem) {
		.cells {
			height: 2.75rem;
			gap: 2px;
		}
	}
</style>
