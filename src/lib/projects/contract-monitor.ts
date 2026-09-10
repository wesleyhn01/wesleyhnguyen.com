import type { Project } from './types';

export const contractMonitor: Project = {
	slug: 'contract-monitor',
	name: 'Federal Contract Opportunity Monitor',
	shortName: 'Federal Contract Monitor',
	status: 'In progress',
	eyebrow: 'Built for a friend',
	tagline:
		'A $0-to-run scheduled job that checks the federal contract feed every hour and alerts only on postings it has not seen before.',
	overview: [
		'A friend starting a small contracting business needed to see relevant federal postings the day they went up. The commercial tools that do this run $2,000 to $15,000 a year, so I built the free version: a Python job on GitHub Actions that checks the SAM.gov feed hourly and alerts only on postings worth a look.',
		'The whole design follows from two constraints: a 1,000-request daily API limit, and no server or database to remember anything between runs.'
	],
	stack: [
		{
			name: 'Python',
			why: 'One lightweight script handles fetching, filtering, scoring, and alerting.'
		},
		{
			name: 'GitHub Actions',
			why: 'Free scheduled compute. A cron trigger runs the job hourly with nothing to host.'
		},
		{
			name: 'SAM.gov Get Opportunities API',
			why: 'The data source, rate limit included.'
		}
	],
	how: [
		{
			title: 'Filter in cost order',
			detail:
				'Free checks run first: query constraints, keyword gating, then deduplication. Only records that survive all three cost an API request, which cuts calls about 90 percent.'
		},
		{
			title: 'Remember without a database',
			detail:
				'Each posting is hashed with SHA-256 and the hashes are committed to the repo, so nothing is ever reported twice.'
		},
		{
			title: 'Rank, not just match',
			detail:
				'Qualifying postings get a weighted 0-100 score across specificity, eligibility, and deadline, so the strongest lead is always on top.'
		}
	],
	sources: [
		{
			label: 'SAM.gov Get Opportunities API',
			href: 'https://open.gsa.gov/api/get-opportunities-public-api/',
			note: 'The data source, including the daily request limit behind most of the design.'
		},
		{
			label: 'SBA contracting assistance programs',
			href: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs',
			note: 'The eligibility rules the scoring step weighs most heavily.'
		}
	]
};
