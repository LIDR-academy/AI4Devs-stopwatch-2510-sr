
document.addEventListener('DOMContentLoaded', () => {

    // --- Variables de Estado Globales ---

    // Cronómetro (Stopwatch)
    let sw_startTime = 0;
    let sw_elapsedTime = 0;
    let sw_timerId = null;

    // Cuenta Atrás (Countdown)
    let cd_setInput = '';
    let cd_setTime_ms = 0;
    let cd_remainingTime = 0;
    let cd_targetTime = 0;
    let cd_timerId = null;

    // --- Selectores del DOM ---

    // Pantallas
    const screens = document.querySelectorAll('.screen');
    const homeScreen = document.getElementById('home-screen');
    const stopwatchScreen = document.getElementById('stopwatch-screen');
    const countdownScreen = document.getElementById('countdown-screen');

    // Navegación Inicio
    const btnToStopwatch = document.getElementById('btn-to-stopwatch');
    const btnToCountdown = document.getElementById('btn-to-countdown');

    // Componentes Cronómetro
    const swDisplay = document.getElementById('sw-display');
    const swMs = document.getElementById('sw-ms');
    const swMainBtn = document.getElementById('sw-main-btn');
    const swClearBtn = document.getElementById('sw-clear-btn');
    const swBackBtn = document.getElementById('sw-back-btn');

    // Componentes Cuenta Atrás
    const cdDisplay = document.getElementById('cd-display');
    const cdMs = document.getElementById('cd-ms');
    const cdSetupView = document.getElementById('cd-setup-view');
    const cdRunView = document.getElementById('cd-run-view');
    const numpadButtons = document.querySelectorAll('.btn-numpad');
    const cdSetBtn = document.getElementById('cd-set-btn');
    const cdClearSetupBtn = document.getElementById('cd-clear-setup-btn');
    const cdMainBtn = document.getElementById('cd-main-btn');
    const cdClearRunBtn = document.getElementById('cd-clear-run-btn');
    const cdBackBtn = document.getElementById('cd-back-btn');

    // --- Funciones Helper ---

    /** Oculta todas las pantallas */
    function hideAllScreens() {
        screens.forEach(s => s.style.display = 'none');
    }

    /** Formatea milisegundos a un objeto {h, m, s, mmm} */
    function formatMilliseconds(ms) {
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        const milliseconds = ms % 1000;

        return {
            h: String(hours).padStart(2, '0'),
            m: String(minutes).padStart(2, '0'),
            s: String(seconds).padStart(2, '0'),
            mmm: String(milliseconds).padStart(3, '0')
        };
    }

    // --- 1.4.1. Lógica de Navegación Principal ---

    btnToStopwatch.addEventListener('click', () => {
        hideAllScreens();
        stopwatchScreen.style.display = 'flex';
        resetStopwatch();
    });

    btnToCountdown.addEventListener('click', () => {
        hideAllScreens();
        countdownScreen.style.display = 'flex';
        resetCountdown(true); // Reseteo completo
    });

    swBackBtn.addEventListener('click', () => {
        hideAllScreens();
        homeScreen.style.display = 'flex';
        clearInterval(sw_timerId); // Detener timer al salir
    });

    cdBackBtn.addEventListener('click', () => {
        hideAllScreens();
        homeScreen.style.display = 'flex';
        resetCountdown(true); // Reseteo completo al salir
    });

    // --- 1.4.2. Lógica del Cronómetro (Stopwatch) ---

    swMainBtn.addEventListener('click', () => {
        if (swMainBtn.textContent === 'Start' || swMainBtn.textContent === 'Continue') {
            startStopwatch();
        } else {
            pauseStopwatch();
        }
    });

    swClearBtn.addEventListener('click', resetStopwatch);

    function startStopwatch() {
        sw_startTime = Date.now() - sw_elapsedTime;
        sw_timerId = setInterval(updateStopwatch, 10); // Actualiza cada 10ms
        
        swMainBtn.textContent = 'Pause';
        swMainBtn.className = 'btn btn-green';
    }

    function updateStopwatch() {
        const elapsedTime = Date.now() - sw_startTime;
        const time = formatMilliseconds(elapsedTime);
        swDisplay.textContent = `${time.h}:${time.m}:${time.s}`;
        swMs.textContent = time.mmm;
    }

    function pauseStopwatch() {
        clearInterval(sw_timerId);
        sw_elapsedTime = Date.now() - sw_startTime;
        
        swMainBtn.textContent = 'Continue';
        swMainBtn.className = 'btn btn-blue';
    }

    function resetStopwatch() {
        clearInterval(sw_timerId);
        sw_timerId = null;
        sw_startTime = 0;
        sw_elapsedTime = 0;
        
        swDisplay.textContent = '00:00:00';
        swMs.textContent = '000';
        swMainBtn.textContent = 'Start';
        swMainBtn.className = 'btn btn-green';
    }

    // --- 1.4.3. Lógica de la Cuenta Atrás (Countdown) ---

    // Flujo de Configuración (Pantallas 2, 3)
    numpadButtons.forEach(button => {
        button.addEventListener('click', () => {
            cd_setInput += button.dataset.num;
            cd_setInput = cd_setInput.slice(-6); // Limitar a 6 dígitos
            updateCountdownInputDisplay();
        });
    });

    cdClearSetupBtn.addEventListener('click', () => {
        cd_setInput = '';
        updateCountdownInputDisplay();
    });

    function updateCountdownInputDisplay() {
        const paddedInput = cd_setInput.padStart(6, '0');
        const h = paddedInput.substring(0, 2);
        const m = paddedInput.substring(2, 4);
        const s = paddedInput.substring(4, 6);
        
        cdDisplay.textContent = `${h}:${m}:${s}`;
        cdMs.textContent = '000';
    }

    cdSetBtn.addEventListener('click', () => {
        const paddedInput = cd_setInput.padStart(6, '0');
        const h = parseInt(paddedInput.substring(0, 2));
        const m = parseInt(paddedInput.substring(2, 4));
        const s = parseInt(paddedInput.substring(4, 6));

        cd_setTime_ms = (h * 3600 + m * 60 + s) * 1000;

        if (cd_setTime_ms > 0) {
            cd_remainingTime = cd_setTime_ms;
            updateCountdownDisplay(cd_remainingTime);
            
            cdSetupView.style.display = 'none';
            cdRunView.style.display = 'block';
            
            cdMainBtn.textContent = 'Start';
            cdMainBtn.className = 'btn btn-green';
        }
    });

    // Flujo de Ejecución (Pantallas 4, 5, 6)
    cdMainBtn.addEventListener('click', () => {
        if (cdMainBtn.textContent === 'Start' || cdMainBtn.textContent === 'Continue') {
            startCountdown();
        } else {
            pauseCountdown();
        }
    });

    cdClearRunBtn.addEventListener('click', resetCountdownRun);

    function startCountdown() {
        cd_targetTime = Date.now() + cd_remainingTime;
        cd_timerId = setInterval(updateCountdown, 10);
        
        cdMainBtn.textContent = 'Pause';
        cdMainBtn.className = 'btn btn-green';
    }

    function updateCountdown() {
        cd_remainingTime = cd_targetTime - Date.now();

        if (cd_remainingTime <= 0) {
            clearInterval(cd_timerId);
            cd_remainingTime = 0;
            updateCountdownDisplay(0);
            resetCountdownRun(); // Volver a pantalla 4
            // Opcional: Sonido de alarma
        } else {
            updateCountdownDisplay(cd_remainingTime);
        }
    }

    function pauseCountdown() {
        clearInterval(cd_timerId);
        // cd_remainingTime ya tiene el valor correcto del último update
        
        cdMainBtn.textContent = 'Continue';
        cdMainBtn.className = 'btn btn-blue';
    }

    /** Resetea la carrera, volviendo al tiempo configurado (Pantalla 4) */
    function resetCountdownRun() {
        clearInterval(cd_timerId);
        cd_timerId = null;
        cd_remainingTime = cd_setTime_ms;
        updateCountdownDisplay(cd_remainingTime);
        
        cdMainBtn.textContent = 'Start';
        cdMainBtn.className = 'btn btn-green';
    }

    /** Helper para actualizar el display de la cuenta atrás */
    function updateCountdownDisplay(ms) {
        const time = formatMilliseconds(ms);
        cdDisplay.textContent = `${time.h}:${time.m}:${time.s}`;
        cdMs.textContent = time.mmm;
    }

    /** Reseteo General de la Cuenta Atrás */
    function resetCountdown(fullReset) {
        clearInterval(cd_timerId);
        cd_timerId = null;
        cd_remainingTime = 0;
        cd_targetTime = 0;

        if (fullReset) {
            cd_setInput = '';
            cd_setTime_ms = 0;
            cdSetupView.style.display = 'block';
            cdRunView.style.display = 'none';
            updateCountdownInputDisplay(); // Resetea display a 00:00:00
        }
    }
});