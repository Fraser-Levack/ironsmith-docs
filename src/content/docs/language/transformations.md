---
title: Transformations
description: Moving, rotating, scaling and tiling shapes in .irsm.
---

Transformations wrap a shape and reposition it. They take the shape as their
**last argument**, so they read outside-in: "move this, which is a rotation of
that".

## `move(x, y, z, shape)`

Translates a shape.

```plaintext
move(0, 5, 0, sphere(3))      // a sphere floating 5 units up
```

## `rotateX(degrees, shape)` / `rotateY(...)` / `rotateZ(...)`

Rotates a shape around the given axis, in degrees.

```plaintext
rotateZ(45, cube(8, 8, 8))    // a cube balanced on its edge
```

Directions worth remembering:

- `rotateZ(90, ...)` turns +Y towards +X, so a cone's point then faces +X.
  `rotateZ(-90, ...)` points it at -X.
- `rotateX(90, ...)` lays an upright cylinder along Z (wheels, axles).
- A positive `rotateX` swings a part hanging below the origin towards +Z.

## `scale(factor, shape)` / `scale(sx, sy, sz, shape)`

Scales a shape uniformly, or by a different amount on each axis. Scaling a unit
sphere is the easy way to make an ellipsoid:

```plaintext
scale(2, sphere(1))                // a sphere of radius 2
scale(4, 1, 1.5, sphere(1))        // a stretched, egg-like ellipsoid
```

:::caution
Non-uniform scaling makes the shape's distance field approximate. Shapes still
render correctly, but a *very* thin feature built on a stretched shape can be
skipped by the raymarcher. Keep such details a little thicker, or build them
from unscaled shapes.
:::

## `repeat(x, y, z, shape)`

Tiles a shape infinitely, with the given spacing on each axis (`0` means "don't
repeat on this axis"). On its own it fills all of space, so it's almost always
combined with [`intersection`](/language/csg/) to keep a finite piece:

```plaintext
// Red and white stripes on a tower
tower = cone(1.5, 1.0, 9)
bands = repeat(0, 2, 0, cube(10, 1, 10))
paint(#F2EDE4, tower)
paint(#C8322B, intersection(scale(1.02, tower), bands))
```

:::caution[Make the cutter big on the other axes]
`repeat` only tiles along the axes with a non-zero spacing. On the others the
shape stays where it is, so a cutter like `repeat(1.4, 0, 0, cube(0.7, 3, 60))`
only exists between y = -1.5 and 1.5, and intersecting it with battlements
5 units up gives nothing. Make the cutter huge on the axes it doesn't repeat
along: `repeat(1.4, 0, 0, cube(0.7, 60, 60))`.
:::

## Nesting

Transformations compose by nesting. The innermost is applied first:

```plaintext
// Rotate a cylinder onto its side, then lift it
move(0, 6, 0,
    rotateX(90, cylinder(2, 10))
)
```

With shape variables, deep nesting stays readable:

```plaintext
beam   = rotateX(90, cylinder(1, 20))
raised = move(0, 8, 0, beam)
raised
```

## A practical example

```plaintext
// A table: one leg shape, reused four times
leg = move(0, 4, 0, cylinder(0.8, 8))
group(move(6, 0, 4, leg), move(-6, 0, 4, leg),
      move(6, 0, -4, leg), move(-6, 0, -4, leg))
move(0, 8.5, 0, cube(16, 1, 10))   // the tabletop
```
