// Language translations
const translations = {
  en: {
    stopwatch: 'Stopwatch',
    countdown: 'Countdown',
    start: 'Start',
    pause: 'Pause',
    lap: 'Lap',
    reset: 'Reset',
    hours: 'Hours',
    minutes: 'Minutes',
    seconds: 'Seconds',
    laps: 'Laps',
    lapTime: 'Lap Time',
    totalTime: 'Total Time',
    noLaps: 'No laps recorded',
  },
  es: {
    stopwatch: 'Cronómetro',
    countdown: 'Cuenta Regresiva',
    start: 'Iniciar',
    pause: 'Pausar',
    lap: 'Vuelta',
    reset: 'Reiniciar',
    hours: 'Horas',
    minutes: 'Minutos',
    seconds: 'Segundos',
    laps: 'Vueltas',
    lapTime: 'Tiempo de Vuelta',
    totalTime: 'Tiempo Total',
    noLaps: 'No hay vueltas registradas',
  },
  pt: {
    stopwatch: 'Cronômetro',
    countdown: 'Contagem Regressiva',
    start: 'Iniciar',
    pause: 'Pausar',
    lap: 'Volta',
    reset: 'Reiniciar',
    hours: 'Horas',
    minutes: 'Minutos',
    seconds: 'Segundos',
    laps: 'Voltas',
    lapTime: 'Tempo da Volta',
    totalTime: 'Tempo Total',
    noLaps: 'Nenhuma volta registrada',
  },
}

// Global variables
let currentLanguage = 'en'
let stopwatchInterval
let countdownInterval
let stopwatchTime = 0
let countdownTime = 0
let stopwatchRunning = false
let countdownRunning = false
let laps = []
let lastLapTime = 0

// DOM elements
const languageSelector = document.getElementById('language')
const tabButtons = document.querySelectorAll('.tab-button')
const tabPanes = document.querySelectorAll('.tab-pane')

// Stopwatch elements
const stopwatchTimeDisplay = document.getElementById('stopwatch-time')
const stopwatchMillisDisplay = document.getElementById('stopwatch-millis')
const startStopwatchBtn = document.getElementById('start-stopwatch')
const lapStopwatchBtn = document.getElementById('lap-stopwatch')
const resetStopwatchBtn = document.getElementById('reset-stopwatch')
const lapsList = document.getElementById('laps-list')
const lapsTitle = document.getElementById('laps-title')

// Countdown elements
const countdownTimeDisplay = document.getElementById('countdown-time')
const countdownMillisDisplay = document.getElementById('countdown-millis')
const hoursInput = document.getElementById('hours-input')
const minutesInput = document.getElementById('minutes-input')
const secondsInput = document.getElementById('seconds-input')
const startCountdownBtn = document.getElementById('start-countdown')
const resetCountdownBtn = document.getElementById('reset-countdown')

// Audio element - mejoramos el sonido
const alarmSound = new Audio(
  'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAAAAABgYXBhbAAAAABkYW1wAAAAdGVzdAAAAAB0AGUAcwB0AAAAZGF0YQAAAAAAAABgYXBhbAAAAABkYW1wAAAAdGVzdAAAAAB0AGUAcwB0AAAAZGF0YQAAAAAAAABgYXBhbAAAAABkYW1wAAAAdGVzdAAAAAB0AGUAcwB0AAAA'
)

// Initialize the application
function init() {
  // Set up event listeners
  languageSelector.addEventListener('change', changeLanguage)

  tabButtons.forEach((button) => {
    button.addEventListener('click', switchTab)
  })

  // Stopwatch events
  startStopwatchBtn.addEventListener('click', toggleStopwatch)
  lapStopwatchBtn.addEventListener('click', recordLap)
  resetStopwatchBtn.addEventListener('click', resetStopwatch)

  // Countdown events
  startCountdownBtn.addEventListener('click', toggleCountdown)
  resetCountdownBtn.addEventListener('click', resetCountdown)

  // Input validation
  ;[hoursInput, minutesInput, secondsInput].forEach((input) => {
    input.addEventListener('change', validateTimeInput)
  })

  // Apply initial translations
  updateTranslations()

  // Inicializar display
  updateStopwatchDisplay()
  updateCountdownDisplay()
  updateDocumentTitle()
}

