(() => {
  'use strict';
  const host = document.querySelector('.signature-image');
  if (!host) return;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  canvas.setAttribute('role', 'img');
  canvas.setAttribute('aria-label', 'White halftone dots flowing in slow waves on a red background');
  // 逐条赋值而不是 style.cssText —— cssText 等同于设置 style 属性，
  // 会被严格 CSP 的 style-src 'self' 拦掉（逐条设 el.style.prop 不受限制）。
  Object.assign(canvas.style, {
    position: 'absolute', inset: '0', display: 'block', width: '100%', height: '100%',
  });
  host.append(canvas);
  const fallback = host.querySelector('img');
  const width = 734, height = 260, spacing = 8.4;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0, time = 0, previous = 0, visible = false;

  function draw() {
    ctx.fillStyle = '#ea0029';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#fff9f5';
    ctx.beginPath();
    const phase = time * 0.96;
    for (let y = -spacing; y <= height + spacing; y += spacing) {
      for (let x = -spacing; x <= width + spacing; x += spacing) {
        const u = x / width, v = y / height;
        // A stationary dot grid with smoothly changing diameters creates halftone waves.
        const bend = v + 0.22 * Math.sin(u * 7.5 - phase * 0.7);
        const wave = Math.sin(u * 10.8 + bend * 4.4 - phase)
          + 0.62 * Math.cos(bend * 7.3 - u * 3.2 + phase * 0.65)
          + 0.28 * Math.sin(u * 18 + v * 5 - phase * 0.4);
        const amount = Math.max(0, Math.min(1, (wave + 1.05) / 2.5));
        // Stagger the size pulse across the grid, rather than flashing all dots together.
        const pulse = 0.5 + 0.5 * Math.sin(time * 1.8 + u * 9 - v * 5);
        const radius = 0.18 + 3.92 * Math.pow(amount, 1.4) * (0.55 + 0.45 * pulse);
        ctx.moveTo(x + radius, y);
        ctx.arc(x, y, radius, 0, Math.PI * 2);
      }
    }
    ctx.fill();
  }

  function resize() {
    const rect = host.getBoundingClientRect();
    const ratio = Math.min(3, (devicePixelRatio || 1) * (rect.width / width || 1));
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    ctx.setTransform(canvas.width / width, 0, 0, canvas.height / height, 0, 0);
    draw();
    if (fallback) fallback.style.visibility = 'hidden';
  }

  function tick(now) {
    frame = 0;
    if (!visible || document.hidden || reduced.matches) return;
    if (previous) time += Math.min((now - previous) / 1000, 0.05);
    previous = now;
    draw();
    frame = requestAnimationFrame(tick);
  }

  function sync() {
    cancelAnimationFrame(frame);
    frame = 0;
    previous = 0;
    if (reduced.matches) { time = 0; draw(); }
    else if (visible && !document.hidden) frame = requestAnimationFrame(tick);
  }

  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    sync();
  });
  observer.observe(host);
  addEventListener('resize', resize);
  document.addEventListener('visibilitychange', sync);
  reduced.addEventListener('change', sync);
  addEventListener('pagehide', () => { visible = false; sync(); });
  addEventListener('pageshow', () => { visible = true; sync(); });
  resize();
})();
