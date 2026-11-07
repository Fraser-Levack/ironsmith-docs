---
title: Examples
description: A gallery of complete IronSmith scenes, and the modelling tricks each one uses.
---

The IronSmith repository ships with complete, commented example scenes in its
[`examples/`](https://github.com/Fraser-Levack/IronSmith/tree/main/examples)
folder. Open any of them in the editor (**Ctrl+O**), press **Ctrl+A** to play
its camera animation, and change any number to see it update instantly.

## Starfighter "Kestrel"

![A starfighter over a ringed gas giant](/gallery/starfighter_spin.gif)

[`starfighter.irsm`](https://github.com/Fraser-Levack/IronSmith/blob/main/examples/starfighter.irsm):
a swept-wing interceptor with glowing engines and a reflective canopy, over a
ringed gas giant that catches the ship's shadow.

- The fuselage, intakes and canopy are **stretched spheres**:
  `scale(4.6, 0.95, 1.25, sphere(1))`.
- **Panel seams** are thin slices of a slightly larger copy of the hull:
  `intersection(shell, cube(0.05, 3, 3))`.
- The planet's **bands** are slabs intersected with the planet, and its ring is
  a flattened `torus`.
- Stars and engine glows use `material(neon, ...)`.

## Bolt the robot

![A cute robot waving](/gallery/robot_spin.gif)

[`robot.irsm`](https://github.com/Fraser-Levack/IronSmith/blob/main/examples/robot.irsm):
a friendly robot waving hello, with a glowing face, chest buttons, a heart and
a potted flower.

- The rounded head and body are **intersections**: `intersection(cube(...), sphere(...))`
  gives a cube with softened corners.
- Both arms are the **same shape variable**, rotated differently at the
  shoulder. A positive `rotateX` swings a hanging arm towards +Z, and about
  -140° raises the other one into a wave.
- The smile is a `torus` cut in half with a `cube`.

## Forest glade

![A forest glade with a pond and toadstools](/gallery/forest_glade.png)

[`forest_glade.irsm`](https://github.com/Fraser-Levack/IronSmith/blob/main/examples/forest_glade.irsm):
pines, oaks and birches around a clearing with a mirror pond, a fairy ring of
toadstools, a mossy log, stepping stones and fireflies. At about 1,700 bytecode
instructions it's the biggest example.

- Each tree type is defined **once** as a shape variable (`pine`, `oak`, `birch`)
  and placed many times with `move`, `scale` and `rotateY`.
- The pond is `material(metal, ...)`, so it reflects the trees and sky.

## Lighthouse island at dusk

![A lighthouse island reflected in the sea](/gallery/lighthouse_spin.gif)

[`lighthouse.irsm`](https://github.com/Fraser-Levack/IronSmith/blob/main/examples/lighthouse.irsm):
a striped lighthouse with a lit lantern room, the keeper's cottage and a
sailboat, all mirrored in a metal sea.

- The red **stripes** are the tower intersected with an infinitely repeating
  slab: `intersection(tower, repeat(0, 2.6, 0, cube(20, 1.3, 20)))`.
- The **grassy top** is a slightly larger copy of the rock, cut to its upper
  part, sitting over it like a lid.
- The **triangular sail** is a box cut along its diagonal by a big rotated box.
- The **crescent moon** is a sphere with another sphere cut out of it.

## Steampunk airship

![A steampunk airship above the clouds](/gallery/airship.png)

[`airship.irsm`](https://github.com/Fraser-Levack/IronSmith/blob/main/examples/airship.irsm):
a ribbed canvas balloon, brass engines and propellers, a wooden gondola with
lit portholes, rigging, a smoking funnel and clouds.

- The balloon's **ribs** are `torus` rings, each sized to the balloon's profile
  at its position.
- **Brass** is glossy `plastic` in a brass colour. `metal` is mostly
  reflection, so a coloured metal would just show the sky.
- **Propellers** are three flattened spheres rotated 120° apart.

## Launch pad fly-through

![A camera fly-through of a rocket on its launch pad](/gallery/launch_pad_flythrough.gif)

[`launch_pad.irsm`](https://github.com/Fraser-Levack/IronSmith/blob/main/examples/launch_pad.irsm):
a deliberately simple scene that shows off [camera animation](/language/animation/).
Seven keyframes take the camera from the engines, up the rocket to its nose,
out to a wide reveal, round the tower and back.

- The **lattice tower** is one hollow box minus two `repeat`ed cutters: a single
  `difference` produces every crossbar.

## The Old Keep

<video src="/video/old-keep.mp4" poster="/video/old-keep-poster.jpg" controls muted loop playsinline style="width: 100%; border-radius: 0.75rem;"></video>

[`castle.irsm`](https://github.com/Fraser-Levack/IronSmith/blob/main/examples/castle.irsm):
a weathered Norman keep on a rocky hill at night, above a palisaded bailey with
a longhouse, a campfire and a watchtower. Its camera path is a 30-second
fly-through.

- The whole keep is **built around its own origin**, then placed on the hill
  and turned 12° with one `move(...)` and `rotateY(...)`, which is what makes it
  sit off-square.
- The **ruined battlements** are the merlons with a tilted box cut out of one
  corner.
- The **palisade** is a thin ring intersected with a grid of stakes from
  `repeat`, with an open side and a gate gap cut out.
- **Dim lighting:** `light(..., 0.6)` from the moon's direction. The orange
  `neon` windows, torches and fires carry the scene.
- The hill is a dome cut from one big `sphere`, not a stretched one. Exact
  shapes shade cleanly at grazing angles.

## Hammer and anvil

![A hammer and a glowing bar on an anvil](/hero/anvil.png)

[`anvil.irsm`](https://github.com/Fraser-Levack/IronSmith/blob/main/examples/anvil.irsm):
the small example from the home page. The anvil is one `group` of boxes and a
cone, and the glowing bar and sparks are `neon`.

## Common tricks

| Want | Use |
| --- | --- |
| Rounded box | `intersection(cube(...), sphere(...))` |
| Ellipsoid | `scale(sx, sy, sz, sphere(1))` |
| Stripes or bands | `intersection(shape, repeat(...))` |
| Seams, caps, trims | a slightly larger copy, intersected with a thin slab |
| Triangle or wedge | a box cut by a big rotated box |
| Glow | `material(neon, ...)` |
| Mirror (water, glass) | `material(metal, ...)` |
| Coloured metal | glossy `plastic` in the metal's colour |

:::tip[Thin details]
Very thin features on a *non-uniformly scaled* sphere can be stepped over by
the raymarcher and disappear. Use exact shapes (`torus`, thin `cube`s) for
thin details, or make them a little thicker.
:::
