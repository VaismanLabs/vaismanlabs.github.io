/* VaismanLabs — fondo animado de la portada: nube de puntos que se ordena y forma la V */
(function () {
const ANCHOR = {};

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const ease = (x) => x < 0 ? 0 : x > 1 ? 1 : 1 - Math.pow(1 - x, 3);
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
function rng(seed) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }
function distSeg(px, py, ax, ay, bx, by) {
  const dx = bx - ax, dy = by - ay, t = clamp(((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy), 0, 1);
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
}

/* ---------- 1. Nube que se ordena ---------- */
const cloud = {
  init(w, h) {
    const r = rng(7), sp = w < 700 ? 18 : 22, pts = [];
    const mobile = w < 700;
    const vx = mobile ? w - 40 : w * 0.74, vy = mobile ? (ANCHOR.btnBottom ? ANCHOR.btnBottom + 2 : h - 30) : h * 0.66;
    const aw = mobile ? 22 : Math.min(w * 0.15, 170), ah = mobile ? 40 : Math.min(h * 0.4, 210);
    for (let gx = sp / 2; gx < w + sp; gx += sp) for (let gy = sp / 2; gy < h + sp; gy += sp) {
      const inV = Math.min(distSeg(gx, gy, vx - aw, vy - ah, vx, vy), distSeg(gx, gy, vx + aw, vy - ah, vx, vy)) < sp * 0.75;
      const v = 0.5 + 0.5 * Math.sin(gx * 0.011 + gy * 0.006) * Math.cos(gy * 0.015 - gx * 0.004);
      pts.push({ gx, gy, sx: r() * w, sy: r() * h, d: r() * 0.7 + (inV ? 0.5 : 0), v, inV });
    }
    return { pts };
  },
  draw(ctx, w, h, s, t, m) {
    ctx.clearRect(0, 0, w, h);
    for (const p of s.pts) {
      const e = ease((t - p.d) / 2.2);
      const depth = 4 + p.v * 8;
      const x = p.sx + (p.gx - p.sx) * e + m.x * depth;
      const y = p.sy + (p.gy - p.sy) * e + Math.sin(t * 0.8 + p.gx * 0.015 + p.gy * 0.01) * 2.2 * e + m.y * depth;
      if (p.inV) { ctx.fillStyle = 'rgba(94,116,6,' + (0.35 + 0.65 * e) + ')'; ctx.beginPath(); ctx.arc(x, y, 2.8, 0, 6.283); ctx.fill(); }
      else { ctx.fillStyle = 'rgba(26,26,26,' + (0.1 + 0.4 * p.v) + ')'; ctx.beginPath(); ctx.arc(x, y, 1 + p.v * 1.4, 0, 6.283); ctx.fill(); }
    }
  }
};

(function () {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const kind = cloud;
  const canvas = document.createElement('canvas'); canvas.className = 'hero-bg'; canvas.setAttribute('aria-hidden', 'true');
  const mask = document.createElement('div'); mask.className = 'hero-mask';
  // Estilos esenciales en línea: funciona aunque el navegador tenga un styles.css antiguo en caché
  hero.style.position = 'relative'; hero.style.overflow = 'hidden';
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;z-index:0;pointer-events:none';
  mask.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:1';
  const inner = hero.querySelector('.hero-inner');
  if (inner) { inner.style.position = 'relative'; inner.style.zIndex = '2'; }
  hero.prepend(mask); hero.prepend(canvas);
  const ctx = canvas.getContext('2d');
  const d = { w: 0, h: 0, state: null, t0: performance.now(), visible: true, raf: 0, m: { x: 0, y: 0, tx: 0, ty: 0 } };
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    d.w = canvas.clientWidth; d.h = canvas.clientHeight;
    canvas.width = Math.round(d.w * dpr); canvas.height = Math.round(d.h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const hr = hero.getBoundingClientRect(), br = hero.querySelector('.btn').getBoundingClientRect();
    ANCHOR.btnTop = br.top - hr.top; ANCHOR.btnBottom = br.bottom - hr.top;
    d.state = kind.init(d.w, d.h);
    if (reduce) paint(performance.now());
  }
  function paint(now) {
    d.m.x += (d.m.tx - d.m.x) * 0.06; d.m.y += (d.m.ty - d.m.y) * 0.06;
    kind.draw(ctx, d.w, d.h, d.state, reduce ? 30 : (now - d.t0) / 1000, d.m);
  }
  function loop(now) { paint(now); if (d.visible && !reduce) d.raf = requestAnimationFrame(loop); }
  hero.addEventListener('pointermove', (e) => { const r = hero.getBoundingClientRect(); d.m.tx = ((e.clientX - r.left) / r.width - 0.5) * 2; d.m.ty = ((e.clientY - r.top) / r.height - 0.5) * 2; }, { passive: true });
  hero.addEventListener('pointerleave', () => { d.m.tx = 0; d.m.ty = 0; });
  new IntersectionObserver((en) => { const v = en[0].isIntersecting; if (v && !d.visible) { d.visible = true; if (!reduce) d.raf = requestAnimationFrame(loop); } else if (!v) { d.visible = false; cancelAnimationFrame(d.raf); } }).observe(hero);
  let rt = 0; window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(resize, 150); });
  resize();
  if (reduce) paint(performance.now()); else d.raf = requestAnimationFrame(loop);
})();
})();
