import type { ReactNode } from 'react';

// Words coloured like the IronSmith editor does.
const SHAPES = ['cube', 'sphere', 'cylinder', 'cone', 'torus'];
const CSG = ['union', 'difference', 'intersection', 'group'];
const TRANSFORMS = ['move', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'repeat', 'paint', 'material', 'light', 'camera'];

/** Colour one line of .irsm code. */
function highlight(line: string): ReactNode[] {
	const out: ReactNode[] = [];
	// comment | hex colour | number | word | anything else
	const token = /(\/\/.*)|(#[0-9a-fA-F]{6})|(\d+\.?\d*)|([A-Za-z_]\w*)|([^\w#/]+|\/|#)/g;
	let match: RegExpExecArray | null;
	let i = 0;
	while ((match = token.exec(line)) !== null) {
		const [text, comment, hex, num, word] = match;
		let cls = '';
		if (comment) cls = 'text-iron-300 italic';
		else if (hex) cls = 'text-fuchsia-400';
		else if (num) cls = 'text-amber-300';
		else if (word && SHAPES.includes(word)) cls = 'text-cyan-300';
		else if (word && CSG.includes(word)) cls = 'text-fuchsia-300';
		else if (word && TRANSFORMS.includes(word)) cls = 'text-sky-400';
		out.push(cls ? <span key={i++} className={cls}>{text}</span> : text);
	}
	return out;
}

/** A dark code panel for .irsm scripts. */
export default function IrsmCode({ code }: { code: string }) {
	const lines = code.trim().split('\n');
	return (
		<pre className="overflow-x-auto rounded-xl border border-iron-500 bg-iron-700 p-5 text-sm leading-relaxed text-iron-100">
			<code>
				{lines.map((line, n) => (
					<div key={n}>{line === '' ? ' ' : highlight(line)}</div>
				))}
			</code>
		</pre>
	);
}
