// script.js
// Lógica global de la aplicación Cronómetro & Cuenta Atrás
// Author: generado por ChatGPT
// Descripción: controla la navegación entre vistas, el cronómetro y la cuenta atrás.
// Incluye tests básicos con console.assert()

(function () {
  "use strict";

  // Utilidades comunes ---------------------------------------------

  /**
   * Convierte milisegundos en partes de tiempo, limitando a 99:99:99.
   * @param {number} ms
   * @returns {{hours:number, minutes:number, seconds:number, ms:number}}
   */
  function msToParts(ms) {
    if (ms < 0) ms = 0;
    const totalSeconds = Math.floor(ms / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;
    const milli = ms % 1000;

    // Limitar
    if (hours > 99) hours = 99;
    if (minutes > 99) minutes = 99;
    if (seconds > 99) seconds = 99;

    return { hours, minutes, seconds, ms: milli };
  }

  /**
   * Formatea en "HH:MM:SS".
   * @param {number} ms
   * @returns {string}
   */
  function formatTime(ms) {
    const { hours, minutes, seconds } = msToParts(ms);
    const pad = (n) => String(n).padStart(2, "0");
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }

  /**
   * Formatea milisegundos a "000".
   * @param {number} ms
   * @returns {string}
   */
  function formatMs(ms) {
    return String(ms).padStart(3, "0");
  }

  /**
   * Convierte una cadena de hasta 6 dígitos (HHMMSS) a milisegundos.
   * @param {string} digitString
   * @returns {number}
   */
  function digitsToMs(digitString) {
    const padded = digitString.padStart(6, "0").slice(-6);
    const hours = Number(padded.slice(0, 2));
    const minutes = Number(padded.slice(2, 4));
    const seconds = Number(padded.slice(4, 6));

    const safeHours = Math.min(hours, 99);
    const safeMinutes = Math.min(minutes, 99);
    const safeSeconds = Math.min(seconds, 99);

    return ((safeHours * 3600) + (safeMinutes * 60) + safeSeconds) * 1000;
  }

  // Navegación entre vistas ------------------------------------
  const viewHome = document.getElementById("view-home");
  const viewStopwatch = document.getElementById("view-stopwatch");
  const viewCountdown = document.getElementById("view-countdown");

  function showView(viewName) {
    viewHome.classList.add("hidden");
    viewStopwatch.classList.add("hidden");
    viewCountdown.classList.add("hidden");

    switch (viewName) {
      case "home":
        viewHome.classList.remove("hidden");
        break;
      case "stopwatch":
        viewStopwatch.classList.remove("hidden");
        break;
      case "countdown":
        viewCountdown.classList.remove("hidden");
        break;
      default:
        viewHome.classList.remove("hidden");
    }
    console.log("[NAV] Vista actual:", viewName);
  }

  // Eventos de navegación
  document.getElementById("btn-go-stopwatch").addEventListener("click", function () {
    showView("stopwatch");
  });

  document.getElementById("btn-go-countdown").addEventListener("click", function () {
    showView("countdown");
  });

  document.querySelectorAll("[data-go-home]").forEach((btn) => {
    btn.addEventListener("click", function () {
      // reinicios simples: paramos timers
      Stopwatch.stop();
      Countdown.stop();
      showView("home");
    });
  });

  // Cronómetro -------------------------------------------------
  const Stopwatch = (function () {
    let startTimestamp = 0;
    let elapsed = 0; // en ms
    let rafId = null;

    const timeEl = document.getElementById("sw-time");
    const msEl = document.getElementById("sw-ms");
    const startBtn = document.getElementById("sw-start");
    const resetBtn = document.getElementById("sw-reset");

    function render() {
      const parts = msToParts(elapsed);
      timeEl.textContent = `${String(parts.hours).padStart(2, "0")}:${String(parts.minutes).padStart(2, "0")}:${String(parts.seconds).padStart(2, "0")}`;
      msEl.textContent = formatMs(parts.ms);
    }

    function update(timestamp) {
      elapsed = timestamp - startTimestamp;
      render();
      rafId = requestAnimationFrame(update);
    }

    function start() {
      try {
        if (rafId !== null) return; // ya está corriendo
        startTimestamp = performance.now() - elapsed;
        rafId = requestAnimationFrame(update);
        startBtn.textContent = "Pausar";
        console.log("[STOPWATCH] start");
      } catch (err) {
        console.error("[STOPWATCH] error al iniciar:", err);
      }
    }

    function pause() {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
        startBtn.textContent = "Iniciar";
        console.log("[STOPWATCH] pause");
      }
    }

    function stop() {
      // detener sin resetear tiempo interno
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      startBtn.textContent = "Iniciar";
    }

    function reset() {
      pause();
      elapsed = 0;
      render();
      console.log("[STOPWATCH] reset");
    }

    // Eventos UI
    startBtn.addEventListener("click", function () {
      if (rafId === null) {
        start();
      } else {
        pause();
      }
    });

    resetBtn.addEventListener("click", function () {
      reset();
    });

    // Inicializar display
    render();

    return {
      start,
      pause,
      reset,
      stop,
    };
  })();

  // Cuenta atrás -------------------------------------------------
  const Countdown = (function () {
    const timeEl = document.getElementById("cd-time");
    const msEl = document.getElementById("cd-ms");
    const setupEl = document.getElementById("cd-setup");
    const runEl = document.getElementById("cd-run");

    const setBtn = document.getElementById("cd-set");
    const clearInputBtn = document.getElementById("cd-clear-input");
    const startBtn = document.getElementById("cd-start");
    const resetBtn = document.getElementById("cd-reset");

    const digitButtons = setupEl.querySelectorAll("[data-digit]");

    let digitString = ""; // lo que escribe el usuario
    let initialMs = 0;
    let remainingMs = 0;
    let rafId = null;
    let lastTimestamp = 0;

    function renderFromMs(ms) {
      const parts = msToParts(ms);
      timeEl.textContent = `${String(parts.hours).padStart(2, "0")}:${String(parts.minutes).padStart(2, "0")}:${String(parts.seconds).padStart(2, "0")}`;
      msEl.textContent = formatMs(parts.ms);
    }

    function renderFromDigits() {
      const ms = digitsToMs(digitString);
      renderFromMs(ms);
    }

    function showSetup() {
      setupEl.classList.remove("hidden");
      runEl.classList.add("hidden");
    }

    function showRun() {
      setupEl.classList.add("hidden");
      runEl.classList.remove("hidden");
    }

    function appendDigit(d) {
      if (digitString.length >= 6) return;
      digitString += d;
      renderFromDigits();
      console.log("[COUNTDOWN] digit:", digitString);
    }

    function clearDigits() {
      digitString = "";
      renderFromDigits();
      console.log("[COUNTDOWN] borrar digits");
    }

    function assignTime() {
      const ms = digitsToMs(digitString);
      if (ms <= 0) {
        alert("Introduce un tiempo mayor que 00:00:00");
        return;
      }
      initialMs = ms;
      remainingMs = ms;
      renderFromMs(remainingMs);
      showRun();
      console.log("[COUNTDOWN] tiempo asignado ms=", ms);
    }

    function update(timestamp) {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const diff = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      remainingMs -= diff;
      if (remainingMs <= 0) {
        remainingMs = 0;
        renderFromMs(remainingMs);
        stop();
        alert("⏰ Tiempo finalizado");
        return;
      }
      renderFromMs(remainingMs);

      rafId = requestAnimationFrame(update);
    }

    function start() {
      if (remainingMs <= 0) {
        alert("No hay tiempo para contar. Asigna uno nuevo o reinicia.");
        return;
      }
      if (rafId !== null) return;
      lastTimestamp = 0;
      rafId = requestAnimationFrame(update);
      startBtn.textContent = "Pausar";
      console.log("[COUNTDOWN] start");
    }

    function pause() {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
        startBtn.textContent = "Iniciar";
        console.log("[COUNTDOWN] pause");
      }
    }

    function stop() {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      startBtn.textContent = "Iniciar";
    }

    function reset() {
      stop();
      remainingMs = initialMs;
      renderFromMs(remainingMs);
      console.log("[COUNTDOWN] reset");
    }

    // eventos teclado
    digitButtons.forEach((btn) => {
      btn.addEventListener("click", () => appendDigit(btn.dataset.digit));
    });

    clearInputBtn.addEventListener("click", clearDigits);
    setBtn.addEventListener("click", assignTime);

    // eventos run
    startBtn.addEventListener("click", function () {
      if (rafId === null) start();
      else pause();
    });

    resetBtn.addEventListener("click", reset);

    // inicial
    renderFromDigits();

    return {
      stop,
      reset,
      showSetup,
      showRun,
    };
  })();

  // Tests básicos ----------------------------------------------
  function runTests() {
    console.log("%c[TEST] Iniciando tests básicos...", "color: purple; font-weight: bold;");
    console.assert(formatTime(0) === "00:00:00", "formatTime(0) debe ser 00:00:00");
    console.assert(formatTime(1000) === "00:00:01", "formatTime(1000) debe ser 00:00:01");
    console.assert(formatTime(61000) === "00:01:01", "formatTime(61000) debe ser 00:01:01");
    console.assert(digitsToMs("000001") === 1000, "digitsToMs 000001 -> 1000ms");
    console.assert(digitsToMs("000100") === 60000, "digitsToMs 000100 -> 1 min");
    console.assert(digitsToMs("010000") === 3600000, "digitsToMs 010000 -> 1h");
    console.log("%c[TEST] Tests completados.", "color: green; font-weight: bold;");
  }

  runTests();

  // Vista inicial
  showView("home");
})();
