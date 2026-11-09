// IronSmith filter: halftone
// Comic-book printing: cyan, magenta, yellow and black dots on cream paper,
// each ink on its own rotated grid. Darker areas get bigger dots.

// How much of one ink (0 c, 1 m, 2 y, 3 k) a colour needs.
float ink(vec3 rgb, int channel) {
    float k = 1.0 - max(rgb.r, max(rgb.g, rgb.b));
    if (channel == 3) {
        // Only shadows get black ink, so light areas stay clean.
        return max(k - 0.25, 0.0) / 0.75;
    }
    float amount = (1.0 - rgb[channel] - k) / max(1.0 - k, 0.001);
    return amount;
}

// Coverage of one ink's dot at this pixel.
float dots(vec2 pix, float degrees, int channel, float size) {
    float a = radians(degrees);
    mat2 turn = mat2(cos(a), sin(a), -sin(a), cos(a));
    mat2 back = mat2(cos(a), -sin(a), sin(a), cos(a));

    vec2 p = turn * pix;
    vec2 centre = (floor(p / size) + 0.5) * size;
    vec3 sampled = scene((back * centre) / u_resolution).rgb;

    float radius = sqrt(clamp(ink(sampled, channel), 0.0, 1.0)) * size * 0.72;
    return smoothstep(radius + 0.7, radius - 0.7, distance(p, centre));
}

vec4 apply(vec2 uv) {
    vec2 pix = uv * u_resolution;
    float size = 9.0;

    // Each ink absorbs one part of the light bouncing off the paper.
    vec3 col = vec3(0.98, 0.95, 0.86);
    col *= mix(vec3(1.0), vec3(0.05, 0.68, 0.92), dots(pix, 15.0, 0, size));
    col *= mix(vec3(1.0), vec3(0.93, 0.12, 0.52), dots(pix, 75.0, 1, size));
    col *= mix(vec3(1.0), vec3(1.0, 0.87, 0.05), dots(pix, 0.0, 2, size));
    col *= mix(vec3(1.0), vec3(0.1, 0.1, 0.12), dots(pix, 45.0, 3, size));

    return vec4(col, 1.0);
}
