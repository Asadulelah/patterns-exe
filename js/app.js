/* PATTERNS.EXE - application flow.
   boot -> intake -> exam (8 scans, live vignettes) -> analysis -> verdict
   Deep links: #p1..#p8 opens a shared verdict dossier. */

const $ = id => document.getElementById(id);
const show = id => { document.querySelectorAll('.screen').forEach(s => s.classList.remove('on')); $(id).classList.add('on'); };

const STATE = {
  subject: '', qi: 0, primary: 4, shared: false,
  score: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 }
};

/* ---------------- typing ---------------- */
let typeJob = 0;
function type(el, text, speed, done) {
  const job = ++typeJob;
  el.innerHTML = '';
  const cur = document.createElement('span'); cur.className = 'cursor'; el.appendChild(cur);
  if (document.documentElement.classList.contains('no-motion')) {
    cur.remove(); el.textContent = text; done && done(); return;
  }
  let i = 0;
  el._skip = () => { if (job !== typeJob) return; typeJob++; cur.remove(); el.textContent = text; done && done(); };
  (function step() {
    if (job !== typeJob) return;
    if (i < text.length) {
      cur.insertAdjacentText('beforebegin', text[i++]);
      if (i % 2) AudioEngine.tick();
      setTimeout(step, speed + Math.random() * 20);
    } else { cur.remove(); el._skip = null; done && done(); }
  })();
}

/* ---------------- chrome toggles ---------------- */
$('sndTgl').onclick = e => {
  const on = AudioEngine.toggle();
  e.target.textContent = on ? 'SOUND ON' : 'SOUND OFF';
  e.target.classList.toggle('on', on);
};
$('motTgl').onclick = e => {
  const off = document.documentElement.classList.toggle('no-motion');
  FX.setMotion(!off);
  e.target.textContent = off ? 'MOTION OFF' : 'MOTION ON';
  e.target.classList.toggle('on', off);
};

/* ---------------- boot ---------------- */
FX.dust($('dust'));

const BOOT = [
  ['PATTERNS.EXE', 'title'],
  ['a self-sabotage diagnostic for builders.', ''],
  ['eight questions. one verdict. no mercy setting.', 'dim'],
  ['built from a real audit. the kind that hurt.', 'dim']
];
function bootSeq() {
  const box = $('bootLines'); box.innerHTML = ''; let i = 0;
  (function next() {
    if (i >= BOOT.length) { $('beginBtn').classList.add('show'); $('bootHint').classList.add('show'); return; }
    const [txt, cls] = BOOT[i++];
    const d = document.createElement(cls === 'title' ? 'div' : 'span');
    if (cls === 'title') {
      d.className = 'title'; box.appendChild(d);
      type(d, 'PATTERNS.EXE', 42, () => { d.innerHTML = 'PATTERNS<span class="x">.</span>EXE'; next(); });
    } else { d.className = 'ln ' + cls; box.appendChild(d); type(d, txt, 15, next); }
  })();
}

/* ---------------- flow ---------------- */
function toIntake() { show('intake'); setTimeout(() => $('nameIn').focus(), 80); }
$('beginBtn').onclick = toIntake;

function startExam() {
  STATE.subject = ($('nameIn').value || '').trim().toUpperCase() || 'SUBJECT UNKNOWN';
  show('exam');
  $('meter').innerHTML = QUESTIONS.map(() => '<div class="seg"></div>').join('') + '<span class="lab" id="mlab"></span>';
  ask();
}

function ask() {
  $('mlab').textContent = 'SCAN ' + (STATE.qi + 1) + '/' + QUESTIONS.length;
  document.querySelectorAll('.seg').forEach((s, i) => s.classList.toggle('done', i < STATE.qi));
  $('aside').textContent = '';
  const Q = QUESTIONS[STATE.qi];
  FX.vignette($('vig'), Q.v);
  $('opts').classList.remove('show'); $('opts').innerHTML = '';
  type($('qtext'), Q.q, 16, () => {
    $('opts').innerHTML = Q.o.map((o, i) =>
      `<button class="opt" data-i="${i}"><span class="k">${i + 1}</span><span>${o[0]}</span></button>`).join('');
    $('opts').querySelectorAll('.opt').forEach(b => b.onclick = () => answer(+b.dataset.i));
    $('opts').classList.add('show');
  });
}

