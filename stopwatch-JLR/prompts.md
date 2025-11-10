Promt de stopwatch - Gemini 2.5 Pro y Copilot GTP

---




**Caso de uso:**

Necesito crear un stopwatch con la funcionalidad de https://www.online-stopwatch.com/ y con la estructura de los ficheros que adjunto: "index.html" y "script.js"


**Contexto:**

Stopwatch es un reloj con diseño de reloj digital con horas, minutos, segundos y centesimas que el cual tiene dos opciones de funcionalidades.

1. Cuenta atrás
2. Cronómetro

En la funcionalidad de cuenta atrás primero habrá que introducir el tiempo que se quiere  para iniciar la cuenta atrás con un teclado digital del cero al nueve,

un botón de aceptar o set y otro clear para borrar si hay algún error. Al pulsar set/aceptar pasará a otra pantalla donde el tiempo introducido podrá iniciarse

o reiniciarse con un par de botones para cada función.


En la funcionalidad de cronometro existirá los mismos botones anteriormente dichos (iniciar y reiniciar) pero el contador al iniciar empezará a contar los segundos acumulándolos.

Mientras cuenta estos segundos, minutos y horas el botón de iniciar cambiará a pausar para pausar la cuenta del tiempo y el botón de reiniciar hará volver a cero todo el tiempo acumulado,

reiniciando la cuenta atrás desde cero.


**Especificación:**

El lenguaje para el script sera javascript, lo mas nativo posible y lo mas compatible posible para todos los navegadores, todo el codigo javascript

ira dentro del fichero "script.js" que se llama en el fichero "index.html".

La maquetación estará en el fichero index.html y necesito un diseño en css adjunto a dicho html como el diseño que te muestro en el fichero adjunto "smartwatch.png"


**Ejemplos de uso:**

En el menú principal tengo dos opciones stopwatch y countdown hago click en stopwatch y voy a una pantalla donde tengo un botón de iniciar y otro de reiniciar.

Pulso iniciar y espero un minuto, al minuto pauso en el botón de pausar la cuenta atrás.

En el menú principal tengo dos opciones stopwatch y countdown hago click en countdown y voy a una pantalla donde tengo todos lo números. Voy clickando en

todos ellos para introducir un minuto exacto y hago click en set. Al clickar set me cambia a una pantalla con el minuto introducido y dos botónes iniciar y clear,

pulso en iniciar y empieza la cuenta a atrás del minuto hasta llegar a cero sin pulsar ningún botón, al llegar a cero el reloj para automáticamente.
