export const site = {
	name: 'Wesley Nguyen',
	role: 'Software Developer @ CGI Federal',
	thesis: 'I build software for the problems people have learned to live with.',

	bio: [
		"I taught myself to code during Covid, building small tools with friends. Some saved us time, a few made us money, and the lesson stuck: find something tedious, automate it, and hand it to people who'll tell you the moment it breaks.",
		"I do that professionally now, where the stakes are higher and the code has to outlive my attention span. Most of what I've built started as a problem I didn't know how to solve yet, and picking things up quickly has turned out to be the skill that carries over. Next I want to build systems that hold up for years and reach enough people that the decisions behind them matter."
	],

	ledger: [
		{ label: 'Current role', value: 'Software Developer @ CGI Federal' },
		{ label: 'Focus', value: 'Full Stack Development' },
		{ label: 'Based in', value: 'Fairfax, VA' }
	],

	learning: 'Standing up a home server and running a local LLM on it.',

	goal: "Keeping the contract monitor sharp, then finding the next problem worth solving for the people around me.",

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
		homeTab: 'WN Home',
		title: 'Wesley Nguyen, software developer',
		description:
			'Wesley Nguyen is a full-stack software developer at CGI Federal who builds automation for the work people are still doing by hand.'
	}
};

export const projects = [
	{
		name: 'SAST Vulnerability Management Platform',
		description:
			'A security scanning platform that unifies secrets detection, software composition analysis, and containerized CI/CD scanning, with LLM-driven triage that cut false-positive review volume 40%.',
		stack: ['Go', 'Supabase (PostgreSQL)', 'Svelte', 'Next.js', 'TypeScript'],
		status: 'Writeup',
		href: '/project/sast/'
	},
	{
		name: 'Reverse Split Arbitrage Bot',
		description:
			'A pipeline that scrapes new SEC reverse-split filings, classifies each by fractional-share provision, and routes profitable round-up opportunities across 50 brokerage accounts.',
		stack: ['Python', 'OpenAI API', 'REST APIs', 'Discord API', 'Git'],
		status: 'Writeup',
		href: '/project/reverse-split/'
	},
	{
		name: 'Federal Contract Opportunity Monitor',
		description:
			'A zero-cost scheduled job that polls the federal contract feed every hour and speaks up only when a posting is genuinely new and worth bidding on.',
		stack: ['Python', 'GitHub Actions', 'REST APIs', 'CI/CD', 'Git'],
		status: 'In-Progress',
		href: '/project/'
	}
];

export type Writeup = {
	tab: string;
	eyebrow: string;
	name: string;
	tagline: string;
	overview: string[];
	metrics?: { value: string; label: string }[];
	stack: { name: string; why: string }[];
	how: { title: string; detail: string }[];
	sources: { label: string; href: string; note: string }[];
};

