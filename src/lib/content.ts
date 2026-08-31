/**
 * Everything you edit lives here.
 *
 * One rule when editing: if a line contains an apostrophe, wrap it in "double
 * quotes" instead of 'single quotes'. Otherwise the apostrophe ends the string
 * early and the build fails.
 */

export const site = {
	name: 'Wesley Nguyen',
	role: 'Software Developer @ CGI Federal',
	/** The line under your name on the home page. */
	thesis: 'I build software for the problems people have learned to live with.',

	/** Two short paragraphs. This is the first thing a recruiter reads. */
	bio: [
		"I taught myself to code during Covid, building small tools with friends. Some saved us time, a few made us money, and the lesson stuck: find something tedious, automate it, and hand it to people who'll tell you the moment it breaks.",
		"I do that professionally now, where the stakes are higher and the code has to outlive my attention span. Most of what I've built started as a problem I didn't know how to solve yet, and picking things up quickly has turned out to be the skill that carries over. Next I want to build systems that hold up for years and reach enough people that the decisions behind them matter."
	],

	/** The facts panel beside the bio. */
	ledger: [
		{ label: 'Current role', value: 'Software Developer @ CGI Federal' },
		{ label: 'Focus', value: 'Full Stack Development' },
		{ label: 'Based in', value: 'Fairfax, VA' }
	],

	/** One line on what you are learning right now. */
	learning: 'Standing up a home server and running a local LLM on it.',

	/** One line on what you are working toward. */
	goal: "Keeping the contract monitor sharp, then finding the next problem worth solving for the people around me.",

	/** One true, specific sentence. `emphasis` gets the gradient. */
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
		/** Shown on the browser tab. */
		homeTab: 'WN Home',
		projectTab: 'WN Current',
		/** Used for search results and link previews. */
		title: 'Wesley Nguyen, software developer',
		description:
			'Wesley Nguyen is a full-stack software developer at CGI Federal who builds automation for the work people are still doing by hand.'
	}
};

export const project = {
	name: 'Federal Contract Opportunity Monitor',
	tagline:
		'A scheduled job that checks the federal contract feed every hour and speaks up only when a posting is genuinely new.',
	stack: ['Python', 'GitHub Actions', 'REST APIs', 'CI/CD', 'Git'],

	/** One paragraph for the home page. */
	summary:
		"Federal contract opportunities are public, but keeping up with them means checking constantly, and the tools that do the checking start around $2,000 a year. I built this for a friend starting a small contracting business: a Python job on a cron schedule that costs nothing to run and only speaks up when a posting is genuinely new.",

	metrics: [
		{ value: '24×', label: 'runs per day' },
		{ value: '−90%', label: 'API calls' },
		{ value: '$0', label: 'to operate' },
		{ value: '0', label: 'duplicate alerts' }
	],

	/** Background on why any of this matters. Remove anything that stops being relevant. */
	links: [
		{
			label: 'SBA contracting assistance programs',
			href: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs',
			note: "Set-asides, 8(a), HUBZone, and WOSB: the programs that carve out a lane for small firms. They're also the eligibility rules the scoring step weighs most heavily."
		},
		{
			label: 'FAR Part 19, Small Business Programs',
			href: 'https://www.acquisition.gov/far/part-19',
			note: "The regulation behind those programs. It's the closest thing to a rulebook for who is actually allowed to bid on what."
		},
		{
			label: 'What it takes to bid at all',
			href: 'https://www.sba.gov/federal-contracting/contracting-guide/basic-requirements',
			note: 'Registration, NAICS codes, and size standards. Worth reading to see how much work happens before a small business can even respond to a posting.'
		},
		{
			label: 'SAM.gov Get Opportunities API',
			href: 'https://open.gsa.gov/api/get-opportunities-public-api/',
			note: 'Where the data comes from, including the daily request limit that shaped every design decision here.'
		}
	],

	/** The four filter stages, cheapest first. One line each. */
	gates: [
		{
			name: 'Server-side query filtering',
			cost: 'free',
			what: 'Every constraint the API accepts goes into the request itself. The cheapest record to process is the one the server never sends.'
		},
		{
			name: 'In-memory gating',
			cost: 'free',
			what: "Keyword logic and exclusions the API can't express, applied to results that are already in memory. The response is paid for either way."
		},
		{
			name: 'Hash-based deduplication',
			cost: 'free',
			what: "Fingerprints from earlier runs filter out everything already seen, which is most of it at 24 runs a day."
		},
		{
			name: 'Lazy detail fetching',
			cost: 'costs a request',
			what: "Only new, relevant records get a full fetch. By that point the request is close to guaranteed to be worth making."
		}
	],

	/** Scoring factors. Weights are configuration; these are an example set. */
	scoreFactors: [
		{ name: 'Specificity', weight: 35 },
		{ name: 'Eligibility', weight: 30 },
		{ name: 'Deadline proximity', weight: 20 },
		{ name: 'Contract signals', weight: 15 }
	]
};
