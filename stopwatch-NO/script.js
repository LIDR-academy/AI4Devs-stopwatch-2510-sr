
// script.js
// Landing page logic for Timer & Countdown.
// For Task 1 we only wire up the feature buttons with simple placeholders.
// The actual stopwatch and countdown implementations will be added in later tasks.

(function () {
  "use strict";

  /**
   * Setup click handlers once the DOM is ready.
   */
  document.addEventListener("DOMContentLoaded", () => {
    const stopwatchCard = document.getElementById("stopwatch-card");
    const countdownCard = document.getElementById("countdown-card");

    if (!stopwatchCard || !countdownCard) {
      // If the layout changes and elements are missing, fail fast in dev.
      console.warn(
        "[TimerApp] Expected landing buttons not found. Check index.html structure."
      );
      return;
    }

    stopwatchCard.addEventListener("click", () => {
      // Placeholder for Task 2: this will eventually show the stopwatch UI.
      alert("Stopwatch mode will be implemented in Task 2.");
    });

    countdownCard.addEventListener("click", () => {
      // Placeholder for Task 3: this will eventually show the countdown UI.
      alert("Countdown mode will be implemented in Task 3.");
    });
  });
})();
