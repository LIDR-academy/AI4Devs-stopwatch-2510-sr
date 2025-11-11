(() => {
  // Grabs
  const display = document.getElementById('display');
  const hh = document.getElementById('hh');
  const mm = document.getElementById('mm');
  const ss = document.getElementById('ss');
  const ms = document.getElementById('ms');

  const modeStopwatchBtn = document.getElementById('modeStopwatch');
  const modeCountdownBtn = document.getElementById('modeCountdown');

  const controls = document.getElementById('controls');
  const startPauseBtn = document.getElementById('startPauseBtn');
  const clearBtn = document.getElementById('clearBtn');

  const keypad = document.getElementById('keypad');
  const keypadClearBtn = document.getElementById('keypadClearBtn');
  const setBtn = document.getElementById('setBtn');

  const alarmAudio = document.getElementById('alarmAudio');

  // State
  let mode = null;                   // null → nothing chosen; 'stopwatch' or 'countdown'
  let running = false;
  let rafId = null;
  let baseElapsed = 0;               // stopwatch: elapsed; countdown: remaining (ms)
  let startPerf = 0;                 // perf.now when (re)starting

  // Countdown-specific
  let inputDigits = [];              // digits typed before Set
  let countdownSetMs = 0;            // last Set value (ms)
  let countingDown = false;          // true after Set
  let alarmed = false;

  // Utils
  const pad2 = n => String(n).padStart(2,'0');
  const pad3 = n => String(n).padStart(3,'0');
  const now = () => performance.now();
  const toParts = t => {
    t = Math.max(0, Math.floor(t));
    return {
      h: Math.floor(t/3600000),
      m: Math.floor((t%3600000)/60000),
      s: Math.floor((t%60000)/1000),
      ms: t%1000
    };
  };
  const render = t => {
    const {h,m,s,ms:msv} = toParts(t);
    hh.textContent = pad2(h);
    mm.textContent = pad2(m);
    ss.textContent = pad2(s);
    ms.textContent = pad3(msv);
  };

  // Stopwatch
  const swNow = () => running ? baseElapsed + (now() - startPerf) : baseElapsed;
  const swStart = () => { if (running) return; running = true; startPerf = now(); setBtnState('Pause'); tick(); };
  const swPause = () => { if (!running) return; running=false; baseElapsed = swNow(); cancelAnimationFrame(rafId); setBtnState('Continue'); };
  const swClear = () => { running=false; baseElapsed=0; cancelAnimationFrame(rafId); setBtnState('Start'); render(0); };

  // Countdown
  const cdNow = () => running ? Math.max(0, baseElapsed - (now() - startPerf)) : baseElapsed;
  const cdStart = () => { if (baseElapsed<=0) return; running=true; startPerf=now(); setBtnState('Pause'); tick(); };
  const cdPause = () => { if (!running) return; running=false; baseElapsed = cdNow(); cancelAnimationFrame(rafId); setBtnState('Continue'); };
  const cdClear = () => {
    stopAlarm();
    running=false; cancelAnimationFrame(rafId);
    if (countingDown) {
      baseElapsed = countdownSetMs; render(baseElapsed); setBtnState('Start');
      controls.classList.remove('hidden'); keypad.classList.add('hidden'); startPauseBtn.classList.remove('hidden');
    } else {
      inputDigits=[]; render(0);
    }
  };
  const cdFinish = () => {
    running=false; cancelAnimationFrame(rafId);
    baseElapsed=0; render(0);
    if (!alarmed) {
      alarmed = true; display.classList.add('alarm');
      startPauseBtn.classList.add('hidden'); // only Clear visible
      alarmAudio.currentTime=0; alarmAudio.play().catch(()=>{});
    }
  };

  // Common loop
  function tick(){
    rafId = requestAnimationFrame(tick);
    if (mode==='stopwatch') render(swNow());
    else if (mode==='countdown') { const t=cdNow(); render(t); if (t<=0 && running) cdFinish(); }
  }

  // UI helpers
  function setBtnState(label){
    startPauseBtn.textContent = label;
    if (label==='Pause') { startPauseBtn.classList.add('primary'); startPauseBtn.classList.remove('accent'); }
    else if (label==='Continue') { startPauseBtn.classList.add('accent'); startPauseBtn.classList.remove('primary'); }
    else { startPauseBtn.classList.add('primary'); startPauseBtn.classList.remove('accent'); }
  }
  function stopAlarm(){
    display.classList.remove('alarm'); alarmed=false; alarmAudio.pause(); alarmAudio.currentTime=0;
  }

  // Mode selection (this is what reveals the rest of the UI)
  function chooseMode(newMode){
    if (mode===newMode) return;
    stopAlarm(); running=false; cancelAnimationFrame(rafId);
    document.querySelector('.mode-picker').classList.add('hidden'); // hide arrow tiles
    display.classList.remove('hidden'); // show timer
    if (newMode==='stopwatch'){
      mode='stopwatch'; keypad.classList.add('hidden'); controls.classList.remove('hidden');
      baseElapsed=0; setBtnState('Start'); render(0);
    } else {
      mode='countdown'; keypad.classList.remove('hidden'); controls.classList.add('hidden');
      inputDigits=[]; countdownSetMs=0; baseElapsed=0; countingDown=false; render(0);
    }
  }
  modeStopwatchBtn.addEventListener('click', ()=>chooseMode('stopwatch'));
  modeCountdownBtn.addEventListener('click', ()=>chooseMode('countdown'));

  // Controls
  startPauseBtn.addEventListener('click', ()=>{
    if (mode==='stopwatch') (running?swPause:swStart)();
    else if (mode==='countdown') { if (alarmed) return; (running?cdPause:cdStart)(); }
  });
  clearBtn.addEventListener('click', ()=>{ if (mode==='stopwatch') swClear(); else if (mode==='countdown') cdClear(); });

  // Keypad
  function digitsToMs(digs){
    const t = digs.join('').slice(-6).padStart(6,'0');
    const h=+t.slice(0,2), m=+t.slice(2,4), s=+t.slice(4,6);
    return ((h*3600)+(m*60)+s)*1000;
  }
  function showDigits(){ render(digitsToMs(inputDigits)); }
  keypad.addEventListener('click',(e)=>{
    const t=e.target; if (!t.classList.contains('key')) return;
    inputDigits.push(t.dataset.digit); if (inputDigits.length>8) inputDigits.shift(); showDigits();
  });
  keypadClearBtn.addEventListener('click', ()=>{ inputDigits=[]; showDigits(); });
  setBtn.addEventListener('click', ()=>{
    countdownSetMs = digitsToMs(inputDigits);
    baseElapsed = countdownSetMs; countingDown = true; render(baseElapsed);
    keypad.classList.add('hidden'); controls.classList.remove('hidden'); setBtnState('Start');
  });

  // Initial state: show 00:00:00:000 with only arrows visible
  render(0);
})();
