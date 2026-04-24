---
version: "alpha"
name: "Nexus — The Architecture of Capital"
description: "Nexus Architecture Login Section is designed for authenticating users through a focused access flow. Key features include reusable structure, responsive behavior, and production-ready presentation. It is suitable for authentication screens in web products."
colors:
  primary: "#0F172A"
  secondary: "#1E293B"
  tertiary: "#94A3B8"
  neutral: "#FFFFFF"
  background: "#0F172A"
  surface: "#1E293B"
  text-primary: "#94A3B8"
  text-secondary: "#FFFFFF"
  border: "#FFFFFF"
  accent: "#0F172A"
typography:
  display-lg:
    fontFamily: "Inter"
    fontSize: "72px"
    fontWeight: 500
    lineHeight: "72px"
    letterSpacing: "-0.05em"
  body-md:
    fontFamily: "Inter"
    fontSize: "18px"
    fontWeight: 300
    lineHeight: "29.25px"
  label-md:
    fontFamily: "Inter"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: "20px"
rounded:
  md: "0px"
  full: "9999px"
spacing:
  base: "4px"
  sm: "2px"
  md: "4px"
  lg: "10px"
  xl: "12px"
  gap: "12px"
  card-padding: "24px"
  section-padding: "24px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: "10px"
  button-link:
    textColor: "{colors.tertiary}"
    rounded: "{rounded.md}"
    padding: "0px"
  card:
    rounded: "24px"
    padding: "24px"
---

## Overview

- **Composition cues:**
  - Layout: Grid
  - Content Width: Bounded
  - Framing: Glassy
  - Grid: Strong

## Colors

The color system uses dark mode with #0F172A as the main accent and #FFFFFF as the neutral foundation.

