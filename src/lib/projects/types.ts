export type ProjectStatus = 'Shipped' | 'In progress' | 'Archived';

export type Tradeoff = { heading: string; detail: string };

export type Tradeoffs =
	| [Tradeoff, Tradeoff]
	| [Tradeoff, Tradeoff, Tradeoff]
	| [Tradeoff, Tradeoff, Tradeoff, Tradeoff];

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
	tradeoffs: Tradeoffs;
	references: { label: string; href: string }[];
};
