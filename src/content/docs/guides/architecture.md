---
title: Architecture
description: How The Forge (Haskell) and The Viewer (Rust) work together, and why edits are fast.
---

IronSmith is a monorepo pairing two strict, high-performance languages that
talk to each other in real time:

```
 ┌─────────────────────────┐            ┌──────────────────────────────┐
 │   The Forge (Haskell)   │  bytecode  │   The Viewer (Rust + wgpu)   │
 │                         │  + CMD:…   │                              │
 │  TUI editor (brick)     │ ─────────▶ │  Bytecode → GLSL + numbers   │
 │  Parser → AST           │  local TCP │  Pipeline cache              │
 │  Validator              │  port 7878 │  Raymarcher + filter pass    │
 │  Compiler → bytecode    │ ◀───────── │  Screenshots, video export   │
 │  Headless CLI           │  OK/ERROR  │                              │
 └─────────────────────────┘            └──────────────────────────────┘
```

## The Forge (Haskell)

The orchestrator. A terminal UI built with `brick` that:

1. **Parses** your `.irsm` script into an Abstract Syntax Tree.
2. **Validates** it: every identifier must be defined before use and used
   with the right kind (number vs shape), so mid-edit states never reach the GPU.
3. **Evaluates** variables and resolves shapes eagerly (which is why
   `a = union(a, ...)` safely refers to the previous `a`).
4. **Compiles** the scene to a compact **bytecode** for a small stack machine:
   push a primitive, combine the top two shapes with a CSG operation, push or
   pop a transform or colour.
5. **Sends** it to the viewer over a local TCP socket, along with commands
   (`CMD:...`) for camera modes, filters, animation and exports.

The same binary is also the [headless CLI](/guides/cli/) (`check`, `render`,
`export`), and the [OBJ exporter](/guides/exporting/) runs the bytecode on the
CPU to sample the model.

## The Viewer (Rust + wgpu)

A cross-platform GPU window that:

1. **Receives** bytecode and commands on `127.0.0.1:7878`.
2. **Generates a shader** from the bytecode and compiles it in the background,
   keeping the current scene on screen until the new one is ready.
3. **Renders** in two passes: the raymarched scene into an offscreen texture,
   then a [post-processing filter](/guides/filters/) to the screen.
4. **Answers requests** such as screenshots with an `OK` or `ERROR` line, which
   is how the CLI's `render` knows when the image is ready.

It runs on Vulkan and DX12 (Windows), Metal (macOS) and Vulkan (Linux).

## Why edits are fast

On large scenes, the slow part of an edit isn't IronSmith: it's the GPU
driver compiling the shader. A one-number change to a 250-shape scene used to
take over ten seconds, so the viewer is built to avoid compiling whenever it
can.

- **Numbers live in a buffer, not in the shader.** Every size, position, angle,
  colour, material and light value goes into a GPU buffer. The generated shader
  depends only on the scene's **structure**: which shapes and operations, in
  what order. Changing numbers is just a buffer update, with no compile.
- **Compiled shaders are cached by structure.** The last 32 structures stay
  compiled, so undo/redo back to a structure seen recently is also instant.
- **The scene is evaluated in one place.** GPU drivers copy the scene's distance
  function into every place the shader calls it. The shader template is a
  single loop that handles the march, surface normals, shadows and reflections
  as phases, so the scene function is called, and compiled, exactly once.
- **Compiles run one at a time, newest first.** If you edit while a compile is
  running, the queued edits collapse into one follow-up compile, and results
  are always installed in edit order.

With all of this, a new structure on a 250-shape scene compiles in about three
seconds, and number edits feel instant at any size.

## Defence in depth

Broken scenes are stopped at three layers, closest to the editor first:

1. **Parse:** syntax errors, reported with a line number in the TUI.
2. **Validate:** undefined or wrongly-typed identifiers; nothing is sent to
   the viewer on failure.
3. **Viewer guards:** malformed bytecode is rejected, and every generated
   shader is validated (with naga) before it touches the GPU. Rejections are
   logged to `forge.log` and the last working scene stays active.

The result: you can type freely, half-finish lines and make mistakes. The
rendered model only ever moves *forward* from one valid state to the next.

## Want to dig into the code?

The [repository](https://github.com/Fraser-Levack/IronSmith) has a full map of
the source layout: see `src/` for the Haskell Forge and `IronSmith-Viewer/src/`
for the Rust Viewer, then read [Contributing](/contributing/ironsmith/) to get
involved.
