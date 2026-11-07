---
title: Configuration
description: The ironsmith.toml settings file — every setting, its default, and what it does.
---

IronSmith is configured through **`ironsmith.toml`** in your config directory.
It's created with defaults (and comments) the first time you run IronSmith.
The format is simple `key = value` lines under `[section]` headers. Comments
go on their own line, starting with `#`; a comment after a value isn't
supported and would make that setting fall back to its default.

- **Windows:** `%APPDATA%\ironsmith\`
- **Linux / macOS:** `~/.config/ironsmith/`

Press **Ctrl+G** in the editor (or **G** on the start screen) to edit it in
place, then **Ctrl+S** to save and apply. **Esc** discards your changes.

## `[viewer]`

```toml
[viewer]
background_color = #05050d
default_object_color = #cc6619
default_camera_dist = 20.0
auto_orbit = true
shadow_enabled = true
march_steps = 150
filter = none
exposure = 1.0
```

| Setting | What it does |
| --- | --- |
| `background_color` | The viewport background, as `#rrggbb` or three floats from 0 to 1 (`0.02, 0.02, 0.05`). Metal surfaces reflect it, so it also tints chrome and water. |
| `default_object_color` | Colour for any shape not inside a [`paint(...)`](/language/materials/). |
| `default_camera_dist` | How far the camera starts from the origin. |
| `auto_orbit` | Start in orbit mode. **Ctrl+E** switches modes at any time. |
| `shadow_enabled` | Soft shadows from the [light](/language/lighting/). |
| `march_steps` | Raymarching step budget (64–256). Raise it if distant or grazing surfaces look broken up; lower it for speed. |
| `filter` | Which [post-processing filter](/guides/filters/) is active on launch. **Ctrl+F** cycles filters at runtime. |
| `exposure` | Multiplies the final colour (0.2–4.0). A dim `light(...)` plus raised exposure gives soft, even lighting. |

## `[editor]`

```toml
[editor]
auto_compile_delay_ms = 150
```

| Setting | What it does |
| --- | --- |
| `auto_compile_delay_ms` | How long after you stop typing the scene updates, in milliseconds. Edits that only change numbers are instant in the viewer, so this can be short. Adding or removing shapes still compiles a new shader, which takes from under a second to a few seconds for very large scenes. |

Undo grouping is separate: typing with pauses shorter than half a second
undoes as one step, whatever this delay is set to.

## `[export]`

```toml
[export]
export_resolution = 128
video_fps = 30
```

| Setting | What it does |
| --- | --- |
| `export_resolution` | Grid cells per axis for [exported meshes](/guides/exporting/) (64–256). Higher is finer, slower and larger. |
| `video_fps` | Framerate for [video export](/guides/video-export/). |

## `[keybindings]`

Every editor command can be rebound. The format is `modifier+modifier+key`;
modifiers are `ctrl`, `alt` and `shift`, and a key is a single character or one
of `esc enter tab space up down left right backspace delete f1`…`f12`.

```toml
[keybindings]
command_palette = ctrl+p
save = ctrl+s
open_file = ctrl+o
settings = ctrl+g
cycle_view_mode = ctrl+e
reset_camera = ctrl+r
export_obj = ctrl+shift+e
cycle_filter = ctrl+f
toggle_animation = ctrl+a
export_video = ctrl+shift+v
undo = ctrl+z
redo = ctrl+y
copy = ctrl+c
cut = ctrl+x
paste = ctrl+v
```

Commands missing from your file keep their defaults, so an older config picks
up new shortcuts automatically. See [The Editor](/guides/editor/) for what each
command does.

:::note[Reserved settings]
`default_material`, `editor_line_wrap`, `launch_viewer_on_start` and
`restore_last_file` appear in the generated file but aren't implemented yet.
Changing them currently has no effect.
:::

## Logs

If a script, shader or filter fails to compile, or a video export fails, the
reason is logged to **`forge.log`** in the same config directory. It's the
first place to look when the viewer seems to be ignoring your latest change.
