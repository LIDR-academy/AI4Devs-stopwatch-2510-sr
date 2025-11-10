### PROMPT 1: Solicitud Inicial del Prompt Ideal

Quiero que me ayudes a escribir el prompt de la mejor forma posible para que se entienda y se implemente bien para los siguientes requisitos, y que lo muestres en inglés y en castellano, en formato MD para poder enviarlo:

Soy desarrollador front-end experto, con amplia experiencia en HTML, CSS y JavaScript. Me gusta mucho la calidad, así que el desarrollo debe ser claro, limpio, y optimo.
Necesito implementar una nueva aplicación web que mantenga o mejore el formato visual de la funcionalidad que se indica en las imágenes adjuntas, y que se puede ver en esta URL: https://www.online-stopwatch.com/

Requisitos:
Se debe implementar una pantalla donde se pueda elegir entre cuenta atrás y cronómetro. El fondo blanco que en la pestaña y como titulo de la aplicación sea Timer and Countdown. 
Siempre se mostrarán en este orden: horas, minutos, segundos y milisegundos (HH:MM:SS.mmm), tanto en la cuenta atrás como en el cronómetro.
Además, siempre se mostrará un título para indicar si se está eligiendo, cronometrando o realizando una cuenta atrás. Todo debe mostrarse en inglés.
Se debe permitir siempre volver a la pantalla inicial.
Los botones deben tener iconos para que sea más gráfico para los usuarios, y la aplicación, tiene que ser muy óptima y usable para los usuarios. 
Importante que se pueda ejecutar perfectamente sólo con HTML, CSS y JS, no se requiere nada más.

Cuenta atrás:
Se permitirá configurar horas, minutos y segundos. Se validará si los minutos y segundos pasan de 59, y se mostrará un mensaje alert de que no se puede más de 59.
Una vez configurado, se podrá pulsar el botón Set para navegar para ejecutar la cuenta atrás o Clear para limpiar la configuración.
Cuando esté configurada la cuenta atrás, los botones funcionarán igual que en el cronómetro: Start / Pause / Continue, y el botón Clear servirá para volver al estado inicial. Y es importante que sigan la misma estructura de los botones que tiene el cronometro. Sólo se debe diferenciar que va hacia atrás.
También deberá existir un botón adicional para configurar una nueva cuenta atrás sin tener que volver a elegir el modo.

Cronómetro:
Además del display, se mostrará un botón Start / Pause (cuando esté ejecutándose) / Continue (cuando esté pausado) y Clear para volver al cero.

El desarrollo se debe implementar en dos ficheros: index.html y script.js, que se adjuntarán al prompt.

Es necesario seguir las buenas prácticas de CSS, HTML y JavaScript, garantizando la usabilidad para el usuario, siguiendo todas las directrices y optimizando el rendimiento.

Sería ideal que el código siga los estándares del W3C y aplique metodologías como BEM y las pautas de accesibilidad WCAG.
Además, se deben respetar las buenas prácticas de JavaScript, utilizando convenciones basadas en ESLint y Prettier para mantener un estilo y formato consistentes, cumpliendo con las especificaciones de ECMAScript.

---

### PROMPT 2: Prompt Detallado para la Implementación Base

Objetivo — breve:
Eres un desarrollador front-end experto. Implementa una pequeña aplicación web de alta calidad (solo HTML + CSS + JavaScript, sin frameworks ni librerías) que reproduzca y mejore la experiencia visual/UX de la referencia (https://www.online-stopwatch.com/
) para Timer and Countdown. Entregar dos ficheros: index.html y script.js (adjuntarlos a este trabajo/prompt).

Requisitos y criterios de aceptación
General / Interfaz

El título de la pestaña y el encabezado de la app deben ser Timer and Countdown (en inglés).

Layout limpio con fondo blanco, visual similar o mejor que el sitio de referencia.

Dos modos principales: Countdown y Stopwatch. El usuario debe elegir uno desde una pantalla inicial.

Siempre mostrar la hora en orden: horas:minutos:segundos.milisegundos con formato HH:MM:SS.mmm (ceros a la izquierda obligatorios).

