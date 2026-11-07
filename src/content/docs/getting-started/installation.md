---
title: Installation
description: Install IronSmith from a prebuilt release or build it from source.
---

## Requirements

- A GPU capable of **Vulkan**, **Metal**, or **DX12**:
  - **Windows:** Vulkan or DX12
  - **macOS:** Metal
  - **Linux:** Vulkan

CPU fallback rendering is not yet implemented, so a compatible GPU is required.

Optional: install [ffmpeg](https://ffmpeg.org) and put it on your `PATH` to
[export videos](/guides/video-export/) as `.mp4`. Without it, videos are saved
as animated `.gif` files.

## Option A: Prebuilt release (Windows)

1. Download `IronSmith-v0.1.0-windows.zip` from the
   [Releases page](https://github.com/Fraser-Levack/IronSmith/releases).
2. Extract it anywhere.
3. Run `ironsmith.exe` — or run `install.ps1` to add IronSmith to your PATH.

## Option B: Build from source

Building from source requires both toolchains:

- **Haskell:** GHC and Cabal
- **Rust:** `rustc` and Cargo

**1. Clone the repository:**

```bash
git clone https://github.com/Fraser-Levack/IronSmith.git
cd IronSmith
```

**2. Build the Rust viewer first.** The Haskell editor launches the viewer
binary, so the viewer must exist before the editor runs:

```bash
cd IronSmith-Viewer
cargo build --release
cd ..
```

**3. Run the Haskell TUI:**

```bash
cabal run ironsmith
```

:::tip[Developing on IronSmith itself?]
The TUI launches `ironsmith-viewer` from the directory next to its own
executable, falling back to your PATH. If you've previously *installed*
IronSmith (e.g. to `C:\cabal\bin`), that copy will shadow fresh development
builds — copy new binaries over it or run from the build directories.
:::

## Next step

With IronSmith running, it's time to [forge your first model](/getting-started/first-model/).
