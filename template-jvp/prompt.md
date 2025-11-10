IA UTILIZADA: Claude Sonnet 4.5



Crea un stopwatch/cronómetro en HTML y JavaScript con el siguiente diseño y funcionalidades:



DISEÑO:

\* Display principal que muestre el tiempo en formato HH:MM:SS con milisegundos en tamaño más pequeño (000)

\* Fondo claro/gris suave para el display con bordes redondeados

\* Botones grandes y con color de fondo siguiendo las siguientes convenciones:

   \* Verde para acciones de inicio/continuar

   \* Rojo para detener/limpiar

   \* Azul para pausar

   \* Amarillo/naranja para registrar laps

\* Diseño limpio, moderno y responsive



FUNCIONALIDADES:

1\. MODO CRONÓMETRO (Cuenta adelante):

\* Botón "Start" para iniciar desde 00:00:00

\* Botón "Start" pasa a "Pause" cuando el cronómetro esté en marcha y cambia a "Continue" cuando está pausado.

\* Botón "Clear/Reset" para volver a cero

2\. MODO TEMPORIZADOR (Cuenta atrás):

\* Campos de entrada para configurar horas, minutos y segundos iniciales

\* Botón "Start" para iniciar la cuenta atrás

\* Botón "Start" pasa a "Pause" cuando la cuenta atrás está en marcha y a "Continue" cuando la cuenta se pausa.

\* Botón "Clear/Reset" para volver al tiempo configurado

\* Alerta visual y/o sonora cuando llegue a 00:00:00

3\. INTERFAZ:

\* Toggle o pestañas para cambiar entre modo cronómetro y temporizador

\* Dos botones controlan el funcionamiento.

\* Los botones deben cambiar según el estado (corriendo, pausado, detenido)

\* Animación suave en los cambios de números



REQUISITOS TÉCNICOS:

\* Usar setInterval o requestAnimationFrame para precisión

\* CSS moderno con flexbox/grid

\* JavaScript vanilla (sin frameworks)

\* Código limpio y bien comentado

\* Genera dos archivos: index.html y script.js

