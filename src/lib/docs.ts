import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { cache } from 'react';
import { sidebar, site, type SidebarItem } from './site';

const CONTENT_DIR = 'src/content/docs';

export interface Doc {
	slug: string;
	title: string;
	description: string;
	/** Markdown without the frontmatter. */
	body: string;
	/** Repo-relative path of the Markdown file. */
	file: string;
}

function readDoc(relativePath: string): Doc {
	const file = path.posix.join(CONTENT_DIR, relativePath);
	const { data, content } = matter(readFileSync(path.join(process.cwd(), file), 'utf8'));
	if (typeof data.title !== 'string' || typeof data.description !== 'string') {
		throw new Error(`${file}: frontmatter needs both a "title" and a "description"`);
	}
	return {
		slug: relativePath.replace(/\.md$/, ''),
		title: data.title,
		description: data.description,
		body: content,
		file,
	};
}

/** Every Markdown page. Fails the build if the sidebar points at a missing page. */
export const getAllDocs = cache((): Doc[] => {
	const docs = readdirSync(path.join(process.cwd(), CONTENT_DIR), { recursive: true, encoding: 'utf8' })
		.map((entry) => entry.replaceAll('\\', '/'))
		.filter((entry) => entry.endsWith('.md'))
		.map(readDoc);

	const slugs = new Set(docs.map((doc) => doc.slug));
	for (const item of sidebarItems()) {
		if (!slugs.has(item.slug)) {
			throw new Error(`Sidebar entry "${item.label}" has no page at ${CONTENT_DIR}/${item.slug}.md`);
		}
	}
	return docs;
});

export function getDoc(slug: string): Doc | undefined {
	return getAllDocs().find((doc) => doc.slug === slug);
}

function sidebarItems(): SidebarItem[] {
	return sidebar.flatMap((group) => group.items);
}

/** The pages before and after this one, in sidebar order. */
export function getPager(slug: string): { prev?: SidebarItem; next?: SidebarItem } {
	const items = sidebarItems();
	const index = items.findIndex((item) => item.slug === slug);
	if (index === -1) return {};
	return { prev: items[index - 1], next: items[index + 1] };
}

export function editUrl(doc: Doc): string {
	return site.editBaseUrl + doc.file;
}

/** When the page was last committed, or undefined if git history is unavailable. */
export function lastUpdated(doc: Doc): Date | undefined {
	try {
		const output = execFileSync('git', ['log', '-1', '--format=%cI', '--', doc.file], {
			encoding: 'utf8',
			stdio: ['ignore', 'pipe', 'ignore'],
		}).trim();
		return output ? new Date(output) : undefined;
	} catch {
		return undefined;
	}
}
