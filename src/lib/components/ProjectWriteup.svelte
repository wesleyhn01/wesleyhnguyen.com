<script lang="ts">
	import { site } from '$lib/content';
	import type { Project } from '$lib/projects';
	import { reveal } from '$lib/actions/reveal';
	import Seo from '$lib/components/Seo.svelte';

	let { project }: { project: Project } = $props();
</script>

<Seo title="{project.shortName} | {site.name}" description={project.tagline} />

<article>
	<section class="masthead">
		<div class="glow" aria-hidden="true"></div>
		<div class="shell">
			<p class="eyebrow rise" style="--rise-delay: 60ms">
				{project.eyebrow ? `${project.status} · ${project.eyebrow}` : project.status}
			</p>
			<h1 class="rise" style="--rise-delay: 140ms">{project.name}</h1>
			<p class="tagline rise" style="--rise-delay: 220ms">{project.tagline}</p>

			<ul class="stack rise" style="--rise-delay: 300ms" role="list">
				{#each project.stack as tech (tech.name)}
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
				{#each project.overview as paragraph (paragraph)}
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
				{#each project.stack as tech (tech.name)}
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

			<ol class="steps" role="list">
				{#each project.how as step, i (step.title)}
					<li class="card lift" use:reveal={i * 70}>
						<span class="num">{String(i + 1).padStart(2, '0')}</span>
						<h3>{step.title}</h3>
						<p>{step.detail}</p>
					</li>
				{/each}
			</ol>

			{#if project.image}
				<figure class="shot" use:reveal={80}>
					<div class="shot-frame card">
						<img
							src={project.image.src}
							width={project.image.width}
							height={project.image.height}
							alt={project.image.alt}
							loading="lazy"
						/>
					</div>
					<figcaption>{project.image.caption}</figcaption>
				</figure>
			{/if}
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

			<div class="references" use:reveal={160}>
				<p class="eyebrow">References</p>
				<ul role="list">
					{#each project.references as item (item.href)}
						<li>
							<a href={item.href} target="_blank" rel="noreferrer noopener">
								{item.label}<span class="ext" aria-hidden="true">↗</span>
							</a>
						</li>
					{/each}
				</ul>
			</div>
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
		background: linear-gradient(120deg, #2563eb, #4f46e5);
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

	.shot {
		margin: 1.75rem 0 0;
	}

	.shot-frame {
		max-width: 34rem;
		overflow: hidden;
		background: #1a1a1e;
	}

	.shot-frame img {
		display: block;
		width: 100%;
		height: auto;
	}

	.shot figcaption {
		margin-top: 0.85rem;
		font-size: 0.8125rem;
		color: var(--ink-3);
		max-width: 60ch;
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

	.references {
		margin-top: 2.5rem;
		padding-top: 1.25rem;
		border-top: 1px solid var(--line);
	}

	.references ul {
		list-style: none;
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem 1.5rem;
		margin: 0.6rem 0 0;
		padding: 0;
	}

	.references a {
		font-size: 0.8125rem;
		color: var(--ink-2);
		text-decoration: none;
		transition: color 200ms var(--ease);
	}

	.references a:hover {
		color: var(--accent-deep);
	}

	.references .ext {
		display: inline-block;
		margin-left: 0.3rem;
		font-size: 0.7rem;
		color: var(--ink-3);
		transition: transform 200ms var(--ease);
	}

	.references a:hover .ext {
		transform: translate(2px, -2px);
		color: var(--accent-deep);
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
