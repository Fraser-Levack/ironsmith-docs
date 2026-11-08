import Link from 'next/link';
import type { ReactNode } from 'react';

// Links in the top bar. Docs pages live under their Markdown paths.
const navLinks = [
	{ label: 'Docs', href: '/getting-started/introduction/' },
	{ label: 'Examples', href: '/getting-started/examples/' },
	{ label: 'Language', href: '/language/syntax/' },
	{ label: 'GitHub', href: 'https://github.com/Fraser-Levack/IronSmith' },
];

/** Top bar + footer shared by every React page. */
export default function SiteLayout({ children }: { children: ReactNode }) {
	return (
		<div className="min-h-screen bg-iron-900 text-iron-100 antialiased">
			{/* Faint ember glow at the top of the page */}
			<div className="pointer-events-none fixed inset-x-0 top-0 h-96 bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(226,89,29,0.14),transparent_70%)]" />

			<header className="relative border-b border-iron-500/60 bg-iron-700/80 backdrop-blur">
				<nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
					<Link href="/" className="text-lg font-bold tracking-tight text-iron-50">
						IronSmith
					</Link>
					<ul className="flex gap-6 text-sm">
						{navLinks.map((link) => (
							<li key={link.label}>
								<Link href={link.href} className="text-iron-200 transition-colors hover:text-ember-light">
									{link.label}
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</header>

			<main className="relative">{children}</main>

			<footer className="relative border-t border-iron-500/60 py-8 text-center text-sm text-iron-300">
				IronSmith is open source.{' '}
				<a href="https://github.com/Fraser-Levack/IronSmith" className="text-ember-light hover:underline">
					View it on GitHub
				</a>
				.
			</footer>
		</div>
	);
}
