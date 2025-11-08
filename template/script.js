// ======= MANEJO DE VISTAS ======= //
const homeScreen = document.getElementById("home-screen");
const stopwatchScreen = document.getElementById("stopwatch-screen");
const countdownScreen = document.getElementById("countdown-screen");

document.getElementById("open-stopwatch").onclick = () => showScreen(stopwatchScreen);
document.getElementById("open-countdown").onclick = () => showScreen(countdownScreen);

document.getElementById("btn-back-sw").onclick = () => showScreen(homeScreen);
document.getElementById("btn-back-cd").onclick = () => showScreen(homeScreen);

function showScreen(screen) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  screen.classList.add("active");
}

// ======= CRONÓMETRO ======= //
let swStartTime = 0;
let swElapsed = 0;
let swInterval = null;
let swRunning = false;

const swTimeDisplay = document.getElementById("sw-time");
const swMsDisplay = document.getElementById("sw-ms");
const btnStartSw = document.getElementById("btn-start-sw");

btnStartSw.addEventListener("click", () => {
  if (!swRunning) {
    startStopwatch();
  } else {
    pauseStopwatch();
  }
});

document.getElementById("btn-clear-sw").addEventListener("click", clearStopwatch);

function startStopwatch() {
  swStartTime = Date.now() - swElapsed;
  swInterval = setInterval(updateStopwatch, 10);
  swRunning = true;
  btnStartSw.textContent = "Pause";
}

function pauseStopwatch() {
  clearInterval(swInterval);
  swRunning = false;
  btnStartSw.textContent = "Continue";
}

function clearStopwatch() {
  clearInterval(swInterval);
  swElapsed = 0;
  swRunning = false;
  updateStopwatchDisplay(0);
  btnStartSw.textContent = "Start";
}

function updateStopwatch() {
  swElapsed = Date.now() - swStartTime;
  updateStopwatchDisplay(swElapsed);
}

function updateStopwatchDisplay(ms) {
  let totalSeconds = Math.floor(ms / 1000);
  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds % 3600) / 60);
  let seconds = totalSeconds % 60;
  let milliseconds = ms % 1000;

  swTimeDisplay.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  swMsDisplay.textContent = padMs(milliseconds);
}

// ======= CUENTA ATRÁS ======= //
let countdownTime = 0;
let countdownInterval = null;
let cdRunning = false;

const cdTimeDisplay = document.getElementById("cd-time");
const cdMsDisplay = document.getElementById("cd-ms");
const numpad = document.getElementById("numpad");

numpad.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", () => addCountdownDigit(btn.textContent));
});

document.getElementById("btn-clear-cd").addEventListener("click", clearCountdown);
document.getElementById("btn-set-cd").addEventListener("click", startCountdown);

function addCountdownDigit(digit) {
  let current = countdownTime.toString().padStart(6, "0");
  current = current.substring(1) + digit; // shift digits left
  countdownTime = parseInt(current);
  updateCountdownDisplay();
}

function updateCountdownDisplay() {
  let minutes = Math.floor(countdownTime / 100);
  let seconds = countdownTime % 100;
  cdTimeDisplay.textContent = `00:${pad(minutes)}:${pad(seconds)}`;
}

function clearCountdown() {
  clearInterval(countdownInterval);
  countdownTime = 0;
  cdRunning = false;
  cdTimeDisplay.textContent = "00:00:00";
  cdMsDisplay.textContent = "000";
}

function startCountdown() {
  if (cdRunning || countdownTime <= 0) return;
  cdRunning = true;

  let totalMs = convertCountdownToMs();
  let start = Date.now();
  let end = start + totalMs;

  countdownInterval = setInterval(() => {
    let remaining = end - Date.now();
    if (remaining <= 0) {
      clearInterval(countdownInterval);
      cdTimeDisplay.textContent = "00:00:00";
      cdMsDisplay.textContent = "000";
      cdRunning = false;
      alert("Time’s up!");
    } else {
      updateCountdownFromMs(remaining);
    }
  }, 10);
}

function convertCountdownToMs() {
  let minutes = Math.floor(countdownTime / 100);
  let seconds = countdownTime % 100;
  return (minutes * 60 + seconds) * 1000;
}

function updateCountdownFromMs(ms) {
  let totalSeconds = Math.floor(ms / 1000);
  let minutes = Math.floor((totalSeconds % 3600) / 60);
  let seconds = totalSeconds % 60;
  let milliseconds = ms % 1000;
  cdTimeDisplay.textContent = `00:${pad(minutes)}:${pad(seconds)}`;
  cdMsDisplay.textContent = padMs(milliseconds);
}

// ======= UTILIDADES ======= //
function pad(num) {
  return num.toString().padStart(2, "0");
}

function padMs(num) {
  return num.toString().padStart(3, "0");
}
