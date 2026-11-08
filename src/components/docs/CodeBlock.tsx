'use client';

import { useRef, useState, type ComponentProps } from 'react';

/** A Markdown code block with a copy button. */
export default function CodeBlock(props: ComponentProps<'pre'>) {
	const pre = useRef<HTMLPreElement>(null);
	const [copied, setCopied] = useState(false);

	async function copy() {
		await navigator.clipboard.writeText(pre.current?.textContent ?? '');
		setCopied(true);
		setTimeout(() => setCopied(false), 1500);
	}

	return (
		<div className="code-block">
			<pre ref={pre} {...props} />
			<button type="button" onClick={copy} className="code-copy">
				{copied ? 'Copied' : 'Copy'}
			</button>
		</div>
	);
}
