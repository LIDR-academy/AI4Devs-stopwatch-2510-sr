/* stopewatch
   - Hash routing #/, #/stopwatch, #/countdown
   - Stopwatch (Task 2) y Countdown (Task 3)
   - Timers con performance.now() + requestAnimationFrame (precisión/fluidez)
*/
"use strict";

/* ----------------------------- Router simple ----------------------------- */
const routes = { "/": "view-home", "/stopwatch": "view-stopwatch", "/countdown": "view-countdown" };
const app = document.getElementById("app");

document.addEventListener("click", (ev) => {
  const link = ev.target.closest("[data-link]");
  if (!link) return;
  const href = link.getAttribute("data-link");
  if (href?.startsWith("#/")) {
    ev.preventDefault();
    window.location.hash = href;
  }
});

function applyRoute() {
  const path = (window.location.hash || "#/").replace("#", "");
  const viewId = routes[path] ?? routes["/"];
  document.querySelectorAll(".view").forEach((el) => el.classList.remove("active"));
  document.getElementById(viewId).classList.add("active");
  app.focus({ preventScroll: false });
}
window.addEventListener("hashchange", applyRoute);
window.addEventListener("DOMContentLoaded", () => {
  if (!location.hash) location.hash = "#/";
  applyRoute();
  initStopwatch();
  initCountdown();
});

/* ------------------------------ Stopwatch -------------------------------- */
function initStopwatch() {
  const mainEl = document.getElementById("sw-main");
  const msEl   = document.getElementById("sw-ms");
  const btnTgl = document.getElementById("sw-toggle");
  const btnClr = document.getElementById("sw-clear");

  const sw = createStopwatch({
    onTick({ h, m, s, ms, textHMS, textMS }) {
      mainEl.textContent = textHMS ?? `${pad(h)}:${pad(m)}:${pad(s)}`;
      msEl.textContent = textMS ?? pad3(ms);
    },
    onStateChange(state) {
      if (state === "running") {
        btnTgl.textContent = "Stop";
        btnTgl.classList.remove("success");
      } else if (state === "paused") {
        btnTgl.textContent = "Continue";
        btnTgl.classList.add("success");
      } else {
        btnTgl.textContent = "Start";
        btnTgl.classList.add("success");
      }
    }
  });

  btnTgl.addEventListener("click", () => {
    if (sw.state === "idle" || sw.state === "paused") sw.start();
    else if (sw.state === "running") sw.pause();
  });

  btnClr.addEventListener("click", () => sw.reset());

  window.addEventListener("hashchange", () => {
    const inView = document.getElementById("view-stopwatch").classList.contains("active");
    if (!inView) sw.pause();
  });
}

function createStopwatch({ onTick, onStateChange }) {
  let state = "idle";    // idle | running | paused
  let startTs = 0;
  let elapsed = 0;
  let rafId = 0;

  function setState(next) {
    if (state !== next) { state = next; onStateChange?.(state); }
  }
  function loop(ts) {
    const now = ts ?? performance.now();
    const total = now - startTs + elapsed;
    render(total);
    rafId = requestAnimationFrame(loop);
  }
  function render(msTotal) {
    const h = Math.floor(msTotal / 3600000);
    const m = Math.floor((msTotal % 3600000) / 60000);
    const s = Math.floor((msTotal % 60000) / 1000);
    const ms = Math.floor(msTotal % 1000);
    onTick?.({ h, m, s, ms, textHMS: `${pad(h)}:${pad(m)}:${pad(s)}`, textMS: pad3(ms) });
  }

  return {
    get state() { return state; },
    start() {
      if (state === "running") return;
      startTs = performance.now();
      setState("running");
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(loop);
    },
    pause() {
      if (state !== "running") return;
      elapsed += performance.now() - startTs;
      setState("paused");
      cancelAnimationFrame(rafId);
    },
    reset() {
      cancelAnimationFrame(rafId);
      startTs = 0; elapsed = 0; setState("idle");
      onTick?.({ h:0, m:0, s:0, ms:0, textHMS: "00:00:00", textMS: "000" });
    },
  };
}

