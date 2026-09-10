import type { Project } from './types';

export const sast: Project = {
	slug: 'sast',
	name: 'SAST Vulnerability Management Platform',
	shortName: 'SAST Vulnerability Platform',
	status: 'Shipped',
	eyebrow: 'Team of four · Backend architecture',
	tagline:
		'A security platform that scans repositories for leaked secrets, insecure code, and vulnerable dependencies, with LLM triage that cut false-positive review volume 40 percent.',
	overview: [
		'Security scanners bury the one real leak under hundreds of false positives, so teams learn to ignore them. I led backend architecture on a four-person team building a platform that treats triage as the product.',
		'It runs secrets detection, static analysis, and dependency scanning in one containerized CI/CD pipeline, then has an LLM review each finding in context before a human sees it. In pre-release evaluation, that cut false-positive review volume by 40 percent.'
	],
	stack: [
		{
			name: 'Go',
			why: 'The scanning backend. Cheap concurrency across repositories, and a single binary to containerize.'
		},
		{
			name: 'Supabase (PostgreSQL)',
			why: 'Findings, workspaces, and the audit trail, with row-level security separating tenants.'
		},
		{
			name: 'Svelte',
			why: 'The dashboard: a ranked queue of findings with severity and context.'
		},
		{
			name: 'Next.js',
			why: 'The public site and authenticated entry point.'
		},
		{
			name: 'TypeScript',
			why: 'Shared types across both frontends.'
		}
	],
	how: [
		{
			title: 'Three scanners, one pipeline',
			detail:
				'Secrets detection over full git history, static analysis over source, and dependency scanning all run as containerized CI/CD jobs on every push.'
		},
		{
			title: 'LLM triage before human review',
			detail:
				'Each finding is reviewed with its surrounding code. Test fixtures and dead keys get filtered; live issues get severity and a plain-language explanation.'
		},
		{
			title: 'Risk scoring, not just listing',
			detail:
				'Findings are ranked so the dashboard reads top-down: most exploitable first.'
		},
		{
			title: 'Audit trail by default',
			detail:
				'Every triage decision and status change is recorded, which is what compliance reviews ask for.'
		}
	],
	sources: [
		{
			label: 'OWASP: Source Code Analysis Tools',
			href: 'https://owasp.org/www-community/Source_Code_Analysis_Tools',
			note: 'What static analysis can catch, including the false-positive problem this project is built around.'
		},
		{
			label: 'GitHub: About secret scanning',
			href: 'https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning',
			note: 'Why scanning full git history matters, not just the latest commit.'
		},
		{
			label: 'OWASP Dependency-Check',
			href: 'https://owasp.org/www-project-dependency-check/',
			note: 'The reference approach to matching dependencies against known CVEs.'
		}
	]
};
