import SiteLayout from '../components/SiteLayout';
import IrsmCode from '../components/IrsmCode';

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

const gallery = [
	{ image: '/gallery/starfighter_spin.gif', title: 'Starfighter', alt: 'A starfighter turning over a ringed gas giant' },
	{ image: '/gallery/robot_spin.gif', title: 'Bolt the robot', alt: 'A cute robot waving on a turntable' },
	{ image: '/gallery/lighthouse_spin.gif', title: 'Lighthouse island', alt: 'A lighthouse island at dusk, reflected in the sea' },
	{ image: '/gallery/forest_glade.png', title: 'Forest glade', alt: 'A forest glade with a pond and a fairy ring of toadstools' },
	{ image: '/gallery/airship.png', title: 'Steampunk airship', alt: 'A steampunk airship above the clouds' },
	{ image: '/gallery/launch_pad_flythrough.gif', title: 'Launch pad fly-through', alt: 'A camera fly-through of a rocket on its launch pad' },
];

// ─────────────────────────────────────────────────────────────────────────
// Layout
// ─────────────────────────────────────────────────────────────────────────

export default function HomePage() {
	return (
		<SiteLayout>
			{/* Hero */}
			<section className="mx-auto max-w-6xl px-6 pt-20 pb-12 text-center">
				<h1 className="bg-gradient-to-r from-iron-50 via-ember-light to-ember bg-clip-text text-6xl font-extrabold tracking-tight text-transparent sm:text-7xl">
					{hero.title}
				</h1>
				<p className="mx-auto mt-5 max-w-2xl text-xl text-iron-200">{hero.tagline}</p>
				<div className="mt-8 flex flex-wrap justify-center gap-3">
					{hero.buttons.map((button) => (
						<a
							key={button.label}
							href={button.href}
							className={
								button.primary
									? 'rounded-full bg-ember px-6 py-2.5 font-semibold text-iron-900 transition-colors hover:bg-ember-light'
									: 'rounded-full border border-iron-400 px-6 py-2.5 font-semibold text-iron-100 transition-colors hover:border-ember-light hover:text-ember-light'
							}
						>
							{button.label}
						</a>
					))}
				</div>
			</section>

			{/* Code example beside its render */}
			<section className="mx-auto max-w-6xl px-6 pb-16">
				<div className="grid items-center gap-6 lg:grid-cols-5">
					<div className="lg:col-span-3">
						<IrsmCode code={example.code} />
					</div>
					<img src={example.image} alt={example.imageAlt} className="w-full rounded-xl lg:col-span-2" />
				</div>
				<p className="mt-4 text-center text-iron-300">{example.caption}</p>
			</section>

			{/* Features: plain text, side by side */}
			<section className="mx-auto max-w-6xl px-6 pb-20">
				<h2 className="mb-8 text-3xl font-bold text-iron-50">Why IronSmith?</h2>
				<div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
					{features.map((feature) => (
						<div key={feature.title}>
							<h3 className="text-lg font-semibold text-ember-pale">{feature.title}</h3>
							<p className="mt-1.5 text-iron-200">{feature.text}</p>
						</div>
					))}
				</div>
			</section>

			{/* Gallery */}
			<section className="mx-auto max-w-6xl px-6 pb-20">
				<h2 className="text-3xl font-bold text-iron-50">Forged with IronSmith</h2>
				<p className="mt-2 text-iron-200">
					Every scene below is a short, commented <code>.irsm</code> script.{' '}
					<a href="/getting-started/examples/" className="text-ember-light hover:underline">
						See how they're made
					</a>
					.
				</p>
				<div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{gallery.map((item) => (
						<figure key={item.title} className="overflow-hidden rounded-xl border border-iron-500 bg-iron-600">
							<img src={item.image} alt={item.alt} className="aspect-[4/3] w-full object-cover" />
							<figcaption className="px-3 py-2 text-center text-sm text-iron-200">{item.title}</figcaption>
						</figure>
					))}
				</div>
			</section>

			{/* How it works */}
			<section className="mx-auto max-w-3xl px-6 pb-24 text-center">
				<h2 className="text-3xl font-bold text-iron-50">Two languages, one forge</h2>
				<p className="mt-4 text-lg text-iron-200">
					IronSmith pairs <strong className="text-iron-50">The Forge</strong>, a Haskell terminal editor that
					compiles <code>.irsm</code> scripts to a compact bytecode, with{' '}
					<strong className="text-iron-50">The Viewer</strong>, a Rust + wgpu raymarcher that turns that
					bytecode into GPU shaders on the fly.
				</p>
				<a
					href="/guides/architecture/"
					className="mt-6 inline-block text-ember-light hover:underline"
				>
					Read the architecture overview →
				</a>
			</section>
		</SiteLayout>
	);
}
