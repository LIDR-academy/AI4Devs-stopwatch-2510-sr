// =================================================================
// FUNCIONES DE UTILIDAD
// =================================================================

/**
 * Convierte el total de segundos en un formato HH:MM:SS.
 * @param {number} totalSeconds - El número total de segundos.
 * @returns {string} Tiempo formateado.
 */
function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Asegura que cada componente tenga dos dígitos
    const pad = num => String(num).padStart(2, '0');

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

// =================================================================
// CRONÓMETRO (STOPWATCH) - Conteo Ascendente
// =================================================================

let stopwatchTime = 0; // Almacena el tiempo total en segundos
let stopwatchInterval = null;
let isStopwatchRunning = false;

// Variables declaradas con 'let' para ser inicializadas después de cargar el DOM
let stopwatchDisplay = null;
let stopwatchButton = null;

/**
 * Lógica principal para incrementar y mostrar el tiempo del cronómetro.
 */
function updateStopwatch() {
    stopwatchTime++;
    if (stopwatchDisplay) {
        stopwatchDisplay.textContent = formatTime(stopwatchTime);
    }
}

/**
 * Inicia o detiene el cronómetro.
 */
function toggleStopwatch() {
    // Comprobación de seguridad
    if (!stopwatchButton) return; 

    if (isStopwatchRunning) {
        // Detener (Stop)
        clearInterval(stopwatchInterval);
        isStopwatchRunning = false;
        stopwatchButton.textContent = 'Start';
        stopwatchButton.classList.remove('btn-danger');
        stopwatchButton.classList.add('btn-success');
    } else {
        // Iniciar (Start)
        stopwatchInterval = setInterval(updateStopwatch, 1000);
        isStopwatchRunning = true;
        stopwatchButton.textContent = 'Stop';
        stopwatchButton.classList.remove('btn-success');
        stopwatchButton.classList.add('btn-danger');
    }
}

/**
 * Detiene y restablece el cronómetro a 00:00:00.
 */
function resetStopwatch() {
    // Comprobación de seguridad
    if (!stopwatchDisplay || !stopwatchButton) return;

    clearInterval(stopwatchInterval);
    stopwatchTime = 0;
    isStopwatchRunning = false;
    stopwatchDisplay.textContent = '00:00:00';
    
    // Restablecer el botón a "Start"
    stopwatchButton.textContent = 'Start';
    stopwatchButton.classList.remove('btn-danger');
    stopwatchButton.classList.add('btn-success');
}

// =================================================================
// TEMPORIZADOR (COUNTDOWN) - Conteo Regresivo
// =================================================================

let countdownTime = 0; // Almacena el tiempo restante en segundos
let countdownInterval = null;
let isCountdownRunning = false;
let initialCountdownTime = 0; // Guarda el tiempo inicial para el Pause/Reset

// Variables declaradas con 'let' para ser inicializadas después de cargar el DOM
let countdownDisplay = null;
let countdownButton = null;
let inputHours = null;
let inputMinutes = null;
let inputSeconds = null;

/**
 * Lógica principal para decrementar y mostrar el tiempo del temporizador.
 */
function updateCountdown() {
    if (!countdownDisplay || !countdownButton || !inputHours) return;

    if (countdownTime <= 0) {
        // Alarma: El tiempo ha terminado
        clearInterval(countdownInterval);
        isCountdownRunning = false;
        countdownDisplay.textContent = '¡TIEMPO!';
        
        // Alerta Visual: Cambiar a fondo rojo y texto blanco
        countdownDisplay.classList.remove('bg-light', 'text-dark');
        countdownDisplay.classList.add('bg-danger', 'text-white', 'animate-pulse');
        
        countdownButton.textContent = 'Start Countdown';
        countdownButton.classList.remove('btn-warning');
        countdownButton.classList.add('btn-primary');

        // Asegurar que los inputs reflejen 00:00:00 al terminar
        inputHours.value = 0;
        inputMinutes.value = 0;
        inputSeconds.value = 0;
        return;
    }

    countdownTime--;
    countdownDisplay.textContent = formatTime(countdownTime);
}

