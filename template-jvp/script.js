// =============================================
// VARIABLES GLOBALES
// =============================================

// Elementos del DOM
const stopwatchModeBtn = document.getElementById('stopwatchModeBtn');
const timerModeBtn = document.getElementById('timerModeBtn');
const timerConfig = document.getElementById('timerConfig');
const timeDisplay = document.getElementById('timeDisplay');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const alert = document.getElementById('alert');

// Inputs del temporizador
const hoursInput = document.getElementById('hoursInput');
const minutesInput = document.getElementById('minutesInput');
const secondsInput = document.getElementById('secondsInput');

// Estado de la aplicación
let mode = 'stopwatch'; // 'stopwatch' o 'timer'
let isRunning = false;
let isPaused = false;
let intervalId = null;

// Tiempo en milisegundos
let currentTime = 0;
let startTime = 0;
let pausedTime = 0;

// Configuración del temporizador
let timerDuration = 0;

// =============================================
// FUNCIONES DE CAMBIO DE MODO
// =============================================

/**
 * Cambia al modo cronómetro
 */
function switchToStopwatch() {
    mode = 'stopwatch';
    stopwatchModeBtn.classList.add('active');
    timerModeBtn.classList.remove('active');
    timerConfig.classList.remove('active');
    resetEverything();
    updateDisplay();
}

/**
 * Cambia al modo temporizador
 */
function switchToTimer() {
    mode = 'timer';
    timerModeBtn.classList.add('active');
    stopwatchModeBtn.classList.remove('active');
    timerConfig.classList.add('active');
    resetEverything();
    updateTimerFromInputs();
    updateDisplay();
}

// =============================================
// FUNCIONES DE FORMATO Y DISPLAY
// =============================================

/**
 * Formatea el tiempo en milisegundos a HH:MM:SS.mmm
 * @param {number} ms - Tiempo en milisegundos
 * @returns {string} - Tiempo formateado
 */
function formatTime(ms) {
    // Asegurarse de que no sea negativo
    ms = Math.max(0, ms);
    
    const milliseconds = Math.floor(ms % 1000);
    const totalSeconds = Math.floor(ms / 1000);
    const seconds = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);

    const hoursStr = String(hours).padStart(2, '0');
    const minutesStr = String(minutes).padStart(2, '0');
    const secondsStr = String(seconds).padStart(2, '0');
    const millisecondsStr = String(milliseconds).padStart(3, '0');

    return `${hoursStr}:${minutesStr}:${secondsStr}<span class="milliseconds">.${millisecondsStr}</span>`;
}

/**
 * Actualiza el display con el tiempo actual
 */
function updateDisplay() {
    timeDisplay.innerHTML = formatTime(currentTime);
    // Añadir animación sutil
    timeDisplay.classList.add('updating');
    setTimeout(() => timeDisplay.classList.remove('updating'), 100);
}

// =============================================
// FUNCIONES DE CONTROL - CRONÓMETRO
// =============================================

/**
 * Inicia el cronómetro
 */
function startStopwatch() {
    if (isPaused) {
        // Continuar desde pausa
        startTime = Date.now() - pausedTime;
        isPaused = false;
    } else {
        // Iniciar desde cero
        startTime = Date.now();
        currentTime = 0;
    }
    
    isRunning = true;
    
    // Usar requestAnimationFrame para mayor precisión
    function update() {
        if (isRunning && mode === 'stopwatch') {
            currentTime = Date.now() - startTime;
            updateDisplay();
            intervalId = requestAnimationFrame(update);
        }
    }
    
    update();
    updateButtons();
}

/**
 * Pausa el cronómetro
 */
function pauseStopwatch() {
    isRunning = false;
    isPaused = true;
    pausedTime = currentTime;
    
    if (intervalId) {
        cancelAnimationFrame(intervalId);
    }
    
    updateButtons();
}

/**
 * Reinicia el cronómetro
 */
function resetStopwatch() {
    isRunning = false;
    isPaused = false;
    currentTime = 0;
    pausedTime = 0;
    
    if (intervalId) {
        cancelAnimationFrame(intervalId);
    }
    
    updateDisplay();
    updateButtons();
}

// =============================================
// FUNCIONES DE CONTROL - TEMPORIZADOR
// =============================================

/**
 * Actualiza el tiempo del temporizador desde los inputs
 */
function updateTimerFromInputs() {
    const hours = parseInt(hoursInput.value) || 0;
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;
    
    timerDuration = (hours * 3600 + minutes * 60 + seconds) * 1000;
    currentTime = timerDuration;
}

/**
 * Inicia el temporizador
 */
