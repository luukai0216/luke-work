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
  "image": "data:image/png;base64,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AABSCKABAAAAAEghgAYAAAAAIIUAGgAAAACAFAJoAAAAAABSCKABAAAAAEghgAYAAAAAIIUAGgAAAACAFAJoAAAAAABSCKABAAAAAEghgAYAAAAAIIUAGgAAAACAFAJoAAAAAABSCKABAAAAAEghgAYAAAAAIIUAGgAAAACAFAJoAAAAAABSCKABAAAAAEghgAYAAAAAIIUAGgAAAACAFAJoAAAAAABSCKABAAAAAEghgAYAAAAAIIUAGgAAAACAFAJoAAAAAABSCKABAAAAAEghgAYAAAAAIIUAGgAAAACAFAJoAAAAAABSCKABAAAAAEghgAYAAAAAIIUAGgAAAACAFAJoAAAAAABSCKABAAAAAEghgAYAAAAAIIUAGgAAAACAFAJoAAAAAABSCKABAAAAAEghgAYAAAAAIIUAGgAAAACAFAJoAAAAAABSCKABAAAAAEghgAYAAAAAIIUAGgAAAACAFAJoAAAAAABSCKABAAAAAEghgAYAAAAAIIUAGgAAAACAFAJoAAAAAABSCKABAAAAAEghgAYAAAAAIIUAGgAAAACAFAJoAAAAAABSCKABAAAAAEghgAYAAAAAIIUAGgAAAACAFAJoAAAAAABSCKABAAAAAEghgAYAAAAAIIUAGgAAAACAFAJoAAAAAABSCKABAAAAAEghgAYAAAAAIIUAGgAAAACAFAJoAAAAAABSCKABAAAAAEghgAYAAAAAIIUAGgAAAACAFAJoAAAAAABSCKABAAAAAEghgAYAAAAAIIUAGgAAAACAFAJoAAAAAABSCKABAAAAAEghgAYAAAAAIIUAGgAAAACAFAJoAAAAAABSCKABAAAAAEghgAYAAAAAIIUAGgAAAACAFAJoAAAAAABSCKABAAAAAEghgAYAAAAAIIUAGgAAAACAFAJoAAAAAABSCKABAAAAAEghgAYAAAAAIIUAGgAAAACAFAJoAAAAAABSCKABAAAAAEghgAYAAAAAIIUAGgAAAACAFAJoAAAAAABSCKABAAAAAEghgAYAAAAAIIUAGgAAAACAFAJoAAAAAABSCKABAAAAAEghgAYAAAAAIIUAGgAAAACAFAJoAAAAAABSCKABAAAAAEghgAYAAAAAIIUAGgAAAACAFAJoAAAAAABSCKABAAAAAEghgAYAAAAAIIUAGgAAAACAFAJoAAAAAABSCKABAAAAAEjx/wPvl9yAru2KuAAAAABJRU5ErkJggg==",
  "svgScale": 100,
  "svgOffsetX": 0,
  "svgOffsetY": 0,
  "imageScale": 101,
  "imageOffsetX": 0,
  "imageOffsetY": 0,
  "fontSize": 100,
  "fontWeight": 660,
  "tracking": -2,
  "glassShape": "circle",
  "glassCount": 1,
  "glassSize": 100,
  "glassSpacing": 0.88,
  "layoutAngle": 0,
  "lensAngles": [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ],
  "lensSizes": [
    100,
    94,
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
  "distortion": 0.2,
  "ripple": 0.06,
  "backgroundBlur": 0,
  "dispersion": 0.052,
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
