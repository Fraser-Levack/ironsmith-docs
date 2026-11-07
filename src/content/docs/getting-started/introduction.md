---
title: Introduction
description: What IronSmith is, how it works, and why you might want to model in a terminal.
---

**IronSmith** is a terminal-based 3D modelling tool. Instead of dragging vertices
around in a GUI, you *write code*: short, math-focused scripts in the `.irsm`
language that describe shapes using **Constructive Solid Geometry (CSG)** —
combining primitives with unions, differences, and intersections.

The result renders instantly in a GPU-accelerated viewer window next to your
terminal, updating live as you type.

## The workflow

1. **Open the TUI editor**: a Haskell terminal interface with syntax
   highlighting, mouse selection, a command palette and inline error
   reporting. See [The Editor](/guides/editor/).
2. **Write `.irsm` script** — declare variables, build primitives, combine them
   with CSG operations, add colour and materials.
3. **Watch it render**: the moment you stop typing, the script is parsed,
   compiled, and hot-reloaded into the viewer. No build step, and changing
   only numbers updates instantly, even in big scenes.
4. **Export** — when you're happy, export the model to a standard `.obj` mesh,
   or add camera keyframes and export a looping video of the scene.

Prefer scripting? The same binary is a [headless CLI](/guides/cli/), so
scripts and AI coding agents can check, render and export models too.

## Why Signed Distance Fields?

IronSmith doesn't build polygon meshes while you edit. The viewer renders your
model by **raymarching Signed Distance Fields (SDFs)** — mathematical functions
that report how far any point in space is from the surface of your model. That
gives you:

- **Lossless geometry** — surfaces are exact math, not triangle approximations.
  Zoom in as far as you like; a sphere stays perfectly round.
- **Perfect booleans** — union, difference, and intersection are simple `min`/`max`
  operations on distance functions. No fragile mesh-boolean edge cases.
- **GPU-native speed** — the whole model evaluates in a fragment shader,
  in parallel, every frame.

## Built to survive your typos

You will make syntax errors mid-edit — that's normal, and IronSmith expects it.
Scripts are validated in the editor before anything reaches the GPU, and if a
generated shader ever fails to compile anyway, the viewer simply keeps showing
your last working model until the script is valid again. The viewer never
crashes because of your code.

## Ready to forge?

Head to [Installation](/getting-started/installation/) to get IronSmith running,
then build [your first model](/getting-started/first-model/) in about five
minutes, or browse the [Examples](/getting-started/examples/) for inspiration.
