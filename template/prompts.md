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

## Prompt CI/CD

> Genial!!! Ahora, estaría guay profundizar en CI/CD. ¿Podrías desarrollar test unitarios así como todo lo necesario para poder correrlos en un workflow de github? Sientete libre de definir todos los test unitarios que veas necesarios: Opción StopWatch  vs CountDown vs Both, Parada y arranque de reloj, limpieza del contador,  ajuste del valor en caso de introducir números mayores de 60 minutos o 60 segundos, etc, etc..

¡Absolutamente! Este es el paso lógico para profesionalizar el componente.

Para integrar Pruebas Unitarias y un flujo de CI/CD con GitHub Actions, necesitamos cuatro cosas:

- Un package.json para definir nuestras dependencias de desarrollo (Jest).
- Modificar script.js ligeramente para que sus funciones se puedan exportar y probar.
- Un fichero de tests (script.test.js) con Jest.
- Un fichero de workflow (.github/workflows/ci.yml) para GitHub Actions.
- Aquí tienes el desarrollo completo.


**Paso 1**: package.json
Primero, necesitamos un fichero package.json en la raíz de tu proyecto para gestionar la dependencia de Jest.

**Acción**: Deberás ejecutar npm install en tu terminal para instalar Jest
## 
**Paso 2**: Modificar script.js para ser "Testable"
Para que Jest pueda "ver" las funciones de script.js, necesitamos exportarlas. Añadiremos module.exports al final del fichero.

**Nota**: He añadido dos funciones __setState y __getInitialState para controlar y resetear el estado global de tu librería entre cada test, lo cual es una buena práctica fundamental en los tests unitarios.
## 
**Paso 3**: Fichero de Tests Unitarios (script.test.js)
Aquí es donde definimos todos los casos de prueba. Este fichero debe ir en la raíz, junto a script.js.
## 
**Paso 4**: Workflow de GitHub Actions
Finalmente, crea esta estructura de carpetas y el fichero: .github/workflows/ci.yml.
## 
Resumen del Flujo de Trabajo
Desarrollas en una rama nueva.
1. Abres un Pull Request para fusionar tu rama con main.
2. GitHub Actions detecta el PR automáticamente, inicia una máquina virtual (ubuntu-latest), descarga tu código, instala jest (usando npm ci) y ejecuta npm test.
3. Si los tests fallan, GitHub te bloqueará la fusión del PR (requiere configuración de protección de rama) y te avisará.
4. Si los tests pasan, verás un "check" verde y podrás fusionar el código con la confianza de que no has roto nada de la lógica existente.