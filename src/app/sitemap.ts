import type { MetadataRoute } from 'next';
import { getAllDocs } from '@/lib/docs';
import { site } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
	return [{ url: `${site.url}/` }, ...getAllDocs().map((doc) => ({ url: `${site.url}/${doc.slug}/` }))];
}
