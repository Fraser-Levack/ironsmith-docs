---
title: Lighting
description: Controlling scene lighting and exposure in IronSmith.
---

By default, IronSmith lights your model with a **camera-relative light** — it
follows you as you fly around, so the model is always visible. When you want
fixed, art-directed lighting instead, use the `light` statement.

## `light(x, y, z)`

A directional light shining *from* the given position *toward the origin*:

```plaintext
light(10, 20, 5)     // high, from the front-right
```

## `light(x, y, z, intensity)`

The optional fourth argument scales brightness (default `1.0`):

```plaintext
light(10, 20, 5, 0.4)    // same direction, much dimmer
```

## Rules of thumb

- **The last `light` statement wins** — only one directional light is active.
- Place light statements anywhere in the script; they apply to the whole scene.
- No `light` statement at all? You get the camera-relative default.
- Changing a light's direction or intensity is instant: it never recompiles
  the scene.
- Lights cast soft shadows (toggle them with `shadow_enabled` in the
  [settings](/guides/configuration/)).

## Pairing with exposure

For fine control over overall viewport brightness, combine a dim light with the
`exposure` setting in `ironsmith.toml` (open settings with `Ctrl+G`):

```toml
[viewer]
exposure = 1.6
```

A dim `light(...)` with raised exposure gives soft, low-contrast lighting;
a bright light with lowered exposure gives punchy highlights. See
[Configuration](/guides/configuration/) for the full settings reference.

## Example: moody neon scene

```plaintext
ring = paint(#00e5ff, material(neon, torus(6, 1)))
base = paint(#2a2d31, material(matte, cube(16, 1, 16)))

union(move(0, 4, 0, ring), base)
light(5, 15, -10, 0.25)
```
