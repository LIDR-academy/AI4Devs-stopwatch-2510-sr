// Espera a que el DOM esté completamente cargado antes de ejecutar el script
document.addEventListener("DOMContentLoaded", () => {

    // --- SELECCIÓN DE ELEMENTOS ---

    // Pantallas
    const screens = {
        mainMenu: document.getElementById("main-menu"),
        stopwatch: document.getElementById("stopwatch-screen"),
        countdownInput: document.getElementById("countdown-input-screen"),
        countdownRun: document.getElementById("countdown-run-screen"),
    };

    // Botones de navegación
    const btnGotoStopwatch = document.getElementById("btn-goto-stopwatch");
    const btnGotoCountdown = document.getElementById("btn-goto-countdown");
    const backBtns = document.querySelectorAll(".back-btn");

    // Elementos del Cronómetro (Stopwatch)
    const swDisplay = document.getElementById("stopwatch-display");
    const swStartPauseBtn = document.getElementById("sw-start-pause");
    const swResetBtn = document.getElementById("sw-reset");

    // Elementos de la Cuenta Atrás (Countdown)
    // Input
    const cdInputDisplay = document.getElementById("cd-input-display");
    const keypad = document.querySelector(".keypad");
    const cdClearBtn = document.getElementById("cd-clear");
    const cdSetBtn = document.getElementById("cd-set");
    // Run
    const cdRunDisplay = document.getElementById("cd-run-display");
    const cdStartPauseBtn = document.getElementById("cd-start-pause");
    const cdResetBtn = document.getElementById("cd-reset");


    // --- VARIABLES DE ESTADO ---

    // Cronómetro
    let swInterval;         // Para guardar el setInterval
    let swStartTime = 0;    // Hora de inicio
    let swElapsedTime = 0;  // Tiempo transcurrido
    let swRunning = false;  // Estado

    // Cuenta Atrás
    let cdInputString = "";   // String para la entrada de tiempo
    let cdInterval;
    let cdStartTimeMs = 0;    // Tiempo total configurado en ms
    let cdRemainingTime = 0;  // Tiempo restante en ms
    let cdEndTime = 0;        // Hora de finalización
    let cdRunning = false;


    // --- LÓGICA DE NAVEGACIÓN ---

    // Función para cambiar de pantalla
    function showScreen(screenToShow) {
        // Ocultar todas las pantallas
        for (let key in screens) {
            screens[key].classList.add("hidden");
        }
        // Mostrar la pantalla deseada
        screenToShow.classList.remove("hidden");
    }

    // Ir al Cronómetro
    btnGotoStopwatch.addEventListener("click", () => {
        showScreen(screens.stopwatch);
    });

    // Ir a la Cuenta Atrás (pantalla de input)
    btnGotoCountdown.addEventListener("click", () => {
        resetCountdownInput(); // Limpiar el input al entrar
        showScreen(screens.countdownInput);
    });

    // Botones "Volver"
    backBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            // Detener cualquier temporizador activo al salir
            pauseStopwatch();
            pauseCountdown();
            showScreen(screens.mainMenu);
        });
    });


    // --- LÓGICA DEL CRONÓMETRO (STOPWATCH) ---

    swStartPauseBtn.addEventListener("click", () => {
        if (swRunning) {
            pauseStopwatch();
        } else {
            startStopwatch();
        }
    });

    swResetBtn.addEventListener("click", () => {
        resetStopwatch();
    });

    function startStopwatch() {
        swStartTime = Date.now() - swElapsedTime; // Ajusta la hora de inicio si se reanuda
        swInterval = setInterval(updateStopwatch, 10); // Actualiza cada 10ms (centésimas)
        swRunning = true;
        swStartPauseBtn.textContent = "Pausar";
        swStartPauseBtn.classList.remove("green");
        swStartPauseBtn.classList.add("red");
    }

    function pauseStopwatch() {
        clearInterval(swInterval);
        swRunning = false;
        swStartPauseBtn.textContent = "Iniciar";
        swStartPauseBtn.classList.remove("red");
        swStartPauseBtn.classList.add("green");
    }

    function resetStopwatch() {
        clearInterval(swInterval);
        swRunning = false;
        swElapsedTime = 0;
        swDisplay.innerHTML = '00:00:00<span class="centiseconds">00</span>';
        swStartPauseBtn.textContent = "Iniciar";
        swStartPauseBtn.classList.remove("red");
        swStartPauseBtn.classList.add("green");
    }

    function updateStopwatch() {
        swElapsedTime = Date.now() - swStartTime;
        swDisplay.innerHTML = formatTime(swElapsedTime);
    }


    // --- LÓGICA DE LA CUENTA ATRÁS (COUNTDOWN) ---

    // 1. Pantalla de Input
    keypad.addEventListener("click", (e) => {
        if (e.target.classList.contains("num-btn")) {
            if (cdInputString.length < 6) {
                cdInputString += e.target.textContent;
                updateCdInputDisplay();
            }
        }
    });

    cdClearBtn.addEventListener("click", resetCountdownInput);

    function resetCountdownInput() {
        cdInputString = "";
        cdInputDisplay.textContent = "00:00:00";
    }

    function updateCdInputDisplay() {
        const paddedString = cdInputString.padStart(6, '0');
        const h = paddedString.substring(0, 2);
        const m = paddedString.substring(2, 4);
        const s = paddedString.substring(4, 6);
        cdInputDisplay.textContent = `${h}:${m}:${s}`;
    }

    cdSetBtn.addEventListener("click", () => {
        const paddedString = cdInputString.padStart(6, '0');
        const h = parseInt(paddedString.substring(0, 2), 10);
        const m = parseInt(paddedString.substring(2, 4), 10);
        const s = parseInt(paddedString.substring(4, 6), 10);

        cdStartTimeMs = (h * 3600 + m * 60 + s) * 1000;

        if (cdStartTimeMs > 0) {
            cdRemainingTime = cdStartTimeMs;
            cdRunDisplay.innerHTML = formatTime(cdRemainingTime);
            showScreen(screens.countdownRun);
        } else {
            // Opcional: mostrar un error si el tiempo es 0
            resetCountdownInput();
        }
    });

    // 2. Pantalla de Ejecución
    cdStartPauseBtn.addEventListener("click", () => {
        if (cdRunning) {
            pauseCountdown();
        } else {
            startCountdown();
        }
    });

    cdResetBtn.addEventListener("click", () => {
        resetCountdown();
    });

    function startCountdown() {
        if (cdRemainingTime <= 0) return; // No iniciar si ya está a 0

        cdEndTime = Date.now() + cdRemainingTime; // Calcula la hora de finalización
        cdInterval = setInterval(updateCountdown, 10);
        cdRunning = true;
        cdStartPauseBtn.textContent = "Pausar";
        cdStartPauseBtn.classList.remove("green");
        cdStartPauseBtn.classList.add("red");
    }

    function pauseCountdown() {
        clearInterval(cdInterval);
        // cdRemainingTime se actualiza automáticamente en updateCountdown
        cdRunning = false;
        cdStartPauseBtn.textContent = "Iniciar";
        cdStartPauseBtn.classList.remove("red");
        cdStartPauseBtn.classList.add("green");
    }

    function resetCountdown() {
        clearInterval(cdInterval);
        cdRunning = false;
        cdRemainingTime = cdStartTimeMs; // Vuelve al tiempo configurado
        cdRunDisplay.innerHTML = formatTime(cdRemainingTime);
        cdStartPauseBtn.textContent = "Iniciar";
        cdStartPauseBtn.classList.remove("red");
        cdStartPauseBtn.classList.add("green");
    }

    function updateCountdown() {
        cdRemainingTime = cdEndTime - Date.now();

        if (cdRemainingTime <= 0) {
            clearInterval(cdInterval);
            cdRunning = false;
            cdRemainingTime = 0;
            cdRunDisplay.innerHTML = '00:00:00<span class="centiseconds">00</span>';
            cdStartPauseBtn.textContent = "Iniciar";
            cdStartPauseBtn.classList.remove("red");
            cdStartPauseBtn.classList.add("green");
            // Opcional: Alarma
            // alert("¡Tiempo terminado!");
        } else {
            cdRunDisplay.innerHTML = formatTime(cdRemainingTime);
        }
    }


    // --- FUNCIONES AUXILIARES ---

    // Formatea milisegundos a HH:MM:SS (con centésimas)
    function formatTime(ms) {
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        const centiseconds = Math.floor((ms % 1000) / 10);

        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}<span class="centiseconds">${pad(centiseconds)}</span>`;
    }

    // Añade un cero delante si el número es menor de 10
    function pad(num) {
        return num < 10 ? '0' + num : num;
    }

    // --- INICIO DE LA APP ---
    // Mostrar el menú principal al cargar
    showScreen(screens.mainMenu);

});
