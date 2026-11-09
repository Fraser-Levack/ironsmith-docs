// IronSmith filter: pixel_art
// Big chunky pixels, a fixed 16-colour palette, and ordered dithering to fake
// the shades in between.

vec3 palette(int i) {
    if (i == 0)  return vec3(0.07, 0.06, 0.11);
    if (i == 1)  return vec3(0.20, 0.17, 0.27);
    if (i == 2)  return vec3(0.40, 0.38, 0.47);
    if (i == 3)  return vec3(0.68, 0.67, 0.72);
    if (i == 4)  return vec3(0.96, 0.94, 0.87);
    if (i == 5)  return vec3(0.27, 0.15, 0.13);
    if (i == 6)  return vec3(0.50, 0.29, 0.18);
    if (i == 7)  return vec3(0.77, 0.50, 0.27);
    if (i == 8)  return vec3(0.96, 0.73, 0.24);
    if (i == 9)  return vec3(1.00, 0.91, 0.50);
    if (i == 10) return vec3(0.72, 0.16, 0.20);
    if (i == 11) return vec3(0.95, 0.38, 0.27);
    if (i == 12) return vec3(0.15, 0.47, 0.33);
    if (i == 13) return vec3(0.45, 0.76, 0.35);
    if (i == 14) return vec3(0.15, 0.30, 0.65);
    return vec3(0.35, 0.68, 0.93);
}

// The 4x4 Bayer matrix, built from the bits of x and y. Returns 0..1.
float bayer(vec2 cell) {
    int x = int(mod(cell.x, 4.0));
    int y = int(mod(cell.y, 4.0));
    int a = x ^ y;
    int v = ((a & 1) << 3) | ((y & 1) << 2) | (((a >> 1) & 1) << 1) | ((y >> 1) & 1);
    return (float(v) + 0.5) / 16.0;
}

vec4 apply(vec2 uv) {
    // Size of one art pixel, in screen pixels
    float size = 8.0;

    vec2 cell = floor(uv * u_resolution / size);
    vec3 col = scene((cell + 0.5) * size / u_resolution).rgb;
    col += (bayer(cell) - 0.5) * 0.07;

    vec3 best = palette(0);
    float bestDist = 100.0;
    for (int i = 0; i < 16; i++) {
        vec3 d = col - palette(i);
        float dist = dot(d, d);
        if (dist < bestDist) {
            bestDist = dist;
            best = palette(i);
        }
    }
    return vec4(best, 1.0);
}
