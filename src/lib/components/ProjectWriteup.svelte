<script lang="ts">
	import { site, type Writeup } from '$lib/content';
	import { reveal } from '$lib/actions/reveal';

	let { writeup }: { writeup: Writeup } = $props();
</script>

<svelte:head>
	<title>{writeup.tab}</title>
	<meta name="description" content={writeup.tagline} />
	<meta property="og:title" content="{writeup.name}, by {site.name}" />
	<meta property="og:description" content={writeup.tagline} />
</svelte:head>

<article>
	<section class="masthead">
		<div class="glow" aria-hidden="true"></div>
		<div class="shell">
			<p class="eyebrow rise" style="--rise-delay: 60ms">{writeup.eyebrow}</p>
			<h1 class="rise" style="--rise-delay: 140ms">{writeup.name}</h1>
			<p class="tagline rise" style="--rise-delay: 220ms">{writeup.tagline}</p>

			<ul class="stack rise" style="--rise-delay: 300ms">
				{#each writeup.stack as tech (tech.name)}
					<li class="chip">{tech.name}</li>
				{/each}
			</ul>
		</div>
	</section>

	<section class="overview">
		<div class="shell">
			<div class="section-head" use:reveal>
				<h2>Overview</h2>
				<span class="trailing">What it does and why</span>
			</div>

			<div class="prose lead" use:reveal={80}>
				{#each writeup.overview as paragraph (paragraph)}
					<p>{paragraph}</p>
				{/each}
			</div>
		</div>
	</section>

	<section class="tech">
		<div class="shell">
			<div class="section-head" use:reveal>
				<h2>Technologies</h2>
				<span class="trailing">And why each one</span>
			</div>

			<dl class="tech-list card" use:reveal={80}>
				{#each writeup.stack as tech (tech.name)}
					<div class="row">
						<dt>{tech.name}</dt>
						<dd>{tech.why}</dd>
					</div>
				{/each}
			</dl>
		</div>
	</section>

	<section class="how">
		<div class="shell">
			<div class="section-head" use:reveal>
				<h2>How it works</h2>
			</div>

			<ol class="steps">
				{#each writeup.how as step, i (step.title)}
					<li class="card lift" use:reveal={i * 70}>
						<span class="num">{String(i + 1).padStart(2, '0')}</span>
						<h3>{step.title}</h3>
						<p>{step.detail}</p>
					</li>
				{/each}
			</ol>
		</div>
	</section>

	<section class="context">
		<div class="shell">
			<div class="section-head" use:reveal>
				<h2>Context</h2>
				<span class="trailing">Background reading</span>
			</div>

			<ul class="links" use:reveal={80}>
				{#each writeup.sources as item (item.href)}
					<li>
						<a href={item.href} target="_blank" rel="noreferrer noopener">
							<span class="label">{item.label}<span class="ext" aria-hidden="true">↗</span></span>
							<span class="note">{item.note}</span>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</section>

	<section class="outro">
		<div class="shell">
			<p class="outro-line" use:reveal>
				Curious about the details? I'm happy to walk through any of it.
			</p>
			<div class="actions" use:reveal={80}>
				<a class="btn btn-primary" href="mailto:{site.links.email}">
					Email me <span class="arrow" aria-hidden="true">→</span>
				</a>
				<a class="btn btn-ghost" href="/#projects">All projects</a>
			</div>
			<p class="repo-note" use:reveal={120}>
				The source for this project lives in a private repository and is available on request.
			</p>
		</div>
	</section>
</article>

<style>
	.masthead {
		position: relative;
		padding-block: clamp(3rem, 8vw, 5rem) clamp(1.5rem, 4vw, 2.5rem);
		overflow: hidden;
	}

	.glow {
		position: absolute;
		inset: -40% -10% auto -10%;
		height: 26rem;
		background:
			radial-gradient(38% 60% at 25% 45%, rgba(45, 212, 191, 0.14), transparent 70%),
			radial-gradient(40% 60% at 65% 35%, rgba(99, 102, 241, 0.14), transparent 70%);
		filter: blur(6px);
		pointer-events: none;
	}

	.masthead .shell {
		position: relative;
	}

	h1 {
		font-size: clamp(2rem, 1.4rem + 3vw, 3.25rem);
		letter-spacing: -0.035em;
		margin: 0.9rem 0 0.85rem;
		max-width: 20ch;
	}

	.tagline {
		font-size: clamp(1rem, 0.95rem + 0.4vw, 1.1875rem);
		color: var(--ink-2);
		max-width: 56ch;
	}

	.stack {
		list-style: none;
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		margin: 1.5rem 0 0;
		padding: 0;
	}

	.lead {
		max-width: 66ch;
	}

	.tech-list {
		margin: 0;
		padding: 0.35rem 1.35rem;
	}

	.tech-list .row {
		display: grid;
		grid-template-columns: 11rem minmax(0, 1fr);
		gap: 1rem;
		padding: 0.85rem 0;
		border-bottom: 1px solid var(--line);
	}

	.tech-list .row:last-child {
		border-bottom: none;
	}

	.tech-list dt {
		font-family: var(--mono);
		font-size: 0.8125rem;
		font-weight: 600;
		color: var(--ink);
	}

	.tech-list dd {
		margin: 0;
		font-size: 0.875rem;
		color: var(--ink-2);
	}

	.steps {
		list-style: none;
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1rem;
		margin: 0;
		padding: 0;
	}

	.steps li {
		padding: 1.2rem 1.3rem 1.35rem;
	}

	.steps .num {
		display: block;
		font-family: var(--mono);
		font-size: 0.75rem;
		font-weight: 600;
		margin-bottom: 0.7rem;
		background: linear-gradient(120deg, #3b82f6, #6366f1);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
	}

	.steps h3 {
		font-size: 1rem;
	}

	.steps p {
		margin-top: 0.5rem;
		font-size: 0.875rem;
		color: var(--ink-2);
	}

	.links {
		list-style: none;
		margin: 0;
		padding: 0;
		border-top: 1px solid var(--line);
	}

	.links a {
		display: grid;
		gap: 0.3rem;
		padding: 1.05rem 0.75rem 1.1rem;
		margin-inline: -0.75rem;
		border-bottom: 1px solid var(--line);
		border-radius: var(--r-sm);
		text-decoration: none;
		transition: background-color 200ms var(--ease);
	}

	.links a:hover {
		background: var(--bg-2);
	}

	.links .label {
		font-size: 0.9375rem;
		font-weight: 500;
		color: var(--ink);
	}

	.links .ext {
		display: inline-block;
		margin-left: 0.45rem;
		font-size: 0.75rem;
		color: var(--ink-3);
		transition: transform 200ms var(--ease);
	}

	.links a:hover .ext {
		transform: translate(2px, -2px);
		color: var(--accent-deep);
	}

	.links .note {
		margin: 0;
		max-width: 72ch;
		font-size: 0.8125rem;
		color: var(--ink-2);
	}

	.outro {
		padding-bottom: calc(var(--step) * 1.2);
	}

	.outro-line {
		font-size: clamp(1.25rem, 1rem + 1.4vw, 1.75rem);
		font-weight: 550;
		letter-spacing: -0.03em;
		line-height: 1.25;
		max-width: 26ch;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 1.75rem;
	}

	.repo-note {
		margin-top: 1.25rem;
		font-size: 0.8125rem;
		color: var(--ink-3);
	}

	@media (max-width: 52rem) {
		.steps {
			grid-template-columns: minmax(0, 1fr);
		}

		.tech-list .row {
			grid-template-columns: minmax(0, 1fr);
			gap: 0.2rem;
		}
	}
</style>
