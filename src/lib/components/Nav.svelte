<script lang="ts">
	import { page } from '$app/state';
	import { site } from '$lib/content';

	const pages = [
		{ href: '/', label: 'Home' },
		{ href: '/#projects', label: 'Projects' }
	];

	const current = $derived(page.url.pathname);

	function isActive(href: string) {
		if (href === '/') return current === '/';
		if (href === '/#projects') return current.startsWith('/project');
		return current.startsWith(href);
	}

	let scrolled = $state(false);

	$effect(() => {
		const onScroll = () => (scrolled = window.scrollY > 8);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

<a class="skip" href="#main">Skip to content</a>

<nav aria-label="Primary" class:scrolled>
	<div class="shell bar">
		<a class="brand" href="/">{site.name}</a>

		<ul class="pages" role="list">
			{#each pages as item (item.href)}
				<li>
					<a href={item.href} class:active={isActive(item.href)} aria-current={isActive(item.href) ? 'page' : undefined}>
						{item.label}
					</a>
				</li>
			{/each}
		</ul>

		<ul class="socials" role="list">
			<li>
				<a href={site.links.linkedin} target="_blank" rel="noreferrer noopener" aria-label="LinkedIn">
					<svg viewBox="0 0 16 16" aria-hidden="true" fill="currentColor">
						<path
							d="M13.63 0H2.36C1.06 0 0 1.03 0 2.3v11.4C0 14.97 1.06 16 2.36 16h11.27c1.31 0 2.37-1.03 2.37-2.3V2.3C16 1.03 14.94 0 13.63 0ZM4.75 13.66H2.37V6.03h2.38v7.63ZM3.56 4.98a1.38 1.38 0 1 1 0-2.75 1.38 1.38 0 0 1 0 2.75Zm10.1 8.68h-2.37V9.95c0-.88-.02-2.02-1.23-2.02-1.24 0-1.43.96-1.43 1.96v3.77H6.26V6.03h2.28v1.04h.03c.32-.6 1.09-1.23 2.25-1.23 2.4 0 2.84 1.58 2.84 3.63v4.19Z"
						/>
					</svg>
				</a>
			</li>
			<li>
				<a href={site.links.github} target="_blank" rel="noreferrer noopener" aria-label="GitHub">
					<svg viewBox="0 0 16 16" aria-hidden="true" fill="currentColor">
						<path
							d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"
						/>
					</svg>
				</a>
			</li>
			<li>
				<a href="mailto:{site.links.email}" aria-label="Email {site.links.email}">
					<svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.4">
						<rect x="1.2" y="3" width="13.6" height="10" rx="2" />
						<path d="M1.8 4.4 8 8.8l6.2-4.4" />
					</svg>
				</a>
			</li>
		</ul>
	</div>
</nav>

<style>
	nav {
		position: sticky;
		top: 0;
		z-index: 20;
		background: rgba(255, 255, 255, 0.78);
		backdrop-filter: blur(12px) saturate(140%);
		border-bottom: 1px solid var(--line);
		transition:
			box-shadow 300ms var(--ease),
			background-color 300ms var(--ease);
	}

	nav.scrolled {
		background: rgba(255, 255, 255, 0.86);
		box-shadow: 0 6px 20px -18px rgba(19, 19, 23, 0.6);
	}

	.bar {
		display: flex;
		align-items: center;
		gap: clamp(0.5rem, 3vw, 2rem);
		min-height: 3.5rem;
	}

	.brand {
		margin-right: auto;
		min-width: 0;
		text-decoration: none;
		font-size: 0.9375rem;
		font-weight: 550;
		letter-spacing: -0.015em;
		white-space: nowrap;
	}

	ul {
		list-style: none;
		display: flex;
		align-items: center;
		margin: 0;
		padding: 0;
	}

	.pages,
	.socials {
		flex: none;
	}

	.pages {
		gap: 0.25rem;
	}

	.pages a {
		display: block;
		font-size: 0.8125rem;
		font-weight: 450;
		text-decoration: none;
		color: var(--ink-2);
		padding: 0.4rem 0.7rem;
		border-radius: 999px;
		white-space: nowrap;
		transition:
			color 200ms var(--ease),
			background-color 200ms var(--ease);
	}

	.pages a:hover {
		color: var(--ink);
		background: var(--bg-3);
	}

	.pages a.active {
		color: var(--ink);
		background: var(--bg-3);
		font-weight: 500;
	}

	.socials {
		gap: 0.1rem;
		padding-left: clamp(0.35rem, 1.5vw, 0.9rem);
		margin-left: clamp(0.2rem, 1vw, 0.4rem);
		border-left: 1px solid var(--line);
	}

	.socials a {
		display: grid;
		place-items: center;
		width: 2rem;
		height: 2rem;
		border-radius: 999px;
		color: var(--ink-3);
		transition:
			color 200ms var(--ease),
			background-color 200ms var(--ease);
	}

	.socials a:hover {
		color: var(--accent-deep);
		background: var(--bg-3);
	}

	.socials svg {
		width: 1rem;
		height: 1rem;
	}

	.skip {
		position: absolute;
		left: -9999px;
		top: 0;
		z-index: 40;
		background: var(--ink);
		color: #fff;
		font-size: 0.8125rem;
		padding: 0.6rem 0.9rem;
		border-radius: var(--r-sm);
		text-decoration: none;
	}

	.skip:focus {
		left: 0.5rem;
		top: 0.5rem;
	}

	@media (max-width: 30rem) {
		.brand {
			font-size: 0.875rem;
		}

		.pages li:first-child {
			display: none;
		}

		.pages a {
			padding-inline: 0.55rem;
		}

		.socials a {
			width: 1.85rem;
		}
	}
</style>
