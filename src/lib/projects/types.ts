export type ProjectStatus = 'Shipped' | 'In progress' | 'Archived';

export type Project = {
	slug: string;
	name: string;
	shortName: string;
	status: ProjectStatus;
	eyebrow: string;
	tagline: string;
	overview: string[];
	stack: { name: string; why: string }[];
	how: { title: string; detail: string }[];
	image?: { src: string; alt: string; caption: string };
	sources: { label: string; href: string; note: string }[];
};
