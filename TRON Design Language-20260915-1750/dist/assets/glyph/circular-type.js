// 阶段 3：原本 1.58 MB 的这个文件里有 99% 是一张 base64 内联的 PNG，
// 真正的代码只有 23.6 KB。base64 让图片体积膨胀 33%、无法被单独缓存、
// 还要占用 JS 解析时间。已拆成 assets/glyph/circular-type-artwork.webp。
(() => {
        "use strict";
        const artwork = new Image();
        artwork.src = "/design/assets/glyph/circular-type-artwork.webp";

        // ──────────────────────────────────────────────────────────────
        // EDIT COPY HERE. The renderer rasterises each string once and
        // uploads it as a texture; no letters are animated individually.
        // ──────────────────────────────────────────────────────────────
        const COPY = {
          sceneA: "TRON Font System",
          sceneB: ["Type", "System"],
          sceneC: ["TRON", "Design", "Language"],
        };

        const PARAMS = {
          width: 734,
          height: 260,
          paper: "#EDEDED",
          ink: "#0A0A0A",
          fontFamily: "TronFontVF, Arial, sans-serif",
          fontWeight: 500,
          fps: 24,
          sceneSeconds: 5,
          textureSupersample: 2,
          dispersion: 0.05,
          rippleDrift: 1.1,
          pointerPull: 0.72,
          pointerEase: 6,
          pointerIn: 0.22,
          pointerOut: 0.5,
          ringStroke: 0.008,
          ringThin: 0.35,
          ringBoilFps: 12,
          ringWobble: [
            [3, 0.010, 1.3],
            [7, 0.007, -2.1],
            [11, 0.005, 3.7],
          ],
          lens: [
            { rl: 1.05, str: 2.4, pow: 3.0, rip: 0.35, wave: 0.34, rim0: 0.25 },
            { rl: 0.49, str: 1.7, pow: 2.4, rip: 0.55, wave: 0.16, rim0: 0.35 },
            { rl: 0.85, str: 0.9, pow: 2.2, rip: 0.28, wave: 0.42, rim0: 0.10 },
          ],
        };

        const MOTION = {
          a: {
            frames: 41,
            textWidth: 1.49,
            y: [
              0.864, 0.842, 0.826, 0.812, 0.801, 0.792, 0.784, 0.777,
              0.733, 0.710, 0.689, 0.630, 0.611, 0.593, 0.579, 0.567,
              0.556, 0.546, 0.537, 0.528, 0.520, 0.511, 0.503, 0.494,
              0.486, 0.476, 0.464, 0.453, 0.439, 0.426, 0.409, 0.391,
              0.371, 0.349, 0.323, 0.292, 0.256, 0.182, 0.133, 0.104,
              0.069,
            ],
          },
          b: {
            frames: 35,
            swapFrame: 15,
            textWidth: 0.56,
            radius: [
              0.641, 0.664, 0.679, 0.690, 0.697, 0.702, 0.706, 0.707,
              0.707, 0.706, 0.702, 0.699, 0.693, 0.687, 0.659, 0.567,
              0.539, 0.518, 0.512, 0.506, 0.502, 0.500, 0.498, 0.490,
              0.494, 0.494, 0.494, 0.494, 0.494, 0.493, 0.496, 0.491,
              0.492, 0.488, 0.486,
            ],
          },
          c: {
            frames: 52,
            textWidth: 0.76,
            segments: [
              [0, 17],
              [18, 34],
              [35, 51],
            ],
            x: [
              0.422, 0.210, 0.113, 0.068, 0.042, 0.026, 0.014, 0.007,
              0.001, -0.002, -0.004, -0.004, -0.006, -0.010, -0.016,
              -0.027, -0.043, -0.076, 0.416, 0.304, 0.223, 0.159,
              0.107, 0.069, 0.019, 0.004, -0.004, -0.009, -0.011,
              -0.013, -0.023, -0.039, -0.066, -0.108, -0.169, 0.450,
              0.268, 0.156, 0.093, 0.056, 0.031, 0.017, 0.008, 0.000,
              -0.004, -0.007, -0.007, -0.009, -0.020, -0.031, -0.053,
              -0.093,
            ],
          },
        };

        const canvas = document.querySelector("#glass-type");
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

        const hex = (value) => [
          parseInt(value.slice(1, 3), 16) / 255,
          parseInt(value.slice(3, 5), 16) / 255,
          parseInt(value.slice(5, 7), 16) / 255,
        ];

        const glslFloat = (value) =>
          Number.isInteger(value) ? `${value}.0` : `${value}`;

        const tableAt = (table, frame, lo = 0, hi = table.length - 1) => {
          const x = Math.min(Math.max(frame, lo), hi);
          const i = Math.floor(x);
          const j = Math.min(i + 1, hi);
          return table[i] + (table[j] - table[i]) * (x - i);
        };

        class GlassType {
          constructor(target) {
            this.canvas = target;
            this.source = document.createElement("canvas");
            this.sourceContext = this.source.getContext("2d");
            this.gl = target.getContext("webgl", {
              alpha: false,
              antialias: false,
              premultipliedAlpha: false,
              powerPreference: "low-power",
            });

            this.ok = Boolean(this.gl && this.sourceContext);
            this.running = false;
            this.disposed = false;
            this.frameRequest = 0;
            this.scene = 0;
            this.sceneStartedAt = performance.now();
            this.sceneLoop = 0;
            this.pausedElapsed = 0;
            this.lastNow = performance.now();
            this.textureKey = "";

            this.pointer = { x: 0.5, y: 0.5 };
            this.lens = { x: 0.5, y: 0.5 };
            this.hover = 0;
            this.hoverTarget = 0;

            if (!this.ok) {
              this.renderFallback();
              return;
            }

            this.setup();
            this.resize();
          }

          setup() {
            const gl = this.gl;
            const vertexSource = `
              attribute vec2 aPos;
              varying vec2 vUv;
              void main() {
                vUv = aPos * 0.5 + 0.5;
                gl_Position = vec4(aPos, 0.0, 1.0);
              }
            `;

            const wobbleExpression = PARAMS.ringWobble
              .map(
                ([harmonic, amplitude, speed]) =>
                  `${glslFloat(amplitude)} * sin(${glslFloat(harmonic)} * th + ${glslFloat(speed)} * uRingT)`,
              )
              .join(" + ");

            const fragmentSource = `
              precision mediump float;
              varying vec2 vUv;
              uniform sampler2D uTex;
              uniform vec2 uRes;
              uniform float uU;
              uniform vec2 uOff;
              uniform vec2 uCen;
              uniform vec2 uCen2;
              uniform float uRL;
              uniform float uStr;
              uniform float uPow;
              uniform float uRip;
              uniform float uWave;
              uniform float uRim0;
              uniform float uRipPh;
              uniform float uBall;
              uniform float uRingT;
              uniform vec3 uInk;
              uniform vec3 uPaper;

              float magAt(float r, float channelScale) {
                float rn = r / uRL;
                float magnitude = 1.0
                  + uStr * channelScale * pow(clamp(rn, 0.0, 1.6), uPow)
                  + uRip * sin(6.28318 * r / (uWave * uU) - uRipPh)
                      * smoothstep(uRim0, 1.0, rn);
                return max(magnitude, 0.35);
              }

              float inkAt(vec2 q, vec2 centre, float magnitude) {
                vec2 source = centre + q / magnitude - uOff;
                return 1.0 - texture2D(uTex, source / uRes).r;
              }

              void main() {
                vec2 px = vUv * uRes;
                vec2 centre = distance(px, uCen) <= distance(px, uCen2) ? uCen : uCen2;
                vec2 q = px - centre;
                float r = length(q);
                float rn = r / uRL;

                float dispersion = ${glslFloat(PARAMS.dispersion)} * clamp(rn, 0.0, 1.0);
                float redMag = magAt(r, 1.0 + dispersion);
                float greenMag = magAt(r, 1.0);
                float blueMag = magAt(r, 1.0 - dispersion);

                vec3 ink = vec3(
                  inkAt(q, centre, redMag),
                  inkAt(q, centre, greenMag),
                  inkAt(q, centre, blueMag)
                );

                if (uBall > 0.5) {
                  float th = atan(q.y, q.x);
                  float wobble = ${wobbleExpression};
                  float wobbleRadius = uRL * (1.0 + wobble);
                  float inside = 1.0 - smoothstep(wobbleRadius - 1.5, wobbleRadius + 0.5, r);
                  ink *= inside;

                  float weight = ${glslFloat(PARAMS.ringStroke)} * uU
                    * (${glslFloat(PARAMS.ringThin)}
                    + (1.0 - ${glslFloat(PARAMS.ringThin)})
                    * (0.5 + 0.5 * sin(2.0 * th + 0.9 * uRingT)));
                  float ring = 1.0 - smoothstep(weight * 0.45, weight, abs(r - wobbleRadius));
                  ink = max(ink, vec3(ring));
                }

                // Only the circular mask reveals refraction; outside stays undistorted.
                float mask = 1.0 - smoothstep(uRL - 1.5, uRL + 1.5, r);
                float plainInk = 1.0 - texture2D(uTex, px / uRes).r;
                ink = mix(vec3(plainInk), ink, mask);
                vec3 plainColour = texture2D(uTex, px / uRes).rgb;
                vec3 refractedColour = vec3(
                  texture2D(uTex, (centre + q / redMag) / uRes).r,
                  texture2D(uTex, (centre + q / greenMag) / uRes).g,
                  texture2D(uTex, (centre + q / blueMag) / uRes).b
                );
                vec3 colour = mix(plainColour, refractedColour, mask);
                gl_FragColor = vec4(clamp(colour, 0.0, 1.0), 1.0);
              }
            `;

            const compile = (type, source) => {
              const shader = gl.createShader(type);
              gl.shaderSource(shader, source);
              gl.compileShader(shader);
              if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error("[glass-type shader]", gl.getShaderInfoLog(shader));
                return null;
              }
              return shader;
            };

            const vertex = compile(gl.VERTEX_SHADER, vertexSource);
            const fragment = compile(gl.FRAGMENT_SHADER, fragmentSource);
            if (!vertex || !fragment) {
              this.ok = false;
              this.renderFallback();
              return;
            }

            this.program = gl.createProgram();
            gl.attachShader(this.program, vertex);
            gl.attachShader(this.program, fragment);
            gl.linkProgram(this.program);
            if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
              console.error("[glass-type program]", gl.getProgramInfoLog(this.program));
              this.ok = false;
              this.renderFallback();
              return;
            }

            this.quad = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.quad);
            gl.bufferData(
              gl.ARRAY_BUFFER,
              new Float32Array([-1, -1, 3, -1, -1, 3]),
              gl.STATIC_DRAW,
            );

            this.uniforms = {};
            [
              "uTex", "uRes", "uU", "uOff", "uCen", "uCen2", "uRL", "uStr",
              "uPow", "uRip", "uWave", "uRim0", "uRipPh", "uBall",
              "uRingT", "uInk", "uPaper",
            ].forEach((name) => {
              this.uniforms[name] = gl.getUniformLocation(this.program, name);
            });

            this.texture = gl.createTexture();
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
            gl.bindTexture(gl.TEXTURE_2D, this.texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
          }

          resize() {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            this.dpr = dpr;
            this.width = Math.round(PARAMS.width * dpr);
            this.height = Math.round(PARAMS.height * dpr);
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            this.source.width = this.width * PARAMS.textureSupersample;
            this.source.height = this.height * PARAMS.textureSupersample;
            this.textureKey = "";
            this.renderStill();
          }

          setContent(text, widthInUnits, unit) {
            const key = `${text}|${widthInUnits.toFixed(3)}|${unit.toFixed(1)}|${PARAMS.fontFamily}`;
            if (key === this.textureKey) return;
            this.textureKey = key;

            const context = this.sourceContext;
            const scale = PARAMS.textureSupersample;
            const width = this.width * scale;
            const height = this.height * scale;
            context.fillStyle = "#FFFFFF";
            context.fillRect(0, 0, width, height);
            context.fillStyle = "#000000";
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.font = `${PARAMS.fontWeight} 100px ${PARAMS.fontFamily}`;
            const measured = context.measureText(text).width || 1;
            const fontSize = (widthInUnits * unit * scale * 100) / measured;
            context.font = `${PARAMS.fontWeight} ${fontSize}px ${PARAMS.fontFamily}`;
            context.drawImage(artwork, 0, 0, width, height);

            const gl = this.gl;
            gl.bindTexture(gl.TEXTURE_2D, this.texture);
            gl.texImage2D(
              gl.TEXTURE_2D,
              0,
              gl.RGBA,
              gl.RGBA,
              gl.UNSIGNED_BYTE,
              this.source,
            );
          }

          stepMasks(dt) {
            // Physics uses design pixels, independent of viewport scale and DPR.
            const radius = PARAMS.height * 0.576;
            this.masks ??= [
              { x: 215, y: 48, vx: 27, vy: 8 },
              { x: 519, y: 212, vx: -24, vy: -7 },
            ];
            const steps = Math.max(1, Math.ceil(dt * 120));
            const step = dt / steps;
            for (let i = 0; i < steps; i++) {
              for (const [index, ball] of this.masks.entries()) {
                ball.x += ball.vx * step;
                ball.y += ball.vy * step;
                // Keep each circle clipped by its respective top/bottom edge.
                const minY = index === 0 ? -radius * 0.2 : PARAMS.height - radius * 0.65;
                const maxY = index === 0 ? radius * 0.65 : PARAMS.height + radius * 0.2;
                if (ball.x < 0) { ball.x = 0; ball.vx = Math.abs(ball.vx); }
                if (ball.x > PARAMS.width) { ball.x = PARAMS.width; ball.vx = -Math.abs(ball.vx); }
                if (ball.y < minY) { ball.y = minY; ball.vy = Math.abs(ball.vy); }
                if (ball.y > maxY) { ball.y = maxY; ball.vy = -Math.abs(ball.vy); }
              }
              const [a, b] = this.masks;
              const dx = b.x - a.x, dy = b.y - a.y;
              const distance = Math.hypot(dx, dy);
              if (distance < radius * 2 && distance > 0) {
                const nx = dx / distance, ny = dy / distance;
                const overlap = (radius * 2 - distance) / 2;
                a.x -= nx * overlap; a.y -= ny * overlap;
                b.x += nx * overlap; b.y += ny * overlap;
                const approach = (a.vx - b.vx) * nx + (a.vy - b.vy) * ny;
                if (approach > 0) {
                  a.vx -= approach * nx; a.vy -= approach * ny;
                  b.vx += approach * nx; b.vy += approach * ny;
                }
              }
            }
          }

          drawScene(scene, elapsedMs) {
            if (!this.ok || !this.width) return;
            const gl = this.gl;
            const unit = Math.min(this.height, this.width / (16 / 9));
            const frame = (elapsedMs / 1000) * PARAMS.fps;
            const seconds = reducedMotion.matches ? 0 : elapsedMs / 1000;
            const lensParams = PARAMS.lens[scene];
            let offsetX = 0;
            let offsetY = 0;
            let radius = unit;
            let ball = 0;

            if (scene === 0) {
              this.setContent(COPY.sceneA, MOTION.a.textWidth, unit);
              // Keep the lettering centered; only the glass lens animates.
              radius = 0.576 * unit;
            } else if (scene === 1) {
              const word = COPY.sceneB[frame >= MOTION.b.swapFrame ? 1 : 0];
              this.setContent(word, MOTION.b.textWidth, unit);
              radius = tableAt(MOTION.b.radius, frame) * unit * (lensParams.rl / 0.49);
              ball = 1;
            } else {
              const found = MOTION.c.segments.findIndex(
                ([start, end]) => frame >= start && frame <= end + 1,
              );
              const segment = found < 0 ? 2 : found;
              const [lo, hi] = MOTION.c.segments[segment];
              this.setContent(COPY.sceneC[segment], MOTION.c.textWidth, unit);
              offsetX = tableAt(MOTION.c.x, frame, lo, hi) * unit;
              radius = lensParams.rl * unit;
            }

            gl.viewport(0, 0, this.width, this.height);
            gl.useProgram(this.program);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.quad);
            const position = gl.getAttribLocation(this.program, "aPos");
            gl.enableVertexAttribArray(position);
            gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, this.texture);
            gl.uniform1i(this.uniforms.uTex, 0);
            gl.uniform2f(this.uniforms.uRes, this.width, this.height);
            gl.uniform1f(this.uniforms.uU, unit);
            gl.uniform2f(this.uniforms.uOff, offsetX, offsetY);

            this.stepMasks(0);
            gl.uniform2f(
              this.uniforms.uCen,
              this.masks[0].x / PARAMS.width * this.width,
              this.masks[0].y / PARAMS.height * this.height,
            );
            gl.uniform2f(
              this.uniforms.uCen2,
              this.masks[1].x / PARAMS.width * this.width,
              this.masks[1].y / PARAMS.height * this.height,
            );
            gl.uniform1f(this.uniforms.uRL, radius);
            gl.uniform1f(this.uniforms.uStr, lensParams.str);
            gl.uniform1f(this.uniforms.uPow, lensParams.pow);
            gl.uniform1f(this.uniforms.uRip, lensParams.rip);
            gl.uniform1f(this.uniforms.uWave, lensParams.wave);
            gl.uniform1f(this.uniforms.uRim0, lensParams.rim0);
            gl.uniform1f(this.uniforms.uRipPh, seconds * PARAMS.rippleDrift);
            gl.uniform1f(this.uniforms.uBall, ball);
            gl.uniform1f(
              this.uniforms.uRingT,
              Math.floor(seconds * PARAMS.ringBoilFps) / PARAMS.ringBoilFps,
            );
            gl.uniform3fv(this.uniforms.uInk, hex(PARAMS.ink));
            gl.uniform3fv(this.uniforms.uPaper, hex(PARAMS.paper));
            gl.drawArrays(gl.TRIANGLES, 0, 3);
          }

          tick = (now) => {
            if (!this.running || this.disposed) return;

            const dt = Math.min(Math.max((now - this.lastNow) / 1000, 1 / 240), 0.1);
            this.lastNow = now;
            if (!reducedMotion.matches) this.stepMasks(dt);
            const hoverTime = this.hoverTarget > this.hover
              ? PARAMS.pointerIn
              : PARAMS.pointerOut;
            this.hover += (this.hoverTarget - this.hover) * (1 - Math.exp(-dt / hoverTime));
            const ease = 1 - Math.exp(-dt * PARAMS.pointerEase);
            this.lens.x += (this.pointer.x - this.lens.x) * ease;
            this.lens.y += (this.pointer.y - this.lens.y) * ease;

            const elapsed = now - this.sceneStartedAt;
            // Hold the same word and position without cycling through scenes.
            this.drawScene(0, elapsed);

            this.frameRequest = requestAnimationFrame(this.tick);
          };

          start() {
            if (!this.ok || this.running || this.disposed) return;
            this.running = true;
            this.sceneStartedAt = performance.now() - this.pausedElapsed;
            this.lastNow = performance.now();
            this.frameRequest = requestAnimationFrame(this.tick);
          }

          stop() {
            if (!this.running) return;
            this.pausedElapsed = performance.now() - this.sceneStartedAt;
            this.running = false;
            cancelAnimationFrame(this.frameRequest);
          }

          renderStill() {
            this.drawScene(0, (MOTION.a.frames / 2 / PARAMS.fps) * 1000);
          }

          setPointer(point) {
            if (!point) {
              this.hoverTarget = 0;
              return;
            }
            this.pointer = point;
            if (this.hoverTarget === 0 && this.hover < 0.01) {
              this.lens = { ...point };
            }
            this.hoverTarget = 1;
          }

          renderFallback() {
            const context = this.canvas.getContext("2d");
            if (!context) return;
            context.fillStyle = PARAMS.paper;
            context.fillRect(0, 0, PARAMS.width, PARAMS.height);
            context.fillStyle = PARAMS.ink;
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.font = `${PARAMS.fontWeight} 54px ${PARAMS.fontFamily}`;
            context.drawImage(artwork, 0, 0, PARAMS.width, PARAMS.height);
          }

          destroy() {
            this.disposed = true;
            this.stop();
          }
        }

        let engine;
        let previewLocked = false;
        let onScreen = true;

        const mount = async () => {
          await artwork.decode();
          if (document.fonts?.load) {
            try {
              await document.fonts.load(`${PARAMS.fontWeight} 48px TronFontVF`);
            } catch (_) {
              // The CSS fallback stack remains usable when the local font cannot load.
            }
          }

          engine = new GlassType(canvas);
          const query = new URLSearchParams(window.location.search);
          const previewScene = Number(query.get("scene"));
          const previewFrame = Number(query.get("frame"));
          if (
            query.has("scene")
            && Number.isInteger(previewScene)
            && previewScene >= 0
            && previewScene <= 2
          ) {
            previewLocked = true;
            const frame = Number.isFinite(previewFrame) ? Math.max(0, previewFrame) : 0;
            engine.drawScene(previewScene, (frame / PARAMS.fps) * 1000);
          } else if (reducedMotion.matches) {
            engine.renderStill();
          } else {
            engine.start();
          }
        };

        const pointerMove = (event) => {
          if (event.pointerType !== "mouse") return;
          const rect = canvas.getBoundingClientRect();
          engine?.setPointer({
            x: (event.clientX - rect.left) / rect.width,
            y: (event.clientY - rect.top) / rect.height,
          });
        };

        const pointerLeave = () => engine?.setPointer(null);
        const syncVisibility = () => {
          if (!engine || reducedMotion.matches || previewLocked) return;
          if (document.hidden || !onScreen) engine.stop();
          else engine.start();
        };

        const observer = new IntersectionObserver(
          ([entry]) => {
            onScreen = entry?.isIntersecting ?? false;
            syncVisibility();
          },
          { threshold: 0.2 },
        );
        observer.observe(canvas);

        canvas.addEventListener("pointermove", pointerMove);
        canvas.addEventListener("pointerleave", pointerLeave);
        window.addEventListener("blur", pointerLeave);
        document.addEventListener("visibilitychange", syncVisibility);
        reducedMotion.addEventListener?.("change", () => {
          if (!engine || previewLocked) return;
          if (reducedMotion.matches) {
            engine.stop();
            engine.renderStill();
          } else {
            engine.start();
          }
        });
        window.addEventListener("pagehide", () => engine?.stop(), { once: true });

        mount();
      })();
