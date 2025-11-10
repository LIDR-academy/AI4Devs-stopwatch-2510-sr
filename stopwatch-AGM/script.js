// View Management
function showView(viewName) {
    const views = document.querySelectorAll('.view');
    views.forEach(view => view.classList.remove('active'));
    
    if (viewName === 'main') {
        document.getElementById('mainView').classList.add('active');
        // Stop any running timers
        stopStopwatch();
        stopCountdown();
        stopBlinking();
    } else if (viewName === 'stopwatch') {
        document.getElementById('stopwatchView').classList.add('active');
    } else if (viewName === 'countdown') {
        document.getElementById('countdownView').classList.add('active');
    }
}

// ============================================
// STOPWATCH FUNCTIONALITY
// ============================================

let stopwatchInterval = null;
let stopwatchStartTime = 0;
let stopwatchElapsed = 0;
let stopwatchRunning = false;

function toggleStopwatch() {
    if (!stopwatchRunning) {
        startStopwatch();
    } else {
        pauseStopwatch();
    }
}

function startStopwatch() {
    stopwatchRunning = true;
    stopwatchStartTime = Date.now() - stopwatchElapsed;
    stopwatchInterval = setInterval(updateStopwatch, 10);
    
    const btn = document.getElementById('stopwatchBtn');
    btn.textContent = 'Pause';
    btn.className = 'btn-pause';
}

function pauseStopwatch() {
    stopwatchRunning = false;
    clearInterval(stopwatchInterval);
    
    const btn = document.getElementById('stopwatchBtn');
    btn.textContent = 'Continue';
    btn.className = 'btn-continue';
}

function stopStopwatch() {
    stopwatchRunning = false;
    if (stopwatchInterval) {
        clearInterval(stopwatchInterval);
        stopwatchInterval = null;
    }
}

function updateStopwatch() {
    stopwatchElapsed = Date.now() - stopwatchStartTime;
    displayStopwatchTime(stopwatchElapsed);
}

function displayStopwatchTime(ms) {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000));
    
    const timeString = 
        String(hours).padStart(2, '0') + ':' +
        String(minutes).padStart(2, '0') + ':' +
        String(seconds).padStart(2, '0');
    
    const msString = String(milliseconds).padStart(3, '0');
    
    document.getElementById('stopwatchTime').textContent = timeString;
    document.getElementById('stopwatchMs').textContent = msString;
}

function clearStopwatch() {
    stopStopwatch();
    stopwatchElapsed = 0;
    displayStopwatchTime(0);
    
    const btn = document.getElementById('stopwatchBtn');
    btn.textContent = 'Start';
    btn.className = 'btn-start';
}

// ============================================
// COUNTDOWN FUNCTIONALITY
// ============================================

let countdownInterval = null;
let countdownEndTime = 0;
let countdownRunning = false;
let countdownPaused = false;
let countdownSetTime = 0;
let countdownRemainingTime = 0;
let blinkInterval = null;
let blinkTimeout = null;

function validateCountdownInput() {
    const hours = parseInt(document.getElementById('inputHours').value) || 0;
    const minutes = parseInt(document.getElementById('inputMinutes').value) || 0;
    const seconds = parseInt(document.getElementById('inputSeconds').value) || 0;
    
    // Enforce max values
    if (hours > 23) document.getElementById('inputHours').value = 23;
    if (minutes > 59) document.getElementById('inputMinutes').value = 59;
    if (seconds > 59) document.getElementById('inputSeconds').value = 59;
    
    // Enable/disable Set button
    const setBtn = document.getElementById('setBtn');
    const hasValue = hours > 0 || minutes > 0 || seconds > 0;
    setBtn.disabled = !hasValue;
}

function setCountdown() {
    const hours = parseInt(document.getElementById('inputHours').value) || 0;
    const minutes = parseInt(document.getElementById('inputMinutes').value) || 0;
    const seconds = parseInt(document.getElementById('inputSeconds').value) || 0;
    
    countdownSetTime = (hours * 3600 + minutes * 60 + seconds) * 1000;
    countdownRemainingTime = countdownSetTime;
    
    // Switch to timer phase
    document.getElementById('countdownInputPhase').style.display = 'none';
    document.getElementById('countdownTimerPhase').style.display = 'block';
    
    displayCountdownTime(countdownRemainingTime);
}

