// Simple high-precision stopwatch

let startTime = 0;         // timestamp when we started (ms, relative)
let elapsedBeforeStart = 0; // ms accumulated during previous runs
let timerId = null;
let running = false;

// DOM elements
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const millisEl = document.getElementById("milliseconds");
const startStopBtn = document.getElementById("startStopBtn");
const clearBtn = document.getElementById("clearBtn");

// Choose best timer base we have
const nowMs = () =>
  typeof performance !== "undefined" && performance.now
    ? performance.now()
    : Date.now();

// Format helpers
function pad2(num) {
  return String(num).padStart(2, "0");
}

function pad3(num) {
  return String(num).padStart(3, "0");
}

function updateDisplay(totalMs) {
  const total = Math.floor(totalMs);

  const hours = Math.floor(total / 3600000);
  const minutes = Math.floor((total % 3600000) / 60000);
  const seconds = Math.floor((total % 60000) / 1000);
  const millis = total % 1000;

  hoursEl.textContent = pad2(hours);
  minutesEl.textContent = pad2(minutes);
  secondsEl.textContent = pad2(seconds);
  millisEl.textContent = pad3(millis);
}

function tick() {
  const current = nowMs();
  const elapsed = elapsedBeforeStart + (current - startTime);
  updateDisplay(elapsed);
}

function start() {
  if (running) return;

  running = true;
  startTime = nowMs();
  startStopBtn.textContent = "Stop";
  startStopBtn.classList.add("running");

  timerId = setInterval(tick, 10); // update every 10 ms
}

function stop() {
  if (!running) return;

  running = false;
  clearInterval(timerId);
  timerId = null;

  // add the elapsed time in this segment to the accumulator
  const current = nowMs();
  elapsedBeforeStart += current - startTime;

  startStopBtn.textContent = "Start";
  startStopBtn.classList.remove("running");
}

function clearTimer() {
  // Always stop first
  if (running) {
    stop();
  }
  elapsedBeforeStart = 0;
  updateDisplay(0);
}

// Button wiring
startStopBtn.addEventListener("click", () => {
  if (running) {
    stop();
  } else {
    start();
  }
});

clearBtn.addEventListener("click", clearTimer);

// Initialize display on load
updateDisplay(0);
