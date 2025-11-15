/* stopewatch — SPA routing mínimo para la landing
   - Hash routing (#/, #/stopwatch, #/countdown)
   - Gestión de foco para accesibilidad
   - Sin lógica de cronómetros aún (se agrega en Task 2 y Task 3)
*/
"use strict";

const routes = {
  "/": "view-home",
  "/stopwatch": "view-stopwatch",
  "/countdown": "view-countdown",
};

const app = document.getElementById("app");

// Navegación por botones del header/cards/back
document.addEventListener("click", (ev) => {
  const link = ev.target.closest("[data-link]");
  if (!link) return;
  const href = link.getAttribute("data-link");
  if (href?.startsWith("#/")) {
    ev.preventDefault();
    window.location.hash = href;
  }
});

// Enrutador simple
function applyRoute() {
  const hash = window.location.hash || "#/";
  const path = hash.replace("#", "");
  const viewId = routes[path] ?? routes["/"];

  // Mostrar/ocultar vistas
  document.querySelectorAll(".view").forEach((el) => el.classList.remove("active"));
  const view = document.getElementById(viewId);
  view.classList.add("active");

  // Llevar foco al main para lectores de pantalla/teclado
  // (buena base para accesibilidad)
  app.focus({ preventScroll: false });
}

// Inicialización
window.addEventListener("hashchange", applyRoute);
window.addEventListener("DOMContentLoaded", () => {
  // Ruta por defecto
  if (!location.hash) location.hash = "#/";
  applyRoute();
});
