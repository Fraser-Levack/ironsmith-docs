import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import TableOfContents from '@/components/docs/TableOfContents';
import { editUrl, getAllDocs, getDoc, getPager, lastUpdated } from '@/lib/docs';
import { renderMarkdown } from '@/lib/markdown';
import { site } from '@/lib/site';

interface Props {
	params: Promise<{ slug: string[] }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
	return getAllDocs().map((doc) => ({ slug: doc.slug.split('/') }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const doc = getDoc((await params).slug.join('/'));
	if (!doc) return {};
	const url = `/${doc.slug}/`;
	return {
		title: doc.title,
		description: doc.description,
		alternates: { canonical: url },
		openGraph: {
			title: doc.title,
			description: doc.description,
			url,
			siteName: site.name,
			type: 'article',
			locale: 'en',
		},
	};
}

const dateFormat = new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeZone: 'UTC' });

export default async function DocPage({ params }: Props) {
	const doc = getDoc((await params).slug.join('/'));
	if (!doc) notFound();

	const { content, headings } = await renderMarkdown(doc.body);
	const { prev, next } = getPager(doc.slug);
	const updated = lastUpdated(doc);

	return (
		<div className="xl:flex">
			<main className="min-w-0 flex-1 px-6 py-8">
				<div className="mx-auto max-w-3xl">
					<details className="mb-6 border border-line bg-sheet px-4 py-2 xl:hidden">
						<summary className="cursor-pointer text-sm font-semibold text-paper">On this page</summary>
						<div className="mt-3 pb-2">
							<TableOfContents headings={headings} />
						</div>
					</details>

					<h1 id="_top" className="text-4xl font-medium text-paper">
						{doc.title}
					</h1>
					<div className="docs-content mt-6">{content}</div>

					<footer className="mt-14 border-t border-line pt-6 text-sm text-paper-dim">
						<div className="flex flex-wrap justify-between gap-2">
							<a href={editUrl(doc)} className="hover:text-accent-light">
								Edit page
							</a>
							{updated && <span>Last updated: {dateFormat.format(updated)}</span>}
						</div>
						<div className="mt-6 grid gap-3 sm:grid-cols-2">
							{prev && (
								<Link
									href={`/${prev.slug}/`}
									rel="prev"
									className="border border-line p-3 transition-colors hover:border-accent"
								>
									<span className="block text-xs text-paper-dim">Previous</span>
									<span className="text-base text-paper">{prev.label}</span>
								</Link>
							)}
							{next && (
								<Link
									href={`/${next.slug}/`}
									rel="next"
									className="border border-line p-3 text-right transition-colors hover:border-accent sm:col-start-2"
								>
									<span className="block text-xs text-paper-dim">Next</span>
									<span className="text-base text-paper">{next.label}</span>
								</Link>
							)}
						</div>
					</footer>
				</div>
			</main>

			<aside className="hidden w-72 shrink-0 xl:block">
				<div className="sticky top-14 max-h-[calc(100vh-3.5rem)] overflow-y-auto px-4 py-8">
					<h2 className="mb-3 text-sm font-semibold text-paper">On this page</h2>
					<TableOfContents headings={headings} />
				</div>
			</aside>
		</div>
	);
}
