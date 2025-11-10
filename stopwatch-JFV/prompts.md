## META PROMPT
Espero que no se considere trampa. Lo primero que hice fue pedirle a ChatGTP que me ayudase a diseñar el prompt, porque es lo que haría en la vida real.

Esto fue lo que le pase:

### PROMPT ORIGINAL

>Eres un experto en ingeniería de prompts, especialmente con ChatGPT como AI. 
>
>Ayúdame a preparar un prompt para pedirle a ChatGPT que implemente una web. A continuación añado la descripción de lo que quiero pedirle a ChatGPT
>
>La salida debe ser un prompt en markdown que implemente las buenas prácticas como Rol, Contexto, Ejemplos, etc.
>
>Hazme las preguntas que necesites.
>
>### Descripción del prompt
># Stopwatch EN
>
>Use what you’ve learned about prompt engineering to create a stopwatch and countdown.
>
>Reference: https://www.online-stopwatch.com/ (see res/stopwatch.png for design reference)
>
>Do it using the seed index.html + script.js
>
>Tip: if it allows image analysis, you can upload it to easily obtain a design similar to the reference.


## RESPUESTA DE CHATGPT

Perfecto ✅ Para crear un *prompt de alta calidad* que pida a ChatGPT implementar una web (en este caso un **stopwatch y countdown** basados en `index.html` + `script.js`), necesito algunos detalles más para afinar el diseño del prompt. Aquí van mis preguntas:

1. **Objetivo principal:**
   ¿Quieres que el prompt genere **el código completo (HTML + JS + CSS)** o que solo **modifique y complemente los archivos existentes** (`index.html` y `script.js`)?

2. **Nivel de detalle del diseño:**
   ¿Deseas un diseño **idéntico** al de la referencia `https://www.online-stopwatch.com/` o simplemente **inspirado** en él (con colores, disposición y funcionalidad similares, pero no copia exacta)?

3. **Características funcionales:**

   * ¿Debe incluir tanto **cronómetro (stopwatch)** como **cuenta regresiva (countdown)** en una sola página?
   * ¿La cuenta regresiva debe permitir al usuario **configurar el tiempo** antes de comenzar?

4. **Tono y estilo del prompt:**
   ¿Quieres un prompt con enfoque **técnico y directo (para desarrolladores)** o más **estructurado tipo guía educativa** (con explicaciones paso a paso)?

5. **Idioma del prompt:**
   ¿Deseas que el prompt final esté en **inglés** (por coherencia con el título “Stopwatch EN”) o en **español**?

6. **Nivel de detalle del prompt:**
   ¿Quieres que incluya secciones de **rol, contexto, ejemplos, pasos, formato de salida, restricciones**, etc.? (Por ejemplo: *Role*, *Context*, *Task*, *Examples*, *Output format*...)

Una vez tenga tus respuestas, te generaré un **prompt profesional en markdown** listo para copiar y pegar en ChatGPT, siguiendo las mejores prácticas de *prompt engineering*.


## MIS RESPUESTAS

1 - Modifique y complemente, aunque el script.js que se proporciona está vacío

2 - Deseo un diseño idéntico al de una imagen de la que dispongo

3 - Sólo el cronómetro

4 - Para desarrolladores

5 - En inglés

6 - Sí

Además en este momento me pidió la imagen y la subí

### PROMPT GENERADO
 
## 🧠 Role
You are an expert **front-end web developer** skilled in **HTML, CSS, and JavaScript**.  
You have deep knowledge of **DOM manipulation**, **UI replication**, and **accurate functional logic** for time-based applications.

## 🎯 Context
You are tasked with implementing a **stopwatch (not countdown)** that visually matches a provided reference image (`stopwatch.png`).  
You will use the existing base files:
- `index.html` (currently minimal HTML scaffold)
- `script.js` (currently empty)

The stopwatch must look **identical** to the provided image and must be fully functional.

The image reference shows:
- A large rounded rectangular display with the format `00:08:00 000` (minutes:seconds:milliseconds)
- A **Start** button (green, rounded, shadowed)
- A **Clear** button (red, rounded, shadowed)
- A clean, centered layout with a simple color palette and soft shadows

## 🧩 Task
Implement a **functional stopwatch** in HTML, CSS, and JavaScript that:
1. Starts counting up from 00:00:00.000 when the “Start” button is clicked.
2. The “Start” button toggles to “Stop” when running, and back to “Start” when paused.
3. The “Clear” button resets the timer to zero.
4. Uses milliseconds precision and updates smoothly in real time.
5. Matches the **exact design** shown in `stopwatch.png` (analyze it visually if image understanding is available).
6. The JavaScript code must be entirely in `script.js`.