// Change language
function changeLanguage() {
  currentLanguage = languageSelector.value
  updateTranslations()
}

// Update all text elements with current language
function updateTranslations() {
  const t = translations[currentLanguage]

  // Update tab buttons
  document.querySelector('[data-tab="stopwatch"]').textContent = t.stopwatch
  document.querySelector('[data-tab="countdown"]').textContent = t.countdown

  // Update stopwatch buttons
  startStopwatchBtn.textContent = stopwatchRunning ? t.pause : t.start
  lapStopwatchBtn.textContent = t.lap
  resetStopwatchBtn.textContent = t.reset

  // Update countdown buttons
  startCountdownBtn.textContent = countdownRunning ? t.pause : t.start
  resetCountdownBtn.textContent = t.reset

  // Update input labels
  document.querySelector('label[for="hours-input"]').textContent = t.hours
  document.querySelector('label[for="minutes-input"]').textContent = t.minutes
  document.querySelector('label[for="seconds-input"]').textContent = t.seconds

  // Update laps title
  lapsTitle.textContent = t.laps

  // Update laps list if there are laps
  if (laps.length > 0) {
    updateLapsDisplay()
  }
}

// Switch between tabs
function switchTab(e) {
  const tabId = e.target.getAttribute('data-tab')

  // Update active tab button
  tabButtons.forEach((button) => {
    button.classList.remove('active')
  })
  e.target.classList.add('active')

  // Update active tab pane
  tabPanes.forEach((pane) => {
    pane.classList.remove('active')
  })
  document.getElementById(tabId).classList.add('active')

  // Remove countdown completion animation if active
  document.getElementById('countdown').classList.remove('countdown-complete')

  // Actualizar el título del documento según la pestaña activa
  updateDocumentTitle()
}

// Stopwatch functions
function toggleStopwatch() {
  if (stopwatchRunning) {
    pauseStopwatch()
  } else {
    startStopwatch()
  }
  updateTranslations()
}

function startStopwatch() {
  stopwatchRunning = true

  const startTime = Date.now() - stopwatchTime

  stopwatchInterval = setInterval(() => {
    stopwatchTime = Date.now() - startTime
    updateStopwatchDisplay()
    updateDocumentTitle()
  }, 10)
}

function pauseStopwatch() {
  stopwatchRunning = false
  clearInterval(stopwatchInterval)
}

function resetStopwatch() {
  pauseStopwatch()
  stopwatchTime = 0
  laps = []
  lastLapTime = 0
  updateStopwatchDisplay()
  updateLapsDisplay()
  updateDocumentTitle()
  updateTranslations()
}

function recordLap() {
  if (!stopwatchRunning) return

  const currentTime = stopwatchTime
  const lapTime = currentTime - lastLapTime
  lastLapTime = currentTime

  laps.push({
    lapNumber: laps.length + 1,
    lapTime: lapTime,
    totalTime: currentTime,
  })

  updateLapsDisplay()
}

function updateStopwatchDisplay() {
  const time = formatTime(stopwatchTime, true)
  stopwatchTimeDisplay.textContent = time.formatted
  stopwatchMillisDisplay.textContent = time.millis
}

function updateLapsDisplay() {
  const t = translations[currentLanguage]
  lapsList.innerHTML = ''

  if (laps.length === 0) {
    const emptyItem = document.createElement('li')
    emptyItem.textContent = t.noLaps
    lapsList.appendChild(emptyItem)
    return
  }

  laps.forEach((lap) => {
    const lapItem = document.createElement('li')

    const lapTime = formatTime(lap.lapTime, false)
    const totalTime = formatTime(lap.totalTime, false)

    lapItem.innerHTML = `
            <span>${t.lap} ${lap.lapNumber}</span>
            <span>${lapTime.formatted}</span>
            <span>${totalTime.formatted}</span>
        `

    lapsList.appendChild(lapItem)
  })
}

