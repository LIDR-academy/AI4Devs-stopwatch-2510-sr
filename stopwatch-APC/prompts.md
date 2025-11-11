Act as a frontend developer with expertise in HTML, CSS, and vanilla JavaScript.

Build a small web application that includes a stopwatch and a countdown timer, based on the layout and interaction patterns of this reference site:
🔗 https://www.online-stopwatch.com/

Use that site as inspiration for the visual layout, behavior, and features.

⸻

🕐 Functionality to implement:

1. Stopwatch
	•	Starts at 00:00:00 and counts up in hours:minutes:seconds format.
	•	Includes Start, Pause, and Reset buttons.
	•	Time must continue from where it was paused.
	•	Reset returns the stopwatch to 00:00:00.

2. Countdown Timer
	•	The user can set a custom time (in minutes and seconds).
	•	Includes Start, Pause, and Reset buttons.
	•	When started, it counts down to 00:00:00.
	•	When the countdown reaches zero, trigger a basic alert or visual signal.
	•	Reset returns to the last set time.

⸻

⚙️ Technical requirements:
	1.	Use two files:
	•	index.html — for the full HTML structure (interface for both stopwatch and countdown).
	•	script.js — for all the logic using vanilla JavaScript.
	2.	Link script.js correctly via <script src="script.js"></script>.
	3.	Use only plain CSS for styling, embedded in the HTML (<style> tag).
	4.	Make the layout and button design similar to the reference site, but you do not need to replicate it exactly.
	5.	Implement keyboard-accessible controls.
	6.	Ensure that the stopwatch and countdown can be used independently.
	7.	Add basic input validation (e.g., disallow negative numbers or empty values in countdown).
	8.	Make it responsive so it works on both desktop and mobile devices.
	9.	Add standard console logs for key events (e.g. “Stopwatch started”, “Countdown reached 00:00”).

⸻

🚫 Do NOT:
	•	Do not use external libraries or frameworks (no Tailwind, Bootstrap, jQuery, etc).
	•	Do not include any comments or explanations.
	•	Do not use separate CSS files.
	•	Do not output markdown or formatting.
	•	Only output working, clean code.

⸻

📄 Expected output:
	1.	First, output the complete content of index.html.
	2.	Then, output the complete content of script.js.
	3.	Output nothing else.


En la construcción del prompt me apoye del mismo chatGPR para lograr sacar un prompt mejor estructurado, utilice también como base el ejemplo y la solución del trabajo anterior. 

Aunque lo que me dio la AI no funciono a la primera tuve que corregir unos errores en el script de js, ya que había unos elementos que no existian en el DOM.