function answer(i) {
  AudioEngine.blip();
  const w = QUESTIONS[STATE.qi].o[i][1];
  for (const k in w) STATE.score[k] += w[k];
  $('aside').textContent = '› ' + ASIDES[STATE.qi];
  $('opts').style.pointerEvents = 'none';
  setTimeout(() => {
    $('opts').style.pointerEvents = '';
    if (++STATE.qi < QUESTIONS.length) ask(); else analysis();
  }, 700);
}

/* ---------------- analysis ---------------- */
function analysis() {
  show('analysis');
  AudioEngine.sweep();
  const box = $('anaLines'); box.innerHTML = '';
  let i = 0;
  (function next() {
    if (i >= ANALYSIS_LINES.length) return setTimeout(showBars, 200);
    const d = document.createElement('div');
    box.appendChild(d);
    type(d, '> ' + ANALYSIS_LINES[i], 9, () => {
      d.classList.add(i % 3 === 1 ? 'ok' : 'x');
      i++; setTimeout(next, 110);
    });
  })();
}
function showBars() {
  AudioEngine.sweep();
  const order = Object.entries(STATE.score).sort((a, b) => b[1] - a[1]);
  const max = Math.max(1, +order[0][1]);
  const wrap = $('anaBars'); wrap.innerHTML = '';
  for (const [k, v] of order) {
    const row = document.createElement('div');
    row.className = 'brow' + (k === order[0][0] ? ' top' : '');
    row.innerHTML = `<span class="bl">${PATTERNS[k].short}</span><span class="btrack"><span class="bfill"></span></span>`;
    wrap.appendChild(row);
    requestAnimationFrame(() => requestAnimationFrame(() =>
      row.querySelector('.bfill').style.width = Math.round((v / max) * 100) + '%'));
  }
  setTimeout(() => { AudioEngine.glitch(); verdict(); }, 2100);
}

/* ---------------- verdict ---------------- */
function verdict(fromHash) {
  const order = Object.entries(STATE.score).sort((a, b) => b[1] - a[1]);
  STATE.primary = fromHash || +order[0][0];
  const P = PATTERNS[STATE.primary];
  show('verdict');
  if (!fromHash) history.replaceState(null, '', '#p' + STATE.primary);

  $('vSys').textContent = STATE.shared
    ? 'SHARED DOSSIER · SOMEONE ELSE’S VERDICT'
    : 'DIAGNOSIS COMPLETE · SUBJECT: ' + STATE.subject;
  $('sharedNote').style.display = STATE.shared ? 'block' : 'none';
  $('vName').textContent = 'PATTERN 0' + STATE.primary + ' / ' + P.name;
  $('vName').classList.add('glitchy');
  $('vDiag').textContent = '“' + P.diag + '”';
  $('vTell').innerHTML = P.tell; $('vCost').innerHTML = P.cost; $('vRx').innerHTML = P.rx;

  FX.numeral($('numCv'), '0' + STATE.primary, 700);
  setTimeout(() => { $('vStamp').classList.add('go'); AudioEngine.thud(); }, 750);
  document.querySelectorAll('#verdict .cell').forEach((c, i) =>
    setTimeout(() => c.classList.add('go'), 1000 + i * 180));

  /* full profile bars */
  const max = Math.max(1, +order[0][1]);
  const wrap = $('vBars'); wrap.innerHTML = '';
  if (!STATE.shared) {
    for (const [k, v] of order) {
      const row = document.createElement('div');
      row.className = 'brow' + (k == STATE.primary ? ' top' : '');
      row.innerHTML = `<span class="bl">${PATTERNS[k].short}</span><span class="btrack"><span class="bfill"></span></span>`;
      wrap.appendChild(row);
      setTimeout(() => row.querySelector('.bfill').style.width = Math.round((v / max) * 100) + '%', 1300);
    }
    const sec = order[1];
    $('vSec').innerHTML = sec[1] > 0
      ? 'SECONDARY TRACE / <b>PATTERN 0' + sec[0] + ' · ' + PATTERNS[sec[0]].name + '</b> (watch it)'
      : 'No significant secondary trace. One clean enemy. Lucky you.';
  } else {
    $('vSec').textContent = '';
  }
}

