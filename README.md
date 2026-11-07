# IronSmith Documentation

The documentation website for [IronSmith](https://github.com/Fraser-Levack/IronSmith) —
a terminal-based 3D modelling scripting language with a GPU-accelerated
raymarching viewer.

Built with [Astro Starlight](https://starlight.astro.build). Every page is a
plain Markdown file, so anyone can contribute documentation without touching
web code.

## Contributing docs

All content lives in `src/content/docs/` — one Markdown file per page:

```
src/content/docs/
├── index.mdx            # landing page
├── getting-started/
├── language/            # .irsm language reference
├── guides/              # filters, exporting, configuration, architecture
└── contributing/
```

To fix or add a page:

1. Edit the `.md` file (or use the "Edit page" link on any page of the live site)
2. For new pages, add a sidebar entry in `astro.config.mjs`
3. Open a pull request

See the [Improving these Docs](src/content/docs/contributing/documentation.md)
page for the full guide, including frontmatter format and callout syntax.

## Local development

```bash
npm install
npm run dev        # live preview at http://localhost:4321
npm run build      # production build to ./dist/
npm run preview    # preview the production build
```

## Deploying

The site builds to fully static files (`npm run build` → `dist/`), so it can be
hosted anywhere: GitHub Pages, Netlify, Vercel, Cloudflare Pages.