/* ------------------------------ Countdown -------------------------------- */
function initCountdown() {
  const mainEl = document.getElementById("cd-main");
  const msEl   = document.getElementById("cd-ms");

  const setupBox = document.getElementById("cd-setup");
  const runBox   = document.getElementById("cd-run");
  const btnSet   = document.getElementById("cd-set");
  const btnClear1= document.getElementById("cd-clear1");

  const btnTgl   = document.getElementById("cd-toggle");
  const btnClear2= document.getElementById("cd-clear2");

  // Buffer de entrada (hasta 6 dígitos HHMMSS)
  let buf = ""; // string de dígitos

  // Pinta el buffer en el display
  function renderFromBuffer() {
    const { h, m, s } = bufferToHMS(buf);
    mainEl.textContent = `${pad(h)}:${pad(m)}:${pad(s)}`;
    msEl.textContent = "000";
  }
  renderFromBuffer();

  // Teclado numérico (click)
  setupBox.addEventListener("click", (ev) => {
    const keyBtn = ev.target.closest("[data-key]");
    if (!keyBtn) return;
    if (buf.length >= 6) return; // máximo HHMMSS
    buf = (buf + keyBtn.getAttribute("data-key")).replace(/\D/g, "").slice(-6);
    renderFromBuffer();
  });

  // Teclado físico (accesibilidad)
  document.addEventListener("keydown", (ev) => {
    if (!document.getElementById("view-countdown").classList.contains("active")) return;
    if (!setupBox || setupBox.classList.contains("hidden")) return;
    if (/^\d$/.test(ev.key)) {
      if (buf.length < 6) {
        buf = (buf + ev.key).slice(-6);
        renderFromBuffer();
      }
    } else if (ev.key === "Backspace") {
      buf = buf.slice(0, -1);
      renderFromBuffer();
    } else if (ev.key === "Enter") {
      btnSet.click();
    }
  });

  // Clear en modo setup
  btnClear1.addEventListener("click", () => {
    buf = "";
    renderFromBuffer();
  });

  // Set: convierte buffer a ms, arranca, cambia UI
  const cd = createCountdown({
    onTick({ h, m, s, ms, textHMS, textMS }) {
      mainEl.textContent = textHMS;
      msEl.textContent   = textMS;
    },
    onStateChange(state) {
      if (state === "running") {
        btnTgl.textContent = "Stop";
        btnTgl.classList.remove("success");
      } else if (state === "paused") {
        btnTgl.textContent = "Continue";
        btnTgl.classList.add("success");
      } else { // idle
        btnTgl.textContent = "Start";
        btnTgl.classList.add("success");
      }
    },
    onEnd() {
      // Llegó a 0: deja visible Start/Clear (usuario decide),
      // muestra 00:00:00.000 ya renderizado por tick
    }
  });

  btnSet.addEventListener("click", () => {
    const ms = bufferToMs(buf);
    if (ms <= 0) return; // no arranca con 0
    cd.setDuration(ms);
    // Cambiar a modo corrida
    setupBox.classList.add("hidden");
    runBox.classList.remove("hidden");
    runBox.removeAttribute("aria-hidden");

    cd.start(); // comienza a contar inmediatamente tras Set
  });

  // Controles en modo corrida
  btnTgl.addEventListener("click", () => {
    if (cd.state === "idle" || cd.state === "paused") cd.start();
    else if (cd.state === "running") cd.pause();
  });

  // Clear en modo corrida: resetea y vuelve al teclado
  function clearAndReturnToSetup() {
    cd.reset();
    buf = "";
    renderFromBuffer();
    runBox.classList.add("hidden");
    runBox.setAttribute("aria-hidden", "true");
    setupBox.classList.remove("hidden");
  }
  btnClear2.addEventListener("click", clearAndReturnToSetup);

  // Si navega fuera, pausa (no resetea)
  window.addEventListener("hashchange", () => {
    const inView = document.getElementById("view-countdown").classList.contains("active");
    if (!inView) cd.pause();
  });
}

function createCountdown({ onTick, onStateChange, onEnd }) {
  let state = "idle";      // idle | running | paused
  let duration = 0;        // ms configurados
  let startTs = 0;         // marca de inicio
  let carried = 0;         // acumulado de pausas
  let rafId = 0;

  function setState(next) {
    if (state !== next) { state = next; onStateChange?.(state); }
  }
  function render(remMs) {
    const clamped = Math.max(0, remMs);
    const h = Math.floor(clamped / 3600000);
    const m = Math.floor((clamped % 3600000) / 60000);
    const s = Math.floor((clamped % 60000) / 1000);
    const ms = Math.floor(clamped % 1000);
    onTick?.({ h, m, s, ms, textHMS: `${pad(h)}:${pad(m)}:${pad(s)}`, textMS: pad3(ms) });
  }
  function loop(ts) {
    const now = ts ?? performance.now();
    const elapsed = now - startTs + carried;
    const rem = duration - elapsed;
    render(rem);
    if (rem <= 0) {
      cancelAnimationFrame(rafId);
      setState("idle"); // termina en idle
      onEnd?.();
      return;
    }
    rafId = requestAnimationFrame(loop);
  }

  return {
    get state() { return state; },
    setDuration(ms) {
      duration = Math.max(0, ms);
      startTs = 0; carried = 0;
      render(duration);
      setState("paused"); // listo para empezar; Start mostrará "Stop" al correr
    },
    start() {
      if (duration <= 0) return;
      if (state === "running") return;
      startTs = performance.now();
      setState("running");
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(loop);
    },
    pause() {
      if (state !== "running") return;
      carried += performance.now() - startTs;
      setState("paused");
      cancelAnimationFrame(rafId);
    },
    reset() {
      cancelAnimationFrame(rafId);
      startTs = 0; carried = 0; duration = 0;
      setState("idle");
      onTick?.({ h:0, m:0, s:0, ms:0, textHMS:"00:00:00", textMS:"000" });
    },
  };
}

/* ------------------------------ Utilidades ------------------------------- */
function pad(n)   { return String(n).padStart(2, "0"); }
function pad3(n)  { return String(n).padStart(3, "0"); }

function bufferToHMS(buf) {
  const b = buf.padStart(6, "0");
  const h = Number(b.slice(0, 2));
  const m = Number(b.slice(2, 4));
  const s = Number(b.slice(4, 6));
  return { h, m, s };
}
function bufferToMs(buf) {
  const { h, m, s } = bufferToHMS(buf);
  return ((h * 60 + m) * 60 + s) * 1000;
}