Mostrar siempre un título claro que indique el estado actual (por ejemplo: Choose mode, Countdown configured, Running countdown, Stopwatch running, Paused, etc.). Todo en inglés.

Permitir volver a la pantalla inicial desde cualquier estado.

Los botones deben tener iconos (usar SVG inline dentro del HTML — no usar fuentes externas de iconos).

Excelente usabilidad y rendimiento en escritorio y móvil.

Debe funcionar solo con index.html + script.js, sin pasos de compilación.

Cuenta atrás (comportamiento)

Panel de configuración con entradas para horas, minutos, segundos.

Validar minutos y segundos: si alguno > 59, mostrar alert() con "Minutes and seconds must be 0–59." y no permitir configurar.

Una vez configurada, los botones deben tener la misma estructura y etiquetas que el cronómetro: Start / Pause / Continue y Clear.

Clear vuelve al estado inicial (cero/reset), igual que en el cronómetro.

La cuenta atrás decrementa hasta cero.

Añadir un botón adicional (New o Edit) para configurar una nueva cuenta atrás sin volver a la pantalla de selección.

Cronómetro (comportamiento)

Mostrar display y controles: Start, Pause (cuando esté en marcha), Continue (cuando esté pausado) y Clear (vuelve a 00:00:00.000).

Estructura y etiquetas idénticas a las de la cuenta atrás para consistencia.

Precisión / rendimiento

Usar técnicas de tiempo precisas (performance.now() o Date.now() con cálculo de elapsed) y requestAnimationFrame o un setTimeout controlado para actualizar la UI.

Mostrar milisegundos como tres dígitos (000–999).

Minimizar uso de CPU cuando la app está inactiva o pausada.

Accesibilidad y estándares

Aplicar WCAG: HTML semántico, controles accesibles por teclado, estilos de foco visibles, aria-* cuando proceda (role="timer", aria-live="polite" si es útil).

Código HTML/CSS válido (W3C) siempre que sea posible.

Usar metodología BEM en las clases CSS.

Contraste y tamaño de texto adecuados para móviles.

Estilo y buenas prácticas

JavaScript moderno (ECMAScript). Código claro y legible.

Seguir convenciones compatibles con ESLint y Prettier (camelCase, no variables sin usar, nombres descriptivos).

Mantener CSS modular; evitar style inline salvo para cambios dinámicos necesarios.

index.html mínimo (markup + estilos + SVGs + <script src="script.js">); toda la lógica en script.js.

Comentarios breves en script.js en funciones críticas.

Manejar casos límite (por ejemplo, countdown a 0).

Entregables

index.html

script.js

(Opcional) lista de verificación de criterios como comentarios al inicio de cada fichero.

Textos exactos (usar en inglés)

Título app (tab & header): Timer and Countdown

Pantalla selección: Choose mode

Botones: Start, Pause, Continue, Clear, Set, New (o Edit)

Mensaje de validación: "Minutes and seconds must be 0–59."

Pruebas / QA recomendadas

Configurar 0:0:70 → debe aparecer alert().

Configurar 0:2:30, Set, Start → debe llegar a 00:00:00.000 y detenerse.

Cronómetro: Start → Pause → Continue → validar tiempo transcurrido correcto.

Navegación por teclado: Tab y activar con Enter/Space.

Comprobar en móvil (≈360px) y escritorio (1366px).

aria-live o similar para que lectores de pantalla anuncien cambios clave.

Notas de implementación sugeridas

Use performance.now() como fuente de tiempo y calcule elapsed = now - base.

Use requestAnimationFrame para las actualizaciones visuales.

Para cuenta atrás: remaining = initialMs - elapsed y asegurar remaining >= 0.

Use SVG inline para iconos (play/pause/reset/clock).

Archivos para adjuntar

Adjuntar index.html y script.js con la implementación final y código válido.

---

### PROMPT 2: Prompt Detallado para la Implementación Base - ENVIADO A CHATGPT EN INGLÉS

Goal — brief:
You are an expert front-end developer. Implement a small, high-quality web app (pure HTML + CSS + JavaScript, no frameworks or libraries) that reproduces and improves the visual/UX of the example (https://www.online-stopwatch.com/
) for Timer and Countdown functionality. Deliver two files: index.html and script.js (attach them to this job/prompt).

