import type { ComponentProps, ReactNode } from 'react';
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';
import Link from 'next/link';
import rehypeShiki from '@shikijs/rehype';
import type { Root as HastRoot } from 'hast';
import { toJsxRuntime } from 'hast-util-to-jsx-runtime';
import { toString as hastToString } from 'hast-util-to-string';
import type { Paragraph, Root as MdastRoot, Text } from 'mdast';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import remarkDirective from 'remark-directive';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkSmartypants from 'remark-smartypants';
import { unified } from 'unified';
import { SKIP, visit } from 'unist-util-visit';
import { VFile } from 'vfile';
import CodeBlock from '@/components/docs/CodeBlock';

const CALLOUT_TITLES: Record<string, string> = {
	note: 'Note',
	tip: 'Tip',
	caution: 'Caution',
	danger: 'Danger',
};

/**
 * Turns `:::tip[Title]` blocks into callouts. remark-directive also reads
 * things like `a:b` in ordinary prose as directives, so those are put back
 * exactly as they were written.
 */
function remarkCallouts() {
	return (tree: MdastRoot, file: VFile) => {
		visit(tree, (node, index, parent) => {
			if (node.type === 'textDirective' || node.type === 'leafDirective') {
				const start = node.position!.start.offset!;
				const end = node.position!.end.offset!;
				const text: Text = { type: 'text', value: String(file.value).slice(start, end) };
				parent!.children[index!] =
					node.type === 'textDirective' ? text : ({ type: 'paragraph', children: [text] } as Paragraph);
				return SKIP;
			}
			if (node.type !== 'containerDirective') return;

			const defaultTitle = CALLOUT_TITLES[node.name];
			if (!defaultTitle) {
				throw new Error(
					`Unknown callout ":::${node.name}" at line ${node.position?.start.line}. Use one of: ${Object.keys(CALLOUT_TITLES).join(', ')}`,
				);
			}
			node.data = { hName: 'aside', hProperties: { className: ['callout', `callout-${node.name}`] } };

			const first = node.children[0];
			if (first?.type === 'paragraph' && first.data?.directiveLabel) {
				first.data.hProperties = { className: ['callout-title'] };
			} else {
				node.children.unshift({
					type: 'paragraph',
					data: { hProperties: { className: ['callout-title'] } },
					children: [{ type: 'text', value: defaultTitle }],
				});
			}
		});
	};
}

/** Code colours, drawn from the site palette in globals.css. */
const blueprintTheme = {
	name: 'blueprint',
	type: 'dark' as const,
	colors: { 'editor.background': '#24464f', 'editor.foreground': '#f6f1ea' },
	tokenColors: [
		{ scope: ['comment'], settings: { foreground: '#b9cdcf', fontStyle: 'italic' } },
		{ scope: ['string'], settings: { foreground: '#fbd9cc' } },
		{
			scope: ['constant.numeric', 'constant.language', 'keyword', 'storage', 'entity.name.tag', 'entity.name.section'],
			settings: { foreground: '#f5b199' },
		},
		{ scope: ['entity.name.function', 'support.function'], settings: { foreground: '#fbd9cc' } },
	],
};

const processor = unified()
	.use(remarkParse)
	.use(remarkGfm)
	.use(remarkDirective)
	.use(remarkCallouts)
	.use(remarkSmartypants)
	.use(remarkRehype, { allowDangerousHtml: true })
	.use(rehypeRaw)
	.use(rehypeSlug)
	.use(rehypeShiki, { theme: blueprintTheme, lazy: true, defaultLanguage: 'text', fallbackLanguage: 'text' });

export interface Heading {
	id: string;
	text: string;
	depth: number;
}

export interface Section {
	/** Heading anchor; undefined for the text before the first heading. */
	id?: string;
	heading?: string;
	text: string;
}

async function toTree(markdown: string): Promise<HastRoot> {
	const file = new VFile(markdown);
	return (await processor.run(processor.parse(file), file)) as HastRoot;
}

function DocLink({ href = '', ...props }: ComponentProps<'a'>) {
	// Site pages navigate client-side; files in public/ and other sites are ordinary links.
	const isPage = href.startsWith('/') && !/\.\w+($|[?#])/.test(href);
	return isPage ? <Link href={href} {...props} /> : <a href={href} {...props} />;
}

function anchored(Tag: 'h2' | 'h3' | 'h4') {
	return function AnchoredHeading({ id, children, ...props }: ComponentProps<'h2'>) {
		return (
			<Tag id={id} {...props}>
				{children}
				<a href={`#${id}`} className="heading-anchor" aria-label="Link to this section">
					#
				</a>
			</Tag>
		);
	};
}

const components = {
	a: DocLink,
	pre: CodeBlock,
	h2: anchored('h2'),
	h3: anchored('h3'),
	h4: anchored('h4'),
};

/** Render Markdown to React, with the headings for the table of contents. */
export async function renderMarkdown(markdown: string): Promise<{ content: ReactNode; headings: Heading[] }> {
	const tree = await toTree(markdown);
	const headings: Heading[] = [];
	for (const node of tree.children) {
		if (node.type === 'element' && (node.tagName === 'h2' || node.tagName === 'h3')) {
			headings.push({
				id: String(node.properties.id),
				text: hastToString(node),
				depth: node.tagName === 'h2' ? 2 : 3,
			});
		}
	}
	return { content: toJsxRuntime(tree, { Fragment, jsx, jsxs, components }), headings };
}

/** Split Markdown into plain-text sections at each h2/h3, for the search index. */
export async function markdownSections(markdown: string): Promise<Section[]> {
	const tree = await toTree(markdown);
	const sections: Section[] = [{ text: '' }];
	for (const node of tree.children) {
		if (node.type !== 'element') continue;
		const text = hastToString(node);
		if (node.tagName === 'h2' || node.tagName === 'h3') {
			sections.push({ id: String(node.properties.id), heading: text, text: '' });
		} else {
			sections[sections.length - 1].text += `${text} `;
		}
	}
	return sections;
}
