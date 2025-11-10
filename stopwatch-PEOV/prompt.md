## **Contexto inicial**
Quiero montar una **Aplicación web** que tiene como finalidad **crear un cronómetro o crear cuenta atrás** utilizando **HTML y JavaScript puro**, sin frameworks ni librerías externas.

## Criterios técnicos:
- Separar el código HTML y JavaScript en index.html y script.js.
- Usar JavaScript puro **modular y comentado**..
- Aplicar los principios SOLID y CLEAN CODE.
- Implementar todos los registros necesarios en la consola.
- Capturar todas las excepciones posibles.
- Para CSS, usar Tailwind.
- Crear un sitio web responsivo.
- Incluir tests básicos: Añadir un bloque de **tests automáticos simples** en JavaScript usando `console.assert()` para validar el correcto funcionamiento de las funciones puras. 

## Criterios funcionales:
- una pantallla principal con dos botones: **un botón para acceder a la funcinalidad de cronómetro** y un **botón para acceder a la funcionalidad de cuenta atrás**. Puedes ver un ejemplo en image_home.png que te adjunto.
- al acceder a la **funcionalidad de cronómetro**, aparecerá un **contador con horas, minutos y segundos** inicialidado todo a cero como se muestra a continuación: 00:00:00 y habrán dos botones, uno para iniciar y uno para resetear; puedes verlo en la imagen image_crono_parado.png que te adjunto. Al pulsar el botón **iniciar** el cronómetro comenazará a avanzar en orden ascendente y el botón iniciar pasará a tener la funcionalidad de **pausar**, de modo que si lo pulsas el cronómetro debe detenerse (te adjunto un ejemplo image_crono_funcionando.png). Por su parte, el botón **reiniciar** pondrá de nuevo el cronómentro a cero y el otro botón volverá a estar en estado iniciar. 
- al acceder a la **funcionalidad de cuenta atrás**, aparecerá un **contador con horas, minutos y segundos** inicialidado todo a cero como se muestra a continuación: 00:00:00 y habrá un **teclado para inicializar el tiempo** (será el tiempo que irá contando el cronómetro hacia atrás) con un botón **asignar tiempo** para indicar que ese será el tiempo de la cuenta atrás, y un botón **borrar** para borrar lo que se ha pulsado en el teclado (puedes verlo en imagen_cuenta_atras_inicial.png). Al pulsar el botón **asignar tiempo** tanto el teclado desaparecerá como los botones asignar tiempo y borrar desaparecerán y solo veremos el cronómetro con el botón **iniciar** y el botón **reiniciar** (puedes verlo en la imagen imagen_cuenta_atras_listo.png que te adjunto). Al pulsar el botón iniciar, la cuenta atrás comenzará a funcionar, el botón iniciar cambiará a **pausar** (puedes verlo en imagen_cuenta_atras_pausa.png), de modo que si lo pulsas la cuenta atrás debe detenerse.Por su parte, el botón **reiniciar** pondrá de nuevo la cuenta atrás al valor que tenía antes de empezar a contar hacia atrás y el otro botón volverá a estar en estado iniciar.
- Tanto si se ha seleccionado la opción de cronómetro como si se ha seleccionado la opción de cuenta atrás, se debe permitir **volver atrás** para poder cambiar de una funcionalidad a otra.
- Tanto el cronómetro como la cuenta atrás tendrán un tiempo máximo de 99 horas, 99 minutos y 99 segundos. 
- Si fuera posible, tanto para el cronómetro como para la cuenta atrás, además de ver los segundos estaría muy bien poder ver el avance de los milisegundos.

## Criterios generales:
- Añade un título y una descripción atractivos.
- Ten en cuenta aplicar buenos principios de UI/UX
- Mostrar mensajes claros al usuario
- Generar un fichero **README.md** en formato **Markdown**, bien documentado para integrarse en GitHub o Confluence. Debe incluir: Descripción del proyecto, Estructura de ficheros, Requisitos de uso, Lógica de funcionamiento, Ejemplo de entrada/salida y Posibles mejoras futuras 

---

## **Estructura esperada del proyecto**

```
.
├── index.html                # Estructura principal de la app
├── script.js                 # Lógica separada + interacción DOM + tests
└── README.md                 # Documentación generada automáticamente
```

---

## **Instrucción final al asistente**
1. Actúa como **experto en desarrollo web** y genera:
- El contenido completo de `index.html`  
- El contenido completo de `script.js`  
- El fichero `README.md` en formato Markdown  
2. Genera un archivo .zip que contenga los 3 archivos anteriores completos y que esté listo para su descarga.

---

Antes de comenzar, asegúrate de que no necesitas ninguna aclaración adicional por parte del usuario. Si hay algo que pueda prestarse a confusión (por ejemplo, detalles de UI, nombres de botones, flujo de navegación o lógica de teclado), pregunta primero y espera la respuesta antes de generar los archivos.


🔧 ¿Antes de comenzar?
Solo una pregunta rápida antes de construir el código:
¿Quieres que el cronómetro y la cuenta atrás estén en una sola vista (SPA) donde se ocultan y muestran las secciones según la selección, o quieres que cada funcionalidad tenga su propia página HTML independiente?
Ambas son viables, pero para mantenerlo más limpio, moderno y manejable, puedo hacerlo como una SPA (Single Page Application) donde todo ocurre dinámicamente en una sola página (index.html), controlado desde script.js.
¿Está bien proceder así?