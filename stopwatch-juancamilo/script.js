// Variables de estado
let hours = 0;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;

let interval = null;

// DOM Elements
const hoursEl = document.querySelector('.hours');
const minutesEl = document.querySelector('.minutes');
const secondsEl = document.querySelector('.seconds');
const millisecondsEl = document.querySelector('.milliseconds');

const startBtn = document.getElementById('startBtn');
const clearBtn = document.getElementById('clearBtn');

// Función para formatear números
function formatNumber(number, digits) {
    return number.toString().padStart(digits, '0');
}

// Actualiza el display
function updateDisplay() {
    hoursEl.textContent = formatNumber(hours, 2);
    minutesEl.textContent = formatNumber(minutes, 2);
    secondsEl.textContent = formatNumber(seconds, 2);
    millisecondsEl.textContent = formatNumber(milliseconds, 3);
}

// Función principal del cronómetro
function startStopwatch() {
    if (interval) return; // Evita intervalos múltiples

    interval = setInterval(() => {
        milliseconds += 10;

        if (milliseconds >= 1000) {
            milliseconds = 0;
            seconds++;
        }

        if (seconds >= 60) {
            seconds = 0;
            minutes++;
        }

        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }

        updateDisplay();
    }, 10);
}

// Función para limpiar cronómetro
function clearStopwatch() {
    clearInterval(interval);
    interval = null;
    hours = 0;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    updateDisplay();
}

// Event listeners
startBtn.addEventListener('click', startStopwatch);
clearBtn.addEventListener('click', clearStopwatch);
