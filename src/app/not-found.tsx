import Link from 'next/link';
import SiteLayout from '@/components/SiteLayout';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
	return (
		<SiteLayout>
			<section className="mx-auto max-w-3xl px-6 py-32 text-center">
				<h1 className="text-5xl font-extrabold text-iron-50">404</h1>
				<p className="mt-4 text-lg text-iron-200">That page isn&apos;t in the forge.</p>
				<Link href="/getting-started/introduction/" className="mt-6 inline-block text-ember-light hover:underline">
					Go to the docs →
				</Link>
			</section>
		</SiteLayout>
	);
}