// Countdown functions
function toggleCountdown() {
  if (countdownRunning) {
    pauseCountdown()
  } else {
    startCountdown()
  }
  updateTranslations()
}

function startCountdown() {
  if (countdownTime <= 0) {
    setCountdownTimeFromInputs()
  }

  if (countdownTime <= 0) return

  countdownRunning = true

  const startTime = Date.now()
  const endTime = startTime + countdownTime

  countdownInterval = setInterval(() => {
    const currentTime = Date.now()
    countdownTime = Math.max(0, endTime - currentTime)

    updateCountdownDisplay()
    updateDocumentTitle()

    if (countdownTime <= 0) {
      countdownFinished()
    }
  }, 10)
}

function pauseCountdown() {
  countdownRunning = false
  clearInterval(countdownInterval)
}

function resetCountdown() {
  pauseCountdown()
  setCountdownTimeFromInputs()
  updateCountdownDisplay()
  updateDocumentTitle()
  document.getElementById('countdown').classList.remove('countdown-complete')
  updateTranslations()
}

function setCountdownTimeFromInputs() {
  const hours = parseInt(hoursInput.value) || 0
  const minutes = parseInt(minutesInput.value) || 0
  const seconds = parseInt(secondsInput.value) || 0

  countdownTime = (hours * 3600 + minutes * 60 + seconds) * 1000
}

function countdownFinished() {
  clearInterval(countdownInterval)
  countdownRunning = false

  // Play alarm sound - método mejorado
  try {
    alarmSound.currentTime = 0
    alarmSound.play().catch((e) => {
      console.log('Error playing sound:', e)
      // Fallback: crear un sonido simple con el Web Audio API
      playFallbackSound()
    })
  } catch (e) {
    console.log('Error with audio:', e)
    playFallbackSound()
  }

  // Highlight the countdown tab
  document.getElementById('countdown').classList.add('countdown-complete')

  // Flash the browser tab title
  let flashCount = 0
  const originalTitle = document.title
  const flashInterval = setInterval(() => {
    document.title =
      document.title === originalTitle ? "TIME'S UP!" : originalTitle
    flashCount++

    if (flashCount >= 10) {
      clearInterval(flashInterval)
      document.title = originalTitle
    }
  }, 500)

  updateTranslations()
}

function playFallbackSound() {
  // Crear un sonido simple usando Web Audio API como fallback
  try {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.value = 800
    oscillator.type = 'sine'

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 1
    )

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 1)
  } catch (e) {
    console.log('Web Audio API not supported')
  }
}

function updateCountdownDisplay() {
  const time = formatTime(countdownTime, true)
  countdownTimeDisplay.textContent = time.formatted
  countdownMillisDisplay.textContent = time.millis
}

// Utility functions
function formatTime(milliseconds, showMillis = false) {
  const totalSeconds = Math.floor(milliseconds / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  const millis = Math.floor((milliseconds % 1000) / 10)

  const formatted = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`

  return {
    formatted: formatted,
    millis: showMillis ? padZero(millis, 2) : '',
  }
}

function padZero(num, length = 2) {
  return num.toString().padStart(length, '0')
}

function updateDocumentTitle() {
  // Determinar qué tiempo mostrar en el título
  let timeToUse

  if (document.getElementById('stopwatch').classList.contains('active')) {
    // Si estamos en la pestaña de stopwatch, usar ese tiempo
    timeToUse = stopwatchTime
  } else {
    // Si estamos en countdown, usar ese tiempo
    timeToUse = countdownTime
  }

  const time = formatTime(timeToUse, false)
  document.title = time.formatted
}

function validateTimeInput(e) {
  const input = e.target
  let value = parseInt(input.value)

  if (isNaN(value) || value < 0) {
    input.value = 0
  } else if (input.id === 'hours-input' && value > 23) {
    input.value = 23
  } else if (
    (input.id === 'minutes-input' || input.id === 'seconds-input') &&
    value > 59
  ) {
    input.value = 59
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init)
