---
title: Primitives
description: The basic building-block shapes of the .irsm language.
---

Primitives are the raw stock you forge everything else from. Each one is a
Signed Distance Field evaluated directly on the GPU, so every primitive is
perfectly smooth at any zoom level.

All primitives are **centred on the origin**, and **Y is up**.

## `cube(width, height, depth)`

A box. The sizes are **full** sizes, not half-sizes.

```plaintext
cube(10, 10, 10)     // a 10-unit cube
cube(20, 2, 10)      // a flat slab
```

## `sphere(radius)`

```plaintext
sphere(5)
```

## `cylinder(radius, height)`

An upright cylinder, its axis along Y.

```plaintext
cylinder(4, 12)      // radius 4, height 12
```

## `cone(radius, height)` / `cone(radius, top_radius, height)`

A cone along Y with its point at +Y. The three-argument form makes a truncated
cone (a frustum).

```plaintext
cone(5, 8)           // a sharp cone
cone(5, 2, 8)        // 5 wide at the base, tapering to 2 at the top
```

## `torus(radius, tube_radius)`

A ring lying flat in the XZ plane. `radius` is the distance from the centre to
the middle of the tube; `tube_radius` is the tube's thickness.

```plaintext
torus(8, 2)
```

## Placing primitives

Because shapes are centred, a part of height `h` resting on the ground is
`move(0, h / 2, 0, ...)`. To lay a cylinder, cone or torus along another axis,
rotate it:

```plaintext
wheel = rotateX(90, cylinder(1, 0.5))   // a wheel, axis along Z
axle  = rotateZ(90, cylinder(0.1, 3))   // along X
```

## Combining primitives

Primitives are rarely used alone. Position them with
[transformations](/language/transformations/) and merge or carve them with
[CSG operations](/language/csg/):

```plaintext
// A simple mushroom
stem = move(0, 3, 0, cylinder(1.5, 6))
cap  = move(0, 5, 0, difference(
    sphere(5),
    move(0, -3, 0, cube(12, 6, 12))
))
union(stem, cap)
```

:::note[Upgrading older scripts?]
Before IronSmith 1.0, primitives took an extra mesh "definition" argument
(`sphere(5, 32)`, `cylinder(4, 32, 12)`). It has been removed: exported mesh
detail is now set by the [export resolution](/guides/exporting/). Remove the
extra number from old scripts; the parser points at each one with a
"too many arguments" error.
:::
