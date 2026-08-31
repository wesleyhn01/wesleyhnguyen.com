<script lang="ts">
	import { site } from '$lib/content';

	const year = new Date().getFullYear();

	/**
	 * A mailto link does nothing for anyone without a desktop mail client, so the
	 * address can also be copied straight to the clipboard.
	 */
	let copied = $state(false);
	let timer: ReturnType<typeof setTimeout>;

	async function copyEmail() {
		try {
			await navigator.clipboard.writeText(site.links.email);
			copied = true;
			clearTimeout(timer);
			timer = setTimeout(() => (copied = false), 2000);
		} catch {
			copied = false;
		}
	}
</script>

<footer>
	<div class="shell inner">
		<div>
			<p class="eyebrow">Get in touch</p>
			<div class="address-row">
				<a class="address" href="mailto:{site.links.email}">{site.links.email}</a>
				<button class="copy" type="button" onclick={copyEmail}>
					{copied ? 'Copied' : 'Copy'}
				</button>
			</div>
			<p class="sr-only" aria-live="polite">{copied ? 'Email address copied' : ''}</p>
		</div>

		<ul class="links">
			<li><a href={site.links.github} target="_blank" rel="noreferrer noopener">GitHub</a></li>
			<li><a href={site.links.linkedin} target="_blank" rel="noreferrer noopener">LinkedIn</a></li>
			<li><a href="/project/">Current Project</a></li>
		</ul>

		<p class="colophon">© {year} {site.name} · Built with SvelteKit</p>
	</div>
</footer>

<style>
	footer {
		border-top: 1px solid var(--line);
		background: var(--bg-2);
		padding-block: 2.75rem 2rem;
	}

	.inner {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 1.5rem 2rem;
		align-items: center;
	}

	.eyebrow {
		margin-bottom: 0.5rem;
	}

	.address {
		font-size: clamp(1.1rem, 0.9rem + 1.2vw, 1.6rem);
		font-weight: 550;
		letter-spacing: -0.025em;
		text-decoration: none;
		background-image: var(--grad);
		background-repeat: no-repeat;
		background-position: 0 100%;
		background-size: 0% 2px;
		transition: background-size 300ms var(--ease);
	}

	.address:hover {
		background-size: 100% 2px;
	}

	.address-row {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	.copy {
		font-family: var(--mono);
		font-size: 0.625rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--ink-3);
		background: var(--bg);
		border: 1px solid var(--line-2);
		border-radius: 999px;
		padding: 0.3rem 0.65rem;
		cursor: pointer;
		transition:
			color 200ms var(--ease),
			border-color 200ms var(--ease),
			background-color 200ms var(--ease);
	}

	.copy:hover {
		color: var(--accent-deep);
		border-color: var(--accent);
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}

	.links {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		gap: 1.25rem;
	}

	.links a {
		font-size: 0.8125rem;
		color: var(--ink-2);
		text-decoration: none;
		transition: color 200ms var(--ease);
	}

	.links a:hover {
		color: var(--accent-deep);
	}

	.colophon {
		grid-column: 1 / -1;
		padding-top: 1.5rem;
		border-top: 1px solid var(--line);
		font-family: var(--mono);
		font-size: 0.6875rem;
		letter-spacing: 0.02em;
		color: var(--ink-3);
	}

	@media (max-width: 34rem) {
		.inner {
			grid-template-columns: 1fr;
			align-items: start;
		}
	}
</style>
