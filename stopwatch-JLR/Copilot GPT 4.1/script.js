(function() {
    // Utility
    function pad(num, len) {
        let s = "0".repeat(len) + num;
        return s.substr(s.length - len, len);
    }

    // DOM
    const screens = {
        menu: document.getElementById("main-menu"),
        stopwatch: document.getElementById("stopwatch-screen"),
        cdInput: document.getElementById("countdown-input-screen"),
        cd: document.getElementById("countdown-screen"),
    };

    // Main menu buttons
    document.getElementById("btn-stopwatch").onclick = function() {
        switchScreen("stopwatch");
        stopwatch.reset();
    };
    document.getElementById("btn-countdown").onclick = function() {
        switchScreen("cdInput");
        cdInput.reset();
    };

    // Stopwatch logic
    const stopwatch = {
        running: false,
        startTime: 0,
        elapsed: 0,
        interval: null,
        display: {
            h: document.getElementById("stopwatch-hour"),
            m: document.getElementById("stopwatch-minute"),
            s: document.getElementById("stopwatch-second"),
            ms: document.getElementById("stopwatch-ms"),
        },
        startBtn: document.getElementById("stopwatch-start"),
        resetBtn: document.getElementById("stopwatch-reset"),
        backBtn: document.getElementById("stopwatch-back"),
        updateDisplay: function(ms) {
            const total = ms || this.elapsed;
            const h = ~~(total / 3600000);
            const m = ~~((total % 3600000) / 60000);
            const s = ~~((total % 60000) / 1000);
            const cs = ~~((total % 1000));
            this.display.h.textContent = pad(h,2);
            this.display.m.textContent = pad(m,2);
            this.display.s.textContent = pad(s,2);
            this.display.ms.textContent = pad(cs,3);
        },
        tick: function() {
            const elapsed = Date.now() - this.startTime + this.elapsed;
            this.updateDisplay(elapsed);
        },
        start: function() {
            if (this.running) return;
            this.running = true;
            this.startBtn.textContent = "Pause";
            this.startTime = Date.now();
            this.interval = setInterval(this.tick.bind(this), 31);
        },
        pause: function() {
            if (!this.running) return;
            this.running = false;
            clearInterval(this.interval);
            this.elapsed += Date.now() - this.startTime;
            this.startBtn.textContent = "Start";
        },
        reset: function() {
            this.running = false;
            clearInterval(this.interval);
            this.elapsed = 0;
            this.updateDisplay(0);
            this.startBtn.textContent = "Start";
        },
        toggle: function() {
            if (this.running) {
                this.pause();
            } else {
                this.start();
            }
        },
        back: function() {
            this.reset();
            switchScreen("menu");
        }
    };

    stopwatch.startBtn.onclick = () => stopwatch.toggle();
    stopwatch.resetBtn.onclick = () => stopwatch.reset();
    stopwatch.backBtn.onclick = () => stopwatch.back();

    // Countdown keypad logic & state
    const cdInput = {
        buffer: ['0', '0', '0', '0', '0', '0'], // hhmmss
        display: {
            h: document.getElementById("cd-input-hour"),
            m: document.getElementById("cd-input-minute"),
            s: document.getElementById("cd-input-second"),
            ms: document.getElementById("cd-input-ms"),
        },
        update: function() {
            this.display.h.textContent = pad(this.getHours(),2);
            this.display.m.textContent = pad(this.getMinutes(),2);
            this.display.s.textContent = pad(this.getSeconds(),2);
            this.display.ms.textContent = "000";
        },
        getHours: function() {
            return parseInt(this.buffer[0] + this.buffer[1],10);
        },
        getMinutes: function() {
            return parseInt(this.buffer[2] + this.buffer[3],10);
        },
        getSeconds: function() {
            return parseInt(this.buffer[4] + this.buffer[5],10);
        },
        getMsTotal: function() {
            return (this.getHours()*3600 + this.getMinutes()*60 + this.getSeconds())*1000;
        },
        input: function(num) {
            this.buffer.shift();
            this.buffer.push(num);
            this.update();
        },
        clear: function() {
            this.buffer = ['0','0','0','0','0','0'];
            this.update();
        },
        reset: function() {
            this.clear();
        }
    };

    document.getElementById("cd-input-clear").onclick = () => cdInput.clear();

    Array.prototype.forEach.call(document.querySelectorAll(".keypad-btn"), btn => {
        btn.onclick = function() {
            if (cdInput.buffer.length === 6) {
                cdInput.input(this.textContent);
            }
        };
    });

    // Set / accept for countdown
    document.getElementById("cd-set").onclick = function() {
        if (cdInput.getMsTotal() === 0) return;
        countdown.load(cdInput.getMsTotal());
        switchScreen("cd");
    };
    document.getElementById("cd-input-back").onclick = function() {
        cdInput.clear();
        switchScreen("menu");
    };

    // Countdown main
    const countdown = {
        duration: 0,
        left: 0,
        running: false,
        interval: null,
        startBtn: document.getElementById("cd-start"),
        resetBtn: document.getElementById("cd-reset"),
        backBtn: document.getElementById("cd-back"),
        display: {
            h: document.getElementById("cd-hour"),
            m: document.getElementById("cd-minute"),
            s: document.getElementById("cd-second"),
            ms: document.getElementById("cd-ms"),
        },
        updateDisplay: function(ms) {
            let total = typeof ms === "number" ? ms : this.left;
            if (total < 0) total = 0;
            const h = ~~(total / 3600000);
            const m = ~~((total % 3600000) / 60000);
            const s = ~~((total % 60000) / 1000);
            const cs = ~~((total % 1000));
            this.display.h.textContent = pad(h,2);
            this.display.m.textContent = pad(m,2);
            this.display.s.textContent = pad(s,2);
            this.display.ms.textContent = pad(cs,3);
        },
        tick: function() {
            const now = Date.now();
            this.left = this.endAt - now;
            this.updateDisplay(this.left);
            if (this.left <= 0) {
                this.stop(true);
            }
        },
        start: function() {
            if (this.running) return;
            if (this.left <= 0) return;
            this.running = true;
            this.startBtn.textContent = "Pause";
            this.endAt = Date.now() + this.left;
            this.interval = setInterval(this.tick.bind(this), 31);
        },
        pause: function() {
            if (!this.running) return;
            this.running = false;
            clearInterval(this.interval);
            this.left = this.endAt - Date.now();
            this.startBtn.textContent = "Start";
        },
        reset: function() {
            clearInterval(this.interval);
            this.left = this.duration;
            this.updateDisplay(this.left);
            this.running = false;
            this.startBtn.textContent = "Start";
        },
        load: function(ms) {
            this.duration = ms;
            this.left = ms;
            this.updateDisplay(ms);
            this.running = false;
            clearInterval(this.interval);
            this.startBtn.textContent = "Start";
        },
        stop: function(isEnd){
            clearInterval(this.interval);
            this.running = false;
            if (isEnd) {
                this.left = 0;
                this.updateDisplay(0);
            }
            this.startBtn.textContent = "Start";
        },
        toggle: function() {
            if (this.running) {
                this.pause();
            } else {
                this.start();
            }
        },
        back: function() {
            this.stop(false);
            switchScreen("menu");
        }
    };

    countdown.startBtn.onclick = () => countdown.toggle();
    countdown.resetBtn.onclick = () => countdown.reset();
    countdown.backBtn.onclick = () => countdown.back();

    // Switch screen util
    function switchScreen(name) {
        for(const key in screens) {
            screens[key].style.display = "none";
        }
        screens[name].style.display = "";
    }

    // Initial state
    switchScreen("menu");
})();
