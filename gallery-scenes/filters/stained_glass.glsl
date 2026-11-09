// IronSmith filter: stained_glass
// Breaks the image into irregular panes (a Voronoi pattern). Each pane takes one
// colour from the scene, glows from its middle and is framed in dark lead.

vec2 scatter(vec2 p) {
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}

vec4 apply(vec2 uv) {
    // Average width of a pane, in pixels
    float size = 26.0;

    vec2 p = uv * u_resolution / size;
    vec2 cell = floor(p);

    float nearest = 8.0;
    float second = 8.0;
    vec2 pane = vec2(0.0);

    for (int y = -1; y <= 1; y++) {
        for (int x = -1; x <= 1; x++) {
            vec2 c = cell + vec2(float(x), float(y));
            vec2 seed = c + 0.1 + 0.8 * scatter(c);
            float d = distance(p, seed);
            if (d < nearest) {
                second = nearest;
                nearest = d;
                pane = seed;
            } else if (d < second) {
                second = d;
            }
        }
    }

    vec3 glass = scene(pane * size / u_resolution).rgb;

    // Richer colour, brighter towards the middle of the pane
    glass = mix(vec3(luma(glass)), glass, 1.3);
    glass *= 0.72 + 0.5 * smoothstep(0.75, 0.0, nearest);

    // The lead runs where two panes are equally close
    float lead = smoothstep(0.05, 0.11, second - nearest);
    return vec4(mix(vec3(0.03, 0.03, 0.04), glass, lead), 1.0);
}