## ⚙️ Technical Requirements
- Use **vanilla JS only** (no frameworks).
- Keep the HTML minimal — use semantic elements.
- Include internal CSS (or style block) within `index.html`.
- All dynamic logic (start, stop, clear, update) must be implemented in `script.js`.
- Ensure consistent behavior across modern browsers.
- Maintain a clean, readable structure with comments explaining key parts.

## 💡 Output Format
Provide:
1. The **full updated `index.html` code**.
2. The **full `script.js` code**.
3. Do not compress or summarize code — include it entirely.
4. Add short comments in English explaining each main block.

## 🧠 Example Clarification
Example behavior:
- Clicking **Start** begins the timer.
- Clicking **Stop** pauses it.
- Clicking **Clear** resets it to 00:00:00.000.

## 🚫 Constraints
- Do not use external libraries (e.g., jQuery, React, Bootstrap).
- Do not create additional files besides `index.html` and `script.js`.
- Avoid CSS frameworks; replicate the design using pure CSS.

## ✅ Deliverable
A working stopwatch web page visually identical to `stopwatch.png`, using the given `index.html` base file and an empty `script.js`.

---


## FIN DEL PROMPT GENERADO
## BONUS TRACK - VERSIÓN REUTILIZABLE

ChatGPT me ofreción generar una versión más corta y reutilizable del prompt, que se muestra a continuación:

## 🔧 Role
You are a **front-end web developer** expert in HTML, CSS, and JavaScript.

## 🎯 Task
Implement a web component or mini app (e.g., stopwatch, counter, converter, etc.) using:
- A given `index.html` as base (already uploaded)
- An empty `script.js`
- A provided reference image for design

The result must **look identical to the image** and be **fully functional**.

## 🧩 Requirements
- Use **only vanilla JS**, HTML, and CSS.
- Keep HTML minimal and semantic.
- All logic goes into `script.js`.
- Use inline `<style>` in HTML or internal CSS.
- Reproduce layout, colors, and button styles from the image.
- No frameworks, no external libraries.

## 💡 Output
Return:
1. Full `index.html` (complete and formatted)
2. Full `script.js` (with comments)
3. No code summarization.

## 🚀 Example Use
For example, if the task is *“Stopwatch”*, create a working timer that matches the uploaded `stopwatch.png` exactly, with **Start / Stop** and **Clear** buttons, precise time display, and smooth updates.




## EJECUCIÓN DEL PROMPT
Ejecuté el prompt en una nueva sesión, para evitar que se aprovechase del contexto de lo que habíamos hablado hasta entonces y hacer una prueba limpia.

El resultado fue muy bueno, funcionaba perfectamente y sólo fue neceserio aplicar arreglos cosméticos, con una serie de prompts adicionales que muestro a continuación.

El tipo de letra no se parece en nada, pero eso fue intencionado, ChatGPT me lo ofreción y, como me gustaba más, me quedé con ese en lugar del original.

### PROMPTS DE REFINAMIENTO

**ChatGPT**

Would you like me to include a light digital font (e.g., “Digital-7” or “Orbitron”) like in professional timers for an even closer match?

**Yo**

Yes. Also, there are tree small things to improve:
The stopwatch has 4 sets of zeros at the beginning, for hours, minutes, seconds and milliseconds, but, when I start it, the hours section dissappear.
The millisecond section in the provided image is smaller and goes below the hours:minutes:seconds part, not at their right
The size of the box that contains the entire stopwatch should be fixed, not depend on the text, to avoid flickering

**ChatGPT**

Would you like me to adjust the color palette and shadow depth to perfectly match your stopwatch.png (e.g., the same shade of blue and exact button gradients)?

**Yo**

No, just one last improvement. As numbers like 1 takes less space that others like 0, there is a small movement of the number when they change. Make each number to take a fixed amount of horizontal space to avoid that

**ChatGPT**

Would you like the milliseconds to slightly fade or shrink when stopped, to visually indicate it’s paused (a subtle animation effect)?

**Yo**

Near perfection except for one thing. In the image you can see the 11 takes less horizontal space than 00 and that makes it be away from the ":". I think you might need to have separate elementes for each digit if you want them to stay in the same position no matter the value they take.
