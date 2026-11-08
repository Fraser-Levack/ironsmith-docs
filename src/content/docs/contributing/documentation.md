---
title: Improving these Docs
description: How this documentation site works and how to contribute a page in plain Markdown.
---

This site is community-editable by design. **Every page is a plain Markdown
file** — if you can write Markdown, you can improve the IronSmith docs. No web
development knowledge required.

## The fast path: edit in your browser

Every page has an **"Edit page"** link at the bottom. It takes you straight to
the file on GitHub, where you can edit it in the browser and open a pull
request in a couple of clicks. For typos and small clarifications, that's the
whole process.

## How the site works

The site is built with [Next.js](https://nextjs.org). All content lives in one
folder:

```
ironsmith-docs/
├── src/content/docs/        ← every documentation page is a Markdown file here
│   ├── getting-started/
│   ├── language/
│   ├── guides/
│   └── contributing/
└── src/app/                 ← the home page (React + TypeScript + Tailwind)
```

The **home page** isn't Markdown: it's a React component,
`src/app/page.tsx`, styled with Tailwind. Its text, features and gallery are
arrays at the top of that file. See `src/app/README.md`.

A page is a Markdown file with a small header ("frontmatter"):

```markdown
---
title: My New Page
description: One sentence used for search results and link previews.
---

Regular **Markdown** from here on: headings, code blocks, tables, images...
```

That's it — the build turns it into a styled page with the site theme and
search indexing, automatically.

## Adding a whole new page

1. Create a `.md` file in the right folder under `src/content/docs/`
   (e.g. `guides/my-guide.md`)
2. Add the `title` and `description` frontmatter shown above
3. Register it in the sidebar: add one line to the `sidebar` section of
   `src/lib/site.ts`
4. Open a pull request

## Previewing locally (optional)

If you want to see your changes rendered before opening a PR:

```bash
git clone https://github.com/Fraser-Levack/ironsmith-docs.git
cd ironsmith-docs
npm install
npm run dev      # preview at localhost:3000
```

After saving a Markdown file, refresh the browser to see the change.

## Nice extras (all optional)

Callout boxes (`note`, `tip`, `caution` and `danger`) are built in:

```markdown
:::tip
Handy advice goes here.
:::

:::caution
Warn readers about sharp edges.
:::
```

Images go in `public/` and are referenced with absolute paths like
`/demos/DemoCastle.png`.

## Writing style

- Keep the tone friendly and practical — show a code example early.
- `.irsm` code blocks use the `plaintext` language tag.
- If you add or change a language feature in IronSmith itself, update the
  matching page under **The .irsm Language** in the same PR.
