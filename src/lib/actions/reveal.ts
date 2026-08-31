/**
 * Fades a block in the first time it scrolls into view.
 *
 * The action only runs in the browser, so prerendered HTML ships fully visible:
 * with JavaScript off, nothing is hidden. Anyone who prefers reduced motion gets
 * the finished state immediately.
 */
export function reveal(node: HTMLElement, delay = 0) {
	const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	if (reduced || typeof IntersectionObserver === 'undefined') {
		node.classList.add('is-visible');
		return;
	}

	node.classList.add('reveal');
	if (delay) node.style.setProperty('--reveal-delay', `${delay}ms`);

	const observer = new IntersectionObserver(
		([entry]) => {
			if (!entry.isIntersecting) return;
			node.classList.add('is-visible');
			observer.disconnect();
		},
		{ threshold: 0.08, rootMargin: '0px 0px -8% 0px' }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
