<script lang="ts">
	import { page } from '$app/state';
	import { site } from '$lib/content';

	let {
		title,
		description,
		image = '/og.png',
		imageAlt = `${site.name}, ${site.thesis}`,
		noindex = false
	}: {
		title: string;
		description: string;
		image?: string;
		imageAlt?: string;
		noindex?: boolean;
	} = $props();

	const url = $derived(`${site.url}${page.url.pathname}`);
	const imageUrl = $derived(image.startsWith('http') ? image : `${site.url}${image}`);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />

	{#if noindex}
		<meta name="robots" content="noindex" />
	{:else}
		<link rel="canonical" href={url} />
		<meta property="og:url" content={url} />
	{/if}

	<meta property="og:site_name" content={site.name} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={imageUrl} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={imageAlt} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content={imageUrl} />
</svelte:head>
