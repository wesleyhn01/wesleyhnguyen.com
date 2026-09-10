import discordAlerts from '$lib/assets/reverse-split-discord.png';

export const site = {
	name: 'Wesley Nguyen',
	thesis: 'Software Developer',
	url: 'https://wesleyhnguyen.com',

	bio: [
		"I build software professionally, where the code has to outlast my attention span and the problems rarely come with instructions. Learning fast is the skill that carries over.",
		"I got here by teaching myself to code during Covid, automating the tedious parts of my own life and shipping small tools to friends who told me the moment anything broke. That loop of build, ship, listen, and fix is still how I work. What I want next is scale: systems that hold up for years and reach enough people that the engineering decisions behind them matter."
	],

	ledger: [
		{ label: 'Current role', value: 'Software Developer @ CGI Federal' },
		{ label: 'Focus', value: 'Backend Development' },
		{ label: 'Based in', value: 'Fairfax, VA' }
	],

	learning: 'Developing a homelab for secure VPN connectivity.',

	goal: 'Transform the Contract Monitor from a script into a scalable application.',

	funFact: {
		lead: "When I'm not working or learning something new, I'm practicing",
		emphasis: 'Muay Thai,',
		tail: 'which keeps me sharp mentally as much as physically.'
	},

	links: {
		github: 'https://github.com/wesleyhn01',
		linkedin: 'https://www.linkedin.com/in/wesleynguyen/',
		email: 'contact@wesleyhnguyen.com'
	},

	seo: {
		title: 'Wesley Nguyen | Software Developer',
		description:
			'Wesley Nguyen is a software developer focused on leveraging emerging technologies to create innovative solutions.'
	}
};

export const projects = [
	{
		name: 'SAST Vulnerability Management Platform',
		description:
			'A security platform that scans code for secrets, vulnerabilities, and risky dependencies, with LLM triage that cut false positives 40%.',
		stack: ['Go', 'Supabase (PostgreSQL)', 'Svelte', 'Next.js', 'TypeScript'],
		status: 'Writeup',
		href: '/project/sast/'
	},
	{
		name: 'Reverse Split Arbitrage Bot',
		description:
			'Ingests SEC reverse-split filings as they post, parses their legal terms with an LLM, and routes confirmed opportunities through a multi-broker execution layer.',
		stack: ['Python', 'OpenAI API', 'REST APIs', 'Discord API', 'Git'],
		status: 'Writeup',
		href: '/project/reverse-split/'
	},
	{
		name: 'Federal Contract Opportunity Monitor',
		description:
			'A $0-to-run job that checks the federal contract feed hourly and alerts only when a posting is genuinely new.',
		stack: ['Python', 'GitHub Actions', 'REST APIs', 'CI/CD', 'Git'],
		status: 'In-Progress',
		href: '/project/contract-monitor/'
	}
];

export type Writeup = {
	tab: string;
	eyebrow: string;
	name: string;
	tagline: string;
	overview: string[];
	stack: { name: string; why: string }[];
	how: { title: string; detail: string }[];
	image?: { src: string; alt: string; caption: string };
	sources: { label: string; href: string; note: string }[];
};

export const writeups: Record<string, Writeup> = {
	monitor: {
		tab: 'Federal Contract Monitor | Wesley Nguyen',
		eyebrow: 'In progress · Built for a friend',
		name: 'Federal Contract Opportunity Monitor',
		tagline:
			'A $0-to-run scheduled job that checks the federal contract feed every hour and alerts only when a posting is genuinely new.',
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
				name: 'REST APIs',
				why: 'The SAM.gov Get Opportunities API is the data source, rate limit included.'
			},
			{
				name: 'Git',
				why: 'The database. Fingerprints of seen postings are committed back to the repo between runs.'
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
	},

	sast: {
		tab: 'SAST Vulnerability Platform | Wesley Nguyen',
		eyebrow: 'Team of four · Backend architecture',
		name: 'SAST Vulnerability Management Platform',
		tagline:
			'An AI-assisted security platform that scans repositories for leaked secrets, insecure code, and vulnerable dependencies, then triages what it finds.',
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
	},

	'reverse-split': {
		tab: 'Reverse Split Arbitrage Bot | Wesley Nguyen',
		eyebrow: 'Automation · Built with friends',
		name: 'Reverse Split Arbitrage Bot',
		tagline:
			'A pipeline that ingests SEC reverse-split filings, classifies their fractional-share terms with an LLM, and cuts the time from filing to trade decision to minutes.',
		overview: [
			'When a company reverse splits, the treatment of fractional shares is spelled out in a filing, in legal language that varies by company and only matters for a short window before the split date. Reading those filings quickly and correctly is the entire problem.',
			'The pipeline does the reading. It ingests each new SEC reverse-split filing as it posts, uses the OpenAI API to classify the fractional-share provision, and pushes qualified cases to Discord with everything needed for a fast decision. A single execution layer then orchestrates the order through multiple brokerage APIs, taking the time from filing to execution down to minutes.'
		],
		stack: [
			{
				name: 'Python',
				why: 'Scraping, orchestration, and the glue between every other piece.'
			},
			{
				name: 'OpenAI API',
				why: 'Classifies each filing as round-up, cash-out, or unclear. The legal language varies too much for regex.'
			},
			{
				name: 'REST APIs',
				why: 'One execution layer abstracts over multiple brokerage APIs, so a single decision becomes an order everywhere it needs to be.'
			},
			{
				name: 'Discord API',
				why: 'A webhook is the UI: each opportunity arrives with what you need to decide in seconds.'
			},
			{
				name: 'Git',
				why: 'Versioned config, so prompts and broker integrations change through commits.'
			}
		],
		how: [
			{
				title: 'Ingest the filings',
				detail:
					'A scraper polls new SEC reverse-split filings, so each one surfaces the day it posts instead of after the window closes.'
			},
			{
				title: 'Parse the legal language',
				detail:
					'The LLM reduces each filing to one classification of its fractional-share provision. The wording varies too much across companies for pattern matching.'
			},
			{
				title: 'Decide in Discord',
				detail:
					'Qualified cases post with ticker, ratio, and deadline. A human makes the final call, keeping the pipeline from acting on a misread filing.'
			},
			{
				title: 'Orchestrate the execution',
				detail:
					'A confirmed decision flows through one code path that abstracts over multiple brokerage APIs, with per-broker quirks isolated behind a shared interface.'
			}
		],
		image: {
			src: discordAlerts,
			alt: 'Two Discord alerts from the pipeline, each showing an upcoming reverse split with ticker, side, and quantity, followed by an Execute button',
			caption:
				'Alerts as they land in Discord: ticker, side, and quantity, one tap from execution.'
		},
		sources: [
			{
				label: 'Investor.gov: Reverse stock splits',
				href: 'https://www.investor.gov/introduction-investing/investing-basics/glossary/reverse-stock-splits',
				note: 'The SEC explainer on what a reverse split is and why companies do them.'
			},
			{
				label: 'SEC EDGAR full-text search',
				href: 'https://www.sec.gov/edgar/search/',
				note: 'Where the filings come from.'
			},
			{
				label: 'FINRA: Stock splits explained',
				href: 'https://www.finra.org/investors/insights/stock-splits',
				note: 'How fractional shares are handled after consolidation.'
			}
		]
	}
};
