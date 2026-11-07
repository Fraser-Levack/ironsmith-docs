// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// The site has two halves:
//  - The documentation (src/content/docs/**/*.md) is built by Starlight.
//  - The home page and any other custom pages are React + TypeScript +
//    Tailwind components in src/react/. See src/react/README.md.
//
// https://astro.build/config
export default defineConfig({
	// Update this to the real domain when the site is deployed
	// (used for the sitemap and canonical URLs).
	site: 'https://ironsmith-modeler-docs.vercel.app/',

	integrations: [
		starlight({
			title: 'IronSmith',
			description:
				'A terminal-based 3D modelling scripting language with a GPU-accelerated raymarching viewer.',
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/Fraser-Levack/IronSmith',
				},
			],
			editLink: {
				baseUrl: 'https://github.com/Fraser-Levack/ironsmith-docs/edit/main/',
			},
			customCss: ['./src/styles/custom.css'],
			// Dark theme only: no theme picker, never switch to light.
			components: {
				ThemeProvider: './src/components/ThemeProvider.astro',
				ThemeSelect: './src/components/ThemeSelect.astro',
			},
			lastUpdated: true,
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ label: 'Introduction', slug: 'getting-started/introduction' },
						{ label: 'Installation', slug: 'getting-started/installation' },
						{ label: 'Your First Model', slug: 'getting-started/first-model' },
						{ label: 'Examples', slug: 'getting-started/examples' },
					],
				},
				{
					label: 'The .irsm Language',
					items: [
						{ label: 'Syntax & Variables', slug: 'language/syntax' },
						{ label: 'Primitives', slug: 'language/primitives' },
						{ label: 'Transformations', slug: 'language/transformations' },
						{ label: 'CSG Operations', slug: 'language/csg' },
						{ label: 'Materials & Paint', slug: 'language/materials' },
						{ label: 'Lighting', slug: 'language/lighting' },
						{ label: 'Camera Animation', slug: 'language/animation' },
					],
				},
				{
					label: 'Guides',
					items: [
						{ label: 'The Editor', slug: 'guides/editor' },
						{ label: 'Command Line & AI Agents', slug: 'guides/cli' },
						{ label: 'Filters & Post-Processing', slug: 'guides/filters' },
						{ label: 'Exporting Models', slug: 'guides/exporting' },
						{ label: 'Exporting Video', slug: 'guides/video-export' },
						{ label: 'Configuration', slug: 'guides/configuration' },
					],
				},
				{
					label: 'Under the Hood',
					items: [{ label: 'Architecture', slug: 'guides/architecture' }],
				},
				{
					label: 'Contributing',
					items: [
						{ label: 'Contributing to IronSmith', slug: 'contributing/ironsmith' },
						{ label: 'Improving these Docs', slug: 'contributing/documentation' },
					],
				},
			],
		}),
		react(),
	],

	vite: {
		plugins: [tailwindcss()],
	},
});
