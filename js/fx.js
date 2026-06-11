/* PATTERNS.EXE - FX engine. All 2D canvas, zero dependencies.
   Three layers:
   1. DUST   - full-screen ambient particle field with glitch rows
   2. VIGNETTE - per-question kinetic sketch; each one BEHAVES like the
                 pattern it interrogates (the component demonstrates the thing)
   3. NUMERAL - verdict digits assembled from particles, red burst on stamp */

const FX = (() => {
  const BONE = '237,234,226', DIM = '142,140,132', RED = '224,49,49', LINE = '#1E2026';
  let motion = true;

  /* ---------- helpers ---------- */
  function fit(cv) {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const r = cv.getBoundingClientRect();
    if (!r.width || !r.height) return null;
    if (cv.width !== r.width * dpr | 0) { cv.width = r.width * dpr; cv.height = r.height * dpr; }
    const x = cv.getContext('2d');
    x.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { x, w: r.width, h: r.height };
  }
  const rnd = (a, b) => a + Math.random() * (b - a);

  /* ---------- 1. ambient dust ---------- */
  function dust(cv) {
    const N = 90, P = [];
    for (let i = 0; i < N; i++) P.push({ x: Math.random(), y: Math.random(), s: rnd(.2, 1.4), v: rnd(.00003, .00018), a: rnd(.04, .16) });
    let glitchAt = 300 + Math.random() * 900, f = 0;
    (function loop() {
      requestAnimationFrame(loop);
      if (!motion) return;
      const c = fit(cv); if (!c) return;
      const { x, w, h } = c; f++;
      x.clearRect(0, 0, w, h);
      for (const p of P) {
        p.y -= p.v; if (p.y < 0) { p.y = 1; p.x = Math.random(); }
        x.fillStyle = `rgba(${BONE},${p.a})`;
        x.fillRect(p.x * w, p.y * h, p.s, p.s);
      }
      if (f > glitchAt) { /* one-frame interference row */
        const gy = Math.random() * h;
        x.fillStyle = `rgba(${BONE},.05)`; x.fillRect(0, gy, w, 1.5);
        x.fillStyle = `rgba(${RED},.06)`; x.fillRect(Math.random() * w * .6, gy, rnd(40, 200), 1.5);
        glitchAt = f + 300 + Math.random() * 1100;
      }
    })();
  }

  /* ---------- 2. vignettes ---------- */
  /* each mode: init(w,h) -> state ; draw(x,w,h,t,st,mouse) */
  const MODES = {

    /* COMFORT TRAP: particles drift with purpose until they reach the warm
       zone, where they settle and dim. The pointer (discomfort) wakes them. */
    comfort: {
      init(w, h) {
        const P = [];
        for (let i = 0; i < 70; i++) P.push({ x: rnd(0, w * .3), y: rnd(0, h), vx: rnd(.4, 1.2), vy: rnd(-.2, .2), rest: 0 });
        return { P };
      },
      draw(x, w, h, t, st, m) {
        const cx = w * .72, cy = h * .5, R = Math.min(w, h) * .3;
        x.strokeStyle = `rgba(${BONE},.07)`; x.beginPath(); x.arc(cx, cy, R, 0, 7); x.stroke();
        x.fillStyle = `rgba(${DIM},.5)`; x.font = '9px Kode Mono'; x.fillText('COMFORT', cx - 22, cy + R + 14);
        for (const p of st.P) {
          const d = Math.hypot(p.x - cx, p.y - cy);
          if (m && Math.hypot(p.x - m.x, p.y - m.y) < 70) { p.vx = rnd(-2.4, 2.4); p.vy = rnd(-2.4, 2.4); p.rest = 0; }
          if (d < R) { p.vx *= .965; p.vy *= .965; p.rest++; }      /* arrives, slows, stops */
          else { p.vx += (cx - p.x) * .00012; p.vy += (cy - p.y) * .00012; }
          p.x += p.vx; p.y += p.vy;
          const alive = Math.min(1, Math.hypot(p.vx, p.vy));
          x.fillStyle = `rgba(${BONE},${.12 + alive * .55})`;
          x.fillRect(p.x, p.y, 2, 2);
        }
      }
    },

    /* BUILDING INSTEAD OF SELLING: the stack keeps growing on the left.
       On the right, a buyer blinks, waits, and eventually leaves. */
    building: {
      init(w, h) { return { rows: 3, t0: 0, buyerGone: 0 }; },
      draw(x, w, h, t, st) {
        if (t - st.t0 > 40) { st.t0 = t; st.rows++; if (st.rows > 26) { st.rows = 3; st.buyerGone = 0; } }
        const bw = 26, bh = 7, bx = w * .22;
        for (let i = 0; i < st.rows; i++) {
          const yy = h - 14 - i * (bh + 2);
          if (yy < 4) break;
          x.strokeStyle = `rgba(${BONE},${.5 - i * .012})`;
          x.strokeRect(bx + ((i % 2) ? 3 : -3), yy, bw, bh);
        }
        x.fillStyle = `rgba(${DIM},.5)`; x.font = '9px Kode Mono';
        x.fillText('THE PRODUCT', bx - 18, h - 2);
        if (st.rows > 20) st.buyerGone = Math.min(1, st.buyerGone + .02);
        const px = w * .78 + st.buyerGone * w * .3;             /* buyer walks off */
        const blink = Math.sin(t * .1) > -0.6;
        if (blink) { x.fillStyle = `rgba(${RED},${.8 - st.buyerGone})`; x.beginPath(); x.arc(px, h * .55, 3, 0, 7); x.fill(); }
        x.fillStyle = `rgba(${DIM},${.5 - st.buyerGone * .5})`; x.fillText('THE BUYER', w * .78 - 18, h * .55 + 18);
      }
    },

    /* 80% PROBLEM: the ring draws beautifully to 80, hesitates, dies. */
    eighty: {
      init() { return { p: 0, hold: 0 }; },
      draw(x, w, h, t, st) {
        const cx = w * .5, cy = h * .52, R = Math.min(w, h) * .33;
        if (st.p < .8) st.p += .004; else { st.hold++; if (st.hold > 110) { st.p = 0; st.hold = 0; } }
        x.strokeStyle = `rgba(${BONE},.1)`; x.beginPath(); x.arc(cx, cy, R, 0, 7); x.stroke();
        x.strokeStyle = `rgba(${BONE},.8)`; x.lineWidth = 2;
        x.beginPath(); x.arc(cx, cy, R, -Math.PI / 2, -Math.PI / 2 + st.p * Math.PI * 2); x.stroke(); x.lineWidth = 1;
        const flick = st.hold > 0 && Math.sin(t * .3) > 0;
        x.fillStyle = flick ? `rgba(${RED},.9)` : `rgba(${BONE},.85)`;
        x.font = '700 22px Kode Mono'; x.textAlign = 'center';
        x.fillText(Math.round(st.p * 100) + '%', cx, cy + 7);
        if (st.hold > 30) { x.fillStyle = `rgba(${DIM},.6)`; x.font = '9px Kode Mono'; x.fillText('SO CLOSE. ANYWAY.', cx, cy + R + 16); }
        x.textAlign = 'left';
      }
    },

    /* PLANNING: blueprint boxes draw themselves forever. Nothing fills. */
    planning: {
      init(w, h) { return { boxes: [], t0: 0 }; },
      draw(x, w, h, t, st) {
        if (t - st.t0 > 26) {
          st.t0 = t;
          st.boxes.push({ x: rnd(10, w - 90), y: rnd(8, h - 40), w: rnd(36, 84), h: rnd(14, 32), born: t });
          if (st.boxes.length > 14) st.boxes.shift();
        }
        x.strokeStyle = `rgba(${BONE},.06)`;
        for (let gx = 0; gx < w; gx += 22) { x.beginPath(); x.moveTo(gx, 0); x.lineTo(gx, h); x.stroke(); }
        for (const b of st.boxes) {
          const age = Math.min(1, (t - b.born) / 30);
          const per = (b.w + b.h) * 2 * age;
          x.strokeStyle = `rgba(${BONE},${.55 - (t - b.born) * .0012})`;
          x.setLineDash([per, 999]); x.strokeRect(b.x, b.y, b.w, b.h); x.setLineDash([]);
          if (age >= 1) { x.fillStyle = `rgba(${DIM},.35)`; x.font = '8px Kode Mono'; x.fillText('v' + ((t - b.born) / 60 | 0) + '.0', b.x + 3, b.y + 10); }
        }
        x.fillStyle = `rgba(${DIM},.5)`; x.font = '9px Kode Mono'; x.fillText('THE ROADMAP (GROWING)', 10, h - 6);
      }
    },

    /* PRIDE: a bridge reaches toward the other side and retracts at 90%. */
    pride: {
      init() { return { p: 0, dir: 1 }; },
      draw(x, w, h, t, st) {
        const y = h * .52, x1 = w * .16, x2 = w * .84;
        for (const [xx, lab] of [[x1, 'YOU'], [x2, 'THE ANSWER']]) {
          x.fillStyle = `rgba(${BONE},.8)`; x.beginPath(); x.arc(xx, y, 4, 0, 7); x.fill();
          x.fillStyle = `rgba(${DIM},.55)`; x.font = '9px Kode Mono'; x.textAlign = 'center'; x.fillText(lab, xx, y + 22);
        }
        st.p += .006 * st.dir;
        if (st.p > .9) st.dir = -1;            /* almost. never. */
        if (st.p < 0) { st.p = 0; st.dir = 1; }
        x.strokeStyle = `rgba(${BONE},.7)`;
        x.beginPath(); x.moveTo(x1, y); x.lineTo(x1 + (x2 - x1) * st.p, y); x.stroke();
        if (st.dir < 0) { x.fillStyle = `rgba(${RED},.75)`; x.font = '9px Kode Mono'; x.fillText('RETRACTING', (x1 + x2) / 2, y - 12); }
        x.textAlign = 'left';
      }
    },

    /* REBUILD LOOP: a tower stacks, holds a beat, collapses. Again. */
    rebuild: {
      init() { return { n: 0, phase: 'up', t0: 0, fall: [] }; },
      draw(x, w, h, t, st) {
        const cx = w * .5, bw = 44, bh = 9, base = h - 16;
        if (st.phase === 'up') {
          if (t - st.t0 > 16) { st.t0 = t; st.n++; if (st.n >= 12) { st.phase = 'hold'; st.t0 = t; } }
          for (let i = 0; i < st.n; i++) { x.strokeStyle = `rgba(${BONE},.7)`; x.strokeRect(cx - bw / 2 + ((i % 2) ? 2 : -2), base - i * (bh + 1), bw, bh); }
        } else if (st.phase === 'hold') {
          for (let i = 0; i < st.n; i++) { x.strokeStyle = `rgba(${BONE},.7)`; x.strokeRect(cx - bw / 2 + ((i % 2) ? 2 : -2), base - i * (bh + 1), bw, bh); }
          if (t - st.t0 > 70) {
            st.phase = 'fall'; st.t0 = t;
            st.fall = Array.from({ length: st.n }, (_, i) => ({ x: cx - bw / 2, y: base - i * (bh + 1), vx: rnd(-1.6, 1.6), vy: rnd(-2.5, -.5), r: 0, vr: rnd(-.1, .1) }));
          }
        } else {
          let live = 0;
          for (const b of st.fall) {
            b.vy += .25; b.x += b.vx; b.y += b.vy; b.r += b.vr;
            if (b.y < h + 20) live++;
            x.save(); x.translate(b.x + bw / 2, b.y + bh / 2); x.rotate(b.r);
            x.strokeStyle = `rgba(${BONE},.5)`; x.strokeRect(-bw / 2, -bh / 2, bw, bh); x.restore();
          }
          if (!live) { st.phase = 'up'; st.n = 0; st.t0 = t; }
          x.fillStyle = `rgba(${RED},.7)`; x.font = '9px Kode Mono'; x.textAlign = 'center';
          x.fillText('FRESH START #' + (Math.floor(t / 400) % 90 + 3), cx, 14); x.textAlign = 'left';
        }
      }
    },

    /* IDENTITY: your size is decided by how close the judges orbit. */
    identity: {
      init() { return { J: Array.from({ length: 5 }, (_, i) => ({ a: i * 1.26, r: rnd(.7, 1.3), sp: rnd(.004, .012) })) }; },
      draw(x, w, h, t, st) {
        const cx = w * .5, cy = h * .52, base = Math.min(w, h) * .3;
        let pull = 0;
        for (const j of st.J) {
          j.a += j.sp;
          const rr = base * (j.r + Math.sin(t * .01 + j.a) * .45);
          const jx = cx + Math.cos(j.a) * rr, jy = cy + Math.sin(j.a) * rr * .6;
          pull += Math.max(0, 1 - Math.hypot(jx - cx, jy - cy) / base);
          x.fillStyle = `rgba(${DIM},.8)`; x.fillRect(jx - 1.5, jy - 1.5, 3, 3);
        }
        const self = 4 + pull * 10;                     /* their proximity = your size */
        x.fillStyle = `rgba(${BONE},.9)`; x.beginPath(); x.arc(cx, cy, self, 0, 7); x.fill();
        x.fillStyle = `rgba(${DIM},.55)`; x.font = '9px Kode Mono'; x.textAlign = 'center';
        x.fillText('YOU, AT THEIR MERCY', cx, h - 8); x.textAlign = 'left';
      }
    },

    /* BROKEN CLOCK: the hand stutters, leaps, runs backwards. */
    clock: {
      init() { return { a: 0, t0: 0, mode: 0 }; },
      draw(x, w, h, t, st) {
        const cx = w * .5, cy = h * .52, R = Math.min(w, h) * .34;
        x.strokeStyle = `rgba(${BONE},.25)`; x.beginPath(); x.arc(cx, cy, R, 0, 7); x.stroke();
        for (let i = 0; i < 12; i++) {
          const a = i * Math.PI / 6;
          x.strokeStyle = `rgba(${BONE},.3)`;
          x.beginPath(); x.moveTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R);
          x.lineTo(cx + Math.cos(a) * (R - 5), cy + Math.sin(a) * (R - 5)); x.stroke();
        }
        if (t - st.t0 > 30) { st.t0 = t; st.mode = Math.random(); }
        if (st.mode < .45) st.a += .002;                /* limps */
        else if (st.mode < .75) st.a -= .02;            /* runs backwards */
        else st.a += .12;                               /* panics */
        x.strokeStyle = `rgba(${RED},.85)`; x.lineWidth = 2;
        x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.cos(st.a) * R * .8, cy + Math.sin(st.a) * R * .8); x.stroke();
        x.lineWidth = 1;
        x.fillStyle = `rgba(${DIM},.55)`; x.font = '9px Kode Mono'; x.textAlign = 'center';
        x.fillText('YOUR SCHEDULE, LIVE', cx, h - 6); x.textAlign = 'left';
      }
    }
  };

  let vigState = null, vigMode = null, vigCv = null, vigMouse = null, vigT = 0;
  function vignette(cv, mode) {
    vigCv = cv; vigMode = MODES[mode] || MODES.planning; vigT = 0;
    const c = fit(cv); vigState = vigMode.init(c ? c.w : 300, c ? c.h : 150);
    if (!vigCv._loop) {
      vigCv._loop = true;
      cv.addEventListener('pointermove', e => { const r = cv.getBoundingClientRect(); vigMouse = { x: e.clientX - r.left, y: e.clientY - r.top }; });
      cv.addEventListener('pointerleave', () => vigMouse = null);
      (function loop() {
        requestAnimationFrame(loop);
        if (!motion || !vigMode) return;
        const c2 = fit(vigCv); if (!c2) return;
        vigT++;
        c2.x.clearRect(0, 0, c2.w, c2.h);
        vigMode.draw(c2.x, c2.w, c2.h, vigT, vigState, vigMouse);
      })();
    }
  }

  /* ---------- 3. verdict numeral ---------- */
  function numeral(cv, digits, accentBurst) {
    const c = fit(cv); if (!c) return;
    const { w, h } = c;
    /* sample the digits from an offscreen canvas */
    const off = document.createElement('canvas'); off.width = w; off.height = h;
    const ox = off.getContext('2d');
    ox.fillStyle = '#fff';
    const size = Math.min(h * 0.92, w * 0.62);
    ox.font = `700 ${size}px "Kode Mono"`;
    ox.textAlign = 'center'; ox.textBaseline = 'middle';
    ox.fillText(digits, w / 2, h / 2 + size * 0.05);
    const img = ox.getImageData(0, 0, w, h).data;
    const targets = [];
    const step = Math.max(3, Math.floor(w / 140));
    for (let yy = 0; yy < h; yy += step) for (let xx = 0; xx < w; xx += step)
      if (img[(yy * w + xx) * 4 + 3] > 128) targets.push({ x: xx, y: yy });
    const P = targets.map(tg => ({ tx: tg.x, ty: tg.y, x: rnd(0, w), y: rnd(0, h), vx: 0, vy: 0, red: Math.random() < .04 }));
    let burst = 0, frames = 0;
    if (accentBurst) setTimeout(() => burst = 1, accentBurst);
    (function loop() {
      const c2 = fit(cv); if (!c2) return;
      frames++;
      const { x } = c2;
      x.clearRect(0, 0, w, h);
      let settled = 0;
      for (const p of P) {
        if (burst && !p._b) { p._b = 1; p.vx += rnd(-4, 4); p.vy += rnd(-4, 4); }
        p.vx += (p.tx - p.x) * .03; p.vy += (p.ty - p.y) * .03;
        p.vx *= .82; p.vy *= .82;
        p.x += p.vx; p.y += p.vy;
        if (Math.abs(p.tx - p.x) < .6 && Math.abs(p.ty - p.y) < .6) settled++;
        x.fillStyle = p.red ? `rgba(${RED},.9)` : `rgba(${BONE},.82)`;
        x.fillRect(p.x, p.y, 2, 2);
      }
      if (motion && (frames < 600)) requestAnimationFrame(loop);
      else { /* final crisp settle */
        x.clearRect(0, 0, w, h);
        for (const p of P) { x.fillStyle = p.red ? `rgba(${RED},.9)` : `rgba(${BONE},.82)`; x.fillRect(p.tx, p.ty, 2, 2); }
      }
    })();
  }

  return {
    dust, vignette, numeral,
    setMotion(v) { motion = v; },
    get motion() { return motion; }
  };
})();