Requirements & Acceptance Criteria
General / UI

Page title (browser tab) and app header must be Timer and Countdown (English).

Single, white background layout (clean, clear, visually similar or improved from the reference).

Two main modes: Countdown and Stopwatch (cronómetro). The user chooses one on an initial screen.

Always display time in order: hours:minutes:seconds.milliseconds with format HH:MM:SS.mmm for both modes (leading zeros required).

Always display a clear title indicating the current state (e.g., Choose mode, Countdown configured, Running countdown, Stopwatch running, Paused, etc.). All text must be in English.

Always allow returning to the initial mode-selection screen from anywhere.

Buttons must include icons (use inline SVG icons embedded in HTML — no external icon fonts). Icons should visually match the button action (play, pause, reset, set, edit/new).

Provide very good usability and performance for typical desktop and mobile viewports.

Implementation must work perfectly with only index.html + script.js and a small internal <style> or linked CSS block inside index.html is acceptable. Do not require build steps.

Countdown (behavior)

Input configuration panel must accept hours, minutes, seconds.

Validate minutes and seconds: if either > 59, show an alert() with message "Minutes and seconds must be 0–59." and prevent setting the countdown.

Buttons in the configured countdown must follow the same structure and labels as the stopwatch: Start / Pause / Continue and Clear.

Clear returns to initial state (zeroed/reset) — same behavior as stopwatch.

The countdown runs backwards from the configured time to zero.

Include an extra button (e.g., New or Edit) to quickly reconfigure a new countdown without returning to the mode-selection screen.

Stopwatch (behavior)

Show the display and these controls: Start, Pause (when running), Continue (when paused), and Clear (resets to 00:00:00.000 and returns to start state).

Buttons and their structure must match the countdown controls (consistent UX).

Timing accuracy / performance

Use timing techniques that keep the display accurate (e.g., use performance.now() or Date.now() for timestamps and compute elapsed time; use requestAnimationFrame for updates or a properly managed setTimeout loop; do not rely on naïve setInterval increments).

Milliseconds must be shown as three digits (000–999) and update smoothly when running.

Minimize CPU use when idle or paused.

Accessibility & Standards

Follow WCAG best practices: semantic HTML, keyboard-accessible controls, visible focus styles, ARIA attributes where appropriate (e.g., role="timer", aria-live="polite" for dynamic updates if needed).

Follow W3C valid HTML/CSS where practical (no malformed tags).

Use BEM naming for CSS classes.

Provide sufficient color contrast and text sizes usable on small screens.

Code style & best practices

JavaScript should follow modern ECMAScript standards.

Apply conventions compatible with ESLint and Prettier (camelCase variables, no unused vars, clear function names, consistent indentation, semicolons optional depending on chosen style but be consistent).

Keep CSS modular and maintainable; avoid inline style attributes except for dynamic runtime changes if necessary.

Keep index.html minimal (structure + UI + inline SVG icons + link to script.js). Put logic in script.js.

Include short comments in script.js explaining critical functions (start/pause/continue/clear, time calculation).

Use feature detection and defensive checks; handle edge cases cleanly (e.g., setting a 0:0:0 countdown should either be prevented or immediately show finished state).

Deliverables

index.html — includes the markup, minimal styles (or a short linked <style> block), embedded SVG icons, and <script src="script.js"></script> at the end.

script.js — contains all behavior and initialization.

A short checklist at the top of each file (as comments) listing the acceptance criteria passed (optional but appreciated).

Exact strings (use these English labels)

App title (tab & header): Timer and Countdown

Mode selection screen title: Choose mode

Buttons: Start, Pause, Continue, Clear, Set, New (or Edit for configuring new countdown)

Validation alert: "Minutes and seconds must be 0–59."

Tests / QA to run before delivery

Configure countdown 0:0:70 → alert() should appear.

Configure countdown 0:2:30, press Set, Start, and observe decreasing to 00:02:30.000 → 00:00:00.000 and then stop.

Start stopwatch, pause after a few seconds, continue and validate elapsed time equals wall-clock time.

