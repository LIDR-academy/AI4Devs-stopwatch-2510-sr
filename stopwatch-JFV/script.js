// Digit elements
const h1 = document.getElementById('h1');
const h2 = document.getElementById('h2');
const m1 = document.getElementById('m1');
const m2 = document.getElementById('m2');
const s1 = document.getElementById('s1');
const s2 = document.getElementById('s2');
const msEl = document.getElementById('milliseconds');
const startStopBtn = document.getElementById('startStop');
const clearBtn = document.getElementById('clear');

let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let running = false;

// Split a two-digit number into individual characters
function setTwoDigits(value, d1, d2) {
  const str = String(value).padStart(2, '0');
  d1.textContent = str[0];
  d2.textContent = str[1];
}

// Update all digits
function updateDisplay() {
  const now = Date.now();
  const diff = elapsedTime + (running ? now - startTime : 0);

  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  const milliseconds = diff % 1000;

  setTwoDigits(hours, h1, h2);
  setTwoDigits(minutes, m1, m2);
  setTwoDigits(seconds, s1, s2);
  msEl.textContent = String(milliseconds).padStart(3, '0');
}

// Start/Stop toggle
startStopBtn.addEventListener('click', () => {
  if (!running) {
    startTime = Date.now();
    timerInterval = setInterval(updateDisplay, 10);
    running = true;
    startStopBtn.textContent = 'Stop';
  } else {
    elapsedTime += Date.now() - startTime;
    clearInterval(timerInterval);
    running = false;
    startStopBtn.textContent = 'Start';
  }
});

// Clear reset
clearBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  running = false;
  elapsedTime = 0;
  setTwoDigits(0, h1, h2);
  setTwoDigits(0, m1, m2);
  setTwoDigits(0, s1, s2);
  msEl.textContent = '000';
  startStopBtn.textContent = 'Start';
});
