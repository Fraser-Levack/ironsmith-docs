## Development

Start the dev server with `npm run dev` (run it in the background; it serves http://localhost:3000). `npm run build` writes the static site to `out/`, and `npm run preview` serves that build.

## Project layout

- `src/content/docs/**/*.md`: the documentation pages, rendered by `src/lib/markdown.tsx`.
- `src/lib/site.ts`: site settings and the sidebar. New pages need a sidebar entry here.
- `src/app/`: Next.js App Router routes, including the home page (`page.tsx`) and the docs route (`(docs)/[...slug]/page.tsx`).
- `src/components/`: shared React components. Anything using hooks or browser APIs needs `"use client"`.

The site uses `output: "export"`, so it must stay fully static: no server-only runtime features such as middleware, or Route Handlers that are not `force-static`.

## Documentation

Full documentation: https://nextjs.org/docs

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