Keyboard navigation: Tab to controls, activate via Enter/Space.

Responsiveness: check on mobile width ~360px and desktop 1366px.

Accessibility: screen reader announces the current mode and timer updates (basic aria-live).

Implementation notes (suggestions for the developer)

Use performance.now() for high-resolution time and keep a base timestamp to compute elapsed rather than incrementing by fixed ticks.

Use requestAnimationFrame for updates while running to sync updates to the browser repaint cycle.

For the countdown, compute remaining = initialMs - elapsedMs and clamp to zero.

Use inline SVG icons (play, pause, refresh, clock) inside buttons for cross-browser reliability.

Files to attach

Attach index.html and script.js containing the final implementation and valid code.

### #################################### IMPORTANTE ####################################
### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### 
He tenido que volver a empezar porque no me salía, y me quedaba poco tiempo. He probado en chatGPT, pero no tenía permiso para subir imágenes. Los prompts de arriba son los últimos con los que he generado la aplicación que existe. Los de abajo, son los que he ido haciendo pero que seguía sin funcionar, y he vuelto a iniciar cambiando y especificando mejor. Sé que no es lo mejor, pero no me daba tiempo.
### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### 
### #################################### IMPORTANTE ####################################

### PROMPT 3: CORREGIR PROBLEMAS DE LA APLICACIÓN

Quiero que me ayudes a escribir el prompt más optimizado para los siguientes requisitos, y que lo muestres en inglés y en castellano:

Hay que modificar los ficheros HTML y JS adjuntos, además de revisar las imágenes que te envío.

El Countdown (Cuenta atrás) permite configurar el tiempo, pero una vez configurado, no se puede ejecutar. Es necesario que, una vez establecido, los botones funcionen igual que en el cronómetro (Start/Pause/Continue), con la diferencia de que el tiempo irá hacia atrás desde el tiempo configurado.

Como se puede ver en las imágenes, el diseño web es muy simple y quiero mejorarlo. El título de la pestaña del navegador debe ser 'Timer and Countdown', al igual que el título visible en la aplicación. El fondo de la aplicación lo quiero blanco por motivos de ergonomía, y los botones deben incluir iconos. En el modo Countdown quiero el mismo formato de botones que en el Stopwatch (es decir, sin el teclado numérico visible en la imagen).

Es imprescindible que el código siga las buenas prácticas y estándares previamente establecidos (W3C, WCAG, BEM, ESLint/Prettier).





### PROMPT 4: SOLICITAR CORRECCIÓN DE LA APLICACION
Eres un **experto desarrollador front-end** con dominio de HTML, CSS y JavaScript.

**Tarea:** Modificar los ficheros `index.html` y `script.js` adjuntos para implementar un diseño y funcionalidad mejorados, siguiendo estrictamente las imágenes proporcionadas y los siguientes requisitos:

#### 1. Funcionalidad y Estándares

* **Countdown (Cuenta Atrás):**
    * Una vez configurado, los botones deben funcionar idénticamente al Cronómetro: **Start / Pause / Continue**.
    * El tiempo debe **decrementar** desde el valor configurado.
* **Requisitos Técnicos (Imprescindible):**
    * Mantenimiento estricto de las buenas prácticas y estándares: **W3C, WCAG (accesibilidad), BEM (CSS), y convenciones ESLint/Prettier (JavaScript/ECMAScript).**

#### 2. Mejoras de Diseño y Estructura

* **Diseño Web:** Mejorar significativamente el diseño simple visto en las imágenes.
* **Fondo:** El fondo de la aplicación debe ser de color **blanco** (por ergonomía).
* **Títulos:**
    * El título de la pestaña (tag `<title>`) y el título visible en la aplicación deben ser: **"Timer and Countdown"**.
* **Botones:**
    * Todos los botones deben ser rediseñados para incluir **iconos** relevantes (e.g., Play/Pause/Stop/Reset/Settings).
    * El modo **Countdown** debe usar el **mismo formato de botones** que el modo Stopwatch (es decir, **sin teclado numérico**; la configuración se realizará a través de inputs dedicados).

#### 3. Implementación

