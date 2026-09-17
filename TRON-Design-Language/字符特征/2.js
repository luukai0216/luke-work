/*
 * Glass Type WebGL effect
 *
 * Usage:
 *   const effect = mountGlassType(document.querySelector('#glass-type'));
 *   effect.setOptions({ text: 'TRON', glassCount: 3, glassSpacing: .65 });
 *
 * Give the canvas a CSS width and height before mounting it. The effect renders
 * at the canvas display size and uses the configuration exported from the editor.
 */
(function (global) {
  'use strict';

  var DEFAULTS = {
  "mode": "image",
  "text": "GLASS\nTYPE",
  "svg": null,
  "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABaAAAALQCAYAAABmJdeHAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAOdEVYdFNvZnR3YXJlAEZpZ21hnrGWYwAAPQhJREFUeAHt3U2MXWWaH/DTE6IoPfY2KqMsqVpl0RgpGimhShpppIB7w6ShvGnEtFlZ3Y29gWHAK9MfsMF8yLPB3S3YuOhWszIoGimSi6widbkX2biKbbCVrZ2ORlFE/NzqCwXY9Xn+5+Pe308q2dAfvvec877W+z/P+7zfuXnz5hcNAAAAAAC07C8aAAAAAAAIEEADAAAAABAhgAYAAAAAIEIADQAAAABAhAAaAAAAAIAIATQAAAAAABECaAAAAAAAIgTQAAAAAABECKABAAAAAIgQQAMAAAAAECGABgAAAAAgQgANAAAAAECEABoAAAAAgAgBNAAAAAAAEQJoAAAAAAAiBNAAAAAAAEQIoAEAAAAAiBBAAwAAAAAQIYAGAAAAACBCAA0AAAAAQIQAGgAAAACACAE0AAAAAAARAmgAAAAAACIE0AAAAAAARAigAQAAAACIEEADAAAAABAhgAYAAAAAIEIADQAAAABAhAAaAAAAAIAIATQAAAAAABECaAAAAAAAIgTQAAAAAABECKABAAAAAIgQQAMAAAAAECGABgAAAAAgQgANAAAAAECEABoAAAAAgAgBNAAAAAAAEQJoAAAAAAAiBNAAAAAAAEQIoAEAAAAAiBBAAwAAAAAQIYAGAAAAACBCAA0AAAAAQIQAGgAAAACACAE0AAAAAAARAmgAAAAAACIE0AAAAAAARAigAQAAAACIEEADAAAAABAhgAYAAAAAIEIADQAAAABAhAAaAAAAAIAIATQAAAAAABECaAAAAAAAIgTQAAAAAABECKABAAAAAIgQQAMAAAAAECGABgAAAAAgQgANAAAAAECEABoAAAAAgAgBNAAAAAAAEQJoAAAAAAAiBNAAAAAAAEQIoAEAAAAAiBBAAwAAAAAQIYAGAAAAACBCAA0AAAAAQIQAGgAAAACACAE0AAAAAAARAmgAAAAAACIE0AAAAAAARAigAQAAAACIEEADAAAAABAhgAYAAAAAIEIADQAAAABAhAAaAAAAAIAIATQAAAAAABECaAAAAAAAIgTQAAAAAABECKABAAAAAIgQQAMAAAAAECGABgAAAAAgQgANAAAAAECEABoAAAAAgAgBNAAAAAAAEQJoAAAAAAAiBNAAAAAAAEQIoAEAAAAAiBBAAwAAAAAQIYAGAAAAACBCAA0AAAAAQIQAGgAAAACACAE0AAAAAAARAmgAAAAAACIE0AAAAAAARAigAQAAAACIEEADAAAAABAhgAYAAAAAIEIADQAAAABAhAAaAAAAAIAIATQAAAAAABECaAAAAAAAIgTQAAAAAABECKABAAAAAIgQQAMAAAAAECGABgAAAAAgQgANAAAAAECEABoAAAAAgAgBNAAAAAAAEQJoAAAAAAAiBNAAAAAAAEQIoAEAAAAAiBBAAwAAAAAQIYAGAAAAACBCAA0AAAAAQIQAGgAAAACACAE0AAAAAAARAmgAAAAAACIE0AAAAAAARAigAQAAAACIEEADAAAAABAhgAYAAAAAIEIADQAAAABAhAAaAAAAAIAIATQAAAAAABECaAAAAAAAIgTQAAAAAABECKABAAAAAIgQQAMAAAAAECGABgAAAAAgQgANAAAAAECEABoAAAAAgAgBNAAAAAAAEQJoAAAAAAAiBNAAAAAAAEQIoAEAAAAAiBBAAwAAAAAQIYAGAAAAACBCAA0AAAAAQIQAGgAAAACACAE0AAAAAAARAmgAAAAAACIE0AAAAAAARAigAQAAAACIEEADAAAAABAhgAYAAAAAIEIADQAAAABAhAAaAAAAAIAIATQAAAAAABECaAAAAAAAIgTQAAAAAABECKABAAAAAIgQQAMAAAAAECGABgAAAAAgQgANAAAAAECEABoAAAAAgAgBNAAAAAAAEQJoAAAAAAAiBNAAAAAAAEQIoAEAAAAAiBBAAwAAAAAQIYAGAAAAACBCAA0AAAAAQIQAGgAAAACACAE0AAAAAAARAmgAAAAAACIE0AAAAAAARAigAQAAAACIEEADAAAAABAhgAYAAAAAIEIADQAAAABAhAAaAAAAAIAIATQAAAAAABECaAAAAAAAIgTQAAAAAABECKABAAAAAIgQQAMAAAAAECGABgAAAAAgQgANAAAAAECEABoAAAAAgAgBNAAAAAAAEQJoAAAAAAAiBNAAAAAAAEQIoAEAAAAAiBBAAwAAAAAQIYAGAAAAACBCAA0AAAAAQIQAGgAAAACACAE0AAAAAAARAmgAAAAA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ABAhgAYAAAAAIEIADQAAAABAhAAaAAAAAIAIATQAAAAAABECaAAAAAAAIgTQAAAAAABECKABAAAAAIgQQAMAAAAAECGABgAAAAAgQgANAAAAAECEABoAAAAAgAgBNAAAAAAAEQJoAAAAAAAiBNAAAAAAAEQIoAEAAAAAiBBAAwAAAAAQIYAGAAAAACBCAA0AAAAAQIQAGgAAAACACAE0AAAAAAARAmgAAAAAACIE0AAAAAAARAigAQAAAACIEEADAAAAABAhgAYAAAAAIEIADQAAAABAhAAaAAAAAIAIATQAAAAAABECaAAAAAAAIgTQAAAAAABECKABAAAAAIgQQAMAAAAAECGABgAAAAAgQgANAAAAAECEABoAAAAAgAgBNAAAAAAAEQJoAAAAAAAiBNAAAAAAAEQIoAEAAAAAiBBAAwAAAAAQIYAGAAAAACBCAA0AAAAAQIQAGgAAAACACAE0AAAAAAARAmgAAAAAACIE0AAAAAAARAigAQAAAACIEEADAAAAABAhgAYAAAAAIEIADQAAAABAhAAaAAAAAIAIATQAAAAAABECaAAAAAAAIgTQAAAAAABECKABAAAAAIgQQAMAAAAAECGABgAAAAAgQgANAAAAAECEABoAAAAAgAgBNAAAAAAAEQJoAAAAAAAiBNAAAAAAAEQIoAEAAAAAiBBAAwAAAAAQIYAGAAAAACBCAA0AAAAAQIQAGgAAAACACAE0AAAAAAARAmgAAAAAACIE0AAAAAAARAigAQAAAACIEEADAAAAABAhgAYAAAAAIEIADQAAAABAhAAaAAAAAIAIATQAAAAAABECaAAAAAAAIgTQAAAAAABECKABAAAAAIgQQAMAAAAAECGABgAAAAAgQgANAAAAAECEABoAAAAAgAgBNAAAAAAAEQJoAAAAAAAiBNAAAAAAAEQIoAEAAAAAiBBAAwAAAAAQIYAGAAAAACBCAA0AAAAAQIQAGgAAAACACAE0AAAAAAARAmgAAAAAACIE0AAAAAAARAigAQAAAACIEEADAAAAABAhgAYAAAAAIEIADQAAAABAhAAaAAAAAIAIATQAAAAAABECaAAAAAAAIgTQAAAAAABECKABAAAAAIgQQAMAAAAAECGABgAAAAAgQgANAAAAAECEABoAAAAAgAgBNAAAAAAAEQJoAAAAAAAiBNAAAAAAAEQIoAEAAAAAiBBAAwAAAAAQIYAGAAAAACBCAA0AAAAAQIQAGgAAAACACAE0AAAAAAARAmgAAAAAACIE0AAAAAAARAigAQAAAACIEEADAAAAABAhgAYAAAAAIEIADQAAAABAhAAaAAAAAIAIATQAAAAAABECaAAAAAAAIgTQAAAAAABECKABAAAAAIgQQAMAAAAAECGABgAAAAAgQgANAAAAAECEABoAAAAAgAgBNAAAAAAAEQJoAAAAAAAiBNAAAAAAAEQIoAEAAAAAiBBAAwAAAAAQIYAGAAAAACBCAA0AAAAAQIQAGgAAAACACAE0AAAAAAARAmgAAAAAACIE0AAAAAAARAigAQAAAACIEEADAAAAABAhgAYAAAAAIEIADQAAAABAhAAaAAAAAIAIATQAAAAAABECaAAAAAAAIgTQAAAAAABECKABAAAAAIgQQAMAAAAAECGABgAAAAAgQgANAAAAAECEABoAAAAAgAgBNAAAAAAAEQJoAAAAAAAiBNAAAAAAAEQIoAEAAAAAiBBAAwAAAAAQIYAGAAAAACBCAA0AAAAAQIQAGgAAAACACAE0AAAAAAAR/x8Akyrj9hEfQwAAAABJRU5ErkJggg==",
  "svgScale": 100,
  "svgOffsetX": 0,
  "svgOffsetY": 0,
  "imageScale": 104,
  "imageOffsetX": 0,
  "imageOffsetY": 0,
  "fontSize": 100,
  "fontWeight": 660,
  "tracking": -2,
  "glassShape": "circle",
  "glassCount": 1,
  "glassSize": 98,
  "glassSpacing": 0,
  "layoutAngle": 0,
  "lensAngles": [
    -116,
    -116,
    0,
    0,
    0,
    0,
    0,
    0
  ],
  "lensSizes": [
    98,
    70,
    24,
    24,
    24,
    24,
    24,
    24
  ],
  "glassTint": "#8EC8FF",
  "tintStrength": 0,
  "shadow": 0.02,
  "distortion": 0.35,
  "ripple": 0.11,
  "backgroundBlur": 0,
  "dispersion": 0.058,
  "gloss": 0.17,
  "rimWidth": 0,
  "rotationSpeed": 1,
  "lightAngle": -180,
  "speed": 0.15,
  "travel": 0.15,
  "pointerRepel": 0.47,
  "repelRange": 0.6,
  "paper": "#EDEDED",
  "ink": "#0A0A0A",
  "width": 1440,
  "height": 720
};
  var MAX_LENSES = 8;

  function clamp(value, minimum, maximum) {
    return Math.min(Math.max(value, minimum), maximum);
  }

  function hexToRgb(value) {
    return [
      parseInt(value.slice(1, 3), 16) / 255,
      parseInt(value.slice(3, 5), 16) / 255,
      parseInt(value.slice(5, 7), 16) / 255
    ];
  }

  function glassShapeIndex(shape) {
    return { circle: 0, ellipse: 1, rounded: 2, hexagon: 3 }[shape] || 0;
  }

  function createShader(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      var message = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw new Error('Glass Type shader error: ' + message);
    }
    return shader;
  }

  function mountGlassType(canvas, overrides) {
    if (!canvas || canvas.nodeName !== 'CANVAS') {
      throw new Error('mountGlassType needs a canvas element.');
    }

    var state = Object.assign({}, DEFAULTS, overrides || {});
    var source = document.createElement('canvas');
    var sourceContext = source.getContext('2d');
    var gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      premultipliedAlpha: false,
      powerPreference: 'high-performance'
    });
    if (!gl || !sourceContext) {
      throw new Error('This browser does not support the WebGL effect.');
    }

    var width = 1;
    var height = 1;
    var sourceDirty = true;
    var svgImage = null;
    var imageImage = null;
    var pointer = { x: .5, y: .5, active: false };
    var running = true;
    var frameRequest = 0;
    var startedAt = performance.now();
    var pausedElapsed = 0;
    var resizeObserver = null;

    var vertexSource = [
      'attribute vec2 aPosition;',
      'varying vec2 vUv;',
      'void main() {',
      '  vUv = aPosition * .5 + .5;',
      '  gl_Position = vec4(aPosition, 0., 1.);',
      '}'
    ].join('\n');
    var fragmentSource = [
      'precision highp float;',
      'varying vec2 vUv;',
      'uniform sampler2D uTexture;',
      'uniform vec2 uResolution;',
      'uniform vec2 uCenters[8];',
      'uniform float uScales[8];',
      'uniform float uAngles[8];',
      'uniform float uCount;',
      'uniform float uRadius;',
      'uniform float uStrength;',
      'uniform float uRipple;',
      'uniform float uBackgroundBlur;',
      'uniform float uDispersion;',
      'uniform float uGloss;',
      'uniform float uRimWidth;',
      'uniform float uLightAngle;',
      'uniform float uShape;',
      'uniform float uSpin;',
      'uniform float uImageMode;',
      'uniform float uTime;',
      'uniform vec3 uPaper;',
      'uniform vec3 uInk;',
      'uniform vec3 uTint;',
      'uniform float uTintStrength;',
      'uniform float uShadow;',
      '',
      'vec2 rotateVector(vec2 point, float angle) {',
      '  float c = cos(angle);',
      '  float s = sin(angle);',
      '  return mat2(c, -s, s, c) * point;',
      '}',
      '',
      'float shapeDistance(vec2 point) {',
      '  if (uShape < .5) return length(point) - 1.;',
      '  if (uShape < 1.5) { point.x *= .66; return length(point) - 1.; }',
      '  if (uShape < 2.5) {',
      '    vec2 delta = abs(point) - vec2(.76);',
      '    return length(max(delta, 0.)) - .24 + min(max(delta.x, delta.y), 0.);',
      '  }',
      '  vec2 hex = abs(point);',
      '  return max(dot(hex, vec2(.8660254, .5)), hex.y) - 1.;',
      '}',
      '',
      'vec2 glassMap(vec2 pixel, float chroma) {',
      '  vec2 mapped = pixel;',
      '  for (int i = 0; i < 8; i++) {',
      '    float enabled = step(float(i) + .5, uCount);',
      '    vec2 centre = uCenters[i];',
      '    float radius = uRadius * uScales[i];',
      '    vec2 q = mapped - centre;',
      '    vec2 local = rotateVector(q / max(radius, 1.), uAngles[i]);',
      '    float unit = length(local);',
      '    float inside = 1. - smoothstep(-.055, .018, shapeDistance(local));',
      '    float wave = sin(unit * 18.8496 - uTime * (1.4 + float(i) * .13));',
      '    float fold = uRipple * wave * smoothstep(.04, .94, unit);',
      '    float magnification = max(.38, 1. + uStrength * chroma * pow(clamp(unit, 0., 1.35), 2.15) + fold);',
      '    vec2 refracted = centre + q / magnification;',
      '    mapped = mix(mapped, refracted, inside * enabled);',
      '  }',
      '  return mapped;',
      '}',
      '',
      'float glassCoverage(vec2 pixel) {',
      '  float coverage = 0.;',
      '  for (int i = 0; i < 8; i++) {',
      '    float enabled = step(float(i) + .5, uCount);',
      '    float radius = uRadius * uScales[i];',
      '    vec2 local = rotateVector((pixel - uCenters[i]) / max(radius, 1.), uAngles[i]);',
      '    float inside = 1. - smoothstep(-.055, .018, shapeDistance(local));',
      '    coverage = max(coverage, inside * enabled);',
      '  }',
      '  return coverage;',
      '}',
      '',
      'vec3 blurredSample(vec2 uv) {',
      '  vec2 blurStep = vec2(uBackgroundBlur * .5 / uResolution.x, uBackgroundBlur * .5 / uResolution.y);',
      '  vec3 colour = vec3(0.);',
      '  float total = 0.;',
      '  for (int y = -2; y <= 2; y++) {',
      '    for (int x = -2; x <= 2; x++) {',
      '      float distanceSquared = float(x * x + y * y);',
      '      float weight = exp(-.5 * distanceSquared);',
      '      colour += texture2D(uTexture, uv + vec2(float(x) * blurStep.x, float(y) * blurStep.y)).rgb * weight;',
      '      total += weight;',
      '    }',
      '  }',
      '  return colour / total;',
      '}',
      '',
      'float rimAt(vec2 pixel) {',
      '  float rim = 0.;',
      '  for (int i = 0; i < 8; i++) {',
      '    float enabled = step(float(i) + .5, uCount);',
      '    float radius = uRadius * uScales[i];',
      '    vec2 local = rotateVector((pixel - uCenters[i]) / max(radius, 1.), uAngles[i]);',
      '    float outer = mix(.003, .085, uRimWidth);',
      '    float inner = max(.0008, outer * .2);',
      '    float ring = 1. - smoothstep(inner, outer, abs(shapeDistance(local)));',
      '    float glint = smoothstep(.12, .88, sin(float(i) * 2.1 + uTime * .48) * .5 + .5);',
      '    rim = max(rim, ring * enabled * (.52 + .48 * glint));',
      '  }',
      '  return rim;',
      '}',
      '',
      'vec3 glassSurface(vec2 pixel) {',
      '  float highlight = 0.;',
      '  float contour = 0.;',
      '  float contact = 0.;',
      '  vec3 light = normalize(vec3(cos(uLightAngle + uSpin), -sin(uLightAngle + uSpin), .82));',
      '  for (int i = 0; i < 8; i++) {',
      '    float enabled = step(float(i) + .5, uCount);',
      '    float radius = uRadius * uScales[i];',
      '    vec2 q = pixel - uCenters[i];',
      '    vec2 normalXY = rotateVector(q / max(radius, 1.), uAngles[i]);',
      '    float unit = length(normalXY);',
      '    float inside = 1. - smoothstep(-.055, .018, shapeDistance(normalXY));',
      '    float z = sqrt(max(0., 1. - dot(normalXY, normalXY)));',
      '    vec3 normal = normalize(vec3(normalXY, z));',
      '    float edgeMask = smoothstep(.42, .98, unit);',
      '    float shine = pow(max(dot(normal, light), 0.), 20.) * inside * edgeMask * .4;',
      '    float curvedEdge = smoothstep(.78, 1.02, unit) * inside;',
      '    float lowerEdge = smoothstep(.9, 1.03, unit) * inside;',
      '    highlight = max(highlight, shine * enabled);',
      '    contour = max(contour, curvedEdge * enabled);',
      '    contact = max(contact, lowerEdge * enabled);',
      '  }',
      '  return vec3(highlight, contour, contact);',
      '}',
      '',
      'float glassShadow(vec2 pixel) {',
      '  if (uShadow < .001) return 0.;',
      '  vec2 offset = vec2(-cos(uLightAngle), sin(uLightAngle)) * mix(7., 26., uShadow);',
      '  float coverage = 0.;',
      '  float casted = 0.;',
      '  for (int i = 0; i < 8; i++) {',
      '    float enabled = step(float(i) + .5, uCount);',
      '    float radius = uRadius * uScales[i];',
      '    vec2 local = rotateVector((pixel - uCenters[i]) / max(radius, 1.), uAngles[i]);',
      '    vec2 shifted = rotateVector((pixel - offset - uCenters[i]) / max(radius * 1.06, 1.), uAngles[i]);',
      '    float inside = 1. - smoothstep(-.055, .018, shapeDistance(local));',
      '    float blob = 1. - smoothstep(-.16, .46, shapeDistance(shifted));',
      '    coverage = max(coverage, inside * enabled);',
      '    casted = max(casted, blob * enabled);',
      '  }',
      '  return max(0., casted - coverage) * uShadow;',
      '}',
      '',
      'void main() {',
      '  vec2 pixel = vUv * uResolution;',
      '  float shift = uDispersion * 3.0;',
      '  vec2 redUv = glassMap(pixel, 1. + shift) / uResolution;',
      '  vec2 greenUv = glassMap(pixel, 1.) / uResolution;',
      '  vec2 blueUv = glassMap(pixel, 1. - shift) / uResolution;',
      '  vec3 sampleRed = texture2D(uTexture, redUv).rgb;',
      '  vec3 sampleGreen = texture2D(uTexture, greenUv).rgb;',
      '  vec3 sampleBlue = texture2D(uTexture, blueUv).rgb;',
      '  float blurMask = glassCoverage(pixel);',
      '  if (uBackgroundBlur > .01 && blurMask > .001) {',
      '    sampleRed = mix(sampleRed, blurredSample(redUv), blurMask);',
      '    sampleGreen = mix(sampleGreen, blurredSample(greenUv), blurMask);',
      '    sampleBlue = mix(sampleBlue, blurredSample(blueUv), blurMask);',
      '  }',
      '  float red = 1. - sampleRed.r;',
      '  float green = 1. - sampleGreen.r;',
      '  float blue = 1. - sampleBlue.r;',
      '  vec3 density = clamp(vec3(red, green, blue), 0., 1.);',
      '  vec3 graphicColour = mix(uPaper, uInk, density);',
      '  vec3 imageColour = vec3(sampleRed.r, sampleGreen.g, sampleBlue.b);',
      '  vec3 colour = mix(graphicColour, imageColour, uImageMode);',
      '  colour *= 1. - glassShadow(pixel) * .46;',
      '  vec3 stained = colour * mix(vec3(1.), uTint, .78);',
      '  stained = mix(stained, uTint, .14);',
      '  colour = mix(colour, stained, blurMask * uTintStrength);',
      '  vec3 surface = glassSurface(pixel);',
      '  float rim = rimAt(pixel) * uGloss;',
      '  colour *= 1. - surface.y * .08;',
      '  colour *= 1. - surface.z * .03;',
      '  colour = mix(colour, vec3(1.), surface.x * .08);',
      '  vec3 rimColour = mix(mix(uPaper, vec3(1.), .66), vec3(1.), uImageMode);',
      '  colour = mix(colour, rimColour, rim);',
      '  gl_FragColor = vec4(clamp(colour, 0., 1.), 1.);',
      '}'
    ].join('\n');

    var vertex = createShader(gl, gl.VERTEX_SHADER, vertexSource);
    var fragment = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
    var program = gl.createProgram();
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error('Glass Type program error: ' + gl.getProgramInfoLog(program));
    }

    var quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    var uniforms = {};
    [
      'uTexture', 'uResolution', 'uCenters[0]', 'uScales[0]', 'uAngles[0]', 'uCount',
      'uRadius', 'uStrength', 'uRipple', 'uBackgroundBlur', 'uDispersion', 'uGloss',
      'uRimWidth', 'uLightAngle', 'uShape', 'uSpin', 'uImageMode',
      'uTime', 'uPaper', 'uInk', 'uTint', 'uTintStrength', 'uShadow'
    ].forEach(function (name) { uniforms[name] = gl.getUniformLocation(program, name); });

    function resize() {
      var rect = canvas.getBoundingClientRect();
      var cssWidth = Math.max(1, rect.width || canvas.clientWidth || state.width);
      var cssHeight = Math.max(1, rect.height || canvas.clientHeight || state.height);
      var dpr = Math.min(global.devicePixelRatio || 1, 2);
      width = Math.max(2, Math.round(cssWidth * dpr));
      height = Math.max(2, Math.round(cssHeight * dpr));
      canvas.width = width;
      canvas.height = height;
      source.width = width;
      source.height = height;
      sourceDirty = true;
    }

    function drawSpacedText(context, text, x, y, tracking) {
      if (!tracking) { context.fillText(text, x, y); return; }
      var letters = Array.prototype.slice.call(text);
      var widths = letters.map(function (letter) { return context.measureText(letter).width; });
      var fullWidth = widths.reduce(function (total, letterWidth) { return total + letterWidth; }, 0) + tracking * Math.max(0, letters.length - 1);
      var position = x - fullWidth / 2;
      context.textAlign = 'left';
      letters.forEach(function (letter, index) {
        context.fillText(letter, position, y);
        position += widths[index] + tracking;
      });
      context.textAlign = 'center';
    }

    function paintText(context) {
      var lines = (state.text || 'TYPE').trim().split(/\r?\n/).slice(0, 4);
      var probe = 100;
      context.font = state.fontWeight + ' ' + probe + 'px Inter, ui-sans-serif, system-ui, sans-serif';
      var widest = Math.max.apply(null, lines.map(function (line) {
        return context.measureText(line || ' ').width + state.tracking * Math.max(0, line.length - 1);
      }));
      var fontByWidth = width * .78 / Math.max(widest, 1) * probe;
      var fontByHeight = height * .52 / (Math.max(lines.length, 1) * 1.08);
      var fontSize = clamp(Math.min(fontByWidth, fontByHeight) * (state.fontSize / 100), 14, height * .99);
      var lineHeight = fontSize * 1.03;
      var firstLine = height / 2 - (lines.length - 1) * lineHeight / 2;
      context.font = state.fontWeight + ' ' + fontSize + 'px Inter, ui-sans-serif, system-ui, sans-serif';
      context.fillStyle = '#000';
      context.textBaseline = 'middle';
      context.textAlign = 'center';
      lines.forEach(function (line, index) {
        drawSpacedText(context, line || ' ', width / 2, firstLine + index * lineHeight, state.tracking);
      });
    }

    function paintSvg(context) {
      if (!svgImage || !svgImage.complete || !svgImage.naturalWidth) {
        context.fillStyle = '#fff';
        context.fillRect(0, 0, width, height);
        paintText(context);
        return;
      }
      var sourceRatio = svgImage.naturalWidth / svgImage.naturalHeight;
      var targetRatio = width * .72 / (height * .58);
      var drawWidth = sourceRatio > targetRatio ? width * .72 : height * .58 * sourceRatio;
      var drawHeight = sourceRatio > targetRatio ? drawWidth / sourceRatio : height * .58;
      var scale = state.svgScale / 100;
      drawWidth *= scale;
      drawHeight *= scale;
      context.drawImage(svgImage, (width - drawWidth) / 2 + width * state.svgOffsetX / 100, (height - drawHeight) / 2 + height * state.svgOffsetY / 100, drawWidth, drawHeight);
      context.globalCompositeOperation = 'source-in';
      context.fillStyle = '#000';
      context.fillRect(0, 0, width, height);
      context.globalCompositeOperation = 'destination-over';
      context.fillStyle = '#fff';
      context.fillRect(0, 0, width, height);
      context.globalCompositeOperation = 'source-over';
    }

    function paintImage(context) {
      context.fillStyle = state.paper;
      context.fillRect(0, 0, width, height);
      if (!imageImage || !imageImage.complete || !imageImage.naturalWidth) return;
      var sourceRatio = imageImage.naturalWidth / imageImage.naturalHeight;
      var canvasRatio = width / height;
      var drawWidth = sourceRatio > canvasRatio ? height * sourceRatio : width;
      var drawHeight = sourceRatio > canvasRatio ? height : width / sourceRatio;
      var scale = state.imageScale / 100;
      drawWidth *= scale;
      drawHeight *= scale;
      context.drawImage(imageImage, (width - drawWidth) / 2 + width * state.imageOffsetX / 100, (height - drawHeight) / 2 + height * state.imageOffsetY / 100, drawWidth, drawHeight);
    }

    function uploadSource() {
      if (!sourceDirty) return;
      sourceContext.clearRect(0, 0, width, height);
      if (state.mode === 'image') paintImage(sourceContext);
      else if (state.svg) paintSvg(sourceContext);
      else {
        sourceContext.fillStyle = '#fff';
        sourceContext.fillRect(0, 0, width, height);
        paintText(sourceContext);
      }
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
      sourceDirty = false;
    }

    function setSvg(value) {
      if (!value) { svgImage = null; sourceDirty = true; return; }
      var image = new Image();
      image.onload = function () { svgImage = image; sourceDirty = true; };
      image.src = value;
      svgImage = image;
    }

    function setImage(value) {
      if (!value) { imageImage = null; sourceDirty = true; return; }
      var image = new Image();
      image.onload = function () { imageImage = image; sourceDirty = true; };
      image.src = value;
      imageImage = image;
    }

    function computeLenses(time) {
      var centres = [];
      var scales = [];
      var angles = [];
      var individualOrbit = state.travel * .18;
      var count = Math.max(1, state.glassCount);
      var separation = state.glassSpacing * .29;
      var layoutAngle = (state.layoutAngle || 0) * Math.PI / 180;
      var lensAngles = state.lensAngles || [];
      for (var i = 0; i < MAX_LENSES; i += 1) {
        var lensAngle = (lensAngles[i] || 0) * Math.PI / 180;
        var homeAngle = i / count * Math.PI * 2 + layoutAngle + lensAngle;
        var phase = time * (.48 + i * .11) + i * 2.399;
        var ringScale = count === 1 ? 0 : (count === 2 ? 1 : .58 + i % 2 * .18);
        var homeX = .5 + Math.cos(homeAngle) * separation * ringScale;
        var homeY = .5 + Math.sin(homeAngle) * separation * .68 * ringScale;
        var x = homeX + Math.cos(phase * 1.08 + i * .74) * individualOrbit * (.55 + i % 3 * .12);
        var y = homeY + Math.sin(phase * .84 + i * 1.37) * individualOrbit * (.44 + i % 4 * .09);
        if (pointer.active) {
          var deltaX = x - pointer.x;
          var deltaY = y - pointer.y;
          var distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
          var range = .12 + state.repelRange * .34;
          var influence = Math.max(0, 1 - distance / range);
          var force = state.pointerRepel * .085 * influence * influence;
          var safeDistance = Math.max(distance, .001);
          x += (distance < .001 ? Math.cos(i * 2.4) : deltaX / safeDistance) * force;
          y += (distance < .001 ? Math.sin(i * 2.4) : deltaY / safeDistance) * force;
        }
        centres.push(x * width, y * height);
        scales.push((.84 + (Math.sin(time * (1.2 + i * .08) + i * 1.7) + 1) * .08 + i * .018) * ((state.lensSizes && state.lensSizes[i] != null ? state.lensSizes[i] : state.glassSize) / 100));
        angles.push(time * state.rotationSpeed * (i % 2 ? -.8 : 1) + i * .42);
      }
      return { centres: centres, scales: scales, angles: angles };
    }

    function render(time) {
      uploadSource();
      var unit = Math.min(width, height);
      var lenses = computeLenses(time * state.speed);
      gl.viewport(0, 0, width, height);
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, quad);
      var position = gl.getAttribLocation(program, 'aPosition');
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.uniform1i(uniforms.uTexture, 0);
      gl.uniform2f(uniforms.uResolution, width, height);
      gl.uniform2fv(uniforms['uCenters[0]'], new Float32Array(lenses.centres));
      gl.uniform1fv(uniforms['uScales[0]'], new Float32Array(lenses.scales));
      gl.uniform1fv(uniforms['uAngles[0]'], new Float32Array(lenses.angles));
      gl.uniform1f(uniforms.uCount, state.glassCount);
      gl.uniform1f(uniforms.uRadius, unit);
      gl.uniform1f(uniforms.uStrength, state.distortion);
      gl.uniform1f(uniforms.uRipple, state.ripple);
      gl.uniform1f(uniforms.uBackgroundBlur, state.backgroundBlur);
      gl.uniform1f(uniforms.uDispersion, state.dispersion);
      gl.uniform1f(uniforms.uGloss, state.gloss);
      gl.uniform1f(uniforms.uRimWidth, state.rimWidth == null ? .18 : state.rimWidth);
      gl.uniform1f(uniforms.uLightAngle, state.lightAngle * Math.PI / 180);
      gl.uniform1f(uniforms.uShape, glassShapeIndex(state.glassShape));
      gl.uniform1f(uniforms.uSpin, time * state.rotationSpeed);
      gl.uniform1f(uniforms.uImageMode, state.mode === 'image' ? 1 : 0);
      gl.uniform1f(uniforms.uTime, time * state.speed);
      gl.uniform3fv(uniforms.uPaper, new Float32Array(hexToRgb(state.paper)));
      gl.uniform3fv(uniforms.uInk, new Float32Array(hexToRgb(state.ink)));
      gl.uniform3fv(uniforms.uTint, new Float32Array(hexToRgb(state.glassTint || '#8EC8FF')));
      gl.uniform1f(uniforms.uTintStrength, state.tintStrength || 0);
      gl.uniform1f(uniforms.uShadow, state.shadow || 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    function tick(now) {
      if (!running) return;
      render((now - startedAt) / 1000);
      frameRequest = global.requestAnimationFrame(tick);
    }

    function onPointerMove(event) {
      var rect = canvas.getBoundingClientRect();
      pointer.x = clamp((event.clientX - rect.left) / rect.width, 0, 1);
      pointer.y = clamp((event.clientY - rect.top) / rect.height, 0, 1);
      pointer.active = true;
    }

    function onPointerLeave() { pointer.active = false; }
    resize();
    setSvg(state.svg);
    setImage(state.image);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerleave', onPointerLeave);
    if (global.ResizeObserver) {
      resizeObserver = new global.ResizeObserver(resize);
      resizeObserver.observe(canvas);
    } else {
      global.addEventListener('resize', resize);
    }
    frameRequest = global.requestAnimationFrame(tick);

    return {
      canvas: canvas,
      setOptions: function (next) {
        next = next || {};
        Object.assign(state, next);
        if (Object.prototype.hasOwnProperty.call(next, 'svg')) setSvg(next.svg);
        if (Object.prototype.hasOwnProperty.call(next, 'image')) setImage(next.image);
        sourceDirty = true;
      },
      play: function () {
        if (running) return;
        running = true;
        startedAt = performance.now() - pausedElapsed;
        frameRequest = global.requestAnimationFrame(tick);
      },
      pause: function () {
        if (!running) return;
        pausedElapsed = performance.now() - startedAt;
        running = false;
        global.cancelAnimationFrame(frameRequest);
      },
      destroy: function () {
        running = false;
        global.cancelAnimationFrame(frameRequest);
        canvas.removeEventListener('pointermove', onPointerMove);
        canvas.removeEventListener('pointerleave', onPointerLeave);
        if (resizeObserver) resizeObserver.disconnect();
        else global.removeEventListener('resize', resize);
      }
    };
  }

  global.mountGlassType = mountGlassType;
})(window);
