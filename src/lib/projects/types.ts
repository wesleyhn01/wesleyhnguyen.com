export type ProjectStatus = 'Shipped' | 'In progress' | 'Archived';

export type Project = {
	slug: string;
	name: string;
	shortName: string;
	status: ProjectStatus;
	eyebrow?: string;
	tagline: string;
	overview: string[];
	stack: { name: string; why: string }[];
	how: { title: string; detail: string }[];
	image?: { src: string; width: number; height: number; alt: string; caption: string };
	references: { label: string; href: string }[];
};
