---
title: The Editor
description: Using the IronSmith terminal editor — editing, selection, clipboard, the viewer camera, and every keyboard shortcut.
---

The Forge is a terminal editor built for `.irsm` scripts. It highlights your
code, shows errors on the line they happen, and updates the viewer a moment
after you stop typing.

## Start screen

| Key | Action |
| --- | --- |
| **Enter** | New file |
| **O** | Open a file by path |
| **1**–**5** | Open a recent file |
| **G** | Open settings |
| **Esc** | Quit |

## Editing

- **Syntax highlighting** colours shapes, CSG operations, transformations,
  numbers, hex colours and comments.
- **Errors** appear in the status bar, and the offending line is highlighted in
  red. The viewer keeps showing your last valid model until the error is fixed.
- **Scroll bars** appear on the right and bottom when a script is longer or
  wider than the window. Click the arrows to move a line, or the track to move
  a page. The **mouse wheel** scrolls too.
- **Ctrl+S** saves (and asks for a file name the first time). **Esc** returns
  to the start screen, offering to save unsaved changes. A `*` after the file
  name in the title means there are unsaved changes.

### Selecting text

| Action | How |
| --- | --- |
| Place the cursor | Click |
| Select with the mouse | Click and drag, across as many lines as you like |
| Select with the keyboard | **Shift** + arrows, **Shift+Home**, **Shift+End** |
| Replace the selection | Just type, or paste |
| Delete the selection | **Backspace** or **Delete** |

### Clipboard

| Key | Action |
| --- | --- |
| **Ctrl+C** | Copy the selection (or the whole line if nothing is selected) |
| **Ctrl+X** | Cut the selection (or the whole line) |
| **Ctrl+V** | Paste |

Copied text also goes to your system clipboard, so you can paste it into other
programs. Pasting from other programs works through your terminal's own paste
(in Windows Terminal, Ctrl+V does this).

:::tip[Terminal selection]
The editor uses the mouse itself, so your terminal's own click-and-drag
selection is turned off while it's running. Hold **Shift** while dragging to
use the terminal's selection instead.
:::

### Undo and redo

**Ctrl+Z** undoes and **Ctrl+Y** redoes. Typing is grouped into one undo step
until you pause for half a second.

## Command palette

Press **Ctrl+P**, type to filter, use **Up**/**Down** to choose and **Enter** to
run. Every command and its current shortcut is listed there, so it's the
easiest way to find one you've forgotten.

## Controlling the viewer

The viewer window follows your script. These keys control it from the editor:

| Key | Action |
| --- | --- |
| **Ctrl+E** | Cycle camera mode: **orbit** (slowly circles), **static**, **fly** |
| **Ctrl+R** | Reset the camera |
| **Ctrl+F** | Cycle [post-processing filters](/guides/filters/) |
| **Ctrl+A** | Play or stop the script's [camera animation](/language/animation/) |

The status bar shows the current mode. In **fly mode**, these keys steer the
camera instead of typing:

| Key | Action |
| --- | --- |
| **W**/**S** or **Up**/**Down** | Tilt up / down |
| **A**/**D** or **Left**/**Right** | Turn left / right |
| **Z** / **X** | Zoom in / out |
| **Shift+W** / **Shift+S** | Move forward / back |
| **Shift+A** / **Shift+D** | Move left / right |
| **Shift+Z** / **Shift+X** | Move up / down |

Switch back to orbit or static mode with **Ctrl+E** to type those letters
again. In any mode, scrolling the mouse wheel over the viewer window zooms.

## Exporting

| Key | Action |
| --- | --- |
| **Ctrl+Shift+E** | [Export the model to `.obj`](/guides/exporting/) |
| **Ctrl+Shift+V** | [Export the camera animation as a video](/guides/video-export/) |

## All shortcuts

| Key | Command |
| --- | --- |
| **Ctrl+P** | Command palette |
| **Ctrl+S** | Save |
| **Ctrl+O** | Open file |
| **Ctrl+G** | Settings |
| **Ctrl+E** | Cycle camera mode |
| **Ctrl+R** | Reset camera |
| **Ctrl+F** | Cycle filter |
| **Ctrl+A** | Play / stop animation |
| **Ctrl+Shift+E** | Export to `.obj` |
| **Ctrl+Shift+V** | Export animation video |
| **Ctrl+Z** / **Ctrl+Y** | Undo / redo |
| **Ctrl+C** / **Ctrl+X** / **Ctrl+V** | Copy / cut / paste |
| **Ctrl+Q** | Quit immediately |

All of these except **Ctrl+Q** can be changed in the
[`[keybindings]` settings](/guides/configuration/#keybindings).
