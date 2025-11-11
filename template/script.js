
// ----- Stopwatch -----
let stopwatchInterval;
let stopwatchRunning = false;
let stopwatchStartTime = 0;
let elapsedTime = 0;

const stopwatchDisplay = document.getElementById("stopwatchDisplay");
const startStopwatchBtn = document.getElementById("startStopwatch");
const resetStopwatchBtn = document.getElementById("resetStopwatch");

startStopwatchBtn.addEventListener("click", () => {
  if (!stopwatchRunning) {
    stopwatchRunning = true;
    stopwatchStartTime = Date.now() - elapsedTime;
    startStopwatchBtn.textContent = "Pause";
    stopwatchInterval = setInterval(updateStopwatch, 10);
  } else {
    stopwatchRunning = false;
    clearInterval(stopwatchInterval);
    startStopwatchBtn.textContent = "Start";
  }
});

resetStopwatchBtn.addEventListener("click", () => {
  clearInterval(stopwatchInterval);
  stopwatchRunning = false;
  elapsedTime = 0;
  stopwatchDisplay.textContent = "00:00:00:000";
  startStopwatchBtn.textContent = "Start";
});

function updateStopwatch() {
  elapsedTime = Date.now() - stopwatchStartTime;
  const ms = elapsedTime % 1000;
  const totalSeconds = Math.floor(elapsedTime / 1000);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600);

  stopwatchDisplay.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(ms, 3)}`;
}

// ----- Countdown -----
let countdownInterval;
let countdownRunning = false;
let remainingTime = 0;

const countdownDisplay = document.getElementById("countdownDisplay");
const startCountdownBtn = document.getElementById("startCountdown");
const resetCountdownBtn = document.getElementById("resetCountdown");
const beep = document.getElementById("beep");

startCountdownBtn.addEventListener("click", () => {
  if (!countdownRunning) {
    const h = parseInt(document.getElementById("hours").value || 0);
    const m = parseInt(document.getElementById("minutes").value || 0);
    const s = parseInt(document.getElementById("seconds").value || 0);

    if (remainingTime === 0) {
      remainingTime = (h * 3600 + m * 60 + s) * 1000;
    }

    if (remainingTime <= 0) return;

    countdownRunning = true;
    startCountdownBtn.textContent = "Pause";

    countdownInterval = setInterval(() => {
      remainingTime -= 1000;
      if (remainingTime <= 0) {
        clearInterval(countdownInterval);
        countdownDisplay.textContent = "00:00:00";
        startCountdownBtn.textContent = "Start";
        countdownRunning = false;
        remainingTime = 0;
        beep.play();
        alert("Time’s up!");
      } else {
        const totalSeconds = Math.floor(remainingTime / 1000);
        const seconds = totalSeconds % 60;
        const minutes = Math.floor(totalSeconds / 60) % 60;
        const hours = Math.floor(totalSeconds / 3600);
        countdownDisplay.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
      }
    }, 1000);
  } else {
    countdownRunning = false;
    clearInterval(countdownInterval);
    startCountdownBtn.textContent = "Start";
  }
});

resetCountdownBtn.addEventListener("click", () => {
  clearInterval(countdownInterval);
  countdownRunning = false;
  remainingTime = 0;
  countdownDisplay.textContent = "00:00:00";
  startCountdownBtn.textContent = "Start";
});

// ----- Tab Switching -----
const showStopwatchBtn = document.getElementById("showStopwatch");
const showCountdownBtn = document.getElementById("showCountdown");
const stopwatchSection = document.getElementById("stopwatch");
const countdownSection = document.getElementById("countdown");

showStopwatchBtn.addEventListener("click", () => {
  stopwatchSection.classList.remove("hidden");
  countdownSection.classList.add("hidden");
  showStopwatchBtn.classList.add("active");
  showCountdownBtn.classList.remove("active");
});

showCountdownBtn.addEventListener("click", () => {
  countdownSection.classList.remove("hidden");
  stopwatchSection.classList.add("hidden");
  showCountdownBtn.classList.add("active");
  showStopwatchBtn.classList.remove("active");
});

// ----- Utility -----
function pad(num, size = 2) {
  return num.toString().padStart(size, "0");
}
