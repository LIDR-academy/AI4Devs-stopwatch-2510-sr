Gemini 2.5 Pro
Prompt 1: (Imagenes utilizadas en carpeta res)
==========================
Toma el rol de analista software y experto en html y javascript. Necesito que me devuelvas una especificación completa para ejecutar un desarrollo mediante IA y que me indiques los objetivos, las especificaciones técnicas y las especificaciones funcionales a tener en cuenta necesarias para poder desarrollarlo de forma completa. Quiero que tu especificación sea suficiente para la implementación completa. 

El desarrollo consiste en una página index.html y un javascript script.js que implementará un cronómetro (stopwatch) y una cuenta atrás (CountDown). Te proporciono los interfaces mediante imágenes que deben coincidir exactamente con el desarrollo que te solicito. En las imagenes se puede observar los distintos estados por los que que pasa el stopwatch o el countdown tras pulsar y las interacciones tras pulsar los botones mediante flechas. Las pantallas aparecen numeradas y en orden.

La pantalla de inicio numerada como 1 en las dos imágenes que adjunto, es única y sirve para poder acceder al stopwatch o al countdown. Desde esta página de inicio debemos poder pinchar en la flecha verde Stopwatch y que aparezca la segunda pantalla de la imagen stopwatch.png o en la flecha CountDown y aparezca la segunda pantalla de la imagen countdown.png. 

El StopWatch debe cubrir las siguientes funcionalidades (Imagen stopwatch.png):
- Pantalla 2: Inicialmente el contador de horas, minutos, segundos y milisegundos sale completamente a cero. El botón izquierdo aparece en verde con el texto Start y el derecho en rojo con el texto Clear.
- Pantalla 3: Al pinchar en el botón Start empezará el contador aumentando la hora segundo a segundo viendo su incremento secuencial. Al pulsar Start el botón start se mantiene en verde y cambia su texto a Pause.
- Pantalla 4: Al pichar el botón Pause el botón se vuelve azul con el texto Continue y el contador se para.
- Pantalla 3: Al pinchar en Continue el contador continua su incremento en segundos y el botón se vuelve verde y de nuevo con el texto Pause.
- Pantalla 2: Al pinchar sobre el botón Clear en cualquier estado la hora se resetea a ceros y el botón izquerdo se vuelve verde con el texto Start.
- El botón de Back de la parte inferior izquierda permite volver a la pantalla de inicio número 1.

La pantalla del Countdown debe cubrir las siguientes funcionalidades (Imagen countdown.png):
- Pantalla 2: Cuando llegamos del inicio a esta pantalla aparece el contador de horas, minutos, segundos y milisegundos completamente a cero y los números de la parte inferior nos permitirán definir una hora de inicio para la cuenta atras. Aparecen los botones Set en verde y Clear en gris en la parte derecha de los botones con los números.
- Pantalla 3: Cada vez que pulsemos un número se empezarán a rellenar los números de la parte superior empezando de izquierda a derecha, es decir al pichar el primer número se rellenarían los segundos, si pinchamos un segundo número este nuevo número pasa a ser los segundos y el anteriormente indicado pasa a las decenas de segundo y así sucesivamente hasta las decenas de hora.
- Pantalla 2: El botón Clear que aparece en gris volverá a dejar a ceros la hora de inicio de la cuenta atrás.
- Pantalla 4: Tras haber pulsado el botón Set la fecha de inicio aparece arriba y el botón Start en verde y el de Clear en rojo en la parte inferior.
- Pantalla 5: Si pulsamos el botón Start se inicia la cuenta atras decrementando la hora de inicio y viendo la hora decrementarse segundo a segundo. Se mantiene el botón en Verde pero con el texto Pause.
- Pantalla 6: Si pulsamos el botón Pause, el botón se hace azuul con el texto Continue. El contador se pausa en el punto en que se encontrara.
- Pantalla 5: Si pulsamos el botón Continue, el botón se hace verde de nuevo con el texto Pause y la hora continuará decrementandose en el punto en que se encontrara.
- Pantalla 4: Si pulsamos el botón Clear en cualquier estado la hora de inicio se vuelve a poner a la hora seteada inicialmente en la pantalla anterior y el botón izquierdo pasa a verde con el texto Start.
- El botón de Back de la parte inferior izquierda permite volver a la pantalla de inicio.

