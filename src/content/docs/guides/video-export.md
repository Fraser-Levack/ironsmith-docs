---
title: Exporting Video
description: Rendering camera animations to shareable .mp4 or .gif files.
---

Once a script has a [camera animation](/language/animation/), IronSmith can
render the loop to a video file — the easiest way to show off a model without
sending someone the whole tool.

## Exporting

1. Save your script (the video is written next to the `.irsm` file).
2. Press **`Ctrl+Shift+V`** (or run *Export Animation Video* from the command
   palette, `Ctrl+P`).

The viewer window's title shows frame-by-frame progress, and when it finishes,
the output path. One full loop of the animation is rendered.

## Output format

- With **ffmpeg** available on your `PATH`, you get an **`.mp4`** — best
  quality and file size.
- Without it, IronSmith falls back to a built-in encoder and writes an
  animated **`.gif`** — no extra installs, and GIFs preview inline almost
  everywhere (GitHub READMEs, chat apps, forums).

Installing ffmpeg later automatically upgrades future exports to `.mp4`;
nothing to configure.

## Always smooth, by construction

Exports don't record the live viewport. The viewer steps the animation's
timeline offline, one frame at a time, at a fixed framerate — so the output is
perfectly smooth even on a GPU that can't play the scene back at full speed.
Set the framerate in `ironsmith.toml` (`Ctrl+G`):

```toml
[export]
# Frames per second for animation video export.
video_fps = 30
```

Higher values mean smoother motion and proportionally longer exports.

## Tips

- **Resolution follows the viewer window** — resize the viewer before
  exporting to choose your output size.
- **Filters are baked in.** The active
  [post-processing filter](/guides/filters/) is rendered into every frame, so
  an `ascii` or `edge_detection` flythrough exports exactly as you see it.
- The viewer pauses interaction while exporting; a few seconds for a short
  clip is normal.
- If an export fails, the reason is logged to `forge.log` in your config
  directory — see [Configuration](/guides/configuration/).
