import Link from 'next/link';
import type { ReactNode } from 'react';
import MobileNav from '@/components/docs/MobileNav';
import Search from '@/components/docs/Search';
import Sidebar from '@/components/docs/Sidebar';
import { site } from '@/lib/site';
import './docs.css';

// This layout sits above the [...slug] segment so the sidebar stays mounted,
// and keeps its scroll position, as readers move between pages.
export default function DocsLayout({ children }: { children: ReactNode }) {
	return (
		<div className="min-h-screen bg-iron-900 text-iron-100 antialiased">
			<header className="fixed inset-x-0 top-0 z-30 flex h-14 items-center gap-4 border-b border-iron-500 bg-iron-700 px-4">
				<MobileNav />
				<Link href="/" className="text-xl font-semibold text-ember-light">
					{site.name}
				</Link>
				<div className="flex flex-1 justify-center">
					<Search />
				</div>
				<a href={site.github} aria-label="GitHub" className="text-iron-200 transition-colors hover:text-ember-light">
					<svg viewBox="0 0 24 24" className="size-6" fill="currentColor" aria-hidden>
						<path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.6.2 2.8.1 3.2.8.8 1.3 1.9 1.3 3.1 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.1.9 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3" />
					</svg>
				</a>
			</header>

			<aside className="fixed top-14 bottom-0 left-0 hidden w-72 overflow-y-auto border-r border-iron-500 bg-iron-800 lg:block">
				<Sidebar />
			</aside>

			<div className="pt-14 lg:pl-72">{children}</div>
		</div>
	);
}
