/* countdown.js (fixed)
 * Countdown domain + UI with keypad input and run mode.
 * Robust selectors + event delegation so HTML style tweaks don't break behavior.
 */

(function () {
    "use strict";
  
    // --- Domain ---
    class Countdown {
      constructor(onTick, onFinish) {
        this.onTick = typeof onTick === "function" ? onTick : null;
        this.onFinish = typeof onFinish === "function" ? onFinish : null;
  
        this.running = false;
        this.remaining = 0;   // ms left
        this.setValue = 0;    // last set ms
        this.last = 0;
        this.id = null;
  
        this._tick = this._tick.bind(this);
      }
  
      setFromMs(ms) {
        this.setValue = Math.max(0, Math.floor(ms));
        this.remaining = this.setValue;
        if (this.onTick) this.onTick(this.remaining);
        console.info("[Countdown] Set to", this.setValue, "ms");
      }
  
      start() {
        if (this.running || this.remaining <= 0) return;
        this.running = true;
        this.last = (typeof performance !== "undefined" && performance.now) ? performance.now() : Date.now();
        this.id = setInterval(this._tick, 10);
        console.info("[Countdown] Started");
      }
  
      _tick() {
        if (!this.running) return;
        const now = (typeof performance !== "undefined" && performance.now) ? performance.now() : Date.now();
        const delta = Math.max(0, now - this.last);
        this.last = now;
  
        this.remaining = Math.max(0, this.remaining - delta);
        if (this.onTick) {
          try { this.onTick(this.remaining); } catch (e) { console.error(e); }
        }
  
        if (this.remaining === 0) {
          this.pause();
          console.info("[Countdown] Finished");
          if (this.onFinish) {
            try { this.onFinish(); } catch (e) { console.error(e); }
          }
        }
      }
  
      pause() {
        if (!this.running) return;
        this.running = false;
        if (this.id !== null) {
          clearInterval(this.id);
          this.id = null;
        }
        console.info("[Countdown] Paused @", this.remaining.toFixed(0), "ms left");
      }
  
      // Clear during run mode: reset to last set value
      clearToSetValue() {
        if (this.running) this.pause();
        this.remaining = this.setValue;
        if (this.onTick) this.onTick(this.remaining);
        console.info("[Countdown] Cleared to last set value");
      }
  
      // Clear during keypad mode: reset all to zero
      clearAll() {
        if (this.running) this.pause();
        this.setValue = 0;
        this.remaining = 0;
        if (this.onTick) this.onTick(0);
        console.info("[Countdown] Cleared to 0");
      }
    }
  
    // --- UI ---
    class CountdownUI {
      constructor() {
        this.ids = { h: "cd-hours", m: "cd-minutes", s: "cd-seconds", ms: "cd-milliseconds" };
  
        // Sections / controls
        this.keypad     = document.getElementById("cd-keypad");
        this.runSection = document.getElementById("cd-run");
        this.setBtn     = document.getElementById("cd-set");
        this.kpClearBtn = document.getElementById("cd-keypad-clear");
        this.left       = document.getElementById("cd-left");
        this.right      = document.getElementById("cd-right");
  
        // Buffer logic: up to 6 digits HHMMSS
        this.buffer = "";
  
        this.cd = new Countdown(
          (ms) => this.render(ms),
          () => this.onFinished()
        );
  
        this.render(0);
        this.wireEvents();
      }
  
      wireEvents() {
        // Event delegation for ALL keypad clicks (digits, Set, Clear)
        if (this.keypad) {
          this.keypad.addEventListener("click", (ev) => {
            const target = ev.target.closest("[data-digit], #cd-set, #cd-keypad-clear");
            if (!target) return;
  
            // Digit buttons
            if (target.hasAttribute("data-digit")) {
              const d = target.getAttribute("data-digit");
              if (this.buffer.length >= 6) return; // ignore extra input
              this.buffer += d;
              this.render(this.bufferMs());
              return;
            }
  
            // Keypad Clear
            if (target.id === "cd-keypad-clear") {
              this.buffer = "";
              this.cd.clearAll();
              return;
            }
  
            // Set
            if (target.id === "cd-set") {
              const ms = this.bufferMs();
              const clamped = Math.min(ms, (99 * 3600 + 59 * 60 + 59) * 1000);
              this.cd.setFromMs(clamped);
              this.showRunMode();
              return;
            }
          });
        }
  
        // Run-mode buttons
        if (this.left) {
          this.left.addEventListener("click", () => {
            if (!this.cd.running) {
              this.cd.start();
              Shared.setLeftButton("Pause", "green", this.left);
            } else {
              this.cd.pause();
              Shared.setLeftButton("Continue", "blue", this.left);
            }
          });
        }
  
        if (this.right) {
          this.right.addEventListener("click", () => {
            const wasBlue = this.left && this.left.classList.contains("bg-blue-500");
            this.cd.clearToSetValue();
            if (this.left) {
              if (wasBlue) {
                Shared.setLeftButton("Start", "blue", this.left);
              } else {
                Shared.setLeftButton("Start", "green", this.left);
              }
            }
          });
        }
      }
  
      showRunMode() {
        if (this.keypad) this.keypad.classList.add("hidden");
        if (this.runSection) this.runSection.classList.remove("hidden");
        if (this.left) Shared.setLeftButton("Start", "green", this.left);
      }
  
      showKeypadMode() {
        if (this.keypad) this.keypad.classList.remove("hidden");
        if (this.runSection) this.runSection.classList.add("hidden");
        this.buffer = "";
      }
  
      onFinished() {
        // Stop at zero and remain in run mode; user can Start again or Clear.
      }
  
      bufferMs() {
        // Interpret buffer (left-to-right HHMMSS)
        const padded = this.buffer.padStart(6, "0").slice(-6);
        const hh = parseInt(padded.slice(0, 2), 10);
        const mm = parseInt(padded.slice(2, 4), 10);
        const ss = parseInt(padded.slice(4, 6), 10);
        const safeMM = Math.min(mm, 59);
        const safeSS = Math.min(ss, 59);
        return ((hh * 3600) + (safeMM * 60) + safeSS) * 1000;
      }
  
      render(ms) {
        Shared.renderParts(Shared.msToParts(ms), this.ids);
      }
    }
  
    document.addEventListener("DOMContentLoaded", () => {
      try {
        new CountdownUI();
      } catch (e) {
        console.error("[CountdownUI] init error:", e);
      }
    });
  })();
  