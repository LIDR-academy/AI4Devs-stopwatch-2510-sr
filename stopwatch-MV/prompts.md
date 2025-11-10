DeepSeek

Quiero que asumas el rol de un desarrollador full-stack senior en donde hay que resolver el siguiente problema:
Necesitamos construir un stopwatch tomando como base el sitio https://www.online-stopwatch.com/, el archivo stopwatch.png como base para el diseño.
Tiene que tener la posibilidad de generar un contador incremental (stopwatch) y poder setear un tiempo y que vaya a cero (countdown).
En caso de llegar al límite para el caso del countdown que emita algún sonido
También en caso de llegar a cero que se destaque el tab donde se encuentre cambiando de color para llamar la atención
Tiene que tener la posibilidad de poder ver el tiempo transcurrido como titulo del documento
El formato para mostrar el tiempo en el título del documento es el siguiente: 00:00:00 horas, minutos y segundos
En caso que el tab no esté activo debería seguir descontando el tiempo o incrementando, dependiendo de la opción seleccionada
Para el caso de stopwatch implementar un botón para obtener resultados parciales que surga de la resta del tiempo actual y el tiempo del anterior parcial
También tendría que tener las opciones en Ingles, Español y Portugues, con un selector arriba a la derecha (Ingles por defecto)
Todo esto lo vamos a hacer en tres archivos, el primero es el index.html que te voy a pegar debajo del prompt, el archivo script.js y por último el archivo styles.css donde vamos a incluir todo lo referido a estilos
Vamos a agregar clases css para mantener separado lo que es html + css + js

archivo index.html:

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Timer and Countdown</title>
<link rel="stylesheet" href="styles.css">
</head>
<body>
<h1>Timer and Countdown</h1>
<script src="script.js"></script>
</body>
</html>

----- Corrección evaluando el resultado obtenido
No genera sonido y tampoco se actualiza cuando se cambia de tab
tampoco se actualiza el titulo del documento conforme el tiempo va avanzando o retrocediendo
