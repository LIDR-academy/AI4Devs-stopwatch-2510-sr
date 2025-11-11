// Variables globales
let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCounter = 0;

// Elementos del DOM
let displayElement;
let startBtn;
let stopBtn;
let resetBtn;
let lapBtn;
let lapsContainer;
let lapsList;

// Inicializar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    initializeStopwatch();
});

function initializeStopwatch() {
    // Crear la estructura HTML
    createStopwatchHTML();
    
    // Obtener referencias a los elementos
    displayElement = document.getElementById('display');
    startBtn = document.getElementById('startBtn');
    stopBtn = document.getElementById('stopBtn');
    resetBtn = document.getElementById('resetBtn');
    lapBtn = document.getElementById('lapBtn');
    lapsContainer = document.getElementById('lapsContainer');
    lapsList = document.getElementById('lapsList');
    
    // Agregar event listeners
    startBtn.addEventListener('click', start);
    stopBtn.addEventListener('click', stop);
    resetBtn.addEventListener('click', reset);
    lapBtn.addEventListener('click', recordLap);
    
    // Estado inicial
    updateDisplay();
    updateButtons();
}

function createStopwatchHTML() {
    const body = document.body;
    
    // Crear contenedor principal
    const container = document.createElement('div');
    container.className = 'stopwatch-container';
    
    // Display del tiempo
    const display = document.createElement('div');
    display.id = 'display';
    display.className = 'display';
    display.textContent = '00:00:00.00';
    
    // Contenedor de controles
    const controls = document.createElement('div');
    controls.className = 'controls';
    
    // Botones
    const startBtn = document.createElement('button');
    startBtn.id = 'startBtn';
    startBtn.className = 'btn btn-start';
    startBtn.textContent = 'Start';
    
    const stopBtn = document.createElement('button');
    stopBtn.id = 'stopBtn';
    stopBtn.className = 'btn btn-stop';
    stopBtn.textContent = 'Stop';
    
    const lapBtn = document.createElement('button');
    lapBtn.id = 'lapBtn';
    lapBtn.className = 'btn btn-lap';
    lapBtn.textContent = 'Lap';
    
    const resetBtn = document.createElement('button');
    resetBtn.id = 'resetBtn';
    resetBtn.className = 'btn btn-reset';
    resetBtn.textContent = 'Reset';
    
    controls.appendChild(startBtn);
    controls.appendChild(stopBtn);
    controls.appendChild(lapBtn);
    controls.appendChild(resetBtn);
    
    // Contenedor de vueltas
    const lapsContainer = document.createElement('div');
    lapsContainer.id = 'lapsContainer';
    lapsContainer.className = 'laps-container';
    lapsContainer.style.display = 'none';
    
    const lapsTitle = document.createElement('h2');
    lapsTitle.textContent = 'Laps';
    
    const lapsList = document.createElement('div');
    lapsList.id = 'lapsList';
    
    lapsContainer.appendChild(lapsTitle);
    lapsContainer.appendChild(lapsList);
    
    // Ensamblar todo
    container.appendChild(display);
    container.appendChild(controls);
    container.appendChild(lapsContainer);
    
    body.appendChild(container);
}

function start() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateDisplay, 10);
        isRunning = true;
        displayElement.classList.add('running');
        updateButtons();
    }
}

function stop() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        displayElement.classList.remove('running');
        updateButtons();
    }
}

function reset() {
    clearInterval(timerInterval);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    lapCounter = 0;
    displayElement.classList.remove('running');
    updateDisplay();
    updateButtons();
    clearLaps();
}

function recordLap() {
    if (isRunning || elapsedTime > 0) {
        lapCounter++;
        const lapTime = elapsedTime;
        addLapToList(lapCounter, lapTime);
        lapsContainer.style.display = 'block';
    }
}

function updateDisplay() {
    if (isRunning) {
        elapsedTime = Date.now() - startTime;
    }
    
    const time = formatTime(elapsedTime);
    displayElement.textContent = time;
}

function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const ms = Math.floor((milliseconds % 1000) / 10);
    
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(ms)}`;
}

function pad(number) {
    return number.toString().padStart(2, '0');
}

function updateButtons() {
    startBtn.disabled = isRunning;
    stopBtn.disabled = !isRunning;
    resetBtn.disabled = isRunning;
    lapBtn.disabled = !isRunning && elapsedTime === 0;
}

function addLapToList(lapNumber, lapTime) {
    const lapItem = document.createElement('div');
    lapItem.className = 'lap-item';
    
    const lapNumberSpan = document.createElement('span');
    lapNumberSpan.className = 'lap-number';
    lapNumberSpan.textContent = `Lap ${lapNumber}`;
    
    const lapTimeSpan = document.createElement('span');
    lapTimeSpan.className = 'lap-time';
    lapTimeSpan.textContent = formatTime(lapTime);
    
    lapItem.appendChild(lapNumberSpan);
    lapItem.appendChild(lapTimeSpan);
    
    // Insertar al principio de la lista
    lapsList.insertBefore(lapItem, lapsList.firstChild);
}

function clearLaps() {
    lapsList.innerHTML = '';
    lapsContainer.style.display = 'none';
}
