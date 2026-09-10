# Tile Type Banner

A framework-free Canvas 2D recreation of the square-tile wordmark effect.

## Open

Open `index.html` in a modern desktop browser. The artwork is exactly **734 × 260 CSS pixels** with a **#EDEDED** background.

## Change the copy

Edit the `WORDMARK` constant near the top of the inline script:

```js
const WORDMARK = "--type-{role}-{size}";
```

The bundled variable Inter font is used at weight 600. The wordmark is rasterised once into an alpha mask; the animation then draws only square tiles sampled from that mask.

## Behaviour

- A slow procedural colour wave changes tile size and colour.
- All animated highlights use the red accent `#EA0029`.
- Mouse movement brushes a soft, morphing light field with occasional square sparks.
- Device pixel ratio is capped at 2.
- Animation pauses while hidden or offscreen.
- Reduced-motion users receive a static tiled wordmark.
