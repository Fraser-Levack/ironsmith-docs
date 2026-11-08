'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';

export interface SearchEntry {
	href: string;
	page: string;
	heading?: string;
	text: string;
}

const MAX_RESULTS = 12;
const SNIPPET_RADIUS = 70;

function find(entries: SearchEntry[], terms: string[]): SearchEntry[] {
	const scored: { entry: SearchEntry; score: number }[] = [];
	for (const entry of entries) {
		const page = entry.page.toLowerCase();
		const heading = entry.heading?.toLowerCase() ?? '';
		const text = entry.text.toLowerCase();
		let score = 0;
		for (const term of terms) {
			const termScore = (heading.includes(term) ? 5 : 0) + (page.includes(term) ? 3 : 0) + (text.includes(term) ? 1 : 0);
			if (termScore === 0) {
				score = 0;
				break;
			}
			score += termScore;
		}
		if (score > 0) scored.push({ entry, score });
	}
	return scored
		.sort((a, b) => b.score - a.score)
		.slice(0, MAX_RESULTS)
		.map(({ entry }) => entry);
}

function highlight(text: string, terms: string[]): ReactNode[] {
	const pattern = new RegExp(`(${terms.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
	// With one capture group, split puts the matches at the odd positions.
	return text.split(pattern).map((part, i) => (i % 2 ? <mark key={i}>{part}</mark> : part));
}

function snippet(text: string, terms: string[]): string {
	const lower = text.toLowerCase();
	const hits = terms.map((term) => lower.indexOf(term)).filter((hit) => hit >= 0);
	const hit = hits.length ? Math.min(...hits) : 0;
	const start = Math.max(0, hit - SNIPPET_RADIUS);
	const end = Math.min(text.length, hit + SNIPPET_RADIUS * 2);
	return `${start > 0 ? '…' : ''}${text.slice(start, end).trim()}${end < text.length ? '…' : ''}`;
}

export default function Search() {
	const dialog = useRef<HTMLDialogElement>(null);
	const input = useRef<HTMLInputElement>(null);
	const loading = useRef(false);
	const [entries, setEntries] = useState<SearchEntry[]>([]);
	const [failed, setFailed] = useState(false);
	const [query, setQuery] = useState('');

	function open() {
		if (!dialog.current || dialog.current.open) return;
		dialog.current.showModal();
		input.current?.focus();
		if (loading.current) return;
		loading.current = true;
		fetch('/search-index.json')
			.then((response) => {
				if (!response.ok) throw new Error(String(response.status));
				return response.json();
			})
			.then((index: SearchEntry[]) => {
				setEntries(index);
				setFailed(false);
			})
			.catch(() => {
				setFailed(true);
				loading.current = false;
			});
	}

	useEffect(() => {
		function onKeyDown(event: KeyboardEvent) {
			if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
				event.preventDefault();
				open();
			}
		}
		window.addEventListener('keydown', onKeyDown);
		return () => window.removeEventListener('keydown', onKeyDown);
	}, []);

	const terms = useMemo(() => query.toLowerCase().split(/\s+/).filter(Boolean), [query]);
	const results = useMemo(() => find(entries, terms), [entries, terms]);

	return (
		<>
			<button
				type="button"
				onClick={open}
				aria-label="Search"
				className="flex h-9 w-full max-w-sm items-center justify-between border border-line bg-sheet px-3 text-sm text-paper-dim transition-colors hover:border-line hover:text-paper-dim"
			>
				<span>Search</span>
				<kbd className="hidden text-xs sm:inline">Ctrl K</kbd>
			</button>

			<dialog
				ref={dialog}
				onClose={() => setQuery('')}
				onClick={(event) => {
					// A click on the dialog element itself is a click on the backdrop.
					if (event.target === dialog.current) dialog.current.close();
				}}
				className="search-dialog"
			>
				<div className="p-4">
					<input
						ref={input}
						type="search"
						value={query}
						onChange={(event) => setQuery(event.target.value)}
						placeholder="Search the docs"
						aria-label="Search the docs"
						className="w-full border border-line bg-sheet-deep px-3 py-2 text-paper outline-none focus:border-accent"
					/>
					<div className="mt-3 max-h-[60vh] overflow-y-auto">
						{failed && <p className="p-3 text-sm text-paper-dim">Search couldn&apos;t be loaded. Try again.</p>}
						{!failed && terms.length > 0 && results.length === 0 && (
							<p className="p-3 text-sm text-paper-dim">No results for “{query}”.</p>
						)}
						<ul>
							{results.map((result) => (
								<li key={result.href}>
									<Link
										href={result.href}
										onClick={() => dialog.current?.close()}
										className="block p-3 hover:bg-sheet-deep focus:bg-sheet-deep"
									>
										<div className="text-sm font-semibold text-paper">
											{result.page}
											{result.heading && <span className="font-normal text-accent-light"> › {result.heading}</span>}
										</div>
										<div className="search-snippet mt-1 text-sm text-paper-dim">
											{highlight(snippet(result.text, terms), terms)}
										</div>
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			</dialog>
		</>
	);
}
