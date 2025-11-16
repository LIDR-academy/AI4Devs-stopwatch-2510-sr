/* stopwatch.js
 * Stopwatch domain + UI
 */

(function () {
    "use strict";
  
    class Stopwatch {
      constructor(onTick) {
        this.onTick = typeof onTick === "function" ? onTick : null;
        this.running = false;
        this.elapsed = 0;
        this.last = 0;
        this.id = null;
        this._tick = this._tick.bind(this);
      }
  
      start() {
        if (this.running) return;
        this.running = true;
        this.last = performance.now ? performance.now() : Date.now();
        this.id = setInterval(this._tick, 10);
        console.info("[Stopwatch] Started");
      }
  
      _tick() {
        if (!this.running) return;
        const now = performance.now ? performance.now() : Date.now();
        const delta = Math.max(0, now - this.last);
        this.last = now;
        this.elapsed += delta;
        if (this.onTick) {
          try { this.onTick(this.elapsed); } catch (e) { console.error(e); }
        }
      }
  
      pause() {
        if (!this.running) return;
        this.running = false;
        clearInterval(this.id);
        this.id = null;
        console.info("[Stopwatch] Paused @", this.elapsed.toFixed(0), "ms");
      }
  
      stopAndReset() {
        if (this.running) this.pause();
        this.elapsed = 0;
        if (this.onTick) {
          try { this.onTick(0); } catch (e) { console.error(e); }
        }
        console.info("[Stopwatch] Cleared");
      }
    }
  
    class StopwatchUI {
      constructor() {
        this.ids = {
          h: "sw-hours", m: "sw-minutes", s: "sw-seconds", ms: "sw-milliseconds"
        };
        this.left = document.getElementById("sw-left");
        this.right = document.getElementById("sw-right");
  
        if (!this.left || !this.right) {
          console.error("[StopwatchUI] Missing buttons");
          return;
        }
  
        this.sw = new Stopwatch((ms) => this.render(ms));
        this.render(0);
        Shared.setLeftButton("Start", "green", this.left);
  
        this.left.addEventListener("click", () => this.onLeft());
        this.right.addEventListener("click", () => this.onRight());
      }
  
      render(ms) {
        Shared.renderParts(Shared.msToParts(ms), this.ids);
      }
  
      onLeft() {
        if (!this.sw.running) {
          this.sw.start();
          Shared.setLeftButton("Pause", "green", this.left);
        } else {
          this.sw.pause();
          Shared.setLeftButton("Continue", "blue", this.left);
        }
      }
  
      onRight() {
        const wasBlue = this.left.classList.contains("bg-blue-500");
        this.sw.stopAndReset();
        if (wasBlue) {
          Shared.setLeftButton("Start", "blue", this.left);
        } else {
          Shared.setLeftButton("Start", "green", this.left);
        }
      }
    }
  
    document.addEventListener("DOMContentLoaded", () => new StopwatchUI());
  })();
  