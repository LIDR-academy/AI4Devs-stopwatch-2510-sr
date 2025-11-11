/* script.js
   Toda la lógica del cronómetro y la cuenta regresiva está aquí.
   No usa librerías externas. Está comentado para que puedas seguir la lógica.
*/

// --------- Helpers y selectores ----------
const $ = (sel) => document.querySelector(sel);

const modeBtns = Array.from(document.querySelectorAll('.mode-btn'));
const display = $('#display');
const minutesEl = $('#minutes');
const secondsEl = $('#seconds');
const msEl = $('#milliseconds');

const inputMinutes = $('#inputMinutes');
const inputSeconds = $('#inputSeconds');
const setCountdownBtn = $('#setCountdown');

const startBtn = $('#startBtn');
const pauseBtn = $('#pauseBtn');
const resumeBtn = $('#resumeBtn');
const resetBtn = $('#resetBtn');

const countdownControls = $('#countdownControls');

let mode = 'stopwatch'; // 'stopwatch' o 'countdown'

// Audio: generador de tono usando WebAudio (no dependemos de ficheros)
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function beep(duration = 350, freq = 880, vol = 0.12) {
  // crea un breve beep agradable
  const o = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  o.type = 'sine';
  o.frequency.value = freq;
  g.gain.value = vol;
  o.connect(g);
  g.connect(audioCtx.destination);
  o.start();
  g.gain.setTargetAtTime(0.0001, audioCtx.currentTime + duration/1000 - 0.02, 0.01);
  setTimeout(() => o.stop(), duration);
}

// Animate helper: agrega clase y la quita después
function popNode(node) {
  node.classList.remove('pop');
  // for restart
  void node.offsetWidth;
  node.classList.add('pop');
  setTimeout(()=> node.classList.remove('pop'), 500);
}

// Format numbers
function pad(n, digits = 2) {
  return String(n).padStart(digits, '0');
}

// --------- Estado del cronómetro ----------
let swStartTime = 0;
let swElapsed = 0; // en ms acumulado cuando pausado
let swRunning = false;
let swRAF = null;

// --------- Estado del countdown ----------
let cdTotal = 0; // ms totales establecidos
let cdRemaining = 0; // ms restantes
let cdRunning = false;
let cdRAF = null;

// --------- UI & modo ----------
function setMode(newMode) {
  mode = newMode;
  modeBtns.forEach(b => {
    b.classList.toggle('active', b.dataset.mode === newMode);
    b.setAttribute('aria-selected', b.dataset.mode === newMode ? 'true' : 'false');
  });

  // Mostrar/ocultar controles de countdown (inputs)
  const showCountdownInputs = newMode === 'countdown';
  countdownControls.setAttribute('aria-hidden', String(!showCountdownInputs));
  countdownControls.style.display = showCountdownInputs ? 'flex' : 'none';

  resetAll();
  // animación suave
  $('#timeDisplay').classList.add('fadeIn');
  setTimeout(()=> $('#timeDisplay').classList.remove('fadeIn'), 400);
}

// --------- Renderizado en pantalla ----------
function renderTimeFromMS(ms, showMs = true) {
  // ms >= 0
  ms = Math.max(0, Math.floor(ms));
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = ms % 1000;

  minutesEl.textContent = pad(minutes, 2);
  secondsEl.textContent = pad(seconds, 2);
  msEl.textContent = pad(milliseconds, 3);

  // efecto pop cuando cambia (ligero)
  popNode(minutesEl.parentElement);
  popNode(secondsEl.parentElement);
  popNode(msEl.parentElement);
}

// --------- Cronómetro (Stopwatch) lógica ----------
function swStart() {
  if (swRunning) return;
  swStartTime = performance.now();
  swRunning = true;
  startBtn.disabled = true;
  pauseBtn.disabled = false;
  resumeBtn.style.display = 'none';
  startBtn.textContent = 'En marcha';
  // cancel any countdown running
  cancelCountdown();

  function tick(now) {
    const delta = now - swStartTime;
    const total = swElapsed + delta;
    renderTimeFromMS(total);
    swRAF = requestAnimationFrame(tick);
  }
  swRAF = requestAnimationFrame(tick);
}

function swPause() {
  if (!swRunning) return;
  swRunning = false;
  cancelAnimationFrame(swRAF);
  const now = performance.now();
  swElapsed += now - swStartTime;
  swStartTime = 0;
  pauseBtn.disabled = true;
  resumeBtn.style.display = '';
  startBtn.disabled = true;
  startBtn.textContent = 'Iniciar';
}

function swResume() {
  if (swRunning) return;
  swStartTime = performance.now();
  swRunning = true;
  resumeBtn.style.display = 'none';
  pauseBtn.disabled = false;
  startBtn.disabled = true;
  swRAF = requestAnimationFrame(function tick(now){
    const delta = now - swStartTime;
    const total = swElapsed + delta;
    renderTimeFromMS(total);
    swRAF = requestAnimationFrame(tick);
  });
}

function swReset() {
  swRunning = false;
  cancelAnimationFrame(swRAF);
  swStartTime = 0;
  swElapsed = 0;
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  resumeBtn.style.display = 'none';
  startBtn.textContent = 'Iniciar';
  renderTimeFromMS(0);
}

// --------- Cuenta regresiva lógica ----------
function setCountdownFromInputs() {
  const m = parseInt(inputMinutes.value || '0', 10);
  const s = parseInt(inputSeconds.value || '0', 10);
  // sanitizar
  const minutes = Number.isFinite(m) && m >= 0 ? m : 0;
  const seconds = Number.isFinite(s) && s >= 0 ? Math.min(59, s) : 0;
  cdTotal = (minutes * 60 + seconds) * 1000;
  cdRemaining = cdTotal;
  renderTimeFromMS(cdRemaining);
  // visual feedback
  popNode($('#countdownControls'));
}

