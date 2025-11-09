prompt
paso 1
Actua como desarrollador frontend especialista en html,css y javascript con 10 años de experiencia. 
contexto:necesito una solucion que pueda funcionar como un cronometro tendra 2 botones uno de iniciar y limpiar y un visualizador del tiempo que va avanzando con milesimas de segundo, tendra que respetar la cronologia de dias,horas, minutos, segudos,milisegundo (3 digitos). 
funcionalidad: al dar click en iniciar, el boton de inciar pasara a cambiar de color a azul y decir pausa, comensara a iniciar el contador en la pantalla se vera el avance incluyendo milisegundos. si presiono el boton pausa se pausara el contador y el boton de pausa pasara a decir continuar, si se le da click en el boton continuar el contador seguira avanzando. en caso de precionar el boton limpiar, el contador se pausara y pasara a 0 y el boton de avance pasara a llamarse iniar nuevamente. 
adjunto imagen del diseño de interfaz para tomar en cuenta. como resultado me debes modificar archivo index.html agregando aqui el css para imitar al prototipo de la imagen, la diferencia es en el nombre de los botones iniciales debe estar en español "iniciar" "Limpiar"
<!DOCTYPE html> <html lang="en"> 
<head> 
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0"> 
<title>Timer and Countdown</title> <link rel="stylesheet" href="styles.css"> 
</head> 
<body> 
<h1>Timer and Countdown</h1> 
<script src="script.js"></script> 
</body> 
</html>
y un archivo script.js con la funcionalidad

paso 2
al iniciar el contador los milisegundos deben mostrar solo 3 digitos 