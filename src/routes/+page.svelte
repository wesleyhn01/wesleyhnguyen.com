<script lang="ts">
	import { site, project } from '$lib/content';
	import { reveal } from '$lib/actions/reveal';
</script>

<svelte:head>
	<title>{site.seo.homeTab}</title>
	<meta name="description" content={site.seo.description} />
	<meta property="og:title" content={site.seo.title} />
	<meta property="og:description" content={site.seo.description} />
</svelte:head>

<section class="hero">
	<div class="glow" aria-hidden="true"></div>
	<div class="shell">
		<p class="role rise" style="--rise-delay: 60ms">
			<span class="dot" aria-hidden="true"></span>{site.role}
		</p>
		<h1 class="rise" style="--rise-delay: 140ms">{site.name}</h1>
		<p class="thesis rise" style="--rise-delay: 220ms">{site.thesis}</p>
		<div class="actions rise" style="--rise-delay: 300ms">
			<a class="btn btn-primary" href="mailto:{site.links.email}">
				Get in touch <span class="arrow" aria-hidden="true">→</span>
			</a>
			<a class="btn btn-ghost" href="/project/">See what I'm building</a>
		</div>
	</div>
</section>

<section class="about">
	<div class="shell">
		<div class="section-head" use:reveal>
			<h2>About</h2>
		</div>

		<div class="about-grid" use:reveal={80}>
			<div class="prose">
				{#each site.bio as paragraph (paragraph)}
					<p>{paragraph}</p>
				{/each}
			</div>

			<dl class="facts card">
				{#each site.ledger as row (row.label)}
					<div class="row">
						<dt>{row.label}</dt>
						<dd>{row.value}</dd>
					</div>
				{/each}
			</dl>
		</div>
	</div>
</section>

<section class="now">
	<div class="shell">
		<div class="section-head" use:reveal>
			<h2>Now</h2>
			<span class="trailing">Updated as it changes</span>
		</div>

		<div class="card now-card lift" use:reveal={80}>
			<div class="cell">
				<p class="eyebrow">Currently learning</p>
				<p class="line">{site.learning}</p>
			</div>
			<div class="cell">
				<p class="eyebrow">Working toward</p>
				<p class="line">{site.goal}</p>
			</div>
		</div>
	</div>
</section>

<section class="project">
	<div class="shell">
		<div class="section-head" use:reveal>
			<h2>Current Project</h2>
			<span class="trailing">Running daily</span>
		</div>

		<div class="card project-card lift" use:reveal={80}>
			<div class="top">
				<h3>{project.name}</h3>
				<p class="prose">{project.summary}</p>
			</div>

			<ul class="metrics">
				{#each project.metrics as metric (metric.label)}
					<li>
						<span class="value grad-num">{metric.value}</span>
						<span class="metric-label">{metric.label}</span>
					</li>
				{/each}
			</ul>

			<div class="bottom">
				<ul class="stack">
					{#each project.stack as tech (tech)}
						<li class="chip">{tech}</li>
					{/each}
				</ul>
				<a class="link" href="/project/">
					How it works <span class="arrow" aria-hidden="true">→</span>
				</a>
			</div>
		</div>
	</div>
</section>

<section class="fun">
	<div class="shell">
		<div class="fact" use:reveal>
			<p class="eyebrow">Fun fact</p>
			<p class="fact-line">
				{site.funFact.lead}
				<span class="grad-text">{site.funFact.emphasis}</span>
				{site.funFact.tail}
			</p>
		</div>
	</div>
</section>

<style>
	/* Hero ------------------------------------------------------------ */

	.hero {
		position: relative;
		padding-block: clamp(3.5rem, 9vw, 6.5rem) clamp(2rem, 4vw, 3.25rem);
		overflow: hidden;
	}

	.glow {
		position: absolute;
		inset: -35% -10% auto -10%;
		height: 30rem;
		background:
			radial-gradient(38% 60% at 22% 45%, rgba(45, 212, 191, 0.16), transparent 70%),
			radial-gradient(40% 60% at 62% 35%, rgba(99, 102, 241, 0.16), transparent 70%);
		filter: blur(6px);
		pointer-events: none;
	}

	.hero .shell {
		position: relative;
	}

	.role {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		font-family: var(--mono);
		font-size: var(--label);
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--ink-2);
		background: var(--bg);
		border: 1px solid var(--line-2);
		border-radius: 999px;
		padding: 0.35rem 0.8rem;
		box-shadow: var(--shadow-sm);
	}

	.dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--grad);
	}

	h1 {
		font-size: clamp(2.75rem, 1.9rem + 4.4vw, 4.75rem);
		letter-spacing: -0.04em;
		font-weight: 600;
		margin: 1.35rem 0 1rem;
	}

	.thesis {
		font-size: clamp(1.0625rem, 1rem + 0.5vw, 1.3125rem);
		line-height: 1.45;
		color: var(--ink-2);
		max-width: 36ch;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 2rem;
	}

	/* About ----------------------------------------------------------- */

	.about-grid {
		display: grid;
		grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
		gap: clamp(1.5rem, 4vw, 3rem);
		align-items: start;
	}

	.facts {
		margin: 0;
		padding: 0.35rem 1.15rem;
	}

	.facts .row {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 1rem;
		padding: 0.75rem 0;
		border-bottom: 1px solid var(--line);
	}

	.facts .row:last-child {
		border-bottom: none;
	}

	.facts dt {
		font-family: var(--mono);
		font-size: var(--label);
		letter-spacing: 0.06em;
		color: var(--ink-3);
		white-space: nowrap;
	}

	.facts dd {
		margin: 0;
		font-size: 0.8125rem;
		text-align: right;
		color: var(--ink);
	}

	/* Now ------------------------------------------------------------- */

	.now-card {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	.now-card .cell {
		padding: 1.35rem 1.5rem 1.45rem;
		position: relative;
	}

	.now-card .cell + .cell {
		border-left: 1px solid var(--line);
	}

	.now-card .eyebrow::before {
		content: '';
		display: inline-block;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		margin-right: 0.5rem;
		vertical-align: 1px;
		background: var(--grad);
	}

	.now-card .line {
		margin-top: 0.6rem;
		font-size: 1.0625rem;
		font-weight: 500;
		letter-spacing: -0.015em;
		color: var(--ink);
		text-wrap: pretty;
	}

	/* Project --------------------------------------------------------- */

	.project-card {
		padding: 1.5rem 1.5rem 1.35rem;
		display: grid;
		gap: 1.35rem;
	}

	.project-card h3 {
		font-size: clamp(1.125rem, 1rem + 0.7vw, 1.375rem);
	}

	.project-card .prose {
		margin-top: 0.6rem;
		font-size: 0.9375rem;
	}

	.metrics {
		list-style: none;
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 0.75rem;
		margin: 0;
		padding: 1.15rem 0;
		border-block: 1px solid var(--line);
	}

	.metrics .value {
		display: block;
		font-size: clamp(1.35rem, 1.1rem + 1vw, 1.75rem);
		font-weight: 600;
		letter-spacing: -0.03em;
		line-height: 1.1;
	}

	.metrics .metric-label {
		font-size: 0.75rem;
		color: var(--ink-3);
	}

	.bottom {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}

	.stack {
		list-style: none;
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		margin: 0;
		padding: 0;
	}

	/* Fun fact -------------------------------------------------------- */

	.fun {
		padding-bottom: calc(var(--step) * 1.2);
	}

	.fact {
		border-radius: var(--r-lg);
		padding: clamp(1.5rem, 4vw, 2.25rem);
		background: var(--grad-soft), var(--bg-2);
		border: 1px solid var(--line);
	}

	.fact-line {
		margin-top: 0.75rem;
		font-size: clamp(1.125rem, 1rem + 1.1vw, 1.6rem);
		font-weight: 550;
		line-height: 1.3;
		letter-spacing: -0.025em;
		max-width: 30ch;
	}

	/* Responsive ------------------------------------------------------ */

	@media (max-width: 52rem) {
		.about-grid,
		.now-card {
			grid-template-columns: minmax(0, 1fr);
		}

		.now-card .cell + .cell {
			border-left: none;
			border-top: 1px solid var(--line);
		}

		.metrics {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 1.15rem 0.75rem;
		}
	}

	@media (max-width: 30rem) {
		.facts .row {
			flex-direction: column;
			gap: 0.15rem;
		}

		.facts dd {
			text-align: left;
		}
	}
</style>
