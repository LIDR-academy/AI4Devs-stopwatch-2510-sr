
# PROMPT 1
## Rol
Actua com un Senior Software Engineer experto en web applicatons usando HTML y Javascript

## Requerimiento
Necesito crear un aplicacion con el nombre stopewatch con dos features principales. 
1 - Stopwatch: es un cronometro con 2 botones:
 - cronometro: es un cronometro que tiene hora, minutos y segundos en numeros grandes y  milisegundos en numeros muchos mas chicos abajo del reloj a la derecha 

 - Start button: Cuando el user hace click en el boton, cambia el label a stop, y el cronometro empieza a contar. Cuando el usuario hace click de nuevo en el boton (con el label stop), el boton cambia de label a continue, y cuando el boton esta en modo continue, se reanuda la cuenta del reloj. Así sucesivamente hasta que se hace click en el boton Clear.

 - Clear button: Cuando el user hace click en el boton, el cronometro se resetea a 0, incluso cuando esta contando o esta parado.

2 - Countdown: Es un contador de tipo countdown que tiene un cronometro que hace la cuenta para abajo, un teclado con numeros del 0 a 9 , un boton set y un boton clear

 - cronometro: es un cronometro que tiene hora, minutos y segundos en numeros grandes y  milisegundos en numeros muchos mas chicos abajo del reloj a la derecha. Mismo diseño que el stopwatch

 - Botones teclado con numeros del 0 al 9: por cada boton que se haga click, va seteando los valores del cronometro de derecha a izquierda, ingresando segundos, minutos y horas. Los milisegundos no se setean, son solo lectura.

 - boton set: cuando se hace click en el boton set, el cronometro comienza ha funcionar haciendo una cuenta hacia abajo hasta llegar a 0. Luego de que se hace click en el boton set, desaparecen el boton set, el boton clear y los botones numericos, y se muestran los botones de start y clear: 
  - Start button: Cuando el user hace click en el boton, cambia el label a stop, y el cronometro empieza a contar. Cuando el usuario hace click de nuevo en el boton (con el label stop), el boton cambia de label a continue, y cuando el boton esta en modo continue, se reanuda la cuenta del reloj. Así sucesivamente hasta que se hace click en el boton Clear.

  - Clear button: Cuando el user hace click en el boton, el cronometro se resetea a 0, incluso cuando esta contando o esta parado.

 - boton clear: cuando el usuario hace click en el boton clear, se resetea el cronometro todo a 0.

## Diseño
La aplicacion va a constar de un Landin page Con boton que navegan a una funcionalidad o la otra, stopwatch y countdown.

Tanto la pantalla de stopwatch como countdown tiene un boton Back para volver a la landing page. 

Adjuto Imagen con los prototipos.

## Salida 
La salida de esta aplicacion va a ser un HTML index.html y un JS index.js, sigue las bueas practicas de programacion, entrega codigo limpio y bien estrucurado como un experto.

Empecemos a construir la aplicacion, la vamos a realizar en diferentes Tareas, vamos a desarrollar tarea por tarea, hasta que no termines con una tarea y yo te de el OK, no vamos a seguir con la siguiente.

Task 1 : Landing page

Task 2: Stopwatch

Task 3: Countdown

# PROMPT 2

Algo esta fallando , tengo este error y no navega Access to script at 'file:///C:/Users/Nico/workspace/ai4devs/AI4Devs-stopwatch-2510-sr/stopwatch-NO/index.js' from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: chrome, chrome-extension, chrome-untrusted, data, http, https, isolated-app.Understand this error index.html:185 GET file:///C:/Users/Nico/workspace/ai4devs/AI4Devs-stopwatch-2510-sr/stopwatch-NO/index.js net::ERR_FAILEDUnderstand this error

# PROMPT 3 

Ahora da este error GET file:///C:/Users/Nico/workspace/ai4devs/AI4Devs-stopwatch-2510-sr/stopwatch-NO/index.js net::ERR_FILE_NOT_FOUND

# PROMPT 4

El script se llamaba script.js, mala mia, ahora funciona a la perfección, vamos con la última tarea



