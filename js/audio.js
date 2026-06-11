/* PATTERNS.EXE - synthesized audio engine.
   Zero assets: every sound is generated in WebAudio.
   Room hum, key ticks, scan sweeps, the stamp thud. */

const AudioEngine = (() => {
  let ctx = null, master = null, humNodes = null, enabled = false;

  function ensure() {
    if (ctx) return true;
    try {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      master = ctx.createGain();
      master.gain.value = 0.0;
      master.connect(ctx.destination);
      return true;
    } catch (e) { return false; }
  }

  /* low room tone: detuned sines + filtered noise, very quiet */
  function startHum() {
    if (humNodes || !ctx) return;
    const g = ctx.createGain(); g.gain.value = 0.05; g.connect(master);
    const o1 = ctx.createOscillator(); o1.frequency.value = 48; o1.type = 'sine';
    const o2 = ctx.createOscillator(); o2.frequency.value = 49.3; o2.type = 'sine';
    const og = ctx.createGain(); og.gain.value = 0.5;
    o1.connect(og); o2.connect(og); og.connect(g);
    const buf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * 0.22;
    const noise = ctx.createBufferSource(); noise.buffer = buf; noise.loop = true;
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 220;
    noise.connect(lp); lp.connect(g);
    o1.start(); o2.start(); noise.start();
    humNodes = { o1, o2, noise, g };
  }

  function env(node, t0, a, peak, d) {
    node.gain.cancelScheduledValues(t0);
    node.gain.setValueAtTime(0.0001, t0);
    node.gain.exponentialRampToValueAtTime(peak, t0 + a);
    node.gain.exponentialRampToValueAtTime(0.0001, t0 + a + d);
  }

  return {
    get on() { return enabled; },

    toggle() {
      if (!ensure()) return false;
      enabled = !enabled;
      if (enabled) { ctx.resume(); startHum(); master.gain.linearRampToValueAtTime(0.9, ctx.currentTime + 0.4); }
      else master.gain.linearRampToValueAtTime(0.0, ctx.currentTime + 0.2);
      return enabled;
    },

    /* typewriter tick: tiny high-passed noise burst */
    tick() {
      if (!enabled || !ctx) return;
      const t = ctx.currentTime;
      const buf = ctx.createBuffer(1, 600, ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
      const s = ctx.createBufferSource(); s.buffer = buf;
      const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 2400;
      const g = ctx.createGain(); g.gain.value = 0.05 + Math.random() * 0.03;
      s.connect(hp); hp.connect(g); g.connect(master); s.start(t);
    },

    /* option select: short dual blip */
    blip() {
      if (!enabled || !ctx) return;
      const t = ctx.currentTime;
      [620, 930].forEach((f, i) => {
        const o = ctx.createOscillator(); o.type = 'square'; o.frequency.value = f;
        const g = ctx.createGain(); o.connect(g); g.connect(master);
        env(g, t + i * 0.07, 0.005, 0.05, 0.07);
        o.start(t + i * 0.07); o.stop(t + i * 0.07 + 0.12);
      });
    },

    /* analysis sweep: rising filtered saw */
    sweep() {
      if (!enabled || !ctx) return;
      const t = ctx.currentTime;
      const o = ctx.createOscillator(); o.type = 'sawtooth';
      o.frequency.setValueAtTime(120, t);
      o.frequency.exponentialRampToValueAtTime(980, t + 0.9);
      const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 700; f.Q.value = 8;
      const g = ctx.createGain(); o.connect(f); f.connect(g); g.connect(master);
      env(g, t, 0.08, 0.06, 0.9);
      o.start(t); o.stop(t + 1.1);
    },

    /* verdict stamp: pitched-down body + noise slap */
    thud() {
      if (!enabled || !ctx) return;
      const t = ctx.currentTime;
      const o = ctx.createOscillator(); o.type = 'sine';
      o.frequency.setValueAtTime(160, t);
      o.frequency.exponentialRampToValueAtTime(38, t + 0.22);
      const g = ctx.createGain(); o.connect(g); g.connect(master);
      env(g, t, 0.004, 0.85, 0.34);
      o.start(t); o.stop(t + 0.5);
      const buf = ctx.createBuffer(1, 2400, ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
      const s = ctx.createBufferSource(); s.buffer = buf;
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 900;
      const ng = ctx.createGain(); ng.gain.value = 0.4;
      s.connect(lp); lp.connect(ng); ng.connect(master); s.start(t);
    },

    /* glitch burst before verdict */
    glitch() {
      if (!enabled || !ctx) return;
      const t = ctx.currentTime;
      for (let i = 0; i < 5; i++) {
        const o = ctx.createOscillator(); o.type = 'square';
        o.frequency.value = 200 + Math.random() * 2400;
        const g = ctx.createGain(); o.connect(g); g.connect(master);
        const st = t + i * 0.05;
        env(g, st, 0.004, 0.05, 0.04);
        o.start(st); o.stop(st + 0.06);
      }
    }
  };
})();
