
const {
    formatTime,
    normalizeCountdownInputs,
    startStopStopwatch,
    clearStopwatch,
    startStopCountdown,
    clearCountdown,
    __setState,
    __getInitialState
} = require('./script.js');

// --- MOCKING ---
// Usamos los "fake timers" de Jest para controlar el tiempo (Date.now(), setInterval)
jest.useFakeTimers();

// Mock de Callbacks (para espiar si se llaman correctamente)
let updateDisplayCB, updateButtonCB, onFinishCB;

// Mock de Inputs del DOM
let mockInputs;

// --- HOOKS (Se ejecutan antes/después de cada test) ---
beforeEach(() => {
    // 1. Reseteamos el estado de los módulos antes de CADA test
    __setState('stopwatch', __getInitialState('stopwatch'));
    __setState('countdown', __getInitialState('countdown'));

    // 2. Reseteamos los mocks de callbacks
    updateDisplayCB = jest.fn();
    updateButtonCB = jest.fn();
    onFinishCB = jest.fn();

    // 3. Reseteamos los mocks de inputs
    mockInputs = {
        h: { value: '0', disabled: false },
        m: { value: '0', disabled: false },
        s: { value: '0', disabled: false }
    };

    // 4. Limpiamos cualquier timer pendiente
    jest.clearAllTimers();
});


// === SUITE DE TESTS ===

describe('Función Auxiliar: formatTime', () => {
    it('debe formatear 0ms', () => {
        expect(formatTime(0)).toBe('00:00:00');
    });
    it('debe formatear 5 segundos', () => {
        expect(formatTime(5000)).toBe('00:00:05');
    });
    it('debe formatear 65 segundos', () => {
        expect(formatTime(65000)).toBe('00:01:05');
    });
    it('debe formatear 3661 segundos (1h 1m 1s)', () => {
        expect(formatTime(3661000)).toBe('01:01:01');
    });
    it('debe incluir milisegundos si se pide', () => {
        const result = formatTime(12345, true);
        expect(result.time).toBe('00:00:12');
        expect(result.milli).toBe('345');
    });
});

describe('Stopwatch', () => {
    it('debe iniciar y parar el reloj', () => {
        // 1. Iniciar
        startStopStopwatch(updateDisplayCB, updateButtonCB);
        expect(updateButtonCB).toHaveBeenLastCalledWith(true); // Botón dice "Stop"

        // 2. Avanzar el tiempo 5 segundos
        jest.advanceTimersByTime(5000);
        
        // Debería haberse llamado muchas veces (cada 10ms)
        expect(updateDisplayCB.mock.calls.length).toBeGreaterThan(400); 
        // La última llamada debe ser cercana a 5 seg
        const lastCall = updateDisplayCB.mock.calls.pop();
        expect(lastCall[0]).toBe('00:00:05'); // HH:MM:SS
        expect(lastCall[1]).toBe('000');     // Milli

        // 3. Parar
        startStopStopwatch(updateDisplayCB, updateButtonCB);
        expect(updateButtonCB).toHaveBeenLastCalledWith(false); // Botón dice "Start"
        
        // 4. Avanzar más el tiempo (no debería hacer nada)
        const callCount = updateDisplayCB.mock.calls.length;
        jest.advanceTimersByTime(3000);
        expect(updateDisplayCB.mock.calls.length).toBe(callCount); // No se llamó más
    });

    it('debe limpiar el reloj', () => {
        // Iniciar y correr por 2 seg
        startStopStopwatch(updateDisplayCB, updateButtonCB);
        jest.advanceTimersByTime(2000);
        
        // Limpiar
        clearStopwatch(updateDisplayCB, updateButtonCB);

        // Check: Display reseteado
        expect(updateDisplayCB).toHaveBeenLastCalledWith('00:00:00', '000');
        // Check: Botón reseteado
        expect(updateButtonCB).toHaveBeenLastCalledWith(false);
    });
});

describe('Countdown', () => {
    it('debe normalizar valores de input > 60', () => {
        const h = { value: '0' };
        const m = { value: '0' };
        const s = { value: '70' }; // 70 segundos
        
        normalizeCountdownInputs(h, m, s);
        
        expect(h.value).toBe(0);
        expect(m.value).toBe(1); // 1 minuto
        expect(s.value).toBe(10); // 10 segundos
    });

    it('debe normalizar minutos > 60', () => {
        const h = { value: '1' };
        const m = { value: '80' }; // 1 hora y 20 min
        const s = { value: '0' };
        
        normalizeCountdownInputs(h, m, s);
        
        expect(h.value).toBe(2); // 1h + 1h20m = 2h
        expect(m.value).toBe(20);
        expect(s.value).toBe(0);
    });

    it('debe iniciar, correr y finalizar la cuenta atrás', () => {
        // 1. Setear inputs (mock)
        mockInputs.s.value = '3'; // 3 segundos
        const inputs = [mockInputs.h, mockInputs.m, mockInputs.s];

        // 2. Iniciar
        startStopCountdown(inputs, updateDisplayCB, updateButtonCB, onFinishCB);
        expect(updateButtonCB).toHaveBeenLastCalledWith(true); // Botón "Stop"
        expect(mockInputs.s.disabled).toBe(true); // Inputs bloqueados

        // 3. Avanzar 1.1 segundos
        jest.advanceTimersByTime(1100);
        // El display se actualiza con el "techo" (aún 3s restantes, pero ya son 2)
        // formatTime(remaining + 999) -> 1900ms + 999 = 2899ms -> "00:00:02"
        expect(updateDisplayCB).toHaveBeenLastCalledWith('00:00:01', '900');

        // 4. Avanzar hasta el final (3.1 segundos total)
        jest.advanceTimersByTime(2000); // 1100 + 2000 = 3100ms
        
        // Check: Se llamó al callback de finalización
        expect(onFinishCB).toHaveBeenCalledTimes(1);
        // Check: Botón reseteado
        expect(updateButtonCB).toHaveBeenLastCalledWith(false);
        // Check: Display reseteado
        expect(updateDisplayCB).toHaveBeenLastCalledWith('00:00:00', '000');
        // Check: Inputs desbloqueados
        expect(mockInputs.s.disabled).toBe(false);
    });

    it('debe limpiar la cuenta atrás', () => {
        mockInputs.s.value = '10';
        const inputs = [mockInputs.h, mockInputs.m, mockInputs.s];
        
        startStopCountdown(inputs, updateDisplayCB, updateButtonCB, onFinishCB);
        jest.advanceTimersByTime(2000); // Correr 2 segundos
        
        clearCountdown(inputs, updateDisplayCB, updateButtonCB);

        // Check: Botón reseteado
        expect(updateButtonCB).toHaveBeenLastCalledWith(false);
        // Check: Display reseteado (al valor por defecto de los inputs)
        expect(updateDisplayCB).toHaveBeenLastCalledWith('00:08:00', '000');
        // Check: Inputs reseteados y habilitados
        expect(mockInputs.h.value).toBe(0);
        expect(mockInputs.m.value).toBe(8); // El valor por defecto
        expect(mockInputs.s.value).toBe(0);
        expect(mockInputs.s.disabled).toBe(false);
    });
});