export const writeups: Record<string, Writeup> = {
	monitor: {
		tab: 'WN Contract Monitor',
		eyebrow: 'In progress · Built for a friend',
		name: 'Federal Contract Opportunity Monitor',
		tagline:
			'A scheduled job that checks the federal contract feed every hour and speaks up only when a posting is genuinely new.',
		overview: [
			"A friend starting a small contracting business needed to know about relevant federal postings the day they go up, but the commercial tools that do the watching run $2,000 to $15,000 a year. This is the free version: a Python job on GitHub Actions that polls the SAM.gov API 24 times a day, filters out everything it has already seen, and surfaces only the postings worth a look.",
			"The hard part is that free has a budget. The API allows 1,000 requests a day and there is no server or database to remember anything between runs, so the design comes down to spending requests carefully and storing state somewhere that costs nothing."
		],
		metrics: [
			{ value: '24×', label: 'runs per day' },
			{ value: '−90%', label: 'API calls' },
			{ value: '$0', label: 'to operate' },
			{ value: '0', label: 'duplicate alerts' }
		],
		stack: [
			{
				name: 'Python',
				why: 'One dependency-light script handles fetching, filtering, scoring, and alerting.'
			},
			{
				name: 'GitHub Actions',
				why: 'Free scheduled compute. A cron trigger runs the job hourly with nothing to host or pay for.'
			},
			{
				name: 'REST APIs',
				why: 'The SAM.gov Get Opportunities API is the data source, with a 1,000-request daily limit that shaped the whole design.'
			},
			{
				name: 'Git',
				why: 'The database. SHA-256 fingerprints of seen postings are committed back to the repo, so every run knows what the last one saw.'
			}
		],
		how: [
			{
				title: 'Filter in cost order',
				detail:
					'Server-side query constraints first, then in-memory keyword gating, then deduplication. Only records that survive all three earn a detail request, which cuts API calls about 90 percent.'
			},
			{
				title: 'Remember without a database',
				detail:
					'Each posting is hashed and the hashes are committed to the repository. The next run diffs against them, so nothing is ever reported twice.'
			},
			{
				title: 'Rank, not just match',
				detail:
					'Qualifying postings get a weighted 0-100 score across specificity, eligibility, deadline proximity, and contract signals, so the strongest lead is always on top.'
			},
			{
				title: 'Stay inside the budget',
				detail:
					'1,000 requests a day across 24 runs leaves about 41 per run. Spending them early would leave the monitor dark for the rest of the day, so requests are held in reserve by default.'
			}
		],
		sources: [
			{
				label: 'SAM.gov Get Opportunities API',
				href: 'https://open.gsa.gov/api/get-opportunities-public-api/',
				note: 'Where the data comes from, including the daily request limit behind most of the design decisions.'
			},
			{
				label: 'SBA contracting assistance programs',
				href: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs',
				note: 'Set-asides, 8(a), HUBZone, and WOSB: the eligibility rules the scoring step weighs most heavily.'
			}
		]
	},

	sast: {
		tab: 'WN SAST Platform',
		eyebrow: 'Team of four · Backend architecture',
		name: 'SAST Vulnerability Management Platform',
		tagline:
			'An AI-assisted application security platform that scans repositories for leaked secrets, insecure code, and vulnerable dependencies, then triages what it finds so teams fix what matters first.',
		overview: [
			'Security scanners are easy to run and hard to live with. Point one at a real codebase and it returns hundreds of findings, most of them noise, and the real leak sits on page six until someone reads that far. Teams end up ignoring the tool, which is worse than not having one.',
			'I led backend architecture on a four-person team building a platform that treats triage as the product, not an afterthought. It unifies secrets detection, static analysis, and software composition analysis into one pipeline, runs the scanners containerized in CI/CD, and uses an LLM to review each finding with its surrounding context before a human ever sees it. In pre-release evaluation that cut false-positive review volume by 40 percent.'
		],
		stack: [
			{
				name: 'Go',
				why: 'The scanning backend. Goroutines make fanning out across many repositories cheap, and a single static binary is easy to containerize.'
			},
			{
				name: 'Supabase (PostgreSQL)',
				why: 'Findings, workspaces, and the audit trail live in Postgres, with row-level security keeping tenant data separated.'
			},
			{
				name: 'Svelte',
				why: 'The dashboard: a ranked queue of findings with severity, context, and history per repository.'
			},
			{
				name: 'Next.js',
				why: 'The public-facing site and authenticated entry point into the app.'
			},
			{
				name: 'TypeScript',
				why: 'Shared types across both frontends, so a finding means the same thing everywhere it appears.'
			}
		],
		how: [
			{
				title: 'Three scanners, one pipeline',
				detail:
					'Secrets detection over full git history, SAST over source, and SCA over dependency manifests all run as containerized jobs in CI/CD, on every push or on a schedule.'
			},
			{
				title: 'LLM triage before human review',
				detail:
					'Every raw finding is reviewed with its surrounding code and metadata. Test fixtures, dead code, and revoked keys get filtered; live issues get severity and a plain-language explanation.'
			},
			{
				title: 'Risk scoring, not just listing',
				detail:
					'Findings are ranked so the dashboard reads top-down: the most exploitable, most exposed issues first rather than whatever the scanner emitted last.'
			},
			{
				title: 'Audit trail by default',
				detail:
					'Every triage decision, dismissal, and status change is recorded, which is what compliance reviews actually ask for.'
			}
		],
		sources: [
			{
				label: 'OWASP: Source Code Analysis Tools',
				href: 'https://owasp.org/www-community/Source_Code_Analysis_Tools',
				note: 'What static analysis can and cannot catch, including the false-positive problem this project is built around.'
			},
			{
				label: 'GitHub: About secret scanning',
				href: 'https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning',
				note: 'How leaked credentials end up in repositories and why scanning full git history matters, not just the latest commit.'
			},
			{
				label: 'OWASP Dependency-Check',
				href: 'https://owasp.org/www-project-dependency-check/',
				note: 'The reference approach to software composition analysis: matching dependencies against known CVEs.'
			}
		]
	},

	'reverse-split': {
		tab: 'WN Arbitrage Bot',
		eyebrow: 'Automation · Built with friends',
		name: 'Reverse Split Arbitrage Bot',
		tagline:
			'A pipeline that reads new SEC reverse-split filings, classifies the fractional-share terms with an LLM, and routes the profitable ones to a one-tap buy-or-pass decision across 50 brokerage accounts.',
		overview: [
			'When a stock trading under a dollar risks delisting, the company can reverse split: many shares consolidate into one. Holders left with a fraction of a share get either cash for the fraction or a round-up to a full share, and the filing says which. When it rounds up, buying a handful of shares just before the split turns a few dollars into a full post-split share, and the difference is profit.',
			'The edge is not the trade, it is the reading. Filings are public, dense, and time-sensitive, and the round-up provision is buried in legal language that varies by company. This pipeline does the reading: it scrapes each new filing as it posts, uses the OpenAI API to classify the fractional-share treatment, and pushes confirmed round-up cases to Discord, where the only human step left is buy or pass. An execution layer then places the order across every connected brokerage account, because the profit per account is small and the strategy scales with account count.'
		],
		stack: [
			{
				name: 'Python',
				why: 'Scraping, orchestration, and the glue between every other piece.'
			},
			{
				name: 'OpenAI API',
				why: 'Classifies the fractional-share provision in each filing: round-up, cash-out, or unclear. The language varies too much for regex to survive.'
			},
			{
				name: 'REST APIs',
				why: 'Public brokerage APIs place the same order across 50 accounts, turning one confirmed opportunity into 50 small positions.'
			},
			{
				name: 'Discord API',
				why: 'A webhook is the UI. Each opportunity arrives as a message with the details needed to decide in seconds.'
			},
			{
				name: 'Git',
				why: 'Versioned config and run history, so classification prompts and account lists change through commits.'
			}
		],
		how: [
			{
				title: 'Watch the filings',
				detail:
					'A scraper polls newly posted SEC reverse-split filings, so opportunities surface the day they appear instead of after the split date has passed.'
			},
			{
				title: 'Classify with an LLM',
				detail:
					'Each filing is reduced to one binary answer: will fractional shares be rounded up? Only confirmed round-ups move forward.'
			},
			{
				title: 'Decide in Discord',
				detail:
					'Confirmed cases post to a webhook with ticker, ratio, and deadline. A human makes the final call, which keeps the bot from acting on a misread filing.'
			},
			{
				title: 'Execute across 50 accounts',
				detail:
					'On a buy, the execution layer fans the order out through each brokerage API. Per-account profit is small; multiplied across accounts it stops being small.'
			}
		],
		sources: [
			{
				label: 'Investor.gov: Reverse stock splits',
				href: 'https://www.investor.gov/introduction-investing/investing-basics/glossary/reverse-stock-splits',
				note: 'The SEC explainer on what a reverse split is and why companies do them.'
			},
			{
				label: 'SEC EDGAR full-text search',
				href: 'https://www.sec.gov/edgar/search/',
				note: 'Where the filings come from. Every corporate action in this strategy starts as a public document here.'
			},
			{
				label: 'FINRA: Stock splits explained',
				href: 'https://www.finra.org/investors/insights/stock-splits',
				note: 'Covers forward and reverse splits, including how fractional shares are handled after consolidation.'
			}
		]
	}
};
