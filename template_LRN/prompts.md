Crea una aplicación web de cronómetro (stopwatch) interactiva basada en las imagenes adjuntas y que cumpla con estos requisitos:

FUNCIONALIDAD:
- Modo Stopwatch (cronómetro): cuenta hacia adelante desde 00:00:00
- Modo Countdown (cuenta regresiva): cuenta hacia atrás desde un tiempo establecido
- Selector de modo mediante dos botones/iconos claramente diferenciados
- Pantalla digital mostrando formato HH:MM:SS con precisión de milisegundos (000)
- la aplicación debe tener 3 paginas. 

INTERFAZ - INICIAL:
- Se debe basar en la imagen adjunta web1.png
- Botón para Stopwatch que redirige a la pagina de MODO STOPWATCH
- Botón para Coutdown que redirige a la pagina de MODO COUNTDOWN

INTERFAZ - MODO STOPWATCH:
- Se debe basar en la imagen adjunta stopwatch.png
- Teclado numérico con botones 0-9 para entrada manual
- Botón "Set" para confirmar tiempo personalizado
- Botón "Clear" para resetear entrada
- Botones de control: Start (verde), Stop/Pause, Reset
- Botón "Back" para regresar a INTERFAZ - INICIAL

INTERFAZ - MODO COUNTDOWN:
- Pantalla similar mostrando tiempo regresivo
- Botón "Start" (verde grande) para iniciar cuenta
- Botón "Clear" (rojo grande) para resetear
- Botón "Back" para regresar INTERFAZ - INICIAL

ESTILO VISUAL:
- Debe cumplir con el estilo de las imagenes adjuntas
- Header azul marino (#1a3a6b) con texto "www.online-stopwatch.com"
- Fondo gris claro
- Pantalla digital con borde redondeado y fondo gris claro
- Números en tipografía monoespacial, tamaño grande (fuerte contraste)
- Botones numéricos: verde brillante (#00cc00) con borde oscuro
- Botón "Set": verde (#00cc00)
- Botón "Clear": gris (#999999) en modo stopwatch, rojo en countdown
- Botones de control: Start (verde), Stop/Pause (naranja), Reset (gris)
- Bordes redondeados en todos los botones
- Icono de flecha hacia arriba (verde) para Stopwatch
- Icono de flecha hacia abajo (rojo) para Countdown

FUNCIONALIDADES TÉCNICAS:
- Precisión de milisegundos
- Transición suave entre modos
- Estados visuales diferenciados (activo/inactivo)
- Responsive en dispositivos pequeños
- Animaciones suaves en botones (hover effects)

REQUERIMIENTOS ADICIONALES:
- Usar solo HTML5, CSS3 y JavaScript vanilla (sin dependencias externas)
- Asegurar compatibilidad con navegadores modernos
- Interfaz intuitiva y accesible
- Código limpio y bien comentado
- Generar 3 archivos index.hml, style.css, script.js