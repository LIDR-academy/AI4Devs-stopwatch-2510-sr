/* Timer + Countdown (accurate to ms using performance.now)
   Author: 20-year dev — structured, comments, no setInterval drift
*/

(function () {
  "use strict";

  // ---------- Utilities ----------
  const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

  function pad2(n) {
    return String(n).padStart(2, "0");
  }
  function pad3(n) {
    return String(n).padStart(3, "0");
  }

  function splitTime(ms) {
    ms = Math.max(0, Math.floor(ms));
    const hours = Math.floor(ms / 3_600_000);
    const minutes = Math.floor((ms % 3_600_000) / 60_000);
    const seconds = Math.floor((ms % 60_000) / 1_000);
    const millis = ms % 1000;
    return { hours, minutes, seconds, millis };
  }

  // ---------- Timer Engine ----------
  class TimerEngine {
    constructor({ mode = "countdown", initialCountdown = 8 * 60 * 1000 } = {}) {
      this.mode = mode; // "stopwatch" | "countdown"
      this.running = false;
      this._raf = null;

      this._baseMs = mode === "countdown" ? initialCountdown : 0; // starting value shown
      this._elapsedMs = 0; // accumulates elapsed while running
      this._lastTs = 0; // last performance.now()
      this._onTick = () => {};
      this._onDone = () => {};
    }

    onTick(cb) {
      this._onTick = cb;
    }
    onFinish(cb) {
      this._onDone = cb;
    }

    get displayMs() {
      // Value to display based on mode
      if (this.mode === "stopwatch") {
        return this._baseMs + this._elapsedMs;
      } else {
        return Math.max(0, this._baseMs - this._elapsedMs);
      }
    }

    setMode(newMode) {
      if (newMode === this.mode) return;
      this.pause();
      if (newMode === "stopwatch") {
        this._baseMs = 0;
      }
      this.mode = newMode;
      this._elapsedMs = 0;
      this._tick(); // update immediately
    }

    setCountdown(h, m, s) {
      const hours = clamp(parseInt(h || 0, 10) || 0, 0, 99);
      const mins = clamp(parseInt(m || 0, 10) || 0, 0, 59);
      const secs = clamp(parseInt(s || 0, 10) || 0, 0, 59);
      this.pause();
      this.mode = "countdown";
      this._baseMs = (hours * 3600 + mins * 60 + secs) * 1000;
      this._elapsedMs = 0;
      this._tick();
    }

    start() {
      if (this.running) return;
      this.running = true;
      this._lastTs = performance.now();
      const step = () => {
        if (!this.running) return;
        const now = performance.now();
        this._elapsedMs += now - this._lastTs;
        this._lastTs = now;

        // Stop at zero for countdown
        if (this.mode === "countdown" && this.displayMs <= 0) {
          this._elapsedMs = this._baseMs; // clamp
          this._tick();
          this.pause();
          this._onDone();
          return;
        }

        this._tick();
        this._raf = requestAnimationFrame(step);
      };
      this._raf = requestAnimationFrame(step);
    }

    pause() {
      if (!this.running) return;
      this.running = false;
      if (this._raf) cancelAnimationFrame(this._raf);
      this._raf = null;
    }

    reset(toMs = null) {
      // Preserve mode; reset elapsed; optionally set a new base value.
      this.pause();
      if (toMs !== null) this._baseMs = Math.max(0, toMs | 0);
      this._elapsedMs = 0;
      this._tick();
    }

    _tick() {
      this._onTick(this.displayMs);
    }
  }

  // ---------- DOM ----------
  document.addEventListener("DOMContentLoaded", () => {
    const root = document.createElement("div");
    root.className = "timer-app";

    // Top strip: mode switch + countdown setter
    const strip = document.createElement("div");
    strip.className = "control-strip";

    const seg = document.createElement("div");
    seg.className = "segmented";
    const btnSW = document.createElement("button");
    btnSW.type = "button";
    btnSW.textContent = "Stopwatch";
    const btnCD = document.createElement("button");
    btnCD.type = "button";
    btnCD.textContent = "Countdown";
    seg.append(btnSW, btnCD);

    const setter = document.createElement("div");
    setter.className = "setter";
    setter.innerHTML = `
      <label for="hh">Set:</label>
      <input id="hh" type="number" min="0" max="99" value="0" aria-label="Hours"> :
      <input id="mm" type="number" min="0" max="59" value="8" aria-label="Minutes"> :
      <input id="ss" type="number" min="0" max="59" value="0" aria-label="Seconds">
      <button class="apply" type="button" aria-label="Apply countdown">Apply</button>
    `;

    strip.append(seg, setter);

    // Display
    const display = document.createElement("div");
    display.className = "display";
    const timeEl = document.createElement("div");
    timeEl.className = "time";
    timeEl.textContent = "00:00:00";
    const msEl = document.createElement("div");
    msEl.className = "millis";
    msEl.textContent = "000";
    display.append(timeEl, msEl);

    // Buttons
    const actions = document.createElement("div");
    actions.className = "actions";

    const startBtn = document.createElement("button");
    startBtn.className = "btn btn-start";
    startBtn.type = "button";
    startBtn.textContent = "Start";

    const clearBtn = document.createElement("button");
    clearBtn.className = "btn btn-clear";
    clearBtn.type = "button";
    clearBtn.textContent = "Clear";

    actions.append(startBtn, clearBtn);

    // Keyboard hint
    const hint = document.createElement("div");
    hint.className = "kbd-hint";
    hint.textContent = "Tip: Press Space to start/pause, C to clear.";

    // Mount
    const heading = document.querySelector("h1");
    heading.after(root);
    root.append(strip, display, actions, hint);

    // Engine (default to 8 minutes countdown like screenshot)
    const engine = new TimerEngine({
      mode: "countdown",
      initialCountdown: 8 * 60 * 1000,
    });

    // View update
    function render(ms) {
      const { hours, minutes, seconds, millis } = splitTime(ms);
      timeEl.textContent = `${pad2(hours)}:${pad2(minutes)}:${pad2(seconds)}`;
      msEl.textContent = pad3(millis);
    }
    engine.onTick(render);
    engine.onFinish(() => {
      // Flash the display briefly to indicate finish
      display.animate(
        [{ filter: "none" }, { filter: "brightness(1.4)" }, { filter: "none" }],
        { duration: 600, iterations: 1 }
      );
    });
    render(engine.displayMs); // initial

    // UI state helpers
    function setModeUI(mode) {
      if (mode === "stopwatch") {
        btnSW.classList.add("active");
        btnCD.classList.remove("active");
        setter.setAttribute("aria-hidden", "true");
      } else {
        btnCD.classList.add("active");
        btnSW.classList.remove("active");
        setter.removeAttribute("aria-hidden");
      }
    }
    setModeUI(engine.mode);

    function updateStartLabel() {
      startBtn.textContent = engine.running
        ? "Pause"
        : engine.displayMs === 0 && engine.mode === "stopwatch"
        ? "Start"
        : "Start";
      if (
        !engine.running &&
        engine.displayMs > 0 &&
        engine.mode === "stopwatch"
      ) {
        startBtn.textContent = "Resume";
      }
      if (
        !engine.running &&
        engine.mode === "countdown" &&
        engine.displayMs !== engine._baseMs
      ) {
        startBtn.textContent = "Resume";
      }
    }
    updateStartLabel();

    // Events
    btnSW.addEventListener("click", () => {
      engine.setMode("stopwatch");
      setModeUI("stopwatch");
      updateStartLabel();
    });

    btnCD.addEventListener("click", () => {
      engine.setMode("countdown");
      setModeUI("countdown");
      updateStartLabel();
    });

    setter.querySelector(".apply").addEventListener("click", () => {
      const h = setter.querySelector("#hh").value;
      const m = setter.querySelector("#mm").value;
      const s = setter.querySelector("#ss").value;
      engine.setCountdown(h, m, s);
      updateStartLabel();
    });

    startBtn.addEventListener("click", () => {
      if (engine.running) {
        engine.pause();
      } else {
        engine.start();
      }
      updateStartLabel();
    });

    clearBtn.addEventListener("click", () => {
      // Reset to 0 for stopwatch; to chosen base for countdown
      const toMs = engine.mode === "countdown" ? engine._baseMs : 0;
      engine.reset(toMs);
      updateStartLabel();
    });

    // Keyboard shortcuts
    document.addEventListener("keydown", (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        startBtn.click();
      }
      if (e.key.toLowerCase() === "c") {
        clearBtn.click();
      }
    });

    // Resize: ensure milliseconds stays nicely placed (CSS handles most of it)
  });
})();
