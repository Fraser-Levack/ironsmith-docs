---
title: Filters & Post-Processing
description: IronSmith's moddable GLSL filter system — built-in filters and writing your own.
---

IronSmith's viewport is **moddable**. Every frame, the renderer draws your
scene to an offscreen texture, then runs a second full-screen pass through a
user-editable GLSL **filter**. Filters are plain `.glsl` files you can edit,
swap, and share.

## The built-in filters

On first launch, the viewer creates a `filters/` folder in your IronSmith
config directory:

- **Windows:** `%APPDATA%\ironsmith\filters`
- **Linux / macOS:** `~/.config/ironsmith/filters`

It ships with four examples (installed once, never overwritten — they're yours
to edit):

| Filter | Effect |
| --- | --- |
| `edge_detection` | Sobel edges: glowing outlines over a dimmed scene |
| `heatmap` | Thermal-camera look mapping brightness to a cold→hot ramp |
| `ascii` | Redraws the model as live text that morphs in real time |
| `passthrough` | The identity filter, fully commented as a template |

## Switching filters

- Press **`Ctrl+F`** in the editor to cycle through every filter in the folder
  (plus "none").
- Or set a default in your settings (**`Ctrl+G`**):

```toml
[viewer]
filter = ascii
```

## Writing your own filter

Copy `passthrough.glsl`, rename it, and define one function:

```glsl
vec4 apply(vec2 uv) {
    // scene(uv)    -> vec4  the rendered scene at uv (0..1)
    // luma(rgb)    -> float perceptual brightness
    // u_resolution -> vec2  window size in pixels
    // u_time       -> float seconds since launch
    return scene(uv);
}
```

Drop the file in the folder and it's instantly part of the `Ctrl+F` cycle.

### Example: pulsing vignette

```glsl
vec4 apply(vec2 uv) {
    vec4 color = scene(uv);
    float dist = distance(uv, vec2(0.5));
    float pulse = 0.75 + 0.25 * sin(u_time * 2.0);
    float vignette = smoothstep(0.8, 0.3 * pulse, dist);
    return vec4(color.rgb * vignette, color.a);
}
```

## Broken filters can't hurt you

Filters compile through the same panic-safe pipeline as models: if your GLSL
has an error, the viewer logs it and keeps the last working filter active.
Edit boldly.
