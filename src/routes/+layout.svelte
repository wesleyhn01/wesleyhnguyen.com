<script lang="ts">
	import '@fontsource-variable/geist';
	import '@fontsource-variable/geist-mono';
	import '../app.css';

	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import favicon from '$lib/assets/favicon.svg';
	import { site } from '$lib/content';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="theme-color" content="#ffffff" />
	<meta property="og:site_name" content={site.name} />
	<meta property="og:type" content="website" />
</svelte:head>

<Nav />

<main id="main">
	{@render children?.()}
</main>

<Footer />
