# React pages

The documentation pages are Markdown files in `src/content/docs/`, built by
Starlight. Everything else, starting with the **home page**, is plain React +
TypeScript + Tailwind, here.

```
src/react/
├── pages/HomePage.tsx        ← the home page: edit the content arrays at the top
├── components/SiteLayout.tsx ← top bar and footer shared by React pages
├── components/IrsmCode.tsx   ← code panel with .irsm syntax colours
└── styles.css                ← Tailwind, plus the site colours (bg-iron-900, text-ember, ...)
```

## Editing the home page

Open `pages/HomePage.tsx`. The text, buttons, features and gallery are arrays
at the top of the file; the layout is below them and uses ordinary Tailwind
classes. Images live in `public/` and are referenced from the site root
(`public/gallery/robot.png` is `/gallery/robot.png`).

Run `npm run dev` and the page reloads as you save.

## Adding another React page

Astro only treats `.astro` and `.md` files as pages, so each React page needs
a tiny wrapper in `src/pages/` (copy `src/pages/index.astro`):

1. Create the component, e.g. `src/react/pages/ShowcasePage.tsx`, wrapped in
   `<SiteLayout>`.
2. Copy `src/pages/index.astro` to `src/pages/showcase.astro`, and change the
   import and `<title>`. The page is then served at `/showcase/`.

## Interactivity

React pages are rendered to plain HTML at build time, with no JavaScript sent
to the browser. If you add something interactive (`useState`, click handlers,
...), add `client:load` where the component is used in the wrapper:
`<HomePage client:load />`.
