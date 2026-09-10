import { site } from '$lib/content';
import { projects, projectHref } from '$lib/projects';

export const prerender = true;

export function GET() {
	const paths = ['/', ...projects.map(projectHref)];

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((path) => `\t<url><loc>${site.url}${path}</loc></url>`).join('\n')}
</urlset>
`;

	return new Response(body, {
		headers: { 'Content-Type': 'application/xml' }
	});
}
