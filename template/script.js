/* =====================================================================
   CRONÓMETRO Y CUENTA ATRÁS - APLICACIÓN WEB
   
   Este archivo contiene toda la lógica de la aplicación, implementando:
   - Cronómetro (stopwatch): cuenta desde 00:00:00:000 hacia arriba
   - Cuenta atrás (countdown): cuenta desde un tiempo configurado hacia abajo
   - Manejo de eventos de interfaz y teclado
   - Persistencia de estado con localStorage
   - Animaciones y feedback visual
   
   Autor: AI4Devs
   Fecha: 2024
   ===================================================================== */

// =====================================================================
// CLASE TimerApp - Controlador principal de la aplicación
// =====================================================================
class TimerApp {
    /**
     * Constructor de la aplicación
     * Inicializa todas las propiedades y establece el estado inicial
     */
    constructor() {
        // ============ PROPIEDADES DE ESTADO ============
        
        // Modo actual: 'stopwatch' o 'countdown'
        this.mode = 'stopwatch';
        
        // Estado del temporizador: 'stopped', 'running', 'paused'
        this.state = 'stopped';
        
        // Tiempo transcurrido en milisegundos (para stopwatch)
        this.elapsedTime = 0;
        
        // Tiempo restante en milisegundos (para countdown)
        this.remainingTime = 0;
        
        // Tiempo inicial configurado para countdown (en milisegundos)
        this.initialCountdownTime = 300000; // 5 minutos por defecto
        
        // ID del intervalo para actualizar el display
        this.intervalId = null;
        
        // Timestamp del último inicio/reanudación
        this.startTime = null;
        
        // ============ REFERENCIAS A ELEMENTOS DOM ============
        this.elements = {
            // Botones de modo
            stopwatchModeBtn: document.getElementById('stopwatchModeBtn'),
            countdownModeBtn: document.getElementById('countdownModeBtn'),
            
            // Configuración de countdown
            countdownConfig: document.getElementById('countdownConfig'),
            hoursInput: document.getElementById('hoursInput'),
            minutesInput: document.getElementById('minutesInput'),
            secondsInput: document.getElementById('secondsInput'),
            
            // Display del tiempo
            timeDisplay: document.getElementById('timeDisplay'),
            hoursSpan: document.querySelector('.time-hours'),
            minutesSpan: document.querySelector('.time-minutes'),
            secondsSpan: document.querySelector('.time-seconds'),
            millisecondsSpan: document.querySelector('.time-milliseconds'),
            
            // Botones de control
            startBtn: document.getElementById('startBtn'),
            clearBtn: document.getElementById('clearBtn'),
            
            // Información adicional
            additionalInfo: document.getElementById('additionalInfo'),
            statusMessage: document.getElementById('statusMessage')
        };
        
        // Inicializar la aplicación
        this.init();
    }
    
    /**
     * Inicialización de la aplicación
     * Configura event listeners y carga el estado guardado
     */
    init() {
        console.log('🚀 Inicializando aplicación de cronómetro...');
        
        // Configurar todos los event listeners
        this.setupEventListeners();
        
        // Cargar configuración guardada desde localStorage
        this.loadSavedState();
        
        // Actualizar el display inicial
        this.updateDisplay();
        
        console.log('✅ Aplicación inicializada correctamente');
    }
    
