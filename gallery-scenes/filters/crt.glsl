// IronSmith filter: crt
// An old cathode-ray tube: curved glass, colour fringing, phosphor glow,
// scanlines, dark corners and a slow bright band rolling down the screen.

vec2 curve(vec2 uv) {
    vec2 c = uv * 2.0 - 1.0;
    vec2 bend = abs(c.yx) / vec2(7.0, 5.5);
    c = c + c * bend * bend;
    return c * 0.5 + 0.5;
}

vec4 apply(vec2 uv) {
    vec2 q = curve(uv);
    if (q.x < 0.0 || q.x > 1.0 || q.y < 0.0 || q.y > 1.0) {
        return vec4(0.0, 0.0, 0.0, 1.0);
    }

    vec2 px = 1.0 / u_resolution;

    // Colour fringing grows towards the edge of the tube
    float fringe = (1.0 + 3.0 * length(q - 0.5)) * px.x;
    vec3 col = vec3(scene(q + vec2(fringe, 0.0)).r,
                    scene(q).g,
                    scene(q - vec2(fringe, 0.0)).b);

    // Phosphor glow: a coarse blur added back on top
    vec3 glow = vec3(0.0);
    for (int y = -2; y <= 2; y++) {
        for (int x = -2; x <= 2; x++) {
            glow += scene(q + vec2(float(x), float(y)) * px * 5.0).rgb;
        }
    }
    col += glow / 25.0 * 0.45;

    // Scanlines, a fine vertical mask, and the rolling band
    float line = 0.72 + 0.28 * sin(q.y * u_resolution.y * 3.14159 * 0.5);
    float mask = 0.92 + 0.08 * sin(q.x * u_resolution.x * 3.14159 * 0.667);
    float band = 1.0 + 0.08 * smoothstep(0.08, 0.0, abs(fract(q.y - u_time * 0.08) - 0.5));

    // Dark corners
    vec2 v = q * (1.0 - q);
    float vignette = pow(clamp(v.x * v.y * 18.0, 0.0, 1.0), 0.3);

    return vec4(col * line * mask * band * vignette, 1.0);
}
