// ===================================================================
// LIBRERÍA WEB TIMER (script.js)
// Contiene la lógica pura, sin manipulación directa del DOM.
// ===================================================================

// --- ESTADO INTERNO ---

let stopwatchState = {
    startTime: 0,
    elapsedTime: 0, // Tiempo acumulado entre pausas
    intervalId: null,
    isRunning: false
};

let countdownState = {
    targetTime: 0,  // Milisegundos totales a contar
    endTime: 0,     // Timestamp de finalización
    intervalId: null,
    isRunning: false
};


// --- FUNCIONES COMUNES ---

/**
 * Formatea milisegundos a HH:MM:SS
 * @param {number} milliseconds - Tiempo total en milisegundos
 * @param {boolean} [includeMilliseconds=false] - Si devuelve también los milisegundos
 * @returns {object|string} - Objeto {time, milli} o string HH:MM:SS
 */
function formatTime(milliseconds, includeMilliseconds = false) {
    let totalSeconds = Math.floor(milliseconds / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    const timeStr = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    if (includeMilliseconds) {
        let milli = String(milliseconds % 1000).padStart(3, '0');
        return { time: timeStr, milli: milli };
    }
    
    return timeStr;
}


// ===================================================================
// LÓGICA DEL STOPWATCH
// ===================================================================

/**
 * Inicia o detiene el cronómetro.
 * @param {function} updateDisplayCB - Callback para actualizar el display
 * @param {function} updateButtonCB - Callback para actualizar el botón
 */
function startStopStopwatch(updateDisplayCB, updateButtonCB) {
    if (stopwatchState.isRunning) {
        // --- Parar ---
        clearInterval(stopwatchState.intervalId);
        stopwatchState.elapsedTime += Date.now() - stopwatchState.startTime; // Acumular tiempo
        stopwatchState.isRunning = false;
    } else {
        // --- Iniciar ---
        stopwatchState.startTime = Date.now();
        stopwatchState.intervalId = setInterval(() => {
            const now = Date.now();
            const elapsed = now - stopwatchState.startTime + stopwatchState.elapsedTime;
            const { time, milli } = formatTime(elapsed, true);
            updateDisplayCB(time, milli);
        }, 10); // Actualizar cada 10ms para milisegundos fluidos
        stopwatchState.isRunning = true;
    }
    updateButtonCB(stopwatchState.isRunning);
}

/**
 * Limpia y resetea el cronómetro.
 * @param {function} updateDisplayCB - Callback para actualizar el display
 * @param {function} updateButtonCB - Callback para actualizar el botón
 */
function clearStopwatch(updateDisplayCB, updateButtonCB) {
    clearInterval(stopwatchState.intervalId);
    stopwatchState = {
        startTime: 0,
        elapsedTime: 0,
        intervalId: null,
        isRunning: false
    };
    updateDisplayCB("00:00:00", "000");
    updateButtonCB(false);
}


// ===================================================================
// LÓGICA DEL COUNTDOWN
// ===================================================================

/**
 * Normaliza los inputs del countdown (ej: 70 segundos -> 1 min 10 seg)
 * @param {HTMLElement} hIn - Input de horas
 * @param {HTMLElement} mIn - Input de minutos
 * @param {HTMLElement} sIn - Input de segundos
 */
function normalizeCountdownInputs(hIn, mIn, sIn) {
    let h = parseInt(hIn.value) || 0;
    let m = parseInt(mIn.value) || 0;
    let s = parseInt(sIn.value) || 0;

    let totalSeconds = (h * 3600) + (m * 60) + s;

    hIn.value = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    mIn.value = Math.floor(totalSeconds / 60);
    sIn.value = totalSeconds % 60;
}

/**
 * Inicia o detiene la cuenta atrás.
 * @param {Array<HTMLElement>} inputs - [hIn, mIn, sIn]
 * @param {function} updateDisplayCB - Callback para actualizar el display
 * @param {function} updateButtonCB - Callback para actualizar el botón
 * @param {function} onFinishCB - Callback cuando el tiempo llega a 0
 */
function startStopCountdown(inputs, updateDisplayCB, updateButtonCB, onFinishCB) {
    const [hIn, mIn, sIn] = inputs;

    if (countdownState.isRunning) {
        // --- Parar ---
        clearInterval(countdownState.intervalId);
        countdownState.isRunning = false;
        // Guardar el tiempo restante como el nuevo target
        countdownState.targetTime = countdownState.endTime - Date.now();
        // Deshabilitar inputs
        inputs.forEach(input => input.disabled = false);

    } else {
        // --- Iniciar ---
        
        // Si no estamos reanudando, leemos los inputs
        if (countdownState.targetTime <= 0) { 
            normalizeCountdownInputs(hIn, mIn, sIn);
            let h = parseInt(hIn.value) || 0;
            let m = parseInt(mIn.value) || 0;
            let s = parseInt(sIn.value) || 0;
            countdownState.targetTime = ((h * 3600) + (m * 60) + s) * 1000;
        }

        if (countdownState.targetTime <= 0) return; // No empezar si es 0

        countdownState.endTime = Date.now() + countdownState.targetTime;
        countdownState.isRunning = true;
        
        // Deshabilitar inputs
        inputs.forEach(input => input.disabled = true);

        countdownState.intervalId = setInterval(() => {
            const remaining = countdownState.endTime - Date.now();

            if (remaining <= 0) {
                // --- Finalizado ---
                clearInterval(countdownState.intervalId);
                countdownState.isRunning = false;
                countdownState.targetTime = 0;
                updateDisplayCB("00:00:00");
                updateButtonCB(false);
                inputs.forEach(input => input.disabled = false);
                onFinishCB(); // Lanzar callback de finalización
            } else {
                // Actualizar display (redondeando al segundo más cercano)
                updateDisplayCB(formatTime(remaining + 999, false));
            }
        }, 100); // Chequear cada 100ms
    }
    updateButtonCB(countdownState.isRunning);
}

/**
 * Limpia y resetea la cuenta atrás.
 * @param {Array<HTMLElement>} inputs - [hIn, mIn, sIn]
 * @param {function} updateDisplayCB - Callback para actualizar el display
 * @param {function} updateButtonCB - Callback para actualizar el botón
 */
function clearCountdown(inputs, updateDisplayCB, updateButtonCB) {
    clearInterval(countdownState.intervalId);
    countdownState = {
        targetTime: 0,
        endTime: 0,
        intervalId: null,
        isRunning: false
    };

    // Habilitar y resetear inputs
    inputs.forEach(input => {
        input.disabled = false;
        if (input.id !== 'cd-minutes') input.value = 0;
        else input.value = 8; // Valor por defecto
    });
    
    // Resetear display al valor de los inputs
    updateDisplayCB("00:08:00");
    updateButtonCB(false);
}
