/* script.js
 *
 * Stopwatch web app.
 * - Domain logic: Stopwatch class (time tracking, no DOM knowledge).
 * - UI/controller: StopwatchUI class (DOM updates, button behavior).
 *
 * Follows SOLID-style separation for a small project:
 * - Single Responsibility: each class has one reason to change.
 * - Dependency Inversion: UI depends on an abstraction (callback) from Stopwatch.
 */

(function () {
  "use strict";

  /**
   * Stopwatch core logic: measures elapsed time.
   * Uses requestAnimationFrame for smooth updates; falls back to setTimeout.
   */
  class Stopwatch {
    constructor({ onTick } = {}) {
      this._onTick = typeof onTick === "function" ? onTick : null;

      this._running = false;
      this._elapsedMs = 0; // total elapsed time in ms
      this._rafId = null;

      // Bind tick so we can pass it into rAF/timeout safely
      this._tick = this._tick.bind(this);
    }

    /**
     * Starts or resumes the stopwatch.
     */
    start() {
      if (this._running) {
        console.warn("[Stopwatch] start() called but already running.");
        return;
      }

      this._running = true;
      this._lastTimestamp = this._now();
      console.info("[Stopwatch] Started.");

      this._scheduleNextTick();
    }

    /**
     * Internal tick function: advances time and triggers callback.
     */
    _tick(currentTime) {
      if (!this._running) return;

      try {
        const now = typeof currentTime === "number" ? currentTime : this._now();
        const delta = now - this._lastTimestamp;

        // Guard against negative or absurd deltas
        const safeDelta = Number.isFinite(delta) && delta > 0 ? delta : 0;

        this._elapsedMs += safeDelta;
        this._lastTimestamp = now;

        if (this._onTick) {
          try {
            this._onTick(this.getElapsedMs());
          } catch (callbackError) {
            console.error("[Stopwatch] Error in onTick callback:", callbackError);
          }
        }
      } catch (err) {
        console.error("[Stopwatch] Error during tick:", err);
      } finally {
        this._scheduleNextTick();
      }
    }

    /**
     * Schedules the next update frame.
     */
    _scheduleNextTick() {
      if (!this._running) return;

      const raf = window.requestAnimationFrame;
      if (typeof raf === "function") {
        this._rafId = raf(this._tick);
      } else {
        // Fallback if rAF is unavailable
        this._rafId = setTimeout(() => this._tick(this._now()), 16);
      }
    }

    /**
     * Pauses the stopwatch without resetting elapsed time.
     */
    pause() {
      if (!this._running) {
        console.warn("[Stopwatch] pause() called but stopwatch is not running.");
        return;
      }

      this._running = false;

      if (this._rafId !== null) {
        const cancel = window.cancelAnimationFrame || clearTimeout;
        cancel(this._rafId);
        this._rafId = null;
      }

      console.info("[Stopwatch] Paused at", this._elapsedMs.toFixed(0), "ms");
    }

    /**
     * Resets elapsed time to zero. Does NOT automatically stop rAF,
     * so callers should stop/pause first when needed.
     */
    reset() {
      this._elapsedMs = 0;
      console.info("[Stopwatch] Reset to 0.");

      if (this._onTick) {
        try {
          this._onTick(0);
        } catch (err) {
          console.error(
            "[Stopwatch] Error in onTick callback during reset:",
            err
          );
        }
      }
    }

    /**
     * Stops (if running) and resets the elapsed time.
     */
    stopAndReset() {
      if (this._running) {
        this.pause();
      }
      this.reset();
    }

    /**
     * Returns elapsed time in milliseconds.
     */
    getElapsedMs() {
      return this._elapsedMs;
    }

    /**
     * Whether the stopwatch is currently running.
     */
    isRunning() {
      return this._running;
    }

    /**
     * Time source abstraction to simplify testing / clarity.
     */
    _now() {
      if (typeof performance !== "undefined" && performance.now) {
        return performance.now();
      }
      return Date.now();
    }
  }

  /**
   * UI Controller: connects Stopwatch logic to the DOM and buttons.
   */
  class StopwatchUI {
    constructor({ hoursEl, minutesEl, secondsEl, millisecondsEl, leftButton, rightButton }) {
      this.hoursEl = hoursEl;
      this.minutesEl = minutesEl;
      this.secondsEl = secondsEl;
      this.millisecondsEl = millisecondsEl;
      this.leftButton = leftButton;
      this.rightButton = rightButton;

      this.stopwatch = null;

      this._init();
    }

    _init() {
      if (
        !this.hoursEl ||
        !this.minutesEl ||
        !this.secondsEl ||
        !this.millisecondsEl ||
        !this.leftButton ||
        !this.rightButton
      ) {
        console.error(
          "[StopwatchUI] Missing required DOM elements. Initialization aborted."
        );
        return;
      }

      // Instantiate the core Stopwatch, wiring the onTick callback to the UI
      this.stopwatch = new Stopwatch({
        onTick: (elapsedMs) => this.updateDisplay(elapsedMs),
      });

      // Initial display and button state
      this.updateDisplay(0);
      this._setLeftButtonAppearance("Start", "green");

      this._attachEventListeners();

      console.info("[StopwatchUI] Initialized successfully.");
    }

    _attachEventListeners() {
      try {
        this.leftButton.addEventListener("click", () =>
          this._handleLeftButtonClick()
        );
        this.rightButton.addEventListener("click", () =>
          this._handleClearButtonClick()
        );
      } catch (err) {
        console.error("[StopwatchUI] Error attaching event listeners:", err);
      }
    }

    /**
     * Handles Start / Pause / Continue button clicks.
     */
    _handleLeftButtonClick() {
      if (!this.stopwatch) return;

      try {
        if (!this.stopwatch.isRunning()) {
          // Start or resume
          this.stopwatch.start();
          this._setLeftButtonAppearance("Pause", "green");
          console.info("[StopwatchUI] Transition: stopped → running.");
        } else {
          // Pause
          this.stopwatch.pause();
          this._setLeftButtonAppearance("Continue", "blue");
          console.info("[StopwatchUI] Transition: running → paused.");
        }
      } catch (err) {
        console.error("[StopwatchUI] Error handling left button click:", err);
      }
    }

    /**
     * Handles Clear button click (always resets and stops).
     */
    _handleClearButtonClick() {
      if (!this.stopwatch) return;

      try {
        const isLeftBlue = this.leftButton.classList.contains("bg-blue-500");

        // Stop and reset the stopwatch
        this.stopwatch.stopAndReset();
        this.updateDisplay(0);

        // Apply color rule:
        // - If left was blue, keep it blue but text becomes "Start".
        // - Otherwise, green "Start".
        if (isLeftBlue) {
          this._setLeftButtonAppearance("Start", "blue");
          console.info(
            "[StopwatchUI] Clear pressed while left button was blue -> Start (blue)."
          );
        } else {
          this._setLeftButtonAppearance("Start", "green");
          console.info(
            "[StopwatchUI] Clear pressed while left button was not blue -> Start (green)."
          );
        }
      } catch (err) {
        console.error("[StopwatchUI] Error handling Clear button click:", err);
      }
    }

    /**
     * Updates the stopwatch display.
     * Caps hours at display 00–99, wrapping visually after 99:59:59.999.
     */
    updateDisplay(elapsedMs) {
      try {
        const totalMs = Math.max(0, Math.floor(elapsedMs));

        const hours = Math.floor(totalMs / 3600000); // 1000 * 60 * 60
        const minutes = Math.floor((totalMs % 3600000) / 60000);
        const seconds = Math.floor((totalMs % 60000) / 1000);
        const milliseconds = totalMs % 1000;

        const displayHours = hours % 100; // cap at 00–99 visually

        this.hoursEl.textContent = this._pad2(displayHours);
        this.minutesEl.textContent = this._pad2(minutes);
        this.secondsEl.textContent = this._pad2(seconds);
        this.millisecondsEl.textContent = this._pad3(milliseconds);
      } catch (err) {
        console.error("[StopwatchUI] Error updating display:", err);
      }
    }

    /**
     * Sets the left button's label and color while preserving shape & layout.
     */
    _setLeftButtonAppearance(label, color) {
      if (!this.leftButton) return;

      this.leftButton.textContent = label;

      // Remove any previous color classes we control
      this.leftButton.classList.remove(
        "bg-green-500",
        "hover:bg-green-600",
        "bg-blue-500",
        "hover:bg-blue-600"
      );

      if (color === "green") {
        this.leftButton.classList.add("bg-green-500", "hover:bg-green-600");
      } else if (color === "blue") {
        this.leftButton.classList.add("bg-blue-500", "hover:bg-blue-600");
      }
    }

    _pad2(value) {
      return value.toString().padStart(2, "0");
    }

    _pad3(value) {
      return value.toString().padStart(3, "0");
    }
  }

  // Bootstrap once the DOM is ready
  document.addEventListener("DOMContentLoaded", () => {
    try {
      const ui = new StopwatchUI({
        hoursEl: document.getElementById("hours"),
        minutesEl: document.getElementById("minutes"),
        secondsEl: document.getElementById("seconds"),
        millisecondsEl: document.getElementById("milliseconds"),
        leftButton: document.getElementById("leftButton"),
        rightButton: document.getElementById("rightButton"),
      });

      if (!ui) {
        console.error("[Bootstrap] StopwatchUI failed to initialize.");
      }
    } catch (err) {
      console.error("[Bootstrap] Unhandled error during initialization:", err);
    }
  });
})();
