---
title: Contributing to IronSmith
description: How to contribute code to the IronSmith editor and viewer.
---

IronSmith is an open-source forge, and contributions of any size are highly
appreciated — from typo fixes to raymarching optimisations to new language
features.

## How to contribute

1. **Fork** the [repository](https://github.com/Fraser-Levack/IronSmith)
2. **Branch:** `git checkout -b feature/your-awesome-feature`
3. **Make your changes** — if your feature bridges both halves, test the
   Haskell TUI *and* the Rust viewer
4. **Commit** with a descriptive message
   (`feat: add ellipsoid primitive`, not `update parser`)
5. **Push** and **open a Pull Request**

## Where help is wanted

- **Graphics (Rust):** material and colour improvements, new shader effects
- **Language (Haskell):** new primitives, better error messages
- **Performance:** an instant preview while a new structure compiles, and
  per-shape bounding volumes to speed up rendering of big scenes
- **Tooling:** more export formats, mesh optimisation
- **Quality of life:** keyboard shortcuts, project templates, documentation

## Development setup

Build the Rust viewer **first** — the Haskell editor expects the viewer binary
to exist:

```bash
cd IronSmith-Viewer && cargo build --release && cd ..
cabal run ironsmith
```

## Example: adding a new primitive

The most common language contribution touches both halves, because the editor
compiles scripts to bytecode and the viewer turns bytecode into a shader:

1. **AST:** add the node in `src/AST.hs` (e.g. `Ellipsoid Expr Expr Expr`).
2. **Parser:** recognise `ellipsoid(...)` in `src/Parser.hs`, with an arity
   error message like the other primitives.
3. **Compiler:** emit a new opcode and its arguments in `src/Evaluator.hs`.
   Instructions are 4 floats (or 8 for wide ones).
4. **Mesh exporter:** evaluate the opcode in the CPU interpreter in
   `src/Exporter.hs`, so `.obj` export matches the viewer.
5. **Viewer:** handle the opcode in `generate_program` in
   `IronSmith-Viewer/src/shader.rs`, and add the GLSL distance function to the
   shader template. Store every number with the `Params` helper (`prm.f(...)`)
   rather than writing it into the GLSL, so editing it never recompiles. An
   opcode must always store the **same number** of params. If the instruction
   is 8 floats wide, add it to the width checks there and in `extract_light`.
6. **Tests:** parser and evaluator tests in `test/`, and a Rust test that the
   generated shader validates with naga (see the existing `shader.rs` tests).
7. **Document it:** update the language reference (see
   [Improving these Docs](/contributing/documentation/)).

:::caution[Don't add another call to `map()`]
The shader template evaluates the scene through one `map()` call inside a
single loop. GPU drivers copy `map()` into every call site, so adding a second
call can make big scenes take several times longer to compile. To add a new
lighting effect that needs to sample the scene, add a phase to the loop
instead. The [architecture page](/guides/architecture/#why-edits-are-fast)
explains why.
:::

## Quality bar

- **Haskell:** compiles cleanly with no warnings; run `hlint .` before PRs
- **Rust:** run `cargo fmt` and `cargo clippy`; no `unsafe` without strong
  justification
- **Tests:** `cabal test` for the Forge, `cargo test` in `IronSmith-Viewer/`
  for the Viewer

CI builds and smoke-tests on Windows, macOS, and Linux, so check that both
halves build on your platform before pushing.
