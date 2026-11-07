---
title: CSG Operations
description: Union, difference, intersection and group — combining shapes with Constructive Solid Geometry.
---

Constructive Solid Geometry (CSG) is the heart of IronSmith: complex models are
built by **combining simple shapes** with boolean operations. Because shapes
are Signed Distance Fields, these operations are mathematically exact: no
broken meshes, no degenerate triangles.

## `union(a, b)`

Everything that is in *either* shape. Welds shapes together.

```plaintext
union(
    cube(10, 2, 10),
    move(0, 3, 0, sphere(3))
)
```

## `group(a, b, c, ...)`

A union of any number of shapes, without nesting `union` calls:

```plaintext
post = cylinder(0.3, 4)
group(move(-3, 2, 0, post), move(0, 2, 0, post), move(3, 2, 0, post))
```

## `difference(a, b)`

**`a` with `b` cut out of it**: everything in the first shape that is *not* in
the second.

```plaintext
// A cube with a spherical bite taken out
difference(
    cube(10, 10, 10),
    sphere(6)
)
```

To cut several shapes at once, `group` the cutters:

```plaintext
plate = cube(10, 1, 10)
hole = cylinder(1, 2)
difference(plate, group(move(-3, 0, -3, hole), move(3, 0, -3, hole),
                        move(-3, 0, 3, hole), move(3, 0, 3, hole)))
```

:::tip
Make the cutter poke slightly past the surface it cuts. A cut that ends
exactly on the surface can leave a paper-thin skin.
:::

:::note[Upgrading from 0.x]
Before 1.0, `difference(a, b)` meant "b minus a". It now means "a minus b",
like other CSG tools. The IronSmith repo includes
`scripts/migrate_difference.py`, which swaps the arguments in old models (the
originals are kept as `.bak` files) so they render exactly as before.
:::

## `intersection(a, b)`

Only the volume where *both* shapes overlap.

```plaintext
// A rounded cube: the overlap of a cube and a sphere
intersection(
    cube(10, 10, 10),
    sphere(6.5)
)
```

Intersection is also the way to trim: keep only part of a shape, or turn a
[`repeat`](/language/transformations/#repeatx-y-z-shape) into stripes.

## Building up complex models

CSG operations nest freely and combine naturally with shape variables:

```plaintext
// A castle wall with battlements
wallLength = 12
wall = move(0, 3, 0, cube(wallLength, 6, 2))
notch = cube(1.5, 1.5, 3)
battlements = group(move(-4, 6, 0, notch), move(0, 6, 0, notch), move(4, 6, 0, notch))
difference(wall, battlements)
```

:::tip[Iterate fearlessly]
CSG trees can get deep. Lean on hot-reload: make one change, pause, look.
If a mid-edit state is invalid, the viewer just holds your last good model.
:::
