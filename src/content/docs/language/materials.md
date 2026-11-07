---
title: Materials & Paint
description: Colouring shapes and giving them surface materials in .irsm.
---

Two statements control how a shape looks: `paint` sets its colour, `material`
sets how its surface responds to light. Both wrap shapes, like transformations,
and both accept **any number of shapes**.

## `paint(color, shape, ...)`

Applies a colour: a hex code, or one of the presets `white`, `black`, `red`,
`green` and `blue`. Quotes are optional.

```plaintext
paint(#FF5733, sphere(5))
paint(red, move(12, 0, 0, sphere(5)), move(-12, 0, 0, sphere(5)))
```

Shapes that aren't painted use `default_object_color` from your
[settings](/guides/configuration/).

## `material(type, shape, ...)`

Applies a surface material:

| Type | Look |
| --- | --- |
| `matte` | Diffuse, no shine (the default) |
| `plastic` | Glossy, with a soft highlight |
| `metal` | A mirror: reflects the scene and the sky, with a sharp highlight |
| `neon` | Glows: ignores lighting and shadows |

```plaintext
material(metal, cube(8, 8, 8))
```

## Combining paint and material

Nest them in either order:

```plaintext
paint(#00c8ff, material(neon, torus(6, 1.5)))
```

## Per-part appearance

Paint applies to the shapes it wraps, so different parts of a model can carry
different colours:

```plaintext
body = paint(#c0c4c8, material(plastic, move(0, 4, 0, cylinder(3, 8))))
dome = paint(#ff4422, material(plastic, move(0, 8, 0, sphere(3))))
union(body, dome)
```

## Choosing materials

- **Metal is mostly reflection**, so its paint colour barely shows. It's
  perfect for water, glass, chrome and canopies. For a *coloured* metal such as
  brass or copper, use glossy `plastic` in that colour instead.
- **Neon** is ideal for lights, screens, eyes and stars. It pairs well with a
  dim scene: try lowering the light with
  [`light(x, y, z, 0.3)`](/language/lighting/) to make the glow pop.
