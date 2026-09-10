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
  "text": "TRON FONT SYSTEM",
  "svg": null,
  "svgScale": 100,
  "svgOffsetX": 0,
  "svgOffsetY": 0,
  "fontWeight": 540,
  "tracking": 28,
  "glassShape": "rounded",
  "glassCount": 2,
  "glassSize": 70,
  "glassSpacing": 0.73,
  "distortion": 0.2,
  "ripple": 0.16,
  "dispersion": 0.058,
  "gloss": 1,
  "depth": 0.1,
  "rotationSpeed": 1,
  "lightAngle": -180,
  "speed": 0.4,
  "travel": 0.4,
  "pointerRepel": 0.2,
  "repelRange": 0.3,
  "paper": "#ECECEC",
  "ink": "#000000",
  "width": 1280,
  "height": 260
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
      'uniform float uDispersion;',
      'uniform float uGloss;',
      'uniform float uDepth;',
      'uniform float uLightAngle;',
      'uniform float uShape;',
      'uniform float uSpin;',
      'uniform float uTime;',
      'uniform vec3 uPaper;',
      'uniform vec3 uInk;',
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
      'float rimAt(vec2 pixel) {',
      '  float rim = 0.;',
      '  for (int i = 0; i < 8; i++) {',
      '    float enabled = step(float(i) + .5, uCount);',
      '    float radius = uRadius * uScales[i];',
      '    vec2 local = rotateVector((pixel - uCenters[i]) / max(radius, 1.), uAngles[i]);',
      '    float ring = 1. - smoothstep(.0025, .012, abs(shapeDistance(local)));',
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
      '    float shine = pow(max(dot(normal, light), 0.), 22.) * inside;',
      '    float curvedEdge = smoothstep(.78, 1.02, unit) * inside;',
      '    float lowerEdge = smoothstep(.9, 1.03, unit) * inside;',
      '    highlight = max(highlight, shine * enabled);',
      '    contour = max(contour, curvedEdge * enabled);',
      '    contact = max(contact, lowerEdge * enabled);',
      '  }',
      '  return vec3(highlight, contour, contact);',
      '}',
      '',
      'void main() {',
      '  vec2 pixel = vUv * uResolution;',
      '  float shift = uDispersion * 3.0;',
      '  float red = 1. - texture2D(uTexture, glassMap(pixel, 1. + shift) / uResolution).r;',
      '  float green = 1. - texture2D(uTexture, glassMap(pixel, 1.) / uResolution).r;',
      '  float blue = 1. - texture2D(uTexture, glassMap(pixel, 1. - shift) / uResolution).r;',
      '  vec3 density = clamp(vec3(red, green, blue), 0., 1.);',
      '  vec3 colour = mix(uPaper, uInk, density);',
      '  vec3 surface = glassSurface(pixel);',
      '  float rim = rimAt(pixel) * uGloss * (.42 + uDepth * .58);',
      '  colour *= 1. - surface.y * uDepth * .16;',
      '  colour *= 1. - surface.z * uDepth * .055;',
      '  colour = mix(colour, vec3(1.), surface.x * (.12 + uDepth * .62));',
      '  colour = mix(colour, mix(uPaper, vec3(1.), .66), rim);',
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
      'uRadius', 'uStrength', 'uRipple', 'uDispersion', 'uGloss',
      'uDepth', 'uLightAngle', 'uShape', 'uSpin',
      'uTime', 'uPaper', 'uInk'
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
      var fontSize = clamp(Math.min(fontByWidth, fontByHeight), 14, height * .62);
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

    function uploadSource() {
      if (!sourceDirty) return;
      sourceContext.clearRect(0, 0, width, height);
      if (state.svg) paintSvg(sourceContext);
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

    function computeLenses(time) {
      var centres = [];
      var scales = [];
      var angles = [];
      var individualOrbit = state.travel * .18;
      var count = Math.max(1, state.glassCount);
      var separation = state.glassSpacing * .29;
      for (var i = 0; i < MAX_LENSES; i += 1) {
        var homeAngle = i / count * Math.PI * 2;
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
        scales.push(.84 + (Math.sin(time * (1.2 + i * .08) + i * 1.7) + 1) * .08 + i * .018);
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
      gl.uniform1f(uniforms.uRadius, unit * state.glassSize / 100);
      gl.uniform1f(uniforms.uStrength, state.distortion);
      gl.uniform1f(uniforms.uRipple, state.ripple);
      gl.uniform1f(uniforms.uDispersion, state.dispersion);
      gl.uniform1f(uniforms.uGloss, state.gloss);
      gl.uniform1f(uniforms.uDepth, state.depth);
      gl.uniform1f(uniforms.uLightAngle, state.lightAngle * Math.PI / 180);
      gl.uniform1f(uniforms.uShape, glassShapeIndex(state.glassShape));
      gl.uniform1f(uniforms.uSpin, time * state.rotationSpeed);
      gl.uniform1f(uniforms.uTime, time * state.speed);
      gl.uniform3fv(uniforms.uPaper, new Float32Array(hexToRgb(state.paper)));
      gl.uniform3fv(uniforms.uInk, new Float32Array(hexToRgb(state.ink)));
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