function startTimer() {
    // Ocultar alerta si está visible
    alert.classList.remove('active');
    
    if (!isPaused) {
        // Primera vez - obtener valores de los inputs
        updateTimerFromInputs();
        
        if (timerDuration === 0) {
            alert.classList.add('active');
            alert.textContent = '⚠️ Configura un tiempo mayor a 0';
            setTimeout(() => alert.classList.remove('active'), 3000);
            return;
        }
    }
    
    if (isPaused) {
        // Continuar desde pausa
        startTime = Date.now();
        isPaused = false;
    } else {
        // Iniciar desde el tiempo configurado
        startTime = Date.now();
    }
    
    isRunning = true;
    
    // Deshabilitar inputs mientras corre
    disableInputs(true);
    
    // Usar requestAnimationFrame para mayor precisión
    function update() {
        if (isRunning && mode === 'timer') {
            const elapsed = Date.now() - startTime;
            currentTime = Math.max(0, timerDuration - elapsed);
            
            updateDisplay();
            
            // Verificar si llegó a 0
            if (currentTime <= 0) {
                timerComplete();
            } else {
                intervalId = requestAnimationFrame(update);
            }
        }
    }
    
    update();
    updateButtons();
}

/**
 * Pausa el temporizador
 */
function pauseTimer() {
    isRunning = false;
    isPaused = true;
    timerDuration = currentTime;
    
    if (intervalId) {
        cancelAnimationFrame(intervalId);
    }
    
    updateButtons();
}

/**
 * Reinicia el temporizador a la configuración inicial
 */
function resetTimer() {
    isRunning = false;
    isPaused = false;
    
    if (intervalId) {
        cancelAnimationFrame(intervalId);
    }
    
    // Habilitar inputs
    disableInputs(false);
    
    // Volver a los valores configurados
    updateTimerFromInputs();
    updateDisplay();
    updateButtons();
    
    // Ocultar alerta
    alert.classList.remove('active');
}

/**
 * Se ejecuta cuando el temporizador llega a 0
 */
function timerComplete() {
    isRunning = false;
    isPaused = false;
    currentTime = 0;
    
    if (intervalId) {
        cancelAnimationFrame(intervalId);
    }
    
    updateDisplay();
    updateButtons();
    
    // Mostrar alerta
    alert.classList.add('active');
    alert.textContent = '⏰ ¡Tiempo Completado!';
    
    // Reproducir sonido (navegadores modernos)
    playBeep();
    
    // Habilitar inputs
    disableInputs(false);
}

/**
 * Reproduce un sonido de alerta usando Web Audio API
 */
function playBeep() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
        console.log('Audio no soportado');
    }
}

/**
 * Habilita o deshabilita los inputs del temporizador
 */
function disableInputs(disabled) {
    hoursInput.disabled = disabled;
    minutesInput.disabled = disabled;
    secondsInput.disabled = disabled;
}

// =============================================
// FUNCIONES DE INTERFAZ
// =============================================

/**
 * Actualiza el estado de los botones según el estado actual
 */
function updateButtons() {
    if (isRunning) {
        // Está corriendo - mostrar botón de pausa
        startBtn.textContent = 'Pause';
        startBtn.className = 'btn btn-pause';
    } else if (isPaused) {
        // Está pausado - mostrar botón de continuar
        startBtn.textContent = 'Continue';
        startBtn.className = 'btn btn-start';
    } else {
        // Está detenido - mostrar botón de inicio
        startBtn.textContent = 'Start';
        startBtn.className = 'btn btn-start';
    }
}

/**
 * Reinicia todo a valores por defecto
 */
function resetEverything() {
    isRunning = false;
    isPaused = false;
    currentTime = 0;
    startTime = 0;
    pausedTime = 0;
    timerDuration = 0;
    
    if (intervalId) {
        cancelAnimationFrame(intervalId);
    }
    
    alert.classList.remove('active');
    disableInputs(false);
    updateButtons();
}

// =============================================
// EVENT LISTENERS
// =============================================

// Cambio de modo
stopwatchModeBtn.addEventListener('click', switchToStopwatch);
timerModeBtn.addEventListener('click', switchToTimer);

// Botón Start/Pause/Continue
startBtn.addEventListener('click', () => {
    if (mode === 'stopwatch') {
        if (isRunning) {
            pauseStopwatch();
        } else {
            startStopwatch();
        }
    } else {
        if (isRunning) {
            pauseTimer();
        } else {
            startTimer();
        }
    }
});

// Botón Reset
resetBtn.addEventListener('click', () => {
    if (mode === 'stopwatch') {
        resetStopwatch();
    } else {
        resetTimer();
    }
});

// Validación de inputs
[hoursInput, minutesInput, secondsInput].forEach(input => {
    input.addEventListener('input', (e) => {
        let value = parseInt(e.target.value);
        const max = parseInt(e.target.max);
        const min = parseInt(e.target.min);
        
        if (value > max) {
            e.target.value = max;
        } else if (value < min || isNaN(value)) {
            e.target.value = min;
        }
    });
    
    // Actualizar display cuando cambian los inputs (si no está corriendo)
    input.addEventListener('change', () => {
        if (!isRunning && !isPaused && mode === 'timer') {
            updateTimerFromInputs();
            updateDisplay();
        }
    });
});

// =============================================
// INICIALIZACIÓN
// =============================================

// Iniciar en modo cronómetro
switchToStopwatch();
