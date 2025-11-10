// Stopwatch Class
class Stopwatch {
  constructor() {
    // DOM Elements
    this.minutesDisplay = document.getElementById("minutes");
    this.secondsDisplay = document.getElementById("seconds");
    this.millisecondsDisplay = document.getElementById("milliseconds");
    this.startBtn = document.getElementById("startBtn");
    this.stopBtn = document.getElementById("stopBtn");
    this.lapBtn = document.getElementById("lapBtn");
    this.resetBtn = document.getElementById("resetBtn");
    this.clearLapsBtn = document.getElementById("clearLapsBtn");
    this.lapSection = document.getElementById("lapSection");
    this.lapTimesContainer = document.getElementById("lapTimes");

    // Stopwatch State
    this.isRunning = false;
    this.startTime = 0;
    this.elapsedTime = 0;
    this.animationId = null;
    this.lapCounter = 1;
    this.laps = [];
    this.lastLapTime = 0;

    // Bind event listeners
    this.initEventListeners();
  }

  initEventListeners() {
    this.startBtn.addEventListener("click", () => this.start());
    this.stopBtn.addEventListener("click", () => this.stop());
    this.resetBtn.addEventListener("click", () => this.reset());
    this.lapBtn.addEventListener("click", () => this.recordLap());
    this.clearLapsBtn.addEventListener("click", () => this.clearLaps());
  }

  start() {
    if (this.isRunning) return;

    this.isRunning = true;
    this.startTime = Date.now() - this.elapsedTime;
    this.updateTime();

    // Update button states
    this.startBtn.disabled = true;
    this.stopBtn.disabled = false;
    this.lapBtn.disabled = false;
  }

  stop() {
    if (!this.isRunning) return;

    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }

    // Update button states
    this.startBtn.disabled = false;
    this.stopBtn.disabled = true;
    this.lapBtn.disabled = true;
  }

  reset() {
    this.stop();
    this.elapsedTime = 0;
    this.lapCounter = 1;
    this.laps = [];
    this.lastLapTime = 0;
    this.updateDisplay(0);

    // Clear and hide lap section
    this.lapTimesContainer.innerHTML = '<div class="no-laps">No laps recorded yet</div>';
    this.lapSection.style.display = "none";

    // Reset button states
    this.startBtn.disabled = false;
    this.stopBtn.disabled = true;
    this.lapBtn.disabled = true;
  }

  updateTime() {
    if (!this.isRunning) return;

    this.elapsedTime = Date.now() - this.startTime;
    this.updateDisplay(this.elapsedTime);

    // Use requestAnimationFrame for smooth updates
    this.animationId = requestAnimationFrame(() => this.updateTime());
  }

  updateDisplay(timeInMs) {
    // Calculate minutes, seconds, and milliseconds
    const totalSeconds = Math.floor(timeInMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor(timeInMs % 1000);

    // Update display with padded values
    this.minutesDisplay.textContent = this.padZero(minutes, 2);
    this.secondsDisplay.textContent = this.padZero(seconds, 2);
    this.millisecondsDisplay.textContent = this.padZero(milliseconds, 3);
  }

  recordLap() {
    if (!this.isRunning) return;

    const currentTime = this.elapsedTime;
    const splitTime = currentTime - this.lastLapTime;

    // Store lap data
    const lapData = {
      number: this.lapCounter,
      time: currentTime,
      split: splitTime,
    };

    this.laps.unshift(lapData); // Add to beginning of array
    this.lastLapTime = currentTime;
    this.lapCounter++;

    // Show lap section if hidden
    if (this.lapSection.style.display === "none") {
      this.lapSection.style.display = "block";
    }

    // Render all laps
    this.renderLaps();
  }

  renderLaps() {
    // Clear container
    this.lapTimesContainer.innerHTML = "";

    if (this.laps.length === 0) {
      this.lapTimesContainer.innerHTML = '<div class="no-laps">No laps recorded yet</div>';
      return;
    }

    // Find fastest and slowest laps (by split time)
    let fastestLap = null;
    let slowestLap = null;

    if (this.laps.length > 1) {
      const lapsSortedBySplit = [...this.laps].sort((a, b) => a.split - b.split);
      fastestLap = lapsSortedBySplit[0];
      slowestLap = lapsSortedBySplit[lapsSortedBySplit.length - 1];
    }

    // Render each lap
    this.laps.forEach((lap) => {
      const lapItem = document.createElement("div");
      lapItem.className = "lap-item";

      // Add fastest/slowest class
      if (this.laps.length > 1) {
        if (lap === fastestLap) {
          lapItem.classList.add("fastest");
        } else if (lap === slowestLap) {
          lapItem.classList.add("slowest");
        }
      }

      lapItem.innerHTML = `
                <span class="lap-number">Lap ${lap.number}</span>
                <span>
                    <span class="lap-time">${this.formatTime(lap.time)}</span>
                    <span class="lap-split">(+${this.formatTime(lap.split)})</span>
                </span>
            `;

      this.lapTimesContainer.appendChild(lapItem);
    });
  }

  clearLaps() {
    this.laps = [];
    this.lapCounter = 1;
    this.lastLapTime = this.elapsedTime;
    this.lapTimesContainer.innerHTML = '<div class="no-laps">No laps recorded yet</div>';

    // Optionally hide the lap section when cleared
    // this.lapSection.style.display = 'none';
  }

  formatTime(timeInMs) {
    const totalSeconds = Math.floor(timeInMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor(timeInMs % 1000);

    return `${this.padZero(minutes, 2)}:${this.padZero(seconds, 2)}.${this.padZero(milliseconds, 3)}`;
  }

  padZero(num, length) {
    return num.toString().padStart(length, "0");
  }
}

// Initialize the stopwatch when the page loads
document.addEventListener("DOMContentLoaded", () => {
  new Stopwatch();
});