    /**
     * Configura todos los event listeners de la aplicación
     * Incluye botones, inputs y atajos de teclado
     */
    setupEventListeners() {
        // ===== BOTONES DE MODO =====
        this.elements.stopwatchModeBtn.addEventListener('click', () => {
            this.switchMode('stopwatch');
        });
        
        this.elements.countdownModeBtn.addEventListener('click', () => {
            this.switchMode('countdown');
        });
        
        // ===== INPUTS DE CONFIGURACIÓN =====
        // Validación en tiempo real de los inputs numéricos
        [this.elements.hoursInput, this.elements.minutesInput, this.elements.secondsInput].forEach(input => {
            input.addEventListener('input', (e) => this.validateInput(e.target));
            input.addEventListener('change', () => this.updateCountdownTime());
        });
        
        // ===== BOTONES DE CONTROL =====
        this.elements.startBtn.addEventListener('click', () => {
            this.toggleStartPause();
        });
        
        this.elements.clearBtn.addEventListener('click', () => {
            this.clear();
        });
        
        // ===== ATAJOS DE TECLADO =====
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcut(e);
        });
    }
    
    /**
     * Cambia entre modo cronómetro y cuenta atrás
     * @param {string} newMode - 'stopwatch' o 'countdown'
     */
    switchMode(newMode) {
        // Si ya estamos en ese modo, no hacer nada
        if (this.mode === newMode) return;
        
        // Detener cualquier temporizador en ejecución
        this.stop();
        
        // Cambiar el modo
        this.mode = newMode;
        
        // Actualizar UI de los botones de modo
        if (newMode === 'stopwatch') {
            this.elements.stopwatchModeBtn.classList.add('active');
            this.elements.countdownModeBtn.classList.remove('active');
            this.elements.countdownConfig.classList.add('hidden');
            
            // Resetear el cronómetro
            this.elapsedTime = 0;
        } else {
            this.elements.countdownModeBtn.classList.add('active');
            this.elements.stopwatchModeBtn.classList.remove('active');
            this.elements.countdownConfig.classList.remove('hidden');
            
            // Configurar tiempo inicial de countdown
            this.updateCountdownTime();
        }
        
        // Actualizar display y guardar estado
        this.updateDisplay();
        this.saveState();
        
        console.log(`📌 Modo cambiado a: ${newMode}`);
    }
    
    /**
     * Valida los inputs numéricos para asegurar valores correctos
     * @param {HTMLInputElement} input - El input a validar
     */
    validateInput(input) {
        let value = parseInt(input.value) || 0;
        const min = parseInt(input.min);
        const max = parseInt(input.max);
        
        // Limitar al rango permitido
        if (value < min) value = min;
        if (value > max) value = max;
        
        // Actualizar el valor del input
        input.value = value;
    }
    
    /**
     * Actualiza el tiempo inicial de la cuenta atrás basado en los inputs
     */
    updateCountdownTime() {
        const hours = parseInt(this.elements.hoursInput.value) || 0;
        const minutes = parseInt(this.elements.minutesInput.value) || 0;
        const seconds = parseInt(this.elements.secondsInput.value) || 0;
        
        // Convertir todo a milisegundos
        this.initialCountdownTime = (hours * 3600 + minutes * 60 + seconds) * 1000;
        
        // Si el temporizador no está corriendo, actualizar el tiempo restante
        if (this.state === 'stopped') {
            this.remainingTime = this.initialCountdownTime;
            this.updateDisplay();
        }
        
        this.saveState();
    }
    
    /**
     * Alterna entre iniciar/pausar el temporizador
     */
    toggleStartPause() {
        if (this.state === 'stopped' || this.state === 'paused') {
            this.start();
        } else if (this.state === 'running') {
            this.pause();
        }
    }
    
    /**
     * Inicia el temporizador
     */
    start() {
        // En modo countdown, verificar que hay tiempo configurado
        if (this.mode === 'countdown' && this.initialCountdownTime === 0) {
            this.showMessage('⚠️ Configura un tiempo mayor a 0', 'warning');
            return;
        }
        
        // Si estaba detenido, inicializar los valores
        if (this.state === 'stopped') {
            if (this.mode === 'countdown') {
                this.remainingTime = this.initialCountdownTime;
            } else {
                this.elapsedTime = 0;
            }
        }
        
        // Guardar el momento de inicio
        this.startTime = Date.now();
        
        // Cambiar estado a running
        this.state = 'running';
        
        // Actualizar UI
        this.updateButtonsUI();
        this.elements.timeDisplay.classList.add('running');
        
        // Iniciar el intervalo de actualización
        // Usamos 10ms para mayor precisión en los milisegundos
        this.intervalId = setInterval(() => {
            this.update();
        }, 10);
        
        console.log('▶️ Temporizador iniciado');
    }
    
    /**
     * Pausa el temporizador
     */
    pause() {
        // Detener el intervalo
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        
        // Cambiar estado a paused
        this.state = 'paused';
        
        // Actualizar UI
        this.updateButtonsUI();
        this.elements.timeDisplay.classList.remove('running');
        
        console.log('⏸️ Temporizador pausado');
    }
    
    /**
     * Detiene completamente el temporizador
     */
    stop() {
        // Detener el intervalo
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        
        // Cambiar estado a stopped
        this.state = 'stopped';
        
        // Actualizar UI
        this.updateButtonsUI();
        this.elements.timeDisplay.classList.remove('running', 'warning');
    }
    
    /**
     * Limpia/resetea el temporizador
     */
    clear() {
        // Detener el temporizador
        this.stop();
        
        // Resetear valores según el modo
        if (this.mode === 'stopwatch') {
            this.elapsedTime = 0;
        } else {
            this.remainingTime = this.initialCountdownTime;
        }
        
        // Actualizar display y guardar estado
        this.updateDisplay();
        this.saveState();
        
        console.log('🔄 Temporizador limpiado');
    }
    
    /**
     * Actualiza el temporizador en cada tick del intervalo
     */
    update() {
        const now = Date.now();
        const delta = now - this.startTime;
        this.startTime = now;
        
        if (this.mode === 'stopwatch') {
            // Modo cronómetro: incrementar tiempo
            this.elapsedTime += delta;
        } else {
            // Modo cuenta atrás: decrementar tiempo
            this.remainingTime -= delta;
            
            // Verificar si llegó a cero
            if (this.remainingTime <= 0) {
                this.remainingTime = 0;
                this.onCountdownComplete();
                return;
            }
            
            // Mostrar advertencia visual cuando quedan menos de 10 segundos
            if (this.remainingTime < 10000 && !this.elements.timeDisplay.classList.contains('warning')) {
                this.elements.timeDisplay.classList.add('warning');
            }
        }
        
        // Actualizar el display
        this.updateDisplay();
    }
    
    /**
     * Se ejecuta cuando la cuenta atrás llega a cero
     */
    onCountdownComplete() {
        // Detener el temporizador
        this.stop();
        
        // Mostrar mensaje de finalización
        this.showMessage('⏰ ¡Tiempo completado!', 'success');
        
        // Reproducir sonido de notificación (si está disponible en el navegador)
        this.playNotificationSound();
        
        // Intentar mostrar notificación del navegador
        this.showBrowserNotification();
        
        console.log('✅ Cuenta atrás completada');
    }
    
    /**
     * Actualiza el display del tiempo
     */
    updateDisplay() {
        // Obtener el tiempo a mostrar según el modo
        const time = this.mode === 'stopwatch' ? this.elapsedTime : this.remainingTime;
        
        // Convertir milisegundos a componentes de tiempo
        const timeComponents = this.millisecondsToTime(time);
        
        // Actualizar cada span del display
        this.elements.hoursSpan.textContent = this.pad(timeComponents.hours, 2);
        this.elements.minutesSpan.textContent = this.pad(timeComponents.minutes, 2);
        this.elements.secondsSpan.textContent = this.pad(timeComponents.seconds, 2);
        this.elements.millisecondsSpan.textContent = this.pad(timeComponents.milliseconds, 3);
        
        // Actualizar el título de la página
        this.updatePageTitle(timeComponents);
    }
    
    /**
     * Convierte milisegundos a componentes de tiempo
     * @param {number} ms - Milisegundos a convertir
     * @returns {Object} Objeto con hours, minutes, seconds, milliseconds
     */
    millisecondsToTime(ms) {
        // Asegurar que no sea negativo
        ms = Math.max(0, ms);
        
        const milliseconds = Math.floor(ms % 1000);
        const totalSeconds = Math.floor(ms / 1000);
        const seconds = totalSeconds % 60;
        const totalMinutes = Math.floor(totalSeconds / 60);
        const minutes = totalMinutes % 60;
        const hours = Math.floor(totalMinutes / 60);
        
        return { hours, minutes, seconds, milliseconds };
    }
    
    /**
     * Añade ceros a la izquierda de un número
     * @param {number} num - Número a formatear
     * @param {number} size - Cantidad total de dígitos
     * @returns {string} Número formateado con ceros
     */
    pad(num, size) {
        let s = String(num);
        while (s.length < size) {
            s = '0' + s;
        }
        return s;
    }
    
    /**
     * Actualiza el título de la página con el tiempo actual
     * @param {Object} timeComponents - Componentes del tiempo
     */
    updatePageTitle(timeComponents) {
        const timeString = `${this.pad(timeComponents.hours, 2)}:${this.pad(timeComponents.minutes, 2)}:${this.pad(timeComponents.seconds, 2)}`;
        const modeLabel = this.mode === 'stopwatch' ? 'Cronómetro' : 'Cuenta Atrás';
        document.title = `${timeString} - ${modeLabel} | AI4Devs`;
    }
    
    /**
     * Actualiza el UI de los botones según el estado
     */
    updateButtonsUI() {
        const startBtnText = this.elements.startBtn.querySelector('.btn-text');
        
        if (this.state === 'stopped' || this.state === 'paused') {
            // Mostrar "Start"
            startBtnText.textContent = 'Start';
            this.elements.startBtn.classList.remove('pause');
        } else if (this.state === 'running') {
            // Mostrar "Pause"
            startBtnText.textContent = 'Pause';
            this.elements.startBtn.classList.add('pause');
        }
    }
    
    /**
     * Maneja los atajos de teclado
     * @param {KeyboardEvent} e - Evento del teclado
     */
    handleKeyboardShortcut(e) {
        // Ignorar si el usuario está escribiendo en un input
        if (e.target.tagName === 'INPUT') return;
        
        switch(e.key.toLowerCase()) {
            case ' ':
                // Espacio: Start/Pause
                e.preventDefault();
                this.toggleStartPause();
                break;
            
            case 'r':
                // R: Reiniciar (equivalente a Clear cuando está corriendo)
                e.preventDefault();
                this.clear();
                break;
            
            case 'c':
                // C: Clear
                e.preventDefault();
                this.clear();
                break;
            
            case 'm':
                // M: Cambiar modo
                e.preventDefault();
                const newMode = this.mode === 'stopwatch' ? 'countdown' : 'stopwatch';
                this.switchMode(newMode);
                break;
        }
    }
    
    /**
     * Muestra un mensaje temporal en la UI
     * @param {string} message - Mensaje a mostrar
     * @param {string} type - Tipo de mensaje: 'success', 'warning', 'info'
     */
    showMessage(message, type = 'info') {
        this.elements.statusMessage.textContent = message;
        this.elements.additionalInfo.classList.remove('hidden');
        
        // Ocultar el mensaje después de 3 segundos
        setTimeout(() => {
            this.elements.additionalInfo.classList.add('hidden');
        }, 3000);
    }
    
    /**
     * Reproduce un sonido de notificación
     */
    playNotificationSound() {
        // Crear un beep usando Web Audio API
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
        } catch (error) {
            console.warn('No se pudo reproducir el sonido:', error);
        }
    }
    
    /**
     * Muestra una notificación del navegador
     */
    async showBrowserNotification() {
        // Verificar si las notificaciones están disponibles
        if (!('Notification' in window)) {
            console.log('Este navegador no soporta notificaciones');
            return;
        }
        
        // Solicitar permiso si no lo tenemos
        if (Notification.permission === 'default') {
            await Notification.requestPermission();
        }
        
        // Mostrar notificación si tenemos permiso
        if (Notification.permission === 'granted') {
            new Notification('Cuenta Atrás Completada', {
                body: '¡El tiempo ha terminado!',
                icon: '/res/icon.png',
                badge: '/res/badge.png'
            });
        }
    }
    
    /**
     * Guarda el estado actual en localStorage
     */
    saveState() {
        const state = {
            mode: this.mode,
            initialCountdownTime: this.initialCountdownTime,
            hoursInput: this.elements.hoursInput.value,
            minutesInput: this.elements.minutesInput.value,
            secondsInput: this.elements.secondsInput.value
        };
        
        try {
            localStorage.setItem('timerAppState', JSON.stringify(state));
        } catch (error) {
            console.warn('No se pudo guardar el estado:', error);
        }
    }
    
    /**
     * Carga el estado guardado desde localStorage
     */
    loadSavedState() {
        try {
            const savedState = localStorage.getItem('timerAppState');
            if (savedState) {
                const state = JSON.parse(savedState);
                
                // Restaurar modo
                if (state.mode) {
                    this.switchMode(state.mode);
                }
                
                // Restaurar inputs de countdown
                if (state.hoursInput !== undefined) {
                    this.elements.hoursInput.value = state.hoursInput;
                }
                if (state.minutesInput !== undefined) {
                    this.elements.minutesInput.value = state.minutesInput;
                }
                if (state.secondsInput !== undefined) {
                    this.elements.secondsInput.value = state.secondsInput;
                }
                
                // Actualizar tiempo de countdown
                if (state.mode === 'countdown') {
                    this.updateCountdownTime();
                }
                
                console.log('📦 Estado cargado desde localStorage');
            }
        } catch (error) {
            console.warn('No se pudo cargar el estado guardado:', error);
        }
    }
}

