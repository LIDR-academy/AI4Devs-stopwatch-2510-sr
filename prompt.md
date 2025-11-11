You are an expert frontend developer specialized in building clean and responsive web interfaces using only HTML, CSS, and vanilla JavaScript (no frameworks, no libraries).

🎯 Goal:
Create a small web app that contains two tools:
1. Stopwatch (chronometer)
2. Countdown timer

The UI should closely match the attached reference image:
- Large rounded rectangle display with light blue background.
- Black bold digital numbers in the center (hh:mm:ss and milliseconds for stopwatch).
- Two large rectangular buttons below:
  - Green "Start" button
  - Red "Clear" button
- Everything centered on the screen, minimal and modern.

---

### 🕒 Stopwatch Requirements
- Displays elapsed time in **hh:mm:ss:ms** format.
- Buttons:
  - **Start / Pause** toggle.
  - **Clear** resets the timer to 00:00:00:000.
- Uses `setInterval` or `requestAnimationFrame` for smooth updates (~10–50ms).
- When paused, the timer stops updating but keeps its last value.
- Optional keyboard shortcuts:
  - Space = Start/Pause
  - R = Reset

---

### ⏳ Countdown Requirements
- User can input a desired time (HH:MM:SS) in a simple form.
- When “Start” is pressed, the countdown begins.
- Buttons:
  - **Start / Pause** toggle.
  - **Clear** resets to the initial input value.
- When the countdown reaches 0, show a clear “Time’s Up!” message and play a short beep sound.
- Optional: background color slowly changes from green to red as time decreases.

---

### 🎨 Style Guidelines
- Use pure CSS (no frameworks).
- Center all elements vertically and horizontally (use Flexbox).
- Large readable font (monospace or digital style).
- High-contrast buttons with hover effects.
- Rounded corners, soft shadows, and spacing similar to the reference image.
- Responsive: should look good on desktop and mobile screens.

---

### 🧱 Structure
Create a single HTML file with these sections:
```html
<header>Simple Timer App</header>
<main>
  <section id="stopwatch">...</section>
  <section id="countdown" hidden>...</section>
</main>
<footer>
  <button id="showStopwatch">Stopwatch</button>
  <button id="showCountdown">Countdown</button>
</footer>

---

Use JavaScript to:

Switch between Stopwatch and Countdown sections.

Manage timer logic (start, pause, reset).

Format time display correctly (zero-padded numbers).

✅ Deliverables

One HTML file (index.html)

One CSS file (style.css)

One JS file (script.js)

Fully functional stopwatch and countdown with the described UI and behavior.

Code should be clean, modular, and commented for readability.
