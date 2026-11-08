# React pages

The documentation pages are Markdown files in `src/content/docs/`. Everything
else, starting with the **home page**, is plain React + TypeScript + Tailwind,
using the Next.js App Router.

```
src/
├── app/page.tsx               ← the home page: edit the content arrays at the top
├── app/globals.css            ← Tailwind, plus the site colours (bg-iron-900, text-ember, ...)
├── app/(docs)/                ← the layout and route that render the Markdown docs
├── components/SiteLayout.tsx  ← top bar and footer shared by React pages
└── components/IrsmCode.tsx    ← code panel with .irsm syntax colours
```

## Editing the home page

Open `page.tsx`. The text, buttons, features and gallery are arrays at the top
of the file; the layout is below them and uses ordinary Tailwind classes.
Images live in `public/` and are referenced from the site root
(`public/gallery/robot.png` is `/gallery/robot.png`).

Run `npm run dev` and the page reloads as you save.

## Adding another React page

Create `src/app/showcase/page.tsx`, wrap its content in `<SiteLayout>`, and
export a `metadata` object with its `title`. The page is then served at
`/showcase/`.

## Interactivity

Pages are Server Components, rendered to HTML at build time. If you add
something interactive (`useState`, click handlers, ...), put it in its own
component with `'use client';` as the first line of the file.