function toggleCountdown() {
    if (!countdownRunning) {
        startCountdown();
    } else {
        pauseCountdown();
    }
}

function startCountdown() {
    stopBlinking();
    countdownRunning = true;
    countdownPaused = false;
    countdownEndTime = Date.now() + countdownRemainingTime;
    countdownInterval = setInterval(updateCountdown, 10);
    
    const btn = document.getElementById('countdownBtn');
    btn.textContent = 'Pause';
    btn.className = 'btn-pause';
}

function pauseCountdown() {
    countdownRunning = false;
    countdownPaused = true;
    clearInterval(countdownInterval);
    
    const btn = document.getElementById('countdownBtn');
    btn.textContent = 'Continue';
    btn.className = 'btn-continue';
}

function stopCountdown() {
    countdownRunning = false;
    countdownPaused = false;
    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }
}

function updateCountdown() {
    countdownRemainingTime = countdownEndTime - Date.now();
    
    if (countdownRemainingTime <= 0) {
        countdownRemainingTime = 0;
        stopCountdown();
        displayCountdownTime(0);
        handleCountdownComplete();
    } else {
        displayCountdownTime(countdownRemainingTime);
    }
}

function displayCountdownTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000));
    
    const timeString = 
        String(hours).padStart(2, '0') + ':' +
        String(minutes).padStart(2, '0') + ':' +
        String(seconds).padStart(2, '0');
    
    const msString = String(milliseconds).padStart(3, '0');
    
    document.getElementById('countdownTime').textContent = timeString;
    document.getElementById('countdownMs').textContent = msString;
}

function handleCountdownComplete() {
    // Start blinking
    const display = document.getElementById('countdownDisplay');
    display.classList.add('blink');
    
    // Play alert sound immediately and then every 500ms
    playAlertSound();
    let beepCount = 0;
    const maxBeeps = 20; // 10 seconds / 0.5 seconds = 20 beeps
    
    blinkInterval = setInterval(() => {
        beepCount++;
        if (beepCount < maxBeeps) {
            playAlertSound();
        }
    }, 500);
    
    // Stop blinking and beeping after 10 seconds
    blinkTimeout = setTimeout(() => {
        stopBlinking();
    }, 10000);
    
    // Change button to Start
    const btn = document.getElementById('countdownBtn');
    btn.textContent = 'Start';
    btn.className = 'btn-start';
}

function stopBlinking() {
    const display = document.getElementById('countdownDisplay');
    display.classList.remove('blink');
    if (blinkTimeout) {
        clearTimeout(blinkTimeout);
        blinkTimeout = null;
    }
    if (blinkInterval) {
        clearInterval(blinkInterval);
        blinkInterval = null;
    }
}

function playAlertSound() {
    // Create a simple beep using the browser's audio context
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
        console.log('Audio playback not supported');
    }
}

function clearCountdown() {
    stopCountdown();
    stopBlinking();
    countdownRemainingTime = countdownSetTime;
    displayCountdownTime(countdownSetTime);
    
    const btn = document.getElementById('countdownBtn');
    btn.textContent = 'Start';
    btn.className = 'btn-start';
}

function clearCountdownInput() {
    document.getElementById('inputHours').value = 0;
    document.getElementById('inputMinutes').value = 0;
    document.getElementById('inputSeconds').value = 0;
    validateCountdownInput();
    
    // If in timer phase, go back to input phase
    document.getElementById('countdownInputPhase').style.display = 'block';
    document.getElementById('countdownTimerPhase').style.display = 'none';
    
    stopCountdown();
    stopBlinking();
    countdownSetTime = 0;
    countdownRemainingTime = 0;
}

function resetCountdown() {
    // Go back to input phase, preserving the previous values
    const hours = Math.floor(countdownSetTime / 3600000);
    const minutes = Math.floor((countdownSetTime % 3600000) / 60000);
    const seconds = Math.floor((countdownSetTime % 60000) / 1000);
    
    document.getElementById('inputHours').value = hours;
    document.getElementById('inputMinutes').value = minutes;
    document.getElementById('inputSeconds').value = seconds;
    
    document.getElementById('countdownInputPhase').style.display = 'block';
    document.getElementById('countdownTimerPhase').style.display = 'none';
    
    stopCountdown();
    stopBlinking();
    countdownSetTime = 0;
    countdownRemainingTime = 0;
    
    validateCountdownInput();
}

// Initialize
displayStopwatchTime(0);
