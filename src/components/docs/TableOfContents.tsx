'use client';

import { useEffect, useState } from 'react';
import type { Heading } from '@/lib/markdown';

const TOP = '_top';
// Past this many pixels from the top of the window, a heading counts as "reached".
const OFFSET = 100;

export default function TableOfContents({ headings }: { headings: Heading[] }) {
	const [active, setActive] = useState(TOP);

	useEffect(() => {
		function update() {
			let current = TOP;
			for (const { id } of headings) {
				const element = document.getElementById(id);
				if (element && element.getBoundingClientRect().top <= OFFSET) current = id;
			}
			setActive(current);
		}
		update();
		window.addEventListener('scroll', update, { passive: true });
		return () => window.removeEventListener('scroll', update);
	}, [headings]);

	const entries = [{ id: TOP, text: 'Overview', depth: 2 }, ...headings];

	return (
		<ul className="space-y-1.5 text-sm">
			{entries.map((heading) => (
				<li key={heading.id} className={heading.depth === 3 ? 'pl-4' : undefined}>
					<a
						href={`#${heading.id}`}
						aria-current={active === heading.id ? 'true' : undefined}
						className={
							active === heading.id
								? 'text-ember-light'
								: 'text-iron-200 transition-colors hover:text-iron-50'
						}
					>
						{heading.text}
					</a>
				</li>
			))}
		</ul>
	);
}
