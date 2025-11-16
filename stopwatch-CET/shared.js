/* shared.js
 * Small helpers shared by stopwatch and countdown pages.
 */

(function () {
    "use strict";
  
    function pad2(n) { return n.toString().padStart(2, "0"); }
    function pad3(n) { return n.toString().padStart(3, "0"); }
  
    // Convert elapsed ms to parts (capped to 99 hours for display)
    function msToParts(ms) {
      const total = Math.max(0, Math.floor(ms));
      const hours = Math.floor(total / 3600000);
      const minutes = Math.floor((total % 3600000) / 60000);
      const seconds = Math.floor((total % 60000) / 1000);
      const msec = total % 1000;
      return {
        hours: hours % 100, // visual cap 00-99
        minutes,
        seconds,
        msec
      };
    }
  
    function renderParts(parts, elIds) {
      try {
        document.getElementById(elIds.h).textContent = pad2(parts.hours);
        document.getElementById(elIds.m).textContent = pad2(parts.minutes);
        document.getElementById(elIds.s).textContent = pad2(parts.seconds);
        document.getElementById(elIds.ms).textContent = pad3(parts.msec);
      } catch (e) {
        console.error("[shared] renderParts error:", e);
      }
    }
  
    // Button color management for the left button (green/blue)
    function setLeftButton(label, color, btn) {
      btn.textContent = label;
      btn.classList.remove(
        "bg-green-500","hover:bg-green-600",
        "bg-blue-500","hover:bg-blue-600"
      );
      if (color === "green") {
        btn.classList.add("bg-green-500","hover:bg-green-600");
      } else if (color === "blue") {
        btn.classList.add("bg-blue-500","hover:bg-blue-600");
      }
    }
  
    // Expose
    window.Shared = {
      pad2, pad3, msToParts, renderParts, setLeftButton
    };
  })();
  