/**
 * Inicia o pausa la cuenta regresiva.
 */
function toggleCountdown() {
    if (!countdownDisplay || !countdownButton || !inputHours || !inputMinutes || !inputSeconds) return;

    // Si está corriendo, pausar
    if (isCountdownRunning) {
        clearInterval(countdownInterval);
        isCountdownRunning = false;
        countdownButton.textContent = 'Resume Countdown';
        countdownButton.classList.remove('btn-warning');
        countdownButton.classList.add('btn-primary');
        return;
    }

    // Si está pausado o reiniciado, obtener el tiempo e iniciar
    
    // Si el temporizador está en 0 y el usuario presiona "Start", 
    // intentamos cargar los valores de los inputs.
    if (countdownTime === 0) {
        const hours = parseInt(inputHours.value) || 0;
        const minutes = parseInt(inputMinutes.value) || 0;
        const seconds = parseInt(inputSeconds.value) || 0;
        
        // Convertir a segundos y guardar el tiempo inicial
        countdownTime = (hours * 3600) + (minutes * 60) + seconds;
        initialCountdownTime = countdownTime;
    }
    
    // Validar que el tiempo sea positivo antes de iniciar
    if (countdownTime > 0) {
        // Iniciar
        countdownInterval = setInterval(updateCountdown, 1000);
        isCountdownRunning = true;
        
        // Quitar la clase de alarma si estaba presente
        countdownDisplay.classList.remove('bg-danger', 'text-white', 'animate-pulse');
        countdownDisplay.classList.add('bg-light', 'text-dark');

        countdownButton.textContent = 'Pause';
        countdownButton.classList.remove('btn-primary');
        countdownButton.classList.add('btn-warning');

        // Mostrar el tiempo inicial si se acaba de empezar (para asegurar la visualización correcta)
        countdownDisplay.textContent = formatTime(countdownTime);
    } else {
        // Mensaje si no se ingresó tiempo
        // **Mejorando UX: Usaremos un mensaje temporal en el display**
        countdownDisplay.textContent = '¡Ingresa tiempo!';
        setTimeout(() => {
            if (!isCountdownRunning) { // Solo restablecer si no se inició
                countdownDisplay.textContent = '00:00:00';
            }
        }, 1500);
    }
}

/**
 * Detiene el temporizador y restablece todos los valores.
 */
function resetCountdown() {
    if (!countdownDisplay || !countdownButton || !inputHours) return;
    
    clearInterval(countdownInterval);
    isCountdownRunning = false;
    countdownTime = 0;
    initialCountdownTime = 0;

    // Restablecer inputs a 0
    inputHours.value = 0;
    inputMinutes.value = 0;
    inputSeconds.value = 0;

    // Restablecer display y botón
    countdownDisplay.textContent = '00:00:00';
    countdownButton.textContent = 'Start Countdown';
    countdownButton.classList.remove('btn-warning');
    countdownButton.classList.add('btn-primary');
    
    // Restablecer la clase de visualización a normal
    countdownDisplay.classList.remove('bg-danger', 'text-white', 'animate-pulse');
    countdownDisplay.classList.add('bg-light', 'text-dark');
}

// Inicializar y vincular los elementos al cargar la página (SOLUCIÓN AL ERROR)
document.addEventListener('DOMContentLoaded', () => {
    // CRONÓMETRO
    stopwatchDisplay = document.getElementById('stopwatchDisplay');
    stopwatchButton = document.getElementById('stopwatchButton');
    
    // TEMPORIZADOR
    countdownDisplay = document.getElementById('countdownDisplay');
    countdownButton = document.getElementById('countdownButton');
    inputHours = document.getElementById('inputHours');
    inputMinutes = document.getElementById('inputMinutes');
    inputSeconds = document.getElementById('inputSeconds');
});