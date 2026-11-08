import Link from 'next/link';
import SiteLayout from '@/components/SiteLayout';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
	return (
		<SiteLayout>
			<section className="sheet py-30">
				<h1 className="font-display text-[192px] leading-[240px] text-accent">404</h1>
				<p className="mt-6 text-lg text-paper-dim">That page isn&apos;t in the forge.</p>
				<Link href="/getting-started/introduction/" className="mt-6 inline-block font-mono text-xs uppercase text-accent-light hover:underline">
					Go to the docs →
				</Link>
			</section>
		</SiteLayout>
	);
}
