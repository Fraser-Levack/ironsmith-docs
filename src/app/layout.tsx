import type { Metadata } from 'next';
import { Anton, IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google';
import type { ReactNode } from 'react';
import { site } from '@/lib/site';
import './globals.css';

// Anton stands in for Moara in the hero until a licensed copy is added: see globals.css.
const anton = Anton({ weight: '400', subsets: ['latin'], variable: '--font-anton' });
const plexSans = IBM_Plex_Sans({ weight: ['400', '500', '600'], subsets: ['latin'], variable: '--font-plex-sans' });
const plexMono = IBM_Plex_Mono({ weight: ['400', '500'], subsets: ['latin'], variable: '--font-plex-mono' });

export const metadata: Metadata = {
	metadataBase: new URL(site.url),
	title: { default: 'IronSmith: forge 3D models with code', template: `%s | ${site.name}` },
	description: site.description,
	icons: { icon: { url: '/favicon.svg', type: 'image/svg+xml' } },
	twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" className={`${anton.variable} ${plexSans.variable} ${plexMono.variable}`}>
			<body>{children}</body>
		</html>
	);
}
