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

## Filters in action

A filter only sees the finished image, so the model you feed it matters. Each of
these scenes was built around one filter. Open it, press **`Ctrl+F`** until the
filter comes up, and change a colour to see the effect respond.

### Clockwork and `edge_detection`

<div class="filter-compare">
<figure><img src="/gallery/clockwork.png" alt="Five brass and steel gears meshing on a riveted plate" /><figcaption>No filter</figcaption></figure>
<figure><img src="/gallery/clockwork_edges.png" alt="The same gears drawn as glowing white outlines on black" /><figcaption>edge_detection</figcaption></figure>
</div>

[`clockwork.irsm`](https://github.com/Fraser-Levack/ironsmith-docs/blob/main/gallery-scenes/clockwork.irsm):
the filter draws a line wherever brightness jumps, so a model made of hard edges
turns into a technical drawing. Neighbouring gears are painted in different
tones to keep the line between them, and a pure black backdrop leaves the
outlines on their own.

### Volcano and `heatmap`

<div class="filter-compare">
<figure><img src="/gallery/volcano.png" alt="A volcano with orange lava rivers and an ash plume" /><figcaption>No filter</figcaption></figure>
<figure><img src="/gallery/volcano_heatmap.png" alt="The same volcano in thermal colours, red at the crater, through yellow to green at the shore, on deep blue" /><figcaption>heatmap</figcaption></figure>
</div>

[`volcano.irsm`](https://github.com/Fraser-Levack/ironsmith-docs/blob/main/gallery-scenes/volcano.irsm):
the filter colours each pixel by brightness alone, so you can paint in a
temperature. The lava is `neon`, which ignores lighting, and it steps down in
brightness with height. That draws clean bands running from red at the crater
to green at the shore. The ramp reaches pure red at about 87% brightness and
darkens above that, so the brightest lava here is orange rather than white.

### Jack-o'-lantern and `ascii`

<div class="filter-compare">
<figure><img src="/gallery/pumpkin.png" alt="A carved pumpkin with a glowing triangular face" /><figcaption>No filter</figcaption></figure>
<figure><img src="/gallery/pumpkin_ascii.png" alt="The same pumpkin drawn in orange text characters, its face picked out in bright hash signs" /><figcaption>ascii, cell size 16</figcaption></figure>
</div>

[`pumpkin.irsm`](https://github.com/Fraser-Levack/ironsmith-docs/blob/main/gallery-scenes/pumpkin.irsm):
each block of pixels becomes one character, so fine detail is lost and only big
shapes survive. This is one bold silhouette with a face filled almost flush with
bright `neon`, so it prints as solid `#`. The body is matte because a shiny
highlight would print as a stray patch of `#` beside the eyes.

:::tip[Character size]
The `ascii` filter ships with `size = 32`. This image uses `size = 16` for finer
text: change that one line in your copy of `ascii.glsl`.
:::

## More filters to try

These four don't ship with IronSmith. Download a `.glsl` file, drop it in your
`filters/` folder, and it joins the **`Ctrl+F`** cycle straight away. Each one
comes with a scene built for it.

### Synthwave and `crt`

<div class="filter-compare">
<figure><img src="/gallery/synthwave.png" alt="A striped sun setting behind dark mountains over a glowing magenta grid" /><figcaption>No filter</figcaption></figure>
<figure><img src="/gallery/synthwave_crt.png" alt="The same scene on a curved old television, with scanlines and colour fringing" /><figcaption>crt</figcaption></figure>
</div>

[`crt.glsl`](https://github.com/Fraser-Levack/ironsmith-docs/blob/main/gallery-scenes/filters/crt.glsl)
and [`synthwave.irsm`](https://github.com/Fraser-Levack/ironsmith-docs/blob/main/gallery-scenes/synthwave.irsm):
curved glass, colour fringing, phosphor glow and scanlines, with a slow band
rolling down the screen over time. Thin bright lines on near-black give the glow
the most to work with.

### Hot-air balloons and `halftone`

<div class="filter-compare">
<figure><img src="/gallery/balloons.png" alt="Three striped hot-air balloons over green hills" /><figcaption>No filter</figcaption></figure>
<figure><img src="/gallery/balloons_halftone.png" alt="The same balloons printed in comic-book dots of cyan, magenta, yellow and black" /><figcaption>halftone</figcaption></figure>
</div>

[`halftone.glsl`](https://github.com/Fraser-Levack/ironsmith-docs/blob/main/gallery-scenes/filters/halftone.glsl)
and [`balloons.irsm`](https://github.com/Fraser-Levack/ironsmith-docs/blob/main/gallery-scenes/balloons.irsm):
comic-book printing, with each ink on its own rotated grid of dots. Big round
shapes give smooth gradients, so the dots visibly grow into the shadows.

### Butterfly and `stained_glass`

<div class="filter-compare">
<figure><img src="/gallery/butterfly.png" alt="An orange butterfly on rings of blue, purple and teal" /><figcaption>No filter</figcaption></figure>
<figure><img src="/gallery/butterfly_stained_glass.png" alt="The same butterfly as a stained-glass window of irregular panes" /><figcaption>stained_glass</figcaption></figure>
</div>

[`stained_glass.glsl`](https://github.com/Fraser-Levack/ironsmith-docs/blob/main/gallery-scenes/filters/stained_glass.glsl)
and [`butterfly.irsm`](https://github.com/Fraser-Levack/ironsmith-docs/blob/main/gallery-scenes/butterfly.irsm):
irregular panes, each taking one colour from the scene, framed in dark lead. The
scene is flat `neon` so each pane is a pure colour. The wing edges are dark plum
because black panes would vanish into the lead.

### Treasure chest and `pixel_art`

<div class="filter-compare">
<figure><img src="/gallery/treasure.png" alt="An open treasure chest full of gold and gems on a stone floor" /><figcaption>No filter</figcaption></figure>
<figure><img src="/gallery/treasure_pixel_art.png" alt="The same chest drawn in chunky pixels with a limited palette" /><figcaption>pixel_art</figcaption></figure>
</div>

[`pixel_art.glsl`](https://github.com/Fraser-Levack/ironsmith-docs/blob/main/gallery-scenes/filters/pixel_art.glsl)
and [`treasure.irsm`](https://github.com/Fraser-Levack/ironsmith-docs/blob/main/gallery-scenes/treasure.irsm):
big pixels, a fixed 16-colour palette and ordered dithering for the shades in
between. The model's wood, gold and gems sit close to colours in the palette.

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
