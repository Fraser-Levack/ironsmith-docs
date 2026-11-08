// Site-wide settings, and the docs sidebar.

export const site = {
	name: 'IronSmith',
	description:
		'A terminal-based 3D modelling scripting language with a GPU-accelerated raymarching viewer.',
	// Update this to the real domain if the site moves (used for the sitemap and canonical URLs).
	url: 'https://ironsmith-modeler-docs.vercel.app',
	github: 'https://github.com/Fraser-Levack/IronSmith',
	editBaseUrl: 'https://github.com/Fraser-Levack/ironsmith-docs/edit/master/',
};

export interface SidebarItem {
	label: string;
	/** Path of the Markdown file under src/content/docs/, without `.md`. */
	slug: string;
}

export interface SidebarGroup {
	label: string;
	items: SidebarItem[];
}

export const sidebar: SidebarGroup[] = [
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
];