- **Primary (#0F172A):** Main accent and emphasis color.
- **Secondary (#1E293B):** Supporting accent for secondary emphasis.
- **Tertiary (#94A3B8):** Reserved accent for supporting contrast moments.
- **Neutral (#FFFFFF):** Neutral foundation for backgrounds, surfaces, and supporting chrome.

- **Usage:** Background: #0F172A; Surface: #1E293B; Text Primary: #94A3B8; Text Secondary: #FFFFFF; Border: #FFFFFF; Accent: #0F172A

- **Gradients:** bg-gradient-to-tr from-blue-600 to-blue-400, bg-gradient-to-r from-blue-400 to-blue-200

## Typography

Typography relies on Inter across display, body, and utility text.

- **Display (`display-lg`):** Inter, 72px, weight 500, line-height 72px, letter-spacing -0.05em.
- **Body (`body-md`):** Inter, 18px, weight 300, line-height 29.25px.
- **Labels (`label-md`):** Inter, 14px, weight 500, line-height 20px.

## Layout

Layout follows a grid composition with reusable spacing tokens. Preserve the grid, bounded structural frame before changing ornament or component styling. Use 4px as the base rhythm and let larger gaps step up from that cadence instead of introducing unrelated spacing values.

Treat the page as a grid / bounded composition, and keep that framing stable when adding or remixing sections.

- **Layout type:** Grid
- **Content width:** Bounded
- **Base unit:** 4px
- **Scale:** 2px, 4px, 10px, 12px, 16px, 24px, 32px, 40px
- **Section padding:** 24px
- **Card padding:** 24px
- **Gaps:** 12px, 16px, 24px, 32px

## Elevation & Depth

Depth is communicated through glass, border contrast, and reusable shadow or blur treatments. Keep those recipes consistent across hero panels, cards, and controls so the page reads as one material system.

Surfaces should read as glass first, with borders, shadows, and blur only reinforcing that material choice.

- **Surface style:** Glass
- **Borders:** 1px #FFFFFF; 2px #020617
- **Shadows:** rgba(255, 255, 255, 0.15) 0px 1px 1px 0px inset, rgba(0, 0, 0, 0.8) 0px -1px 1px 0px inset, rgba(0, 0, 0, 0.5) 0px 25px 50px -12px; rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(59, 130, 246, 0.6) 0px 0px 15px 0px; rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(255, 255, 255, 0.4) 0px 1px 1px 0px inset, rgba(59, 130, 246, 0.4) 0px 0px 20px 0px
- **Blur:** 24px, 32px

### Techniques
- **Gradient border shell:** Use a thin gradient border shell around the main card. Wrap the surface in an outer shell with 0px padding and a 50% radius. Drive the shell with radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(0, 0, 0, 0) 70%) so the edge reads like premium depth instead of a flat stroke. Keep the actual stroke understated so the gradient shell remains the hero edge treatment. Inset the real content surface inside the wrapper with a slightly smaller radius so the gradient only appears as a hairline frame.

## Shapes

Shapes rely on a tight radius system anchored by 4px and scaled across cards, buttons, and supporting surfaces. Icon geometry should stay compatible with that soft-to-controlled silhouette.

Use the radius family intentionally: larger surfaces can open up, but controls and badges should stay within the same rounded DNA instead of inventing sharper or pill-only exceptions.

- **Corner radii:** 4px, 12px, 24px, 9999px
- **Icon treatment:** Linear
- **Icon sets:** Solar

## Components

Anchor interactions to the detected button styles. Reuse the existing card surface recipe for content blocks.

### Buttons
- **Primary:** background #0F172A, text #FFFFFF, radius 9999px, padding 10px, border 1px solid rgba(255, 255, 255, 0.05).
- **Links:** text #94A3B8, radius 0px, padding 0px, border 0px solid rgb(229, 231, 235).

### Cards and Surfaces
- **Card surface:** background rgba(30, 41, 59, 0.4), border 1px solid rgba(255, 255, 255, 0.05), radius 24px, padding 24px, shadow rgba(255, 255, 255, 0.15) 0px 1px 1px 0px inset, rgba(0, 0, 0, 0.8) 0px -1px 1px 0px inset, rgba(0, 0, 0, 0.5) 0px 25px 50px -12px, blur 24px.
- **Card surface:** background rgba(15, 23, 42, 0.6), border 1px solid rgba(255, 255, 255, 0.05), radius 24px, padding 24px, shadow rgba(255, 255, 255, 0.15) 0px 1px 1px 0px inset, rgba(0, 0, 0, 0.8) 0px -1px 1px 0px inset, rgba(0, 0, 0, 0.5) 0px 25px 50px -12px, blur 32px.

### Iconography
- **Treatment:** Linear.
- **Sets:** Solar.

## Do's and Don'ts

Use these constraints to keep future generations aligned with the current system instead of drifting into adjacent styles.

### Do
- Do use the primary palette as the main accent for emphasis and action states.
- Do keep spacing aligned to the detected 4px rhythm.
- Do reuse the Glass surface treatment consistently across cards and controls.
- Do keep corner radii within the detected 4px, 12px, 24px, 9999px family.

### Don't
- Don't introduce extra accent colors outside the core palette roles unless the page needs a new semantic state.
- Don't mix unrelated shadow or blur recipes that break the current depth system.
- Don't exceed the detected expressive motion intensity without a deliberate reason.

## Motion

Motion feels expressive but remains focused on interface, text, and layout transitions. Timing clusters around 150ms and 500ms. Easing favors ease and cubic-bezier(0.4. Hover behavior focuses on text and transform changes. Scroll choreography uses Parallax for section reveals and pacing.

**Motion Level:** expressive

**Durations:** 150ms, 500ms

**Easings:** ease, cubic-bezier(0.4, 0, 0.2, 1)

**Hover Patterns:** text, transform, grayscale, opacity, color, shadow

**Scroll Patterns:** parallax

## WebGL

Reconstruct the graphics as a inset 3d accent using webgl, renderer, alpha, antialias, dpr clamp, custom shaders. The effect should read as retro-futurist, technical, and meditative: dot-matrix particle field with green on black and sparse spacing. Build it from dot particles + soft depth fade so the effect reads clearly. Animate it as slow breathing pulse. Interaction can react to the pointer, but only as a subtle drift. Preserve dom fallback.

**Id:** webgl

**Label:** WebGL

**Stack:** ThreeJS, WebGL

**Insights:**
  - **Scene:**
    - **Value:** Inset 3D accent
  - **Effect:**
    - **Value:** Dot-matrix particle field
  - **Primitives:**
    - **Value:** Dot particles + soft depth fade
  - **Motion:**
    - **Value:** Slow breathing pulse
  - **Interaction:**
    - **Value:** Pointer-reactive drift
  - **Render:**
    - **Value:** WebGL, Renderer, alpha, antialias, DPR clamp, custom shaders

**Techniques:** Dot matrix, Breathing pulse, Pointer parallax, Shader gradients, DOM fallback

**Code Evidence:**
  - **HTML reference:**
    - **Language:** html
    - **Snippet:**
      ```html
      <!-- WebGL Background -->
      <canvas id="webgl-canvas" class="fixed inset-0 z-0 pointer-events-none"></canvas>

      <!-- Structural Grid Frame -->
      ```
  - **JS reference:**
    - **Language:** js
    - **Snippet:**
      ```
      // --- WebGL Background (Three.js) ---
      const initWebGL = () => {
          const canvas = document.getElementById('webgl-canvas');
          const scene = new THREE.Scene();

          // Camera setup
          const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
          camera.position.z = 20;
      …
      ```
  - **Renderer setup:**
    - **Language:** js
    - **Snippet:**
      ```
      camera.position.y = 5;
      camera.lookAt(0, 0, 0);

      // Renderer setup
      const renderer = new THREE.WebGLRenderer({ 
          canvas: canvas, 
          alpha: true, 
          antialias: true,
      …
      ```
  - **Scene setup:**
    - **Language:** js
    - **Snippet:**
      ```
      // --- WebGL Background (Three.js) ---
      const initWebGL = () => {
          const canvas = document.getElementById('webgl-canvas');
          const scene = new THREE.Scene();
      ```

## ThreeJS

Reconstruct the Three.js layer as a inset 3d accent with layered spatial depth that feels retro-futurist, volumetric, and technical. Use alpha, antialias, dpr clamp renderer settings, perspective, ~60deg fov, custom buffer geometry geometry, shadermaterial materials, and ambient + key + rim lighting. Motion should read as slow orbital drift, with poster frame + dom fallback.

**Id:** threejs

**Label:** ThreeJS

**Stack:** ThreeJS, WebGL

**Insights:**
  - **Scene:**
    - **Value:** Inset 3D accent with layered spatial depth
  - **Render:**
    - **Value:** alpha, antialias, DPR clamp
  - **Camera:**
    - **Value:** Perspective, ~60deg FOV
  - **Lighting:**
    - **Value:** ambient + key + rim
  - **Materials:**
    - **Value:** ShaderMaterial
  - **Geometry:**
    - **Value:** custom buffer geometry
  - **Motion:**
    - **Value:** Slow orbital drift

**Techniques:** Shader materials, Particle depth, Timeline beats, alpha, antialias, DPR clamp, Poster frame + DOM fallback

**Code Evidence:**
  - **HTML reference:**
    - **Language:** html
    - **Snippet:**
      ```html
      <!-- WebGL Background -->
      <canvas id="webgl-canvas" class="fixed inset-0 z-0 pointer-events-none"></canvas>

      <!-- Structural Grid Frame -->
      ```
  - **JS reference:**
    - **Language:** js
    - **Snippet:**
      ```
      // --- WebGL Background (Three.js) ---
      const initWebGL = () => {
          const canvas = document.getElementById('webgl-canvas');
          const scene = new THREE.Scene();

          // Camera setup
          const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
          camera.position.z = 20;
      …
      ```
  - **Renderer setup:**
    - **Language:** js
    - **Snippet:**
      ```
      camera.position.y = 5;
      camera.lookAt(0, 0, 0);

      // Renderer setup
      const renderer = new THREE.WebGLRenderer({ 
          canvas: canvas, 
          alpha: true, 
          antialias: true,
      …
      ```
  - **Scene setup:**
    - **Language:** js
    - **Snippet:**
      ```
      // --- WebGL Background (Three.js) ---
      const initWebGL = () => {
          const canvas = document.getElementById('webgl-canvas');
          const scene = new THREE.Scene();
      ```
