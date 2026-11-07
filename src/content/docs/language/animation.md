---
title: Camera Animation
description: Animating the camera with keyframes in .irsm scripts.
---

An `.irsm` script can describe not just a model, but a **camera path** around
it. Add `camera` keyframes to the script and IronSmith interpolates between
them, playing the result as a smooth loop — a turntable, a flythrough, or any
move you can describe with numbers.

## `camera(t, yaw, pitch, dist)`

A keyframe pinning the camera's pose at time `t` (in seconds):

```plaintext
camera(0, 0, 20, 25)
camera(4, 360, 20, 25)
```

- **`t`** — where on the timeline this pose sits, in seconds. The last
  keyframe's time is the loop's total length.
- **`yaw`** — horizontal angle around the model, in degrees.
- **`pitch`** — vertical angle, in degrees.
- **`dist`** — distance from the camera to its target point.

The two keyframes above make a classic **4-second turntable**: yaw sweeps from
0° to 360° while pitch and distance hold steady, then the loop wraps seamlessly
back to the start.

## `camera(t, yaw, pitch, dist, x, y, z)`

The optional trailing `x, y, z` sets the point the camera orbits and looks at
(default: the origin). Animate it to glide across a scene:

```plaintext
camera(0, 45, 25, 18, -6, 0, 0)   // start looking at the left side
camera(3, 45, 25, 18,  6, 0, 0)   // pan across to the right side
camera(6, 45, 25, 18, -6, 0, 0)   // and back, closing the loop
```

## Playing the animation

Press **`Ctrl+A`** in the editor to play the animation in the viewer; press it
again to stop. While playing, the camera path overrides orbit and manual
controls, and the status bar shows `-- ANIMATION PLAYING --`.

Everything stays live: edit a keyframe and the running animation picks up the
change the moment the script recompiles.

## Rules of thumb

- **Two keyframes minimum** for motion — a single keyframe is just a fixed pose.
- Keyframes may appear anywhere in the script and in any order; they're sorted
  by time.
- Motion between keyframes is linear, so the camera changes speed abruptly at
  each keyframe. For an ease-in/ease-out feel, add intermediate keyframes
  closer together near the ends of a move.
- Variables work in keyframes like everywhere else:

```plaintext
orbit_dist = 22
camera(0, 0, 15, orbit_dist)
camera(5, 360, 15, orbit_dist)
```

- To loop without a visible seam, make the last keyframe's pose match the
  first's (a 360° yaw difference counts as matching).
- Camera keyframes are viewer-side only — like `light(...)`, they're ignored
  by the `.obj` mesh exporter.

## Example: rise and reveal

```plaintext
body = paint(#cc6619, material(plastic, torus(6, 1.5)))
base = paint(#2a2d31, cube(18, 1, 18))
union(move(0, 3, 0, body), base)

camera(0,   0, 45, 30)    // high and far away
camera(3, 180, 10, 14)    // swing around while diving in close
camera(6, 360, 45, 30)    // pull back out, completing the circle
```

## Example: a launch pad fly-through

![A camera fly-through of a rocket on its launch pad](/gallery/launch_pad_flythrough.gif)

Camera keyframes can tell a story, not just spin. The repository's
[`examples/launch_pad.irsm`](https://github.com/Fraser-Levack/IronSmith/blob/main/examples/launch_pad.irsm)
is a simple rocket-on-a-pad scene with a seven-shot camera path. It changes the
look-at point, distance and pitch together, which is what makes a crane shot
work:

```plaintext
// camera(time, yaw, pitch, distance, look-at x, y, z)
camera(0,   30,  3,  9,  0, 2,    0)   // low at the engines
camera(3,   55,  8,  8,  0, 6,    0)   // crane up the side
camera(6,   85, 12,  6,  0, 10.5, 0)   // close-up on the crew window
camera(8,  110, 16,  8,  0, 12.5, 0)   // the nose cone against the sky
camera(11, 160, 28, 24,  0, 7,    0)   // pull back: the whole pad
camera(14, 250, 18, 26, -1, 6,    0)   // circle around behind the tower
camera(17, 390,  3,  9,  0, 2,    0)   // swoop back down (390 = 30 + 360)
```

Camera angles use the same convention as the
[CLI's `--view`](/guides/cli/#camera-angles): yaw `0` looks from +Z towards the
origin and `90` from +X; pitch is the height above the horizon (stay below
`90`).

Happy with the loop? [Export it as a video](/guides/video-export/) to share it.
