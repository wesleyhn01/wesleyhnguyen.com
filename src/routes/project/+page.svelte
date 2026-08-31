<script lang="ts">
	import RunStrip from '$lib/components/RunStrip.svelte';
	import { site, project } from '$lib/content';
	import { reveal } from '$lib/actions/reveal';

	const perRun = Math.floor(1000 / 24);
</script>

<svelte:head>
	<title>{site.seo.projectTab}</title>
	<meta name="description" content={project.tagline} />
	<meta property="og:title" content="{project.name}, by {site.name}" />
	<meta property="og:description" content={project.tagline} />
</svelte:head>

<article>
	<section class="masthead">
		<div class="glow" aria-hidden="true"></div>
		<div class="shell">
			<p class="eyebrow rise" style="--rise-delay: 60ms">Current project · Built for a friend</p>
			<h1 class="rise" style="--rise-delay: 140ms">{project.name}</h1>
			<p class="tagline rise" style="--rise-delay: 220ms">{project.tagline}</p>

			<ul class="stack rise" style="--rise-delay: 300ms">
				{#each project.stack as tech (tech)}
					<li class="chip">{tech}</li>
				{/each}
			</ul>
		</div>
	</section>

	<section class="why">
		<div class="shell">
			<div class="section-head" use:reveal>
				<h2>The problem</h2>
				<span class="trailing">Why it exists</span>
			</div>

			<div class="prose lead" use:reveal={80}>
				<p>
					A close friend of mine is getting into contracting. He's good at the work, but he's one
					person going up against firms with a full capture team whose entire job is watching for
					the next opportunity. A small shop rarely loses on capability. It loses on timing, because
					somebody has to notice the right posting on the day it goes up, and that somebody already
					has a day job.
				</p>
				<p>
					Federal contract opportunities are published in the open, all day, every day. That sounds
					like a solved problem, and it isn't. The volume is high, the notices that matter look
					exactly like the ones that don't, and response windows are short enough that reading
					Thursday's feed about a Monday posting is the same as never reading it at all.
				</p>
				<p>
					There's an industry built on fixing this. It sells dashboards to firms that can absorb a
					<strong>$2,000 to $15,000</strong> annual subscription, which quietly leaves out the small
					shops that need a single good lead the most. Nobody builds the cheap version, because
					there's no money in it. So I built the cheap version: not a platform and not a product,
					just a scheduled script that reads the feed, decides what's worth knowing about, and stays
					quiet otherwise. It has no users to bill, no server to pay for, and no roadmap. It just
					runs.
				</p>
			</div>

			<ul class="facts" use:reveal={120}>
				{#each project.metrics as metric (metric.label)}
					<li>
						<span class="value grad-num">{metric.value}</span>
						<span class="metric-label">{metric.label}</span>
					</li>
				{/each}
			</ul>
		</div>
	</section>

	<section class="constraint">
		<div class="shell">
			<div class="section-head" use:reveal>
				<h2>What made it hard</h2>
				<span class="trailing">Free has a budget</span>
			</div>

			<div class="constraint-grid" use:reveal={80}>
				<div class="prose">
					<p>
						Free is a design constraint, not a discount. Without a server there's nowhere to keep
						state between runs. Without a database there's nothing to remember what has already
						been reported. And the API allows <strong>1,000 requests a day</strong>, so checking
						hourly leaves about {perRun} per run, which pagination and detail lookups burn through
						quickly.
					</p>
					<p>
						Spend that budget early and the monitor goes dark for the rest of the day. A watcher
						that stops watching without telling anyone is worse than no watcher at all, so every
						decision below exists to keep requests in reserve and keep each run independent of the
						last.
					</p>
				</div>

				<div class="card budget lift">
					<p class="eyebrow">Request budget</p>
					<dl>
						<div><dt>Daily limit</dt><dd>1,000</dd></div>
						<div><dt>Runs per day</dt><dd>÷ 24</dd></div>
						<div class="total"><dt>Per run</dt><dd class="grad-num">{perRun}</dd></div>
					</dl>
				</div>
			</div>
		</div>
	</section>

	<section class="how">
		<div class="shell">
			<div class="section-head" use:reveal>
				<h2>How it works</h2>
				<span class="trailing">Four stages, cheapest first</span>
			</div>

			<ol class="gates">
				{#each project.gates as gate, i (gate.name)}
					<li class="card lift" use:reveal={i * 70}>
						<div class="head">
							<span class="num">{String(i + 1).padStart(2, '0')}</span>
							<span class="cost" class:paid={gate.cost !== 'free'}>{gate.cost}</span>
						</div>
						<h3>{gate.name}</h3>
						<p>{gate.what}</p>
					</li>
				{/each}
			</ol>
			<p class="note" use:reveal>
				Ordering the checks by cost is the whole trick. Three of the four run on data that's already
				in hand, so roughly 90 percent of the requests a naive version would make never happen at
				all.
			</p>
		</div>
	</section>

	<section class="details">
		<div class="shell">
			<div class="section-head" use:reveal>
				<h2>Two problems worth explaining</h2>
				<span class="trailing">Memory and ranking</span>
			</div>

			<div class="detail-grid" use:reveal={80}>
				<div class="card detail lift">
					<p class="eyebrow">Remembering without a database</p>
					<p class="big"><span class="grad-num">SHA-256</span> fingerprints in Git</p>
					<p>
						Every run starts with no memory of the last one, and a posting stays open for weeks, so
						the naive version announces the same thing 24 times a day until it expires. Instead,
						each record is hashed and the hashes are committed back to the repository. The next run
						reads them, compares, and reports only what it hasn't seen. Git was already there, it
						costs nothing, and every change to what the system knows arrives as a diff with a
						timestamp.
					</p>
				</div>

				<div class="card detail lift">
					<p class="eyebrow">Ranking, not just matching</p>
					<p class="big"><span class="grad-num">0–100</span> weighted score</p>
					<p>
						Nine qualifying postings in one run isn't an answer. It's a new sorting problem. Each
						record is scored against weighted criteria so the strongest one lands at the top. The
						weights live in config rather than code, so retuning what matters is an edit and a
						commit.
					</p>
					<ul class="weights">
						{#each project.scoreFactors as factor (factor.name)}
							<li>
								<span class="name">{factor.name}</span>
								<span class="track"><span class="fill" style:--w="{factor.weight}%"></span></span>
								<span class="pct">{factor.weight}</span>
							</li>
						{/each}
					</ul>
				</div>
			</div>

			<div class="strip-holder" use:reveal={80}>
				<RunStrip />
				<p class="note">
					A day as the monitor sees it. Almost every run confirms that nothing changed, which is
					exactly why the handful that don't are worth opening.
				</p>
			</div>
		</div>
	</section>

	<section class="context">
		<div class="shell">
			<div class="section-head" use:reveal>
				<h2>Context</h2>
				<span class="trailing">Why this matters</span>
			</div>

			<ul class="links" use:reveal={80}>
				{#each project.links as item (item.href)}
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
				Happy to walk through the code, or the parts of it that didn't work.
			</p>
			<div class="actions" use:reveal={80}>
				<a class="btn btn-primary" href="mailto:{site.links.email}">
					Email me <span class="arrow" aria-hidden="true">→</span>
				</a>
				<a class="btn btn-ghost" href="/">Back home</a>
			</div>
		</div>
	</section>
</article>

<style>
	/* Masthead -------------------------------------------------------- */

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
		max-width: 18ch;
	}

	.tagline {
		font-size: clamp(1rem, 0.95rem + 0.4vw, 1.1875rem);
		color: var(--ink-2);
		max-width: 52ch;
	}

	.stack {
		list-style: none;
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		margin: 1.5rem 0 0;
		padding: 0;
	}

	/* Problem --------------------------------------------------------- */

	.lead {
		max-width: 66ch;
	}

	.facts {
		list-style: none;
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 1rem;
		margin: 2.25rem 0 0;
		padding: 1.15rem 0 0;
		border-top: 1px solid var(--line);
	}

	.facts .value {
		display: block;
		font-size: clamp(1.25rem, 1.05rem + 0.9vw, 1.6rem);
		font-weight: 600;
		letter-spacing: -0.03em;
		line-height: 1.15;
	}

	.facts .metric-label {
		font-size: 0.75rem;
		color: var(--ink-3);
	}

	/* Constraint ------------------------------------------------------ */

	.constraint-grid {
		display: grid;
		grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
		gap: clamp(1.25rem, 3vw, 2.5rem);
		align-items: start;
	}

	.budget {
		padding: 1.25rem 1.35rem 1.35rem;
	}

	.budget dl {
		margin: 0.9rem 0 0;
		font-family: var(--mono);
		font-size: 0.8125rem;
	}

	.budget dl > div {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.5rem 0;
		border-bottom: 1px solid var(--line);
	}

	.budget dt {
		color: var(--ink-3);
	}

	.budget dd {
		margin: 0;
	}

	.budget .total {
		border-bottom: none;
		border-top: 1.5px solid var(--ink);
		margin-top: 0.3rem;
		padding-top: 0.7rem;
	}

	.budget .total dt {
		color: var(--ink);
	}

	.budget .total dd {
		font-size: 0.9375rem;
		font-weight: 600;
	}

	/* How ------------------------------------------------------------- */

	.gates {
		list-style: none;
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1rem;
		margin: 0;
		padding: 0;
	}

	.gates li {
		padding: 1.2rem 1.3rem 1.35rem;
	}

	.gates .head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 0.7rem;
	}

	.gates .num {
		font-family: var(--mono);
		font-size: 0.75rem;
		font-weight: 600;
		background: linear-gradient(120deg, #3b82f6, #6366f1);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
	}

	.gates .cost {
		font-family: var(--mono);
		font-size: 0.625rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--ink-3);
		background: var(--bg-3);
		border-radius: 999px;
		padding: 0.2rem 0.55rem;
	}

	.gates .cost.paid {
		color: var(--accent-deep);
		background: rgba(99, 102, 241, 0.1);
	}

	.gates h3 {
		font-size: 1rem;
	}

	.gates p {
		margin-top: 0.5rem;
		font-size: 0.875rem;
		color: var(--ink-2);
	}

	.note {
		margin-top: 1rem;
		font-size: 0.8125rem;
		line-height: 1.6;
		color: var(--ink-3);
		max-width: 68ch;
	}

	/* Details --------------------------------------------------------- */

	.detail-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1rem;
		align-items: start;
	}

	.detail {
		padding: 1.35rem 1.4rem 1.5rem;
	}

	.detail .big {
		margin: 0.65rem 0 0.6rem;
		font-size: 1.25rem;
		font-weight: 600;
		letter-spacing: -0.03em;
	}

	.detail > p:last-of-type {
		font-size: 0.875rem;
		color: var(--ink-2);
	}

	.weights {
		list-style: none;
		margin: 1.15rem 0 0;
		padding: 0;
		display: grid;
		gap: 0.6rem;
	}

	.weights li {
		display: grid;
		grid-template-columns: 9.5rem minmax(0, 1fr) 1.75rem;
		align-items: center;
		gap: 0.75rem;
	}

	.weights .name {
		font-size: 0.8125rem;
		color: var(--ink-2);
	}

	.track {
		height: 5px;
		border-radius: 999px;
		background: var(--bg-3);
		overflow: hidden;
	}

	.track .fill {
		display: block;
		height: 100%;
		width: var(--w);
		border-radius: 999px;
		background: var(--grad);
	}

	.weights .pct {
		font-family: var(--mono);
		font-size: 0.6875rem;
		color: var(--ink-3);
		text-align: right;
	}

	.strip-holder {
		margin-top: 1rem;
	}

	.strip-holder .note {
		margin-top: 0.85rem;
	}

	/* Context links --------------------------------------------------- */

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

	/* Outro ----------------------------------------------------------- */

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

	/* Responsive ------------------------------------------------------ */

	@media (max-width: 52rem) {
		.constraint-grid,
		.gates,
		.detail-grid {
			grid-template-columns: minmax(0, 1fr);
		}

		.facts {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 1.15rem 1rem;
		}
	}

	@media (max-width: 26rem) {
		.weights li {
			grid-template-columns: 7.5rem minmax(0, 1fr) 1.5rem;
			gap: 0.5rem;
		}
	}
</style>
