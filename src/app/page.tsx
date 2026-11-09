import Link from 'next/link';
import SiteLayout from '@/components/SiteLayout';
import IrsmCode from '@/components/IrsmCode';

// ─────────────────────────────────────────────────────────────────────────
// Content: edit these to change what the home page says.
// Images are in /public (so '/gallery/robot.png' is public/gallery/robot.png).
// ─────────────────────────────────────────────────────────────────────────

const hero = {
	title: 'IronSmith',
	tagline: 'Forge 3D models with code, straight from your terminal.',
	buttons: [
		{ label: 'Get Started', href: '/getting-started/introduction/', primary: true },
		{ label: 'See the Examples', href: '/getting-started/examples/', primary: false },
		{ label: 'View on GitHub', href: 'https://github.com/Fraser-Levack/IronSmith', primary: false },
	],
};

const example = {
	code: `
// A blacksmith's hammer on the anvil, next to a bar fresh from the forge
light(1, 1.4, 0.7)

anvil = group(move(0, 0.4, 0, cube(2.4, 0.8, 1.7)),
              move(0, 1.15, 0, cube(1.1, 0.7, 0.9)),
              move(-0.2, 1.9, 0, cube(3.2, 0.8, 1.3)),
              move(-2.05, 2.1, 0, cube(0.5, 0.4, 1)),
              move(2.15, 2.0, 0, rotateZ(90, cone(0.5, 0.05, 1.7))))
paint(#1E2126, material(plastic, anvil))
paint(#15110F, move(0, -0.1, 0, cylinder(3.4, 0.2)))

head = cube(1.5, 0.62, 0.62)
handle = move(0, 0, 1.75, rotateX(90, cylinder(0.13, 3)))
paint(#4A4F57, material(plastic, move(-0.7, 2.61, -0.3, rotateY(-25, head))))
paint(#8B5A2B, move(-0.7, 2.61, -0.3, rotateY(-25, handle)))

material(neon, paint(#C82800, move(0.75, 2.39, 0.2, rotateY(30, cube(1.8, 0.18, 0.32)))))
material(neon, paint(#FF7A1A, move(1.1, 2.9, 0.4, sphere(0.05)), move(0.6, 3.2, 0.0, sphere(0.04)),
                              move(1.4, 3.4, 0.1, sphere(0.035)), move(0.9, 3.7, 0.5, sphere(0.03))))
`,
	image: '/hero/anvil.png',
	imageAlt: 'A hammer and a glowing bar on an anvil, rendered by IronSmith',
	caption: 'Paste it into the editor and change any number: the viewer updates as you type.',
};

const features = [
	{
		title: 'Code, not clicks',
		text: 'Describe shapes with a clean, math-focused scripting language built on Constructive Solid Geometry. Version-control your models like any other source code.',
	},
	{
		title: 'Instant hot-reload',
		text: 'The moment you stop typing, the viewer updates. Changing a size, position, angle or colour is instant, even in scenes with hundreds of shapes.',
	},
	{
		title: 'GPU raymarching',
		text: 'Models are rendered as Signed Distance Fields evaluated on the GPU: perfectly smooth surfaces and exact booleans at any zoom level.',
	},
	{
		title: 'Crash-proof by design',
		text: 'Typo mid-edit? The viewer holds your last working model until the script is valid again. Broken code never takes it down.',
	},
	{
		title: 'Moddable filters',
		text: 'Drop a GLSL file in your config folder and it becomes a live post-processing filter: edge detection, heatmaps, even real-time ASCII rendering.',
	},
	{
		title: 'Export anywhere',
		text: 'Turn models into .obj meshes for Blender, game engines or 3D printing, or script a camera path and export it as a video.',
	},
	{
		title: 'Scriptable and agent-friendly',
		text: 'A headless check / render / export CLI lets scripts and AI coding agents build models from text and check their own work.',
	},
];

// "shape" sets how much of the mosaic an image takes up: 'tall' is two rows high,
// 'wide' two columns across and 'big' both. Leave it out for a single tile.
const gallery = [
	{ image: '/gallery/skeleton.png', title: 'Skeleton', alt: 'A full human skeleton waving from a stone plinth, its eye sockets glowing orange', shape: 'tall' },
	{ image: '/gallery/torii.png', title: 'Torii at sunset', alt: 'A red torii gate and a snow-capped peak mirrored in still water at sunset', shape: 'big' },
	{ image: '/gallery/starfighter_spin.gif', title: 'Starfighter', alt: 'A starfighter turning over a ringed gas giant' },
	{ image: '/gallery/robot_spin.gif', title: 'Bolt the robot', alt: 'A cute robot waving on a turntable' },
	{ image: '/gallery/lighthouse_spin.gif', title: 'Lighthouse island', alt: 'A lighthouse island at dusk, reflected in the sea' },
	{ image: '/gallery/stones.png', title: 'Standing stones', alt: 'A ring of standing stones beneath an orange sundown sky', shape: 'wide' },
	{ image: '/gallery/arcade.png', title: 'Arcade cabinet', alt: 'An arcade cabinet in a dark room, with a pixel-art anvil on its screen', shape: 'tall' },
	{ image: '/gallery/forest_glade.png', title: 'Forest glade', alt: 'A forest glade with a pond and a fairy ring of toadstools' },
	{ image: '/gallery/chess.png', title: 'Endgame', alt: 'A chessboard where the black king has been toppled' },
	{ image: '/gallery/airship.png', title: 'Steampunk airship', alt: 'A steampunk airship above the clouds' },
	{ image: '/gallery/launch_pad_flythrough.gif', title: 'Launch pad fly-through', alt: 'A camera fly-through of a rocket on its launch pad' },
	{ image: '/gallery/rubber_duck.png', title: 'Rubber duck', alt: 'A yellow rubber duck drifting on rippling bathwater among soap bubbles' },
	{ image: '/gallery/pumpkin_ascii.png', title: 'Jack-o\'-lantern, ascii filter', alt: 'A carved pumpkin drawn in orange text characters, its face picked out in bright hash signs', shape: 'big' },
	{ image: '/gallery/clockwork_edges.png', title: 'Clockwork, edge filter', alt: 'A train of meshing gears drawn as glowing white outlines on black' },
	{ image: '/gallery/volcano_heatmap.png', title: 'Volcano, heatmap filter', alt: 'An erupting volcano in thermal colours, red at the crater through yellow to green at the shore' },
	{ image: '/gallery/synthwave_crt.png', title: 'Synthwave, crt filter', alt: 'A striped sun behind dark mountains and a magenta grid, shown on a curved old television with scanlines', shape: 'wide' },
	{ image: '/gallery/balloons_halftone.png', title: 'Balloons, halftone filter', alt: 'Hot-air balloons over green hills, printed in comic-book dots' },
	{ image: '/gallery/treasure_pixel_art.png', title: 'Treasure, pixel art filter', alt: 'An open treasure chest drawn in chunky pixels' },
	{ image: '/gallery/butterfly_stained_glass.png', title: 'Butterfly, stained glass filter', alt: 'An orange butterfly as a stained-glass window of irregular panes', shape: 'wide' },
];

