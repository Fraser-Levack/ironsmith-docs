'use client';

import { useState, type MouseEvent } from 'react';
import Sidebar from './Sidebar';

/** The sidebar as a slide-over panel on small screens. */
export default function MobileNav() {
	const [open, setOpen] = useState(false);

	function closeOnLinkClick(event: MouseEvent) {
		if ((event.target as Element).closest('a')) setOpen(false);
	}

	return (
		<div className="lg:hidden">
			<button
				type="button"
				aria-label={open ? 'Close menu' : 'Open menu'}
				aria-expanded={open}
				onClick={() => setOpen(!open)}
				className="flex size-9 items-center justify-center text-paper hover:text-accent-light"
			>
				<svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
					{open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
				</svg>
			</button>
			{open && (
				<div
					onClick={closeOnLinkClick}
					className="fixed inset-x-0 top-14 bottom-0 z-20 overflow-y-auto bg-sheet"
				>
					<Sidebar />
				</div>
			)}
		</div>
	);
}
