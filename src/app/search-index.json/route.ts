import type { SearchEntry } from '@/components/docs/Search';
import { getAllDocs } from '@/lib/docs';
import { markdownSections } from '@/lib/markdown';

export const dynamic = 'force-static';

export async function GET() {
	const pages = await Promise.all(
		getAllDocs().map(async (doc) => {
			const sections = await markdownSections(doc.body);
			return sections
				.filter((section) => section.heading || section.text.trim())
				.map(
					(section): SearchEntry => ({
						href: `/${doc.slug}/${section.id ? `#${section.id}` : ''}`,
						page: doc.title,
						heading: section.heading,
						text: section.text.replace(/\s+/g, ' ').trim(),
					}),
				);
		}),
	);
	return Response.json(pages.flat());
}