* **Modificar el código HTML y JS** para que la aplicación funcione correctamente y luzca el nuevo diseño.

Adjunta el código completo y corregido de `index.html` y `script.js` en bloques de código separados.




### PROMPT 4: SOLICITAR CORRECCIÓN DE LA APLICACION - ENVIADO A GEMINI EN INGLES
You are an **expert front-end developer** proficient in HTML, CSS, and JavaScript.

**Task:** Modify the attached `index.html` and `script.js` files to implement improved design and functionality, strictly following the provided images and the requirements below:

#### 1. Functionality and Standards

* **Countdown:**
    * Once configured, the buttons must function identically to the Stopwatch: **Start / Pause / Continue**.
    * The time must **count backward** from the configured value.
* **Mandatory Technical Requirements:**
    * Strict adherence to established best practices and standards: **W3C, WCAG (accessibility), BEM (CSS), and ESLint/Prettier conventions (JavaScript/ECMAScript).**

#### 2. Design and Structure Improvements

* **Web Design:** Significantly improve the simple design shown in the attached images.
* **Background:** The application background must be **white** (for ergonomic reasons).
* **Titles:**
    * The browser tab title (`<title>`) and the visible application title must be: **"Timer and Countdown"**.
* **Buttons:**
    * All buttons must be redesigned to include relevant **icons** (e.g., Play/Pause/Stop/Reset/Settings).
    * The **Countdown** mode must use the **same button format** as the Stopwatch mode (i.e., **no numeric keyboard**; configuration should use dedicated input fields).

#### 3. Implementation

* **Modify the HTML and JS code** so the application functions correctly and features the new design.

Provide the complete and corrected code for `index.html` and `script.js` in separate code blocks.


### PROMPT 5: CORREGIR OTROS PROBLEMAS DE LA APLICACIÓN - AÑADIR NUEVAS FUNCIONALIDADES

Quiero que me ayudes a escribir el prompt más optimizado para los siguientes requisitos, y que lo muestres en inglés y en castellano:

Eres un **experto desarrollador front-end** con dominio de HTML, CSS y JavaScript.

**Tarea:** Modificar los ficheros `index.html` y `script.js` adjuntos para implementar un diseño y funcionalidad mejorados, siguiendo estrictamente las imágenes proporcionadas y los siguientes requisitos:

#### 1. Funcionalidad y Estándares

* **Countdown (Cuenta Atrás):**
    * Los botones muestran dos textos Continue/Start Pause/Continue, etc. Se debe corregir para que salga correctamente lo indicado en cada momento.
    * Revisar que el funcionamiento de la cuenta atrás sea en todas las acciones correcto.
* **Stopwatch (cronómetro):**
    * Los botones muestran dos textos Start/Start Pause/Pause Clear/Clear, etc.Se debe corregir para que salga correctamente lo indicado en cada momento.
* **Requisitos Técnicos (Imprescindible):**
    * Mantenimiento estricto de las buenas prácticas y estándares: **W3C, WCAG (accesibilidad), BEM (CSS), y convenciones ESLint/Prettier (JavaScript/ECMAScript).**

#### 2. Mejoras de Diseño y Estructura

* **Control de errores:** Es significativo en la configuración de la cuenta atrás, que cuando se introduzca más de 59 minutos, o más de 59 segundos muestre un alert con colorido con la ingormación que ahora se muestra como title, debajo de los inputs, y que los inputs erróneos los ponga en rojo, para indicar que está mal.

#### 3. Implementación

* **Modificar el código HTML y JS** para que la aplicación funcione correctamente y luzca el nuevo diseño.

Adjunta el código completo y corregido de `index.html` y `script.js` en bloques de código separados.


### PROMPT 5: CORREGIR OTROS PROBLEMAS DE LA APLICACIÓN - AÑADIR NUEVAS FUNCIONALIDADES

Quiero que me ayudes a escribir el prompt más optimizado para los siguientes requisitos, y que lo muestres en inglés y en castellano:

Eres un **experto desarrollador front-end** con dominio de HTML, CSS y JavaScript.

