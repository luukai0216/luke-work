# Ripple Lens Kinetic Type

A self-contained, framework-free WebGL1 banner with three kinetic-type scenes sharing one radial pincushion/ripple lens.

## Open

Open `index.html` in a modern desktop browser. The banner itself is exactly **734 × 260 CSS pixels** with a **#EDEDED** background.

## Change the copy

Edit the `COPY` object near the top of the inline script in `index.html`:

```js
const COPY = {
  sceneA: "TRON",
  sceneB: ["Type", "System"],
  sceneC: ["TRON", "Design", "Language"],
};
```

- `sceneA` is the bottom-to-top unrolling line.
- `sceneB` contains the two words/phrases swapped inside the boiling outline.
- `sceneC` contains the three right-to-left words.

Longer copy may need a small adjustment to `MOTION.a.textWidth`, `MOTION.b.textWidth`, or `MOTION.c.textWidth`.

For a static design check, append `?scene=0&frame=20`, `?scene=1&frame=10`, or `?scene=2&frame=8` to the file URL. Without those parameters, the three scenes loop normally.

## Typography and behaviour

- The bundled variable Inter font is used at weight 500.
- Text is rasterised at 2× resolution and uploaded once per phrase.
- The fragment shader supplies the pincushion distortion, radial ripple folds, and restrained chromatic dispersion.
- Hovering with a mouse carries only the lens; the underlying scene timing continues independently.
- Animation pauses in a hidden tab, and reduced-motion users receive one static frame.
