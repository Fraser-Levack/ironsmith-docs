---
title: Exporting Models
description: Turning IronSmith SDF models into standard .obj meshes.
---

While you edit, IronSmith models live as pure math: Signed Distance Fields
evaluated on the GPU. To use a model outside IronSmith (Blender, game engines,
3D printing pipelines), export it to a standard **`.obj` mesh**.

## Exporting from the editor

1. Save your script. The mesh is written next to it, with the same name and an
   `.obj` extension.
2. Press **Ctrl+Shift+E**, or run *Export to .OBJ* from the command palette
   (**Ctrl+P**).

The export runs in the background with a progress bar in the status bar, so
you can keep editing while it works.

## Exporting from the command line

```bash
ironsmith export model.irsm -o model.obj --res 128
```

See [Command Line & AI Agents](/guides/cli/) for the full CLI.

## How it works

The exporter samples your model's distance field on a 3D grid, on the CPU, and
reconstructs a triangle mesh from it. The grid size, cells per axis, is the
**export resolution**:

| Use case | Resolution |
| --- | --- |
| Quick previews | 64 |
| General-purpose models (default) | 128 |
| Hero assets, 3D printing | 192–256 |

Set it with `export_resolution` in your [settings](/guides/configuration/)
(**Ctrl+G**), or per export with the CLI's `--res`. Doubling the resolution
gives about four times as many triangles and takes roughly eight times longer,
so raise it only when you can see the facets.

In the live viewer the model is always exact; resolution only affects the
exported mesh.

## Tips

- **Geometry only.** Paint, materials, lights and camera keyframes are
  viewer-side and aren't part of the `.obj`.
- **Thin parts need resolution.** Features thinner than one grid cell can
  disappear from the mesh. Raise the resolution, or thicken them.
- Exported milestones in the IronSmith repo live under
  `saved_model_milestones/` if you want examples of real exports.
- Want to *show* a model rather than hand over the mesh? Add a
  [camera animation](/language/animation/) and
  [export it as a video](/guides/video-export/) instead.
