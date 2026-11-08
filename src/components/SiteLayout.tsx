import Link from 'next/link';
import type { ReactNode } from 'react';

// Links in the top bar. Docs pages live under their Markdown paths.
const navLinks = [
	{ label: 'Docs', href: '/getting-started/introduction/' },
	{ label: 'Examples', href: '/getting-started/examples/' },
	{ label: 'Language', href: '/language/syntax/' },
	{ label: 'GitHub', href: 'https://github.com/Fraser-Levack/IronSmith' },
];

/** Width of a label in whole grid squares (monospace type is 8px per character). */
function labelWidth(label: string) {
	return Math.ceil((label.length * 8) / 24) * 24;
}

/** Top bar + footer shared by every React page. */
export default function SiteLayout({ children }: { children: ReactNode }) {
	return (
		<div className="grid-page min-h-screen text-paper antialiased">
			<header className="rule-b">
				<div className="sheet">
					<nav className="flex flex-wrap items-center justify-between py-3 font-mono text-xs uppercase">
						<Link href="/" className="font-medium text-accent-light">
							IronSmith
						</Link>
						<ul className="flex sm:gap-6">
							{navLinks.map((link) => (
								<li key={link.label} style={{ width: labelWidth(link.label) }}>
									<Link href={link.href} className="text-paper transition-colors hover:text-accent-light">
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</nav>
				</div>
			</header>

			<main>{children}</main>

			<footer className="rule-t font-mono text-xs uppercase">
				<div className="sheet flex flex-wrap justify-between py-3 text-paper-dim">
					<span>IronSmith is open source   © 2024 Fraser Levack</span>
					<a href="https://github.com/Fraser-Levack/IronSmith" className="text-accent-light hover:underline">
						View it on GitHub
					</a>
				</div>
			</footer>
		</div>
	);
}
