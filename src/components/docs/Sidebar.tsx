'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { sidebar } from '@/lib/site';

export default function Sidebar() {
	const current = usePathname().replace(/^\/|\/$/g, '');

	return (
		<nav aria-label="Documentation" className="space-y-3 p-4 text-sm">
			{sidebar.map((group) => (
				<details key={group.label} open className="group">
					<summary className="flex cursor-pointer list-none items-center justify-between px-2 py-1 font-mono text-xs font-medium tracking-widest uppercase text-accent-light [&::-webkit-details-marker]:hidden">
						{group.label}
						<svg
							viewBox="0 0 24 24"
							className="size-4 -rotate-90 transition-transform group-open:rotate-0"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							aria-hidden
						>
							<path d="M6 9l6 6 6-6" />
						</svg>
					</summary>
					<ul className="mt-1 ml-2 space-y-0.5 border-l border-line pl-2">
						{group.items.map((item) => {
							const active = item.slug === current;
							return (
								<li key={item.slug}>
									<Link
										href={`/${item.slug}/`}
										aria-current={active ? 'page' : undefined}
										className={
											active
												? 'block bg-accent px-2 py-1 font-medium text-on-accent'
												: 'block px-2 py-1 text-paper transition-colors hover:text-accent-light'
										}
									>
										{item.label}
									</Link>
								</li>
							);
						})}
					</ul>
				</details>
			))}
		</nav>
	);
}