**Tarea:** Modificar los ficheros `index.html` y `script.js` adjuntos para implementar un diseño y funcionalidad mejorados, siguiendo estrictamente las imágenes proporcionadas adjuntas y los siguientes requisitos:

#### 1. Funcionalidad y Estándares

* **Countdown (Cuenta Atrás):**
    * Los botones muestran dos textos Continue/Start Pause/Continue, etc. Se debe corregir para que salga correctamente lo indicado en cada momento.
    * Revisar que el funcionamiento de la cuenta atrás sea en todas las acciones correcto.
* **Stopwatch (cronómetro):**
    * Los botones muestran dos textos Start/Start Pause/Pause Clear/Clear, etc.Se debe corregir para que salga correctamente lo indicado en cada momento.
* **Requisitos Técnicos (Imprescindible):**
    * Mantenimiento estricto de las buenas prácticas y estándares: **W3C, WCAG (accesibilidad), BEM (CSS), y convenciones ESLint/Prettier (JavaScript/ECMAScript).**

#### 2. Mejoras de Diseño y Estructura

* **Control de errores:** Es significativo en la configuración de la cuenta atrás, que cuando se introduzca más de 59 minutos, o más de 59 segundos muestre un alert con colorido con la ingormación que ahora se muestra como title, debajo de los inputs, y que los inputs erróneos los ponga en rojo, para indicar que está mal.
* **Diseño de los botones en el countdown**:  Se debe pòner la misma organización o estructura en los botones del countdown como en el stopwatch para que sea más sencillo utilizarlo, si tienen misma organización, tamaño, etc.

#### 3. Implementación

* **Modificar el código HTML y JS** para que la aplicación funcione correctamente y luzca el nuevo diseño.

Adjunta el código completo y corregido de `index.html` y `script.js` en bloques de código separados.


### PROMPT 6: CORREGIR OTROS PROBLEMAS DE LA APLICACIÓN - AÑADIR NUEVAS FUNCIONALIDADES - EN INGLES

You are an **expert front-end developer** proficient in HTML, CSS, and JavaScript.

**Task:** Modify the attached `index.html` and `script.js` files to correct critical usability errors, implement visual input validation, and enhance design consistency.

### 1. Functionality and Standards

* **Buttons (Critical Fix):**
    * **Correct the display error** on **all buttons** (Stopwatch and Countdown) where the text and icon duplicate or concatenate (e.g., "Start Start", "Pause Continue", "Clear Clear"). The button must show **only the correct text and icon** corresponding to the current state (Start, Pause, or Continue).
    * **Verify** the complete functionality of both the Countdown and the Stopwatch across all actions (Start, Pause, Continue, Clear).
* **Mandatory Technical Requirements:**
    * Strict adherence to established best practices and standards: **W3C, WCAG (accessibility), BEM (CSS), and ESLint/Prettier conventions (JavaScript/ECMAScript).**

### 2. Design and Structure Improvements

* **Input Validation (Countdown Configuration):**
    * Implement real-time validation: If the user enters **more than 59** into the Minutes or Seconds fields (or any other invalid value):
        * Display a **prominent, colorful error message** (banner or box style) below the configuration inputs (replacing traditional `alert()` dialogs).
        * The **border of the erroneous input fields** must turn **red** to visually indicate the fault.
* **Button Consistency:**
    * The **organization, structure, and size** of the main buttons in the **Countdown mode (Running/Paused state)** must be **identical** to those in the **Stopwatch mode** (Start/Pause, Clear).

### 3. Implementation

* **Modify the attached HTML and JS code** to implement all corrections and improvements.

Provide the complete and corrected code for `index.html` and `script.js` in separate code blocks.


### PROMPT 7: CORREGIR OTROS PROBLEMAS DE LA APLICACIÓN - AÑADIR NUEVAS FUNCIONALIDADES - EN INGLES
Quiero que me ayudes a escribir, mejorar el prompt. Lo quiero más optimizado para los siguientes requisitos, que lo muestres en inglés y en castellano, que me devuelvas el promt optimizado en formato MD:

Eres un **experto desarrollador front-end** con dominio de HTML, CSS y JavaScript.

