import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { site } from '@/lib/site';
import './globals.css';

export const metadata: Metadata = {
	metadataBase: new URL(site.url),
	title: { default: 'IronSmith: forge 3D models with code', template: `%s | ${site.name}` },
	description: site.description,
	icons: { icon: { url: '/favicon.svg', type: 'image/svg+xml' } },
	twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
