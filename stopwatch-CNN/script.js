// Referencias al DOM
const btnStart = document.getElementById('btn-start');
const btnClear = document.getElementById('btn-clear');
const timeMain = document.getElementById('time-main');
const timeMs = document.getElementById('time-ms');

// Variables de control
let isRunning = false;
let startTime = 0;
let elapsedBefore = 0;
let rafId = null;
let lastElapsed = 0;

// Formatea el tiempo total en ms a dd:hh:mm:ss y ms
function renderTime(totalMs) {
  // asegurarnos de trabajar con enteros
  totalMs = Math.floor(totalMs);

  const ms = totalMs % 1000;
  const totalSeconds = Math.floor(totalMs / 1000);

  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);

  const minutes = totalMinutes % 60;
  const totalHours = Math.floor(totalMinutes / 60);

  const hours = totalHours % 24;
  const days = Math.floor(totalHours / 24);

  const dStr = String(days).padStart(2, '0');
  const hStr = String(hours).padStart(2, '0');
  const mStr = String(minutes).padStart(2, '0');
  const sStr = String(seconds).padStart(2, '0');
  const msStr = String(ms).padStart(3, '0'); // ← siempre 3 dígitos

  timeMain.textContent = `${dStr}:${hStr}:${mStr}:${sStr}`;
  timeMs.textContent = msStr;
}

// Bucle de actualización mientras corre
function update(timestamp) {
  if (!isRunning) return;

  const elapsedNow = timestamp - startTime;
  const total = elapsedBefore + elapsedNow;
  lastElapsed = total;

  renderTime(total);

  rafId = requestAnimationFrame(update);
}

btnStart.addEventListener('click', () => {
  if (!isRunning) {
    isRunning = true;
    btnStart.textContent = 'Pausa';
    btnStart.classList.add('running');
    btnStart.classList.remove('paused');

    startTime = performance.now();
    rafId = requestAnimationFrame(update);
  } else {
    isRunning = false;
    cancelAnimationFrame(rafId);
    elapsedBefore = lastElapsed;

    btnStart.textContent = 'Continuar';
    btnStart.classList.remove('running');
    btnStart.classList.add('paused');
  }
});

btnClear.addEventListener('click', () => {
  isRunning = false;
  cancelAnimationFrame(rafId);

  startTime = 0;
  elapsedBefore = 0;
  lastElapsed = 0;

  renderTime(0);

  btnStart.textContent = 'Iniciar';
  btnStart.classList.remove('running', 'paused');
});

// mostrar 00... al inicio
renderTime(0);
