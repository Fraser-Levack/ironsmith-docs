---
title: Your First Model
description: Build a simple model in the .irsm language, step by step.
---

Let's forge something. This walkthrough takes you from an empty file to a
painted, hollowed-out die, and shows off hot-reloading along the way.

## 1. Create a script

Launch IronSmith, press **Enter** on the start screen for a new file, and start
with a single primitive:

```plaintext
cube(10, 10, 10)
```

Stop typing for a moment and the viewer updates on its own. A crisp cube
appears. That's the hot-reload loop: **every pause turns your script into
pixels.** Press **Ctrl+S** to save it, for example as `die.irsm`.

## 2. Add a variable

Numbers you'll reuse belong in variables:

```plaintext
size = 10
cube(size, size, size)
```

Change `size` to `14` and the cube grows the moment you pause. Edits that only
change numbers are instant, however big the scene gets.

## 3. Carve it with CSG

The heart of IronSmith is Constructive Solid Geometry. Cut a sphere out of the
cube to hollow out its core:

```plaintext
size = 10
difference(
    cube(size, size, size),
    sphere(6.5)
)
```

`difference(a, b)` means **a with b cut out of it**. The sphere bites a smooth,
perfectly spherical hollow into every face: no mesh artefacts, because the
geometry is pure math.

## 4. Name shapes and combine them

Shapes can be assigned to variables too, then reused:

```plaintext
size = 10
body = difference(
    cube(size, size, size),
    sphere(6.5)
)
core = sphere(3)
union(body, core)
```

Now a small sphere floats in the carved-out centre.

## 5. Paint and light it

Finish with colour, materials and a light:

```plaintext
size = 10
body = difference(
    cube(size, size, size),
    sphere(6.5)
)
core = sphere(3)

paint(#8a8d93, material(plastic, body))
paint(#FF5733, material(neon, core))

light(10, 20, 5)
```

A glossy shell with a glowing neon core, lit from above. Each line that is just
a shape draws it, so the two `paint(...)` lines draw both parts in their own
colours.

## 6. Look around it

Press **Ctrl+E** to cycle the viewer between **orbit** (auto-rotating),
**static** and **fly** mode. In fly mode the arrow keys and `WASD` steer the
camera, `Z`/`X` zoom, and `Shift` + `WASD`/`Z`/`X` pans. You can also scroll
the mouse wheel over the viewer window to zoom. **Ctrl+R** resets the camera.
See [The Editor](/guides/editor/) for every shortcut.

## Where next?

- See what's possible in the [Examples](/getting-started/examples/)
- Learn every shape in [Primitives](/language/primitives/)
- Master [CSG Operations](/language/csg/)
- Give the viewport a thermal-camera look with [Filters](/guides/filters/)
- [Export your model](/guides/exporting/) to `.obj`
