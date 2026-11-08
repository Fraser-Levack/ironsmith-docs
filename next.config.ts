import type { NextConfig } from 'next';

const config: NextConfig = {
	// The site is fully static: `npm run build` writes plain files to out/.
	output: 'export',
	// Keep the URLs the site has always had (/language/csg/).
	trailingSlash: true,
};

export default config;