// ─────────────────────────────────────────────────────────────────────────
// Layout
// ─────────────────────────────────────────────────────────────────────────

/** Numbers items the way a drawing numbers its figures: 01, 02, ... */
function index(i: number) {
	return String(i + 1).padStart(2, '0');
}

const sectionHeading = 'rule-t frame-accent pt-6 text-3xl font-medium text-paper';

export default function HomePage() {
	return (
		<SiteLayout>
			{/* Hero */}
			<section className="sheet pt-12 pb-24">
				<h1 className="hero-title font-display text-accent uppercase">{hero.title}</h1>
				<p className="dimension mt-12 font-mono text-sm text-paper">
					<span>{hero.tagline}</span>
				</p>
				<div className="mt-6 flex flex-wrap gap-6 font-mono text-xs uppercase">
					{hero.buttons.map((button) => (
						<Link
							key={button.label}
							href={button.href}
							className={
								button.primary
									? 'w-full bg-accent py-3 text-center font-medium text-on-accent transition-colors hover:bg-accent-light sm:w-48'
									: 'frame w-full py-3 text-center text-paper transition-colors [--frame-color:var(--color-paper-dim)] hover:text-accent-light hover:[--frame-color:var(--color-accent)] sm:w-48'
							}
						>
							{button.label}
						</Link>
					))}
				</div>
			</section>

			{/* Code example beside its render */}
			<section className="sheet pb-24">
				<div className="grid gap-6 lg:grid-cols-3">
					<div className="frame min-w-0 lg:col-span-2">
						<IrsmCode code={example.code} />
					</div>
					<div className="frame media-cell bg-sheet-deep">
						<img src={example.image} alt={example.imageAlt} className="media lg:h-full" />
					</div>
				</div>
				<p className="mt-6 font-mono text-xs text-paper-dim">{example.caption}</p>
			</section>

			{/* Features */}
			<section className="sheet pb-24">
				<h2 className={sectionHeading}>Why IronSmith?</h2>
				<div className="mt-6 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
					{features.map((feature, i) => (
						<div key={feature.title} className="rule-t pt-6">
							<span className="block font-mono text-xs text-accent-light">{index(i)}</span>
							<h3 className="text-lg font-medium text-paper">{feature.title}</h3>
							<p className="mt-6 text-paper-dim">{feature.text}</p>
						</div>
					))}
				</div>
			</section>

			{/* Gallery */}
			<section className="sheet pb-24">
				<h2 className={sectionHeading}>Forged with IronSmith</h2>
				<p className="text-paper-dim">
					Every scene below is a short, commented <code className="font-mono">.irsm</code> script.{' '}
					<Link href="/getting-started/examples/" className="text-accent-light underline underline-offset-2">
						See how they're made
					</Link>
					.
				</p>
				<div className="mosaic mt-6 sm:grid-cols-2 lg:grid-cols-3">
					{gallery.map((item, i) => (
						<figure key={item.title} className={`frame flex flex-col bg-sheet ${item.shape ? `mosaic-${item.shape}` : ''}`}>
							<img src={item.image} alt={item.alt} className="h-0 w-full flex-1 object-cover" />
							<figcaption className="rule-t flex justify-between px-6 py-3 font-mono text-xs text-paper">
								<span className="text-accent-light">FIG. {index(i)}</span>
								<span>{item.title}</span>
							</figcaption>
						</figure>
					))}
				</div>
			</section>

			{/* How it works */}
			<section className="sheet pb-24">
				<h2 className={sectionHeading}>Two languages, one forge</h2>
				<p className="max-w-3xl text-lg text-paper-dim">
					IronSmith pairs <strong className="font-medium text-paper">The Forge</strong>, a Haskell terminal editor that
					compiles <code className="font-mono">.irsm</code> scripts to a compact bytecode, with{' '}
					<strong className="font-medium text-paper">The Viewer</strong>, a Rust + wgpu raymarcher that turns that
					bytecode into GPU shaders on the fly.
				</p>
				<Link
					href="/guides/architecture/"
					className="mt-6 inline-block font-mono text-xs text-accent-light uppercase hover:underline"
				>
					Read the architecture overview →
				</Link>
			</section>
		</SiteLayout>
	);
}
