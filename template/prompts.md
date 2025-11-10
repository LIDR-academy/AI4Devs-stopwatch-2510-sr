# Stop Watch (Gemini 2.5 Pro)
## Prompt Inicial

> Como experto programador FrontEnd, sin utilizar framework alguno, necesito una página (index.html) que apoyada en un fichero auxiliar de librerías (script.js) desarrolle la funcionalidad equivalente a https://www.online-stopwatch.com/.

> Puedes guiarte de la siguiente imagen para diseñar la creatividad.

> Se dispone de dos funcionalidades:
> - **Stopwatch**. Permite arrancar y parar el reloj así como limpiar el contador. Fíjate que el reloj cuando está corriendo muestra milisegundos, segundos, minutos y horas.
> - **CountDown**. Permite definir el reloj contador (horas, minutos y segundos) ajustando el valor en caso de introducir números mayores de 60 minutos o 60 segundos. Con el típico start/stop y clean.

> Necesito que desarrolles como si de un componente fuera que pudiese incrustarse en otros portales web (típico iframe). Ideal, que proporcionases un ejemplo de document.html que proporcionarse información de cómo incrustar esta funcionalidad en otro portal y que existiera un link a ese documento desde index.html. Así pues, debería haber algún mecanismo para cargar la página en modo StopWatch o CountDown o ambas y que el usuario elija una u otra.


¡Excelente desafío! Como experto en FrontEnd, valoro la eficiencia y la modularidad, incluso sin frameworks.

Aquí tienes la solución completa, dividida en los tres ficheros solicitados, diseñada para ser un "componente" integrable y controlable vía URL.

1. index.html (La Aplicación Principal)
Este fichero contiene la estructura (HTML), el estilo (CSS) y la lógica de "arranque" (el script inline) que conecta la estructura con nuestra librería.

2. script.js (La "Librería" Auxiliar)
Este fichero contiene toda la lógica de estado y cálculo, sin tocar el DOM directamente. Utiliza callbacks para comunicar los cambios al index.html.

3. document.html (Documentación de Integración)
Este fichero explica cómo un tercero puede usar tu index.html como un componente iframe.

> No queda muy bonito que el botón Stop tenga el mismo fondo que el botón Clear. ¿Se te ocurre alguna manera de mejorarlo? Sólo indica el cambio a realizar no el fichero completo donde está ese cambio.

¡Absolutamente! Tienes razón, estéticamente es mejor diferenciarlo.

Para el cambio, simplemente ajustaría el CSS en el index.html. Modificaría la regla .btn-stop para darle un color más distintivo y apropiado para una acción de "detener", como un naranja o un gris oscuro.
