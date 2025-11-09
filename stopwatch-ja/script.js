
// Esperamos a que el DOM esté completamente cargado para manipularlo
document.addEventListener('DOMContentLoaded', () => {

    // 1. Referencias a los elementos del DOM
    const startStopBtn = document.getElementById('startStopBtn');
    const resetBtn = document.getElementById('resetBtn');

    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const millisecondsEl = document.getElementById('milliseconds');

    // 2. Variables de estado del cronómetro
    let isRunning = false;
    let timer = null; // Almacenará el ID de setInterval
    let startTime = 0; // La marca de tiempo de inicio
    let elapsedTime = 0; // El tiempo acumulado cuando se pausa

    // 3. Funciones principales

    /**
     * Alterna entre iniciar y pausar el cronómetro.
     */
    function toggleStartStop() {
        if (isRunning) {
            // Lógica para PAUSAR
            clearInterval(timer);
            // Guardamos el tiempo transcurrido hasta este punto
            elapsedTime = Date.now() - startTime;
            isRunning = false;
            updateButtonState('start');
        } else {
            // Lógica para INICIAR (o reanudar)
            // Si reanuda, resta el tiempo ya transcurrido
            startTime = Date.now() - elapsedTime;
            
            // Actualizamos la pantalla cada 10ms para milisegundos fluidos
            timer = setInterval(updateDisplay, 10); 
            
            isRunning = true;
            updateButtonState('pause');
        }
    }

    /**
     * Reinicia el cronómetro a cero.
     */
    function resetTimer() {
        clearInterval(timer); // Detiene el intervalo
        isRunning = false;
        elapsedTime = 0;
        
        // Resetea el texto de la UI
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        millisecondsEl.textContent = '000';

        // Restaura el botón de inicio
        updateButtonState('start');
    }

    /**
     * Actualiza la visualización del tiempo.
     * Se llama repetidamente por el setInterval.
     */
    function updateDisplay() {
        // Calcula el tiempo total transcurrido desde el inicio
        const totalElapsed = Date.now() - startTime;

        // Desglose del tiempo
        let ms = totalElapsed % 1000;
        let s = Math.floor((totalElapsed / 1000) % 60);
        let m = Math.floor((totalElapsed / (1000 * 60)) % 60);
        let h = Math.floor((totalElapsed / (1000 * 60 * 60)));

        // Formatea los números para que siempre tengan dos dígitos (o tres para ms)
        // Usamos padStart para añadir ceros a la izquierda
        hoursEl.textContent = String(h).padStart(2, '0');
        minutesEl.textContent = String(m).padStart(2, '0');
        secondsEl.textContent = String(s).padStart(2, '0');
        millisecondsEl.textContent = String(ms).padStart(3, '0');
    }

    /**
     * Actualiza la apariencia y texto del botón Start/Stop.
     * @param {string} state - Puede ser 'start' o 'pause'.
     */
    function updateButtonState(state) {
        if (state === 'start') {
            startStopBtn.textContent = 'Start';
            startStopBtn.classList.remove('pause');
            startStopBtn.classList.add('start');
        } else if (state === 'pause') {
            startStopBtn.textContent = 'Pause';
            startStopBtn.classList.remove('start');
            startStopBtn.classList.add('pause');
        }
    }

    // 4. Asignación de eventos
    startStopBtn.addEventListener('click', toggleStartStop);
    resetBtn.addEventListener('click', resetTimer);

});