---
title: Syntax & Variables
description: The basics of the .irsm scripting language — statements, comments, variables and arithmetic.
---

`.irsm` scripts are intentionally small: a script is a sequence of statements,
one per line, where each statement either **assigns a variable** or **draws a
shape**. There are no loops, functions or conditionals: repeated parts are
written out (or tiled with [`repeat`](/language/transformations/#repeatx-y-z-shape)),
using variables for shared dimensions.

## Comments

```plaintext
// Anything after a double slash is a comment
size = 5  // comments can follow code too
```

## Number variables and arithmetic

Assign a number once, reuse it everywhere a number is expected:

```plaintext
radius = 6
height = 12
cylinder(radius, height)
```

Numbers support `+`, `-`, `*` and `/` with the usual precedence (`*` and `/`
bind tighter), parentheses, and unary minus on any expression:

```plaintext
size = 5
gap = size * 2 + 1
half = (size - 1) / 2
left = -gap
move(left, size / 2, 0, cube(size, size, size))
```

## Shape variables

Shapes are values too. Assign a shape expression to a name and use it in later
statements:

```plaintext
ball = sphere(5)
box  = cube(8, 8, 8)
difference(box, ball)
```

Two useful properties of shape assignment:

- **Aliasing:** `b = a` makes `b` refer to the same shape as `a`.
- **Self-reference is safe:** stored shapes are resolved eagerly, so
  `a = union(a, sphere(2))` means "the *previous* `a`, plus a sphere".
  It grows the shape rather than looping forever.

## Drawing

Any bare shape expression on its own line is drawn. Assignments draw nothing
on their own:

```plaintext
tower = cylinder(4, 12)
tower                     // draws the tower
move(10, 0, 0, tower)     // draws a second copy, moved aside
```

## Validation catches mistakes early

Before anything is sent to the viewer, the editor checks that every identifier
is **defined before use** and used with the **right kind** (a number where a
number is expected, a shape where a shape is expected). Calls with the wrong
number of arguments are explained too, for example
`too many arguments; expected sphere(radius)`.

That means a half-typed line like `cub`, which would otherwise parse as a
reference to an undefined shape, is caught in the editor with a line number,
and the viewer keeps rendering your last valid model.

## What's in the language

| Category | Statements |
| --- | --- |
| [Primitives](/language/primitives/) | `cube`, `sphere`, `cylinder`, `cone`, `torus` |
| [Transformations](/language/transformations/) | `move`, `rotateX`, `rotateY`, `rotateZ`, `scale`, `repeat` |
| [CSG operations](/language/csg/) | `union`, `difference`, `intersection`, `group` |
| [Appearance](/language/materials/) | `paint`, `material` |
| [Lighting](/language/lighting/) | `light` |
| [Camera animation](/language/animation/) | `camera` |