**Tarea:** Modificar los ficheros `index.html` y `script.js` adjuntos para implementar un diseño y funcionalidad mejorados, siguiendo estrictamente las imágenes proporcionadas adjuntas y los siguientes requisitos:

#### 1. Funcionalidad y Estándares

* **Countdown (Cuenta Atrás):**
    * La funcionalidad de la cuenta atras, no funciona. Sólo se permite configurar el valor de horas, minutos, y segundos de forma correcta, pero cuando se pretende ejecutar la cuentaatrás, pulsando el botón de set. No funciona. Pero tampoco funciona, clear, ni funciona el botón de back. Sólo permite introducir valores, y validarlos (valida bien si son más de 59 minutos o más de 59 segundos).
    * Es importante que además, de lo que hace bien se cumplan estos requisitos
        * Permitir configurar **horas, minutos y segundos**, con la validación de minutos y segundos, que no puedan ser más de 59, y se muestre un alert, por ahora parece que lo hace bien
        * Botones iniciales: `Set` (ejecutar la configuración) y `Clear` (limpiar la configuración). Estos actualmente no funcionan y deben funcionar
        * Una vez configurado se debe permitir ejecutar, y se mostrará el display del tiempo y los botones deben ser `Start`/`Pause`/`Continue`. El botón `Clear` debe **restablecer al estado inicial de configuración**.
        * Botón adicional: `New Countdown` para volver al estado de configuración de la cuenta atrás sin cambiar de modo.
        * Botón de volver a la pantalla inicial
        * Todos estos botones, aunque sea algo lógico deben funcionar correctamente.

* **Requisitos Técnicos (Imprescindible):**
    * Mantenimiento estricto de las buenas prácticas y estándares: **W3C, WCAG (accesibilidad), BEM (CSS), y convenciones ESLint/Prettier (JavaScript/ECMAScript).**


#### 2. Implementación

* **Modificar el código HTML y JS** para que la aplicación funcione correctamente y luzca el nuevo diseño. Es importante, que revises bien, porque como experto en desarrollo estamos quedando muy mal, con tantos fallos.

Adjunta el código completo y corregido de `index.html` y `script.js` en bloques de código separados.



### PROMPT 8: CORREGIR OTROS PROBLEMAS DE LA APLICACIÓN - AÑADIR NUEVAS FUNCIONALIDADES - EN INGLES
You are an **expert front-end developer** proficient in HTML, CSS, and JavaScript.

**Task:** Modify the attached `index.html` and `script.js` files. The primary goal is to **fix and implement the complete, broken functionality of the Countdown mode**, while maintaining the high coding and design standards set previously.

### 1. Functionality (Critical Countdown Fix)

The **Countdown configuration view** is currently inoperable. All state transition logic and button functionality must be corrected and implemented.

* **Configuration (Initial State):** Must allow setting **hours, minutes, and seconds** (validating that Min/Sec $\leq 59$).
    * **`Set` Button:** Must **function** to validate, store the time, and **transition** to the running view.
    * **`Clear` Button (Config):** Must **function** to clear the input fields and the error state.
    * **`Back to Mode` Button:** Must **function** to return to the initial selection screen.
* **Execution (Running/Paused State):** Once configured (after pressing `Set`), the system must allow execution.
    * **Main Buttons:** Must feature `Start` / `Pause` / `Continue`, working correctly to control the time decrement.
    * **`Clear` Button (Running):** Must **function** to stop the timer and **reset it** to the previously configured value (not to zero).
    * **`New Countdown` Button:** Must **function** to return to the configuration state (inputs) without changing the mode.
    * **`Back to Mode` Button:** Must **function** to return to the initial selection screen.

### 2. Standards and Design (Maintenance)

* **Visual Validation:** Maintain the implemented error validation (Min/Sec $> 59$ shows red border on inputs and prominent error message).
* **Button Consistency:** Maintain the organization, structure, and size of the main Countdown buttons **identical** to the Stopwatch buttons.
* **Mandatory Technical Requirements:** Maintain strict compliance with **W3C, WCAG (accessibility), BEM (CSS), and ESLint/Prettier conventions (JavaScript/ECMAScript).**

Provide the complete and corrected code for `index.html` and `script.js` in separate code blocks.