/* ---------------- share ---------------- */
$('shareBtn').onclick = () => {
  const P = PATTERNS[STATE.primary];
  const t = `PATTERNS.EXE diagnosed me: PATTERN 0${STATE.primary}, ${P.name}.\n“${P.diag}”\nRun yours → https://patterns-exe.vercel.app/#p${STATE.primary}`;
  if (navigator.share) navigator.share({ text: t }).catch(() => {});
  else { navigator.clipboard.writeText(t); $('shareBtn').textContent = 'COPIED'; setTimeout(() => $('shareBtn').textContent = 'COPY VERDICT', 1400); }
};
$('againBtn').onclick = () => { history.replaceState(null, '', ' '); location.reload(); };

$('cardBtn').onclick = () => {
  const P = PATTERNS[STATE.primary];
  const c = document.createElement('canvas'); c.width = 1080; c.height = 1350;
  const x = c.getContext('2d');
  x.fillStyle = '#07080A'; x.fillRect(0, 0, 1080, 1350);
  x.globalAlpha = .05; x.fillStyle = '#fff';
  for (let y = 0; y < 1350; y += 6) x.fillRect(0, y, 1080, 1.5);
  x.globalAlpha = 1;
  x.strokeStyle = '#1E2026'; x.lineWidth = 2; x.strokeRect(40, 40, 1000, 1270);
  x.font = '500 30px "Kode Mono"'; x.fillStyle = '#54534D';
  x.fillText('PATTERNS.EXE · DIAGNOSTIC RECORD', 80, 130);
  x.fillText('SUBJECT: ' + STATE.subject, 80, 180);
  x.font = '700 560px "Kode Mono"'; x.strokeStyle = '#15161A'; x.lineWidth = 3;
  x.strokeText('0' + STATE.primary, 540, 780);
  x.fillStyle = '#EDEAE2'; x.font = '700 76px "Kode Mono"';
  x.fillText('PATTERN 0' + STATE.primary, 80, 430);
  x.font = '700 60px "Kode Mono"';
  wrapText(x, P.name, 80, 520, 920, 72);
  x.save(); x.translate(80, 660); x.rotate(-.05);
  x.strokeStyle = '#E03131'; x.lineWidth = 5; x.strokeRect(0, 0, 540, 86);
  x.fillStyle = '#E03131'; x.font = '700 34px "Kode Mono"'; x.fillText('C O N F I R M E D', 40, 58); x.restore();
  x.fillStyle = '#EDEAE2'; x.font = 'italic 54px "Instrument Serif"';
  wrapText(x, '“' + P.diag + '”', 80, 860, 900, 72);
  x.fillStyle = '#54534D'; x.font = '500 28px "Kode Mono"';
  x.fillText('run yours → patterns-exe.vercel.app', 80, 1240);
  const a = document.createElement('a');
  a.download = 'patterns-exe-verdict.png'; a.href = c.toDataURL('image/png'); a.click();
};
function wrapText(x, t, lx, ly, maxW, lh) {
  const words = t.split(' '); let line = '';
  for (const w of words) {
    if (x.measureText(line + w).width > maxW) { x.fillText(line, lx, ly); ly += lh; line = w + ' '; }
    else line += w + ' ';
  }
  x.fillText(line.trim(), lx, ly);
}

/* ---------------- keys ---------------- */
document.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    if ($('boot').classList.contains('on') && $('beginBtn').classList.contains('show')) toIntake();
    else if ($('intake').classList.contains('on')) startExam();
  }
  if ($('exam').classList.contains('on')) {
    if (['1', '2', '3', '4'].includes(e.key)) {
      const b = $('opts').querySelector(`.opt[data-i="${+e.key - 1}"]`); b && b.click();
    }
    if (e.key === ' ' && $('qtext')._skip) { e.preventDefault(); $('qtext')._skip(); }
  }
});
$('qtext').addEventListener('click', () => $('qtext')._skip && $('qtext')._skip());
$('nameIn').addEventListener('keydown', e => { if (e.key === 'Enter') { e.stopPropagation(); startExam(); } });

/* ---------------- entry: fresh run or shared deep link ---------------- */
const hashMatch = location.hash.match(/^#p([1-8])$/);
if (hashMatch) {
  STATE.shared = true; STATE.subject = 'SHARED';
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('on'));
  document.fonts.ready.then(() => verdict(+hashMatch[1]));
} else {
  bootSeq();
}