function startCountdown() {
  if (cdRunning) return;
  // si no se estableció, intenta leer inputs
  if (!cdTotal || cdTotal <= 0) {
    setCountdownFromInputs();
    if (!cdTotal) {
      // no hay tiempo configurado
      alert('Ingresa minutos o segundos válidos antes de iniciar la cuenta regresiva.');
      return;
    }
  }
  cdRunning = true;
  startBtn.disabled = true;
  pauseBtn.disabled = false;
  resumeBtn.style.display = 'none';
  // cancelar cronómetro si estaba
  cancelStopwatch();

  const startTime = performance.now();
  let lastNow = startTime;

  function tick(now) {
    const elapsedSinceFrame = now - lastNow;
    lastNow = now;
    cdRemaining -= elapsedSinceFrame;
    if (cdRemaining <= 0) {
      cdRemaining = 0;
      renderTimeFromMS(0);
      // fin!
      cdRunning = false;
      startBtn.disabled = false;
      pauseBtn.disabled = true;
      resumeBtn.style.display = 'none';
      // alerta sonora y visual
      beep(700, 620, 0.16);
      flashDisplay();
      // stop RAF
      cancelAnimationFrame(cdRAF);
      return;
    }
    renderTimeFromMS(Math.max(0, Math.floor(cdRemaining)));
    cdRAF = requestAnimationFrame(tick);
  }
  cdRAF = requestAnimationFrame(tick);
}

function pauseCountdown() {
  if (!cdRunning) return;
  cdRunning = false;
  cancelAnimationFrame(cdRAF);
  pauseBtn.disabled = true;
  resumeBtn.style.display = '';
  startBtn.disabled = true;
}

function resumeCountdown() {
  if (cdRunning || cdRemaining <= 0) return;
  cdRunning = true;
  resumeBtn.style.display = 'none';
  pauseBtn.disabled = false;
  startBtn.disabled = true;

  let lastNow = performance.now();
  function tick(now) {
    const elapsedSinceFrame = now - lastNow;
    lastNow = now;
    cdRemaining -= elapsedSinceFrame;
    if (cdRemaining <= 0) {
      cdRemaining = 0;
      renderTimeFromMS(0);
      cdRunning = false;
      startBtn.disabled = false;
      pauseBtn.disabled = true;
      resumeBtn.style.display = 'none';
      beep(700, 620, 0.16);
      flashDisplay();
      cancelAnimationFrame(cdRAF);
      return;
    }
    renderTimeFromMS(Math.max(0, Math.floor(cdRemaining)));
    cdRAF = requestAnimationFrame(tick);
  }
  cdRAF = requestAnimationFrame(tick);
}

function resetCountdown() {
  cdRunning = false;
  cancelAnimationFrame(cdRAF);
  cdRemaining = cdTotal;
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  resumeBtn.style.display = 'none';
  renderTimeFromMS(cdRemaining || 0);
}

// --------- Cancel helpers ----------
function cancelStopwatch() {
  if (swRunning) {
    swRunning = false;
    cancelAnimationFrame(swRAF);
    swStartTime = 0;
    swElapsed = 0;
  }
  swRAF = null;
}
function cancelCountdown() {
  if (cdRunning) {
    cdRunning = false;
    cancelAnimationFrame(cdRAF);
  }
  cdRAF = null;
}

function resetAll() {
  // detiene todo y pone todo a valores iniciales
  cancelAnimationFrame(swRAF);
  cancelAnimationFrame(cdRAF);
  swStartTime = 0;
  swElapsed = 0;
  swRunning = false;
  cdTotal = 0;
  cdRemaining = 0;
  cdRunning = false;
  swRAF = cdRAF = null;
  inputMinutes.value = '';
  inputSeconds.value = '';
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  resumeBtn.style.display = 'none';
  startBtn.textContent = 'Iniciar';
  renderTimeFromMS(0);
}

// small flash visual when countdown ends
function flashDisplay() {
  display.style.transition = 'box-shadow .2s ease, transform .2s ease';
  display.style.boxShadow = '0 0 0 6px rgba(255,160,120,0.16)';
  display.style.transform = 'scale(1.02)';
  setTimeout(()=> {
    display.style.boxShadow = '';
    display.style.transform = '';
  }, 700);
}

// --------- Event wiring ----------
modeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    setMode(btn.dataset.mode);
  });
});

// Set countdown button
setCountdownBtn.addEventListener('click', () => {
  setCountdownFromInputs();
});

// Buttons start/pause/resume/reset handle both modes intelligently
startBtn.addEventListener('click', () => {
  // focus audio context for mobile autostart (resume if suspended)
  if (audioCtx.state === 'suspended') audioCtx.resume();

  if (mode === 'stopwatch') {
    if (!swRunning) swStart();
  } else {
    startCountdown();
  }
});

pauseBtn.addEventListener('click', () => {
  if (mode === 'stopwatch') {
    swPause();
  } else {
    pauseCountdown();
  }
});

resumeBtn.addEventListener('click', () => {
  if (mode === 'stopwatch') {
    swResume();
  } else {
    resumeCountdown();
  }
});

resetBtn.addEventListener('click', () => {
  // reset depends on mode
  if (mode === 'stopwatch') {
    swReset();
  } else {
    // if countdown total not set, clear display
    if (!cdTotal) {
      resetAll();
    } else {
      resetCountdown();
    }
  }
});

// Keyboard accessibility: space to start/pause
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    if (pauseBtn.disabled) {
      startBtn.click();
    } else {
      pauseBtn.click();
    }
  }
});

// Inicializar UI
setMode('stopwatch'); // setea modo por defecto y render inicial