// =====================================================================
// INICIALIZACIÓN DE LA APLICACIÓN
// =====================================================================

/**
 * Función principal que se ejecuta cuando el DOM está completamente cargado
 * Crea una instancia de TimerApp y la hace disponible globalmente
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('%c⏱️ CRONÓMETRO Y CUENTA ATRÁS', 'font-size: 20px; color: #667eea; font-weight: bold;');
    console.log('%cDesarrollado por AI4Devs', 'font-size: 12px; color: #4a5568;');
    console.log('-------------------------------------------');
    
    // Crear instancia de la aplicación
    window.timerApp = new TimerApp();
    
    // Mensaje de bienvenida en consola
    console.log('💡 Atajos de teclado disponibles:');
    console.log('   [Espacio] - Iniciar/Pausar');
    console.log('   [R] - Reiniciar');
    console.log('   [C] - Limpiar');
    console.log('   [M] - Cambiar modo');
});

// =====================================================================
// MANEJO DE ERRORES GLOBALES
// =====================================================================

/**
 * Captura errores no manejados para debugging
 */
window.addEventListener('error', (event) => {
    console.error('❌ Error no manejado:', event.error);
});

/**
 * Captura promesas rechazadas no manejadas
 */
window.addEventListener('unhandledrejection', (event) => {
    console.error('❌ Promise rechazada:', event.reason);
});

// =====================================================================
// SOPORTE PARA VISIBILIDAD DE PÁGINA
// =====================================================================

/**
 * Maneja cuando la página pierde/gana visibilidad
 * Esto es útil para pausar/reanudar el temporizador si se desea
 */
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('👁️ Página oculta');
        // Aquí podrías pausar el temporizador si lo deseas
    } else {
        console.log('👁️ Página visible');
        // Aquí podrías reanudar el temporizador si lo deseas
    }
});
