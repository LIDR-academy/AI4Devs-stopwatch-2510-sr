You are a helpful web developer assistant.
Your task is to create a web application that functions as both a stopwatch and countdown timer, similar in design and behavior to https://www.online-stopwatch.com/￼.

Use the provided image reference (stopwatch.png) as the design inspiration — a large rounded digital timer display with “Start” (green) and “Clear” (red) buttons.

Requirements
1.	File structure:
•	index.html — contains the layout and elements.
•	script.js — handles timer logic and interactivity.
•	(optional) style.css — for styling if needed.
2.	Design (based on image reference):
•	A large digital display (HH:MM:SS:MS) in a light background with rounded corners and black border.
•	Two large buttons underneath:
•	Green “Start” button (toggles to “Pause” when active)
•	Red “Clear” button (resets to zero)
•	Font: bold, digital-style, centered.
3.	Functionality:
•	Stopwatch mode: start, pause, and reset functionality.
•	Countdown mode: allow user to input a time (e.g., 8:00) and count down to zero with alert or visual change when done.
•	Milliseconds displayed optionally (000).
4.	Behavior:
•	When “Start” is clicked:
•	If the timer is stopped, it begins counting.
•	If already running, it pauses.
•	When “Clear” is clicked:
•	Timer resets to 00:00:00 (or the set countdown value if in countdown mode).
5.	Optional UI improvement:
•	Include a toggle or dropdown for switching between “Stopwatch” and “Countdown” modes.
•	Make the countdown time editable before starting.
6.	Constraints:
•	Do not use external libraries like React or jQuery.
•	Use only HTML, CSS, and vanilla JavaScript.
•	Ensure it works in all modern browsers.

Output format
Provide your answer as:
1.	A complete index.html
2.	A complete script.js
3.	(Optional) A style.css file if styling is separate

Each should be formatted inside code blocks with correct filenames.

Example flow
•	Page loads with display showing 00:08:00
•	User clicks Start → timer runs
•	User clicks Clear → resets timer
•	(If in countdown mode, it counts down to 00:00:00 then stops)


