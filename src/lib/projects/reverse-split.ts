import discordAlerts from '$lib/assets/reverse-split-discord.png';
import type { Project } from './types';

export const reverseSplit: Project = {
	slug: 'reverse-split',
	name: 'Reverse Split Arbitrage Bot',
	shortName: 'Reverse Split Arbitrage Bot',
	status: 'Shipped',
	eyebrow: 'Automation · Built with friends',
	tagline:
		'A pipeline that ingests SEC reverse-split filings as they post, classifies their fractional-share terms with an LLM, and routes confirmed opportunities through a multi-broker execution layer.',
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
			name: 'Brokerage APIs',
			why: 'One execution layer abstracts over multiple brokerage APIs, so a single decision becomes an order everywhere it needs to be.'
		},
		{
			name: 'Discord API',
			why: 'A webhook is the UI: each opportunity arrives with what you need to decide in seconds.'
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
	tradeoffs: [
		{ heading: 'A decision and what it cost', detail: 'TODO' },
		{ heading: 'A failure mode I hit', detail: 'TODO' },
		{ heading: 'What I would do differently', detail: 'TODO' },
		{ heading: 'Where it breaks at ten times the scale', detail: 'TODO' }
	],
	references: [
		{ label: 'Investor.gov: Reverse stock splits', href: 'https://www.investor.gov/introduction-investing/investing-basics/glossary/reverse-stock-splits' },
		{ label: 'SEC EDGAR full-text search', href: 'https://www.sec.gov/edgar/search/' },
		{ label: 'FINRA: Stock splits explained', href: 'https://www.finra.org/investors/insights/stock-splits' }
	]
};
