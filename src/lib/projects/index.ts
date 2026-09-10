import { sast } from './sast';
import { reverseSplit } from './reverse-split';
import { contractMonitor } from './contract-monitor';

export type { Project, ProjectStatus } from './types';

export const projects = [sast, reverseSplit, contractMonitor];

export function projectHref(project: { slug: string }) {
	return `/project/${project.slug}/`;
}
