---
title: Command Line & AI Agents
description: Checking, rendering and exporting .irsm models from scripts and AI coding agents.
---

Run `ironsmith` with no arguments and you get the editor. Give it a command and
it works headlessly instead, so shell scripts, build pipelines and AI coding
agents (Claude Code, Codex, and so on) can build models from plain text and
check their own work.

```bash
ironsmith check  car.irsm                        # validate the script
ironsmith render car.irsm -o car.png             # render a still image
ironsmith render car.irsm --view -135,20,11      # ...from a chosen angle
ironsmith export car.irsm -o car.obj --res 128   # write a mesh
ironsmith help
```

## Commands

| Command | Does | Prints on success |
| --- | --- | --- |
| `ironsmith check FILE` | Parse and validate | `OK: FILE (N statements, M bytecode instructions)` |
| `ironsmith render FILE [-o OUT.png] [--view YAW,PITCH,DIST[,X,Y,Z]]` | Show the model in the viewer and save a still | `OK: wrote OUT.png` |
| `ironsmith export FILE [-o OUT.obj] [--res N]` | Write a Wavefront OBJ mesh | `OK: wrote OUT.obj (resolution N)` |

- Outputs default to the input path with a `.png` or `.obj` extension.
- Errors go to stderr as `error: FILE:LINE: message`; parse errors also show
  the line with a caret under the problem.
- **Exit codes:** `0` OK, `1` script error, `2` bad usage, `3` viewer or I/O
  failure.

## Rendering

`render` needs a desktop session with a GPU, because it uses the real viewer.
If no viewer is running, it starts one and **leaves it open**, so later renders
take a fraction of a second. If you have the editor open, `render` shows the
model in your existing viewer window.

The image is the size of the viewer window. `render` waits for the viewer to
finish compiling the scene, and reports an error (rather than saving a stale
image) if the scene fails. `check` and `export` run on the CPU and work
anywhere.

### Camera angles

`--view YAW,PITCH,DIST` in degrees and world units, optionally followed by the
`X,Y,Z` point to look at:

- `yaw 0` looks from +Z towards the origin, `90` from +X, `-90` from -X,
  `180` from -Z.
- `pitch` is the height above the horizon: `0` is level, `89` almost straight
  down (avoid exactly `90`).

Without `--view`, `render` frames the whole model automatically from the
front-right.

:::tip[Faster renders of big scenes]
Auto-framing measures the model on the CPU, which takes a few seconds on scenes
with hundreds of shapes. Passing all six `--view` values skips it.
:::

## The agent workflow

The loop that works well for an agent:

1. **Write** the model to a `.irsm` file.
2. **Check** it with `ironsmith check`.
3. **Render** it and look at the PNG, from more than one side.
4. **Adjust** the script and repeat.
5. **Export** a mesh if one is wanted.

Things worth putting in an agent's instructions:

- **Y is up**, ground at `y = 0`, and give models a front facing +X.
- `cube` takes full sizes; `cylinder`, `cone` and `torus` stand along Y.
  Lay a cylinder along Z with `rotateX(90, ...)`.
- `difference(a, b)` cuts `b` out of `a`.
- Keep scenes within about 30 units of the origin. The viewer only raymarches
  inside a bounding sphere around it.
- `render` uses whichever [filter](/guides/filters/) the viewer has active, and
  has no filter option of its own. A filter that fails to compile doesn't fail
  the render, so check `forge.log` and look at the image.

The IronSmith repository has a complete guide written *for* agents in
[`docs/AGENT_GUIDE.md`](https://github.com/Fraser-Levack/IronSmith/blob/main/docs/AGENT_GUIDE.md):
point your agent at it.

## Using it from other programs

The CLI prints plain lines and uses exit codes, so it's easy to call from any
language. For example, from Python:

```python
import subprocess
r = subprocess.run(["ironsmith", "render", "model.irsm", "-o", "model.png"],
                   capture_output=True, text=True)
if r.returncode != 0:
    print(r.stderr)
```