Respuesta
=========================
1. Especificación de Desarrollo: Cronómetro y Cuenta Atrás

    1.1. Resumen del Proyecto
        El objetivo es desarrollar una aplicación web de una sola página (SPA) que combine las funcionalidades de un Cronómetro (Stopwatch) y una Cuenta Atrás (Countdown). La aplicación se compondrá de un único archivo index.html (con CSS incrustado) y un archivo script.js. El diseño y flujo de la interfaz de usuario (UI/UX) deben replicar exactamente los diagramas proporcionados.

    1.2. Objetivos del Desarrollo
        - Funcionalidad Dual: Implementar dos modos de operación claros y distintos.
        - Fidelidad Visual: Replicar con precisión el diseño, incluyendo la disposición, colores de botones en sus diferentes estados (verde, rojo, azul, gris) y textos.
        - Gestión de Estado: Implementar correctamente todos los flujos de estado (Inicio, Pausa, Continuar, Limpiar, Configurar).
        - Tecnología: Utilizar HTML5, CSS3 (en <style>) y JavaScript (ES6+ Vanilla) sin dependencias.

    1.3. Especificaciones Técnicas
        - Archivos Requeridos:
            - index.html: Contendrá la estructura HTML de todas las vistas y los estilos CSS.
            - script.js: Contendrá toda la lógica de la aplicación.
        - Estructura HTML (index.html):
            - El <body> debe contener tres contenedores/vistas principales:
                1. id="home-screen" (Pantalla 1 - Inicio)
                2. id="stopwatch-screen" (Pantallas 2, 3, 4 de Stopwatch)
                3. id="countdown-screen" (Pantallas 2, 3, 4, 5, 6 de Countdown)
            - La navegación se gestionará con JavaScript, cambiando la propiedad `display` de las vistas.
        - Lógica de JavaScript (script.js):
            - Gestión de Estado: Se debe mantener un estado global para saber qué vista está activa.
            - Temporizadores: Utilizar `setInterval()` o `requestAnimationFrame()` para las actualizaciones. Usar `Date.now()` para los cálculos de tiempo transcurrido y restante para evitar la desviación (drift).
            - Formato de Tiempo: Crear una función helper (ej. formatTime(milliseconds)) que convierta un valor de milisegundos a HH, MM, SS y mmm con el relleno de ceros (padding) adecuado.

    1.4. Especificaciones Funcionales

        1.4.1. Vista 1: Pantalla de Inicio (Pantalla 1 - Común)
            - UI: Mostrar dos áreas clickables: "Stopwatch" (flecha verde) y "Countdown" (flecha roja).
            - Eventos:
                - Al hacer clic en "Stopwatch":
                    1. Ocultar "home-screen".
                    2. Llamar a la función resetStopwatch() para asegurar el estado inicial.
                    3. Mostrar "stopwatch-screen".
                - Al hacer clic en "Countdown":
                    1. Ocultar "home-screen".
                    2. Llamar a la función resetCountdown(true) para asegurar el estado de configuración inicial.
                    3. Mostrar "countdown-screen".

        1.4.2. Vista 2: Cronómetro (Stopwatch)
            - Descripción: Esta vista (id="stopwatch-screen") gestiona los estados 2, 3 y 4 de stopwatch.png.
            - Componentes HTML:
                - Display de tiempo: <span id="sw-display">00:00:00</span> y <span id="sw-ms">000</span>.
                - Botón principal: <button id="sw-main-btn">Start</button>.
                - Botón secundario: <button id="sw-clear-btn">Clear</button>.
                - Botón de volver: <button id="sw-back-btn">Back</button>.
            - Variables de Estado (JS):
                - sw_startTime = 0
                - sw_elapsedTime = 0 (Guardará el tiempo acumulado al pausar)
                - sw_timerId = null
            - Flujo Funcional:
                1. Estado Inicial (Pantalla 2):
                    - Display: "00:00:00 000".
                    - Botón principal (#sw-main-btn): Texto "Start", color verde.
                    - Botón secundario (#sw-clear-btn): Texto "Clear", color rojo.
                2. Clic en "Start" (Transición 2 -> 3):
                    - Llamar a startStopwatch().
                    - sw_startTime = Date.now() - sw_elapsedTime.
                    - sw_timerId = setInterval(updateStopwatch, 10).
                    - Botón principal: Cambiar texto a "Pause", mantener color verde.
                3. Función updateStopwatch():
                    - Calcula const currentElapsedTime = Date.now() - sw_startTime.
                    - Actualiza el DOM del display con el tiempo formateado.
                4. Clic en "Pause" (Transición 3 -> 4):
                    - Llamar a pauseStopwatch().
                    - clearInterval(sw_timerId).
                    - sw_elapsedTime se actualiza con (Date.now() - sw_startTime).
                    - Botón principal: Cambiar texto a "Continue", color azul.
                5. Clic en "Continue" (Transición 4 -> 3):
                    - Llamar a startStopwatch() de nuevo.
                    - Botón principal: Cambiar texto a "Pause", color verde.
                6. Clic en "Clear" (Desde Pantalla 3 o 4 -> 2):
                    - Llamar a resetStopwatch().
                    - clearInterval(sw_timerId).
                    - sw_startTime = 0, sw_elapsedTime = 0, sw_timerId = null.
                    - Actualizar display a "00:00:00 000".
                    - Botón principal: Cambiar texto a "Start", color verde.
                7. Clic en "Back":
                    - clearInterval(sw_timerId).
                    - Ocultar "stopwatch-screen", mostrar "home-screen".

        1.4.3. Vista 3: Cuenta Atrás (Countdown)
            - Descripción: Esta vista (id="countdown-screen") gestionará dos sub-vistas internas:
                1. Vista de Configuración (id="cd-setup-view"): Pantallas 2, 3.
                2. Vista de Ejecución (id="cd-run-view"): Pantallas 4, 5, 6.
            - Componentes HTML:
                - Display (común): <span id="cd-display">00:00:00</span> y <span id="cd-ms">000</span>.
                - cd-setup-view: Botones numéricos (0-9), Botón "Set" (verde), Botón "Clear" (gris).
                - cd-run-view: Botón principal (#cd-main-btn), Botón "Clear" (#cd-clear-run-btn, rojo).
                - Botón de volver (común): <button id="cd-back-btn">Back</button>.
            - Variables de Estado (JS):
                - cd_setInput = '' (String para guardar la entrada numérica, ej: "1234").
                - cd_setTime_ms = 0 (El tiempo total configurado en milisegundos).
                - cd_remainingTime = 0
                - cd_targetTime = 0 (El Date.now() futuro al que se cuenta).
                - cd_timerId = null
            - Flujo Funcional (Configuración - Pantallas 2, 3):
                1. Estado Inicial (Pantalla 2):
                    - Mostrar "cd-setup-view", ocultar "cd-run-view".
                    - Display: "00:00:00 000".
                    - Botones: 0-9, "Set" (verde), "Clear" (gris).
                2. Clic en Números (Transición 2 -> 3):
                    - cd_setInput += digito_pulsado.
                    - Limitar cd_setInput a 6 dígitos (cd_setInput = cd_setInput.slice(-6)).
                    - Llamar a updateCountdownInputDisplay().
                3. Función updateCountdownInputDisplay():
                    - Parsea cd_setInput.padStart(6, '0') para rellenar el display (replicando el shift de derecha a izquierda).
                    - Ejemplo: cd_setInput = "1234" -> Display muestra "00:12:34 000".
                4. Clic en "Clear" (gris) (Transición 3 -> 2):
                    - cd_setInput = ''.
                    - Actualizar display a "00:00:00 000".
                5. Clic en "Set" (Transición 3 -> 4):
                    - Llamar a setCountdown().
                    - Parsear cd_setInput a milisegundos y guardar en cd_setTime_ms y cd_remainingTime.
                    - Actualizar display al tiempo configurado.
                    - Ocultar "cd-setup-view", mostrar "cd-run-view".
                    - Botón principal (#cd-main-btn): Texto "Start", color verde.
                    - Botón "Clear" (#cd-clear-run-btn): Texto "Clear", color rojo.
            - Flujo Funcional (Ejecución - Pantallas 4, 5, 6):
                1. Estado "Seteado" (Pantalla 4):
                    - Display muestra cd_setTime_ms formateado.
                    - Botón principal: "Start" (verde). Botón "Clear" (rojo).
                2. Clic en "Start" (Transición 4 -> 5):
                    - Llamar a startCountdown().
                    - cd_targetTime = Date.now() + cd_remainingTime.
                    - cd_timerId = setInterval(updateCountdown, 10).
                    - Botón principal: Cambiar texto a "Pause", mantener color verde.
                3. Función updateCountdown():
                    - cd_remainingTime = cd_targetTime - Date.now().
                    - Si cd_remainingTime <= 0:
                        - clearInterval(cd_timerId).
                        - cd_remainingTime = 0.
                        - Llamar a resetCountdownRun() para volver a Pantalla 4.
                    - Actualizar el DOM del display con cd_remainingTime formateado.
                4. Clic en "Pause" (Transición 5 -> 6):
                    - Llamar a pauseCountdown().
                    - clearInterval(cd_timerId).
                    - cd_remainingTime se preserva.
                    - Botón principal: Cambiar texto a "Continue", color azul.
                5. Clic en "Continue" (Transición 6 -> 5):
                    - Llamar a startCountdown().
                    - Botón principal: Cambiar texto a "Pause", color verde.
                6. Clic en "Clear" (rojo) (Desde Pantalla 5 o 6 -> 4):
                    - Llamar a resetCountdownRun().
                    - clearInterval(cd_timerId).
                    - cd_remainingTime = cd_setTime_ms (Importante: Se resetea al tiempo configurado).
                    - Actualizar display al tiempo configurado.
                    - Botón principal: Texto "Start", color verde.
                7. Clic en "Back" (Común):
                    - Llamar a resetCountdown(true).
                    - Ocultar "countdown-screen", mostrar "home-screen".
            - Función de Reseteo General resetCountdown(fullReset):
                - clearInterval(cd_timerId).
                - Si fullReset es true:
                    - cd_setInput = '', cd_setTime_ms = 0.
                    - Mostrar "cd-setup-view", ocultar "cd-run-view".
                    - Actualizar display a "00:00:00 000".

Gemini 2.5 Pro
Prompt 2: (Imagenes utilizadas en carpeta res)
==========================
Tomando el rol de desarrollador html y javascript realiza siguiente desarrollo en un fichero index.html y un script.js que cumpla la siguiente especificación y tomando como referencia de estilo las dos imagenes adjuntas. (Le paso a continuación la especificación anterior y adjunto las 2 imágenes).

Respuesta
=========================
La funcionalidad la cubre completamente todo lo que le he pedido y se podría ajustar un poco más el interfaz con más iteraciones.

