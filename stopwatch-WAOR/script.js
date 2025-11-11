       // ============ VARIABLES GLOBALES ============
        let timerInterval = null;
        let timerStartTime = 0;
        let timerElapsedTime = 0;
        let timerRunning = false;

        let countdownInterval = null;
        let countdownTime = 0;
        let countdownRunning = false;

        // Audio para la alarma
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();

        // ============ FUNCIONES AUXILIARES ============

        /**
         * Formatea un número a dos dígitos con cero a la izquierda
         * @param {number} num - Número a formatear
         * @returns {string} Número formateado
         */
        function padZero(num) {
            return num.toString().padStart(2, '0');
        }

        /**
         * Formatea milisegundos a tres dígitos
         * @param {number} num - Número a formatear
         * @returns {string} Número formateado
         */
        function padMilliseconds(num) {
            return num.toString().padStart(3, '0');
        }

        /**
         * Cambia entre las pestañas de cronómetro y cuenta atrás
         * @param {string} tab - Nombre de la pestaña ('timer' o 'countdown')
         */
        function switchTab(tab) {
            const tabs = document.querySelectorAll('.tab-content');
            const buttons = document.querySelectorAll('.tab-button');
            
            tabs.forEach(t => t.classList.remove('active'));
            buttons.forEach(b => b.classList.remove('active'));
            
            document.getElementById(tab).classList.add('active');
            event.target.classList.add('active');
        }

        // ============ FUNCIONES DEL CRONÓMETRO ============

        /**
         * Actualiza la visualización del cronómetro
         * @param {number} totalMilliseconds - Tiempo total en milisegundos
         */
        function updateTimerDisplay(totalMilliseconds) {
            const hours = Math.floor(totalMilliseconds / 3600000);
            const minutes = Math.floor((totalMilliseconds % 3600000) / 60000);
            const seconds = Math.floor((totalMilliseconds % 60000) / 1000);
            const milliseconds = totalMilliseconds % 1000;

            document.getElementById('timer-hours').textContent = padZero(hours);
            document.getElementById('timer-minutes').textContent = padZero(minutes);
            document.getElementById('timer-seconds').textContent = padZero(seconds);
            document.getElementById('timer-milliseconds').textContent = padMilliseconds(milliseconds);
        }

        /**
         * Inicia o pausa el cronómetro
         */
        function startTimer() {
            const button = event.target;
            
            if (!timerRunning) {
                timerStartTime = Date.now() - timerElapsedTime;
                timerInterval = setInterval(() => {
                    timerElapsedTime = Date.now() - timerStartTime;
                    updateTimerDisplay(timerElapsedTime);
                }, 10);
                timerRunning = true;
                button.textContent = 'Stop';
                button.classList.remove('btn-start');
                button.classList.add('btn-stop');
            } else {
                clearInterval(timerInterval);
                timerRunning = false;
                button.textContent = 'Start';
                button.classList.remove('btn-stop');
                button.classList.add('btn-start');
            }
        }

        /**
         * Reinicia el cronómetro a cero
         */
        function clearTimer() {
            clearInterval(timerInterval);
            timerElapsedTime = 0;
            timerRunning = false;
            updateTimerDisplay(0);
            
            const button = document.querySelector('#timer .btn-start, #timer .btn-stop');
            button.textContent = 'Start';
            button.classList.remove('btn-stop');
            button.classList.add('btn-start');
        }

        // ============ FUNCIONES DE CUENTA ATRÁS ============

        /**
         * Actualiza la visualización de la cuenta atrás
         * @param {number} totalMilliseconds - Tiempo total en milisegundos
         */
        function updateCountdownDisplay(totalMilliseconds) {
            const hours = Math.floor(totalMilliseconds / 3600000);
            const minutes = Math.floor((totalMilliseconds % 3600000) / 60000);
            const seconds = Math.floor((totalMilliseconds % 60000) / 1000);
            const milliseconds = totalMilliseconds % 1000;

            document.getElementById('countdown-hours').textContent = padZero(hours);
            document.getElementById('countdown-minutes').textContent = padZero(minutes);
            document.getElementById('countdown-seconds').textContent = padZero(seconds);
            document.getElementById('countdown-milliseconds').textContent = padMilliseconds(milliseconds);
        }

        /**
         * Reproduce una alarma suave cuando la cuenta atrás llega a cero
         */
        function playAlarm() {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = 800;
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 1);
        }

        /**
         * Establece el tiempo inicial de la cuenta atrás desde los inputs
         */
        function setCountdown() {
            const hours = parseInt(document.getElementById('input-hours').value) || 0;
            const minutes = parseInt(document.getElementById('input-minutes').value) || 0;
            const seconds = parseInt(document.getElementById('input-seconds').value) || 0;

            countdownTime = (hours * 3600000) + (minutes * 60000) + (seconds * 1000);
            updateCountdownDisplay(countdownTime);
        }

        /**
         * Inicia o pausa la cuenta atrás
         */
        function startCountdown() {
            const button = event.target;
            
            if (!countdownRunning) {
                if (countdownTime <= 0) {
                    alert('Por favor, establece un tiempo primero');
                    return;
                }

                const startTime = Date.now();
                const endTime = startTime + countdownTime;

                countdownInterval = setInterval(() => {
                    const now = Date.now();
                    const remaining = endTime - now;

                    if (remaining <= 0) {
                        clearInterval(countdownInterval);
                        countdownTime = 0;
                        countdownRunning = false;
                        updateCountdownDisplay(0);
                        playAlarm();
                        button.textContent = 'Start';
                        button.classList.remove('btn-stop');
                        button.classList.add('btn-start');
                    } else {
                        countdownTime = remaining;
                        updateCountdownDisplay(remaining);
                    }
                }, 10);

                countdownRunning = true;
                button.textContent = 'Stop';
                button.classList.remove('btn-start');
                button.classList.add('btn-stop');
            } else {
                clearInterval(countdownInterval);
                countdownRunning = false;
                button.textContent = 'Start';
                button.classList.remove('btn-stop');
                button.classList.add('btn-start');
            }
        }

        /**
         * Reinicia la cuenta atrás a cero
         */
        function clearCountdown() {
            clearInterval(countdownInterval);
            countdownTime = 0;
            countdownRunning = false;
            updateCountdownDisplay(0);
            
            document.getElementById('input-hours').value = 0;
            document.getElementById('input-minutes').value = 0;
            document.getElementById('input-seconds').value = 0;
            
            const button = document.querySelector('#countdown .btn-start, #countdown .btn-stop');
            button.textContent = 'Start';
            button.classList.remove('btn-stop');
            button.classList.add('btn-start');
        }
