document.addEventListener('DOMContentLoaded', () => {
    // --- Elementos de la Interfaz ---
    const modeSelector = document.getElementById('mode-selector');
    const stopwatchMode = document.getElementById('stopwatch-mode');
    const countdownMode = document.getElementById('countdown-mode');
    
    // Selectores de Modo
    const selectStopwatch = document.getElementById('select-stopwatch');
    const selectCountdown = document.getElementById('select-countdown');

    // Cronómetro
    const stopwatchDisplay = document.getElementById('stopwatch-display');
    const stopwatchStartPause = document.getElementById('stopwatch-start-pause');
    const stopwatchReset = document.getElementById('stopwatch-reset');
    const stopwatchBack = document.getElementById('stopwatch-back');

    // Cuenta Regresiva
    const countdownDisplay = document.getElementById('countdown-display');
    const countdownSet = document.getElementById('countdown-set');
    const countdownClearKeypad = document.getElementById('countdown-clear-keypad');
    const countdownStartPause = document.getElementById('countdown-start-pause');
    const countdownReset = document.getElementById('countdown-reset');
    const countdownBack = document.getElementById('countdown-back');
    const keypadButtons = document.querySelectorAll('#countdown-keypad .keypad-button[data-key]');

    // --- Variables de Estado ---
    
    // Stopwatch
    let stopwatchInterval = null;
    let stopwatchTime = 0; // en milisegundos
    let stopwatchIsRunning = false;

    // Countdown
    let countdownInterval = null;
    let countdownTotalTime = 0; // Tiempo establecido en milisegundos
    let countdownRemainingTime = 0; // Tiempo actual restante
    let countdownIsRunning = false;
    let keypadInput = ''; // Almacena la entrada del teclado numérico

    // --- Funciones de Utilidad ---

    /**
     * Convierte milisegundos a formato HH:MM:SS.MMM
     * @param {number} ms - Tiempo en milisegundos.
     * @returns {object} { h, m, s, mmm }
     */
    const formatTime = (ms) => {
        const totalSeconds = Math.floor(ms / 1000);
        const mmm = String(ms % 1000).padStart(3, '0');
        const s = String(totalSeconds % 60).padStart(2, '0');
        const m = String(Math.floor(totalSeconds / 60) % 60).padStart(2, '0');
        const h = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
        return { h, m, s, mmm };
    };

    /**
     * Renderiza el tiempo en el display del cronómetro/cuenta regresiva.
     * @param {number} ms - Tiempo en milisegundos.
     * @param {HTMLElement} displayElement - Elemento HTML de la pantalla.
     */
    const renderDisplay = (ms, displayElement) => {
        // Asegura que el tiempo no sea negativo
        const timeToShow = Math.max(0, ms); 
        const { h, m, s, mmm } = formatTime(timeToShow);
        displayElement.innerHTML = `${h}:${m}:${s}<span class="ms-display">${mmm}</span>`;
    };

    // --- 1. Lógica de Navegación (Páginas) ---

    /**
     * Cambia la vista activa de la aplicación.
     * @param {HTMLElement} nextView - La vista a mostrar.
     */
    const switchView = (nextView) => {
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });
        nextView.classList.add('active');
    };

    // Eventos de selección de modo
    selectStopwatch.addEventListener('click', () => {
        switchView(stopwatchMode);
        stopwatchResetHandler();
    });

    selectCountdown.addEventListener('click', () => {
        switchView(countdownMode);
        countdownResetHandler(); // Reinicia la cuenta regresiva y muestra el teclado
    });

    // Eventos de botón "Back"
    stopwatchBack.addEventListener('click', () => switchView(modeSelector));
    countdownBack.addEventListener('click', () => {
        countdownResetHandler(); // Resetear antes de volver
        switchView(modeSelector);
    });

    // --- 2. Lógica de Cronómetro (Stopwatch) ---

    const stopwatchStartPauseHandler = () => {
        if (stopwatchIsRunning) {
            // Pausar
            clearInterval(stopwatchInterval);
            stopwatchStartPause.textContent = 'Start';
            stopwatchStartPause.classList.remove('green-button');
            stopwatchStartPause.classList.add('orange-button'); 
            stopwatchIsRunning = false;
        } else {
            // Iniciar/Reanudar
            const startTime = Date.now() - stopwatchTime;
            stopwatchInterval = setInterval(() => {
                stopwatchTime = Date.now() - startTime;
                renderDisplay(stopwatchTime, stopwatchDisplay);
            }, 10);
            
            stopwatchStartPause.textContent = 'Stop';
            stopwatchStartPause.classList.remove('orange-button');
            stopwatchStartPause.classList.add('green-button'); 
            stopwatchIsRunning = true;
        }
    };

    const stopwatchResetHandler = () => {
        clearInterval(stopwatchInterval);
        stopwatchTime = 0;
        stopwatchIsRunning = false;
        renderDisplay(stopwatchTime, stopwatchDisplay);
        
        stopwatchStartPause.textContent = 'Start';
        stopwatchStartPause.classList.remove('orange-button');
        stopwatchStartPause.classList.add('green-button');
    };

    // Event Listeners para el Cronómetro
    stopwatchStartPause.addEventListener('click', stopwatchStartPauseHandler);
    stopwatchReset.addEventListener('click', stopwatchResetHandler);

    // --- 3. Lógica de Cuenta Regresiva (Countdown) ---

    // Maneja la entrada de dígitos en el teclado
    const handleKeypadInput = (key) => {
        // La entrada máxima es de 6 dígitos (HH:MM:SS)
        if (keypadInput.length < 6) {
            keypadInput += key;
            updateKeypadDisplay();
        }
    };

    // Actualiza la visualización del tiempo de entrada del teclado
    const updateKeypadDisplay = () => {
        let input = keypadInput.padStart(6, '0');
        let h = input.substring(0, 2);
        let m = input.substring(2, 4);
        let s = input.substring(4, 6);
        
        // El display muestra el formato HH:MM:SS 000
        countdownDisplay.innerHTML = `${h}:${m}:${s}<span class="ms-display">000</span>`;
        
        // Calcular el tiempo total en milisegundos
        countdownTotalTime = (parseInt(h) * 3600 + parseInt(m) * 60 + parseInt(s)) * 1000;
        countdownRemainingTime = countdownTotalTime;
    };

    // Event Listeners para el Teclado Numérico
    keypadButtons.forEach(button => {
        button.addEventListener('click', (e) => handleKeypadInput(e.target.dataset.key));
    });

    // Botón Clear del Teclado
    countdownClearKeypad.addEventListener('click', () => {
        keypadInput = '';
        updateKeypadDisplay();
    });

    // ********* CORRECCIÓN DEL BOTÓN SET *********
    countdownSet.addEventListener('click', () => {
        if (countdownTotalTime > 0) {
            countdownRemainingTime = countdownTotalTime;
            renderDisplay(countdownRemainingTime, countdownDisplay);
            
            // ACTIVA el estado 'running' para ocultar teclado y mostrar controles
            countdownMode.classList.add('running'); 
            
            // Asegura que el botón Start esté en el estado correcto
            countdownStartPause.textContent = 'Start';
            countdownStartPause.classList.remove('orange-button');
            countdownStartPause.classList.add('green-button');
            countdownStartPause.disabled = false;
        }
    });

    const countdownStartPauseHandler = () => {
        if (countdownIsRunning) {
            // Pausar
            clearInterval(countdownInterval);
            countdownStartPause.textContent = 'Start';
            countdownStartPause.classList.remove('green-button');
            countdownStartPause.classList.add('orange-button'); 
            countdownIsRunning = false;
        } else if (countdownRemainingTime > 0) {
            // Iniciar/Reanudar
            let lastTime = Date.now();
            
            countdownInterval = setInterval(() => {
                const now = Date.now();
                const delta = now - lastTime;
                lastTime = now;
                
                countdownRemainingTime -= delta;

                if (countdownRemainingTime <= 0) {
                    clearInterval(countdownInterval);
                    countdownRemainingTime = 0;
                    countdownIsRunning = false;
                    countdownStartPause.textContent = 'Finished'; 
                    countdownStartPause.classList.remove('orange-button');
                    countdownStartPause.classList.remove('green-button');
                    countdownStartPause.classList.add('grey-button'); // Estado de finalizado
                    countdownStartPause.disabled = true;
                }

                renderDisplay(countdownRemainingTime, countdownDisplay);
            }, 10);

            countdownStartPause.textContent = 'Stop';
            countdownStartPause.classList.remove('orange-button');
            countdownStartPause.classList.remove('grey-button');
            countdownStartPause.classList.add('green-button'); 
            countdownStartPause.disabled = false;
            countdownIsRunning = true;
        }
    };

    const countdownResetHandler = () => {
        clearInterval(countdownInterval);
        countdownTotalTime = 0;
        countdownRemainingTime = 0;
        countdownIsRunning = false;
        keypadInput = '';
        renderDisplay(0, countdownDisplay); 
        
        countdownStartPause.textContent = 'Start';
        countdownStartPause.classList.remove('orange-button', 'grey-button');
        countdownStartPause.classList.add('green-button');
        countdownStartPause.disabled = false;
        
        // DESACTIVA el estado 'running' para volver a la vista de configuración (teclado)
        countdownMode.classList.remove('running'); 
    };

    // Event Listeners para la Cuenta Regresiva
    countdownStartPause.addEventListener('click', countdownStartPauseHandler);
    countdownReset.addEventListener('click', countdownResetHandler);

    // --- Inicialización ---
    renderDisplay(0, stopwatchDisplay);
    renderDisplay(0, countdownDisplay);
});