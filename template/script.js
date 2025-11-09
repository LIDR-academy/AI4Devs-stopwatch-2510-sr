
// script.js
(function () {
    const modeSelect = document.getElementById('modeSelect');
    const countdownSettings = document.getElementById('countdownSettings');
    const hoursInput = document.getElementById('hoursInput');
    const minutesInput = document.getElementById('minutesInput');
    const secondsInput = document.getElementById('secondsInput');
    const setCountdownBtn = document.getElementById('setCountdownBtn');

    const timerDisplay = document.getElementById('timerDisplay');
    const timeMain = document.getElementById('timeMain');
    const timeMs = document.getElementById('timeMs');

    const startPauseBtn = document.getElementById('startPauseBtn');
    const clearBtn = document.getElementById('clearBtn');

    let mode = 'countdown'; // 'stopwatch' | 'countdown'
    let running = false;
    let intervalId = null;
    let lastTimestamp = null;

    let elapsedMs = 0; // for stopwatch
    let initialCountdownMs = 8 * 60 * 1000; // default 8 minutes
    let remainingMs = initialCountdownMs;

    // -------- Helpers --------
    function pad(num, size) {
        return String(num).padStart(size, '0');
    }

    function formatAndRender(ms) {
        ms = Math.max(0, Math.floor(ms));
        const totalSeconds = Math.floor(ms / 1000);
        const displayMs = ms % 1000;

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        timeMain.textContent =
            pad(hours, 2) + ':' + pad(minutes, 2) + ':' + pad(seconds, 2);
        timeMs.textContent = pad(displayMs, 3);
    }

    function updateDisplayFromState() {
        if (mode === 'stopwatch') {
            formatAndRender(elapsedMs);
        } else {
            formatAndRender(remainingMs);
        }
    }

    function stopInterval() {
        if (intervalId !== null) {
            clearInterval(intervalId);
            intervalId = null;
        }
        running = false;
        startPauseBtn.textContent = 'Start';
        startPauseBtn.classList.remove('active');
    }

    function indicateFinished() {
        timerDisplay.classList.add('finished');
        // Simple alert; can be removed if only visual cue is desired
        alert("Time's up!");
    }

    // -------- Timer logic --------
    function tick() {
        const now = performance.now();
        const delta = now - lastTimestamp;
        lastTimestamp = now;

        if (mode === 'stopwatch') {
            elapsedMs += delta;
            formatAndRender(elapsedMs);
        } else {
            remainingMs -= delta;
            if (remainingMs <= 0) {
                remainingMs = 0;
                formatAndRender(remainingMs);
                stopInterval();
                indicateFinished();
                return;
            }
            formatAndRender(remainingMs);
        }
    }

    function startTimer() {
        if (running) {
            // pause
            stopInterval();
            return;
        }

        // Starting
        if (mode === 'countdown') {
            timerDisplay.classList.remove('finished');
            // If already reached 0, restart from initial countdown value
            if (remainingMs <= 0) {
                remainingMs = initialCountdownMs;
            }
        }

        running = true;
        startPauseBtn.textContent = 'Pause';
        startPauseBtn.classList.add('active');
        lastTimestamp = performance.now();
        intervalId = setInterval(tick, 10);
    }

    function clearTimer() {
        stopInterval();
        timerDisplay.classList.remove('finished');

        if (mode === 'stopwatch') {
            elapsedMs = 0;
        } else {
            remainingMs = initialCountdownMs;
        }
        updateDisplayFromState();
    }

    // -------- Event handlers --------
    startPauseBtn.addEventListener('click', startTimer);

    clearBtn.addEventListener('click', clearTimer);

    modeSelect.addEventListener('change', function () {
        mode = modeSelect.value;

        stopInterval();
        timerDisplay.classList.remove('finished');

        if (mode === 'stopwatch') {
            countdownSettings.style.display = 'none';
            elapsedMs = 0;
        } else {
            countdownSettings.style.display = 'flex';
            remainingMs = initialCountdownMs;
        }
        updateDisplayFromState();
    });

    setCountdownBtn.addEventListener('click', function () {
        const h = parseInt(hoursInput.value, 10) || 0;
        const m = parseInt(minutesInput.value, 10) || 0;
        const s = parseInt(secondsInput.value, 10) || 0;

        initialCountdownMs = ((h * 60 + m) * 60 + s) * 1000;
        remainingMs = initialCountdownMs;

        if (mode === 'countdown') {
            updateDisplayFromState();
        }
    });

    // -------- Initial render --------
    updateDisplayFromState();
})();