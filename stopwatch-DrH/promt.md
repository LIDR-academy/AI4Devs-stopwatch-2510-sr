1. Objetivo General
Escribe el java script  que contenga dos funcionalidades principales: un Cronómetro (conteo ascendente) y un Temporizador (conteo regresivo), utilizando HTML, JavaScript y la librería Bootstrap para el diseño y la estructura.
2. Estructura HTML (Basada en index.html + Bootstrap)
El archivo index.html debe ser modificado para incluir los links de Bootstrap y contener la estructura de la interfaz para ambas herramientas.
Modificaciones a index.html:

Integración de Bootstrap: Añadir el CDN de Bootstrap (CSS) en la sección <head>.
Contenedor Principal: Usar clases de Bootstrap (container, row, col) para centrar y organizar los dos módulos (Cronómetro y Temporizador).
Módulo 1: Cronómetro (Timer):
Un área de visualización (por ejemplo, un <h1> o <h2>) para mostrar el tiempo en formato HH:MM:SS.
Un botón principal "Start" que se convertirá en "Stop" al iniciar.
Un botón secundario "Reset".
Módulo 2: Temporizador (Countdown):
Tres campos de entrada (<input>) tipo número para que el usuario ingrese las Horas, Minutos y Segundos de la cuenta regresiva.
Un área de visualización para mostrar el tiempo restante en formato HH:MM:SS.
Un botón principal "Start Countdown" que se convertirá en "Pause" al iniciar.
Un botón secundario "Reset Countdown".
3. Funcionalidad JavaScript (Archivo script.js)
El archivo script.js debe contener toda la lógica para manejar ambos contadores.
3.1. Cronómetro (Timer - Conteo Ascendente)
Formato: Debe mostrar el tiempo en HH:MM:SS.
Lógica:
Utilizar setInterval() para actualizar el tiempo cada 1000 milisegundos (1 segundo).
La función de actualización debe incrementar los segundos, minutos y horas de manera secuencial (60 segundos = 1 minuto; 60 minutos = 1 hora).
Botón "Start / Stop":
Al presionar "Start", el contador debe iniciar y el texto del botón debe cambiar a "Stop".
Al presionar "Stop", el contador debe pausarse y el texto debe volver a "Start".
Botón "Reset": Debe detener el contador y restablecer el tiempo a 00:00:00.
3.2. Temporizador (Countdown - Conteo Regresivo)
Entrada de Usuario: Debe leer los valores ingresados por el usuario en los campos de Horas, Minutos y Segundos.
Lógica:
Convertir la entrada del usuario a un total de segundos.
Utilizar setInterval() para reducir el total de segundos cada 1000 milisegundos.
La función de actualización debe recalcular y mostrar el tiempo restante en formato HH:MM:SS.
Alarma: Cuando el contador llegue a 00:00:00, el temporizador debe detenerse y emitir algún tipo de alerta visual (por ejemplo, cambiar el color del texto o mostrar un mensaje).
Botón "Start Countdown / Pause":
Al presionar "Start", el contador debe iniciar la cuenta regresiva y el texto del botón debe cambiar a "Pause".
Al presionar "Pause", el contador debe detenerse temporalmente.
Botón "Reset Countdown": Debe detener el contador y restablecer los campos de entrada a 0, y el área de visualización a 00:00:00.

Gemini 

Promt2: Al cargar el index, tengo el sisguiete error: script.js:55 Uncaught TypeError: Cannot set properties of null (setting 'textContent')
toggleStopwatch @ script.js:55
onclick @ index.html:54Understand this error
script.js:37 Uncaught TypeError: Cannot set properties of null (setting 'textContent')
updateStopwatch @ script.js:37
setInterval
toggleStopwatch @ script.js:53
onclick @ index.html:54Understand this error
script.js:48 Uncaught TypeError: Cannot set properties of null (setting 'textContent')  

