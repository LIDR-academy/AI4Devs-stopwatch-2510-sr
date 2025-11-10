// Stopwatch & Countdown — vanilla JS using rAF + performance.now()
// Layout & colors loosely aligned to the provided image. No dependencies.

/* ======= Utilities ======= */
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];

const pad2 = n => n.toString().padStart(2,'0');
const pad3 = n => n.toString().padStart(3,'0');

function formatHMSms(ms){
  const t = Math.max(0, ms|0);
  const h = Math.floor(t/3600000);
  const m = Math.floor((t%3600000)/60000);
  const s = Math.floor((t%60000)/1000);
  const ms3 = Math.floor(t%1000);
  return `${pad2(h)}:${pad2(m)}:${pad2(s)}|${pad3(ms3)}`; // '|' splits millis for renderer
}

function renderDisplay(hmsms){
  const [main, ms] = hmsms.split('|');
  $('#display').innerHTML = `${main}<span class="millis">${ms}</span>`;
}

function beep(duration=500, freq=880){
  try{
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type='sine'; o.frequency.value=freq;
    o.connect(g); g.connect(ctx.destination);
    g.gain.value=0.1;
    o.start();
    setTimeout(()=>{o.stop(); ctx.close();}, duration);
  }catch{}
}

function saveState(data){
  localStorage.setItem('timerState', JSON.stringify(data));
}
function loadState(){
  try{
    return JSON.parse(localStorage.getItem('timerState')||'{}');
  }catch{ return {}; }
}

/* ======= Elements ======= */
const modeStopwatchBtn = $('#modeStopwatch');
const modeCountdownBtn = $('#modeCountdown');
const stopwatchUI = $('#stopwatchUI');
const countdownUI = $('#countdownUI');
const displayWrap = $('#displayWrap');
const display = $('#display');

/* Stopwatch controls */
const swStartPause = $('#swStartPause');
const swReset = $('#swReset');
const swLap = $('#swLap');
const lapsEl = $('#laps');

/* Countdown controls */
const cdStartPause = $('#cdStartPause');
const cdReset = $('#cdReset');
const hh = $('#hh'); const mm = $('#mm'); const ss = $('#ss');
const presetBtns = $$('.chip');

/* ======= State ======= */
let mode = 'stopwatch'; // 'stopwatch' | 'countdown'
let rafId = null;

const stopwatch = {
  running:false,
  startPerf:0,
  carried:0, // elapsed when paused
  laps:[],
};

const countdown = {
  running:false,
  startPerf:0,
  carried:0, // elapsed when paused
  duration: 8*60*1000, // default 08:00 matching image
  finished:false,
};

/* ======= Setup from storage ======= */
(function initFromStorage(){
  const state = loadState();
  if(state.mode) mode = state.mode;

  // Stopwatch
  if(state.stopwatch){
    stopwatch.carried = state.stopwatch.carried||0;
    stopwatch.laps = state.stopwatch.laps||[];
  }

  // Countdown
  if(state.countdown){
    countdown.duration = state.countdown.duration ?? countdown.duration;
    countdown.carried = state.countdown.carried || 0;
  }

  // Inputs reflect countdown duration
  setInputsFromMs(countdown.duration);

  // Render initial
  if(mode==='stopwatch'){
    activateStopwatch();
    renderDisplay(formatHMSms(stopwatch.carried));
  }else{
    activateCountdown();
    renderDisplay(formatHMSms(Math.max(0, countdown.duration - countdown.carried)));
  }

  // Restore laps UI
  renderLaps();
})();

/* ======= Mode switching ======= */
modeStopwatchBtn.addEventListener('click', () => setMode('stopwatch'));
modeCountdownBtn.addEventListener('click', () => setMode('countdown'));

function setMode(m){
  if(mode===m) return;
  mode = m;
  saveState({ mode, stopwatch, countdown });
  if(m==='stopwatch') activateStopwatch(); else activateCountdown();
}

function activateStopwatch(){
  modeStopwatchBtn.setAttribute('aria-pressed','true');
  modeStopwatchBtn.setAttribute('aria-selected','true');
  modeCountdownBtn.setAttribute('aria-pressed','false');
  modeCountdownBtn.setAttribute('aria-selected','false');
  stopwatchUI.hidden = false;
  countdownUI.hidden = true;
  displayWrap.classList.remove('finished','flash');
  cancelAnim();
  stopwatch.running=false;
  renderDisplay(formatHMSms(stopwatch.carried));
}

function activateCountdown(){
  modeStopwatchBtn.setAttribute('aria-pressed','false');
  modeStopwatchBtn.setAttribute('aria-selected','false');
  modeCountdownBtn.setAttribute('aria-pressed','true');
  modeCountdownBtn.setAttribute('aria-selected','true');
  stopwatchUI.hidden = true;
  countdownUI.hidden = false;
  displayWrap.classList.remove('finished','flash');
  cancelAnim();
  countdown.running=false;
  countdown.finished=false;
  renderDisplay(formatHMSms(Math.max(0, countdown.duration - countdown.carried)));
}

/* ======= Stopwatch logic ======= */
swStartPause.addEventListener('click', () => {
  if(stopwatch.running) pauseStopwatch();
  else startStopwatch();
});
swReset.addEventListener('click', resetStopwatch);
swLap.addEventListener('click', addLap);

function startStopwatch(){
  stopwatch.running = true;
  stopwatch.startPerf = performance.now();
  swStartPause.textContent = 'Pause';
  requestAnim(tickStopwatch);
}
function pauseStopwatch(){
  stopwatch.running = false;
  stopwatch.carried += performance.now() - stopwatch.startPerf;
  swStartPause.textContent = 'Resume';
  cancelAnim();
  saveState({ mode, stopwatch, countdown });
}
function resetStopwatch(){
  stopwatch.running = false;
  stopwatch.carried = 0;
  stopwatch.laps = [];
  renderLaps();
  swStartPause.textContent = 'Start';
  cancelAnim();
  renderDisplay(formatHMSms(0));
  saveState({ mode, stopwatch, countdown });
}
function addLap(){
  const ms = stopwatch.running
    ? stopwatch.carried + (performance.now() - stopwatch.startPerf)
    : stopwatch.carried;
  stopwatch.laps.unshift({ t: Date.now(), ms });
  renderLaps();
  saveState({ mode, stopwatch, countdown });
}
function renderLaps(){
  lapsEl.innerHTML = '';
  if(!stopwatch.laps.length) return;
  stopwatch.laps.forEach((lap, i)=>{
    const div = document.createElement('div');
    div.className = 'lap';
    const label = `Lap ${stopwatch.laps.length - i}`;
    const [main, mmm] = formatHMSms(lap.ms).split('|');
    div.innerHTML = `<strong>${label}</strong><span>${main}<span class="millis">${mmm}</span></span>`;
    lapsEl.appendChild(div);
  });
}
function tickStopwatch(now){
  if(!stopwatch.running) return;
  const elapsed = stopwatch.carried + (now - stopwatch.startPerf);
  renderDisplay(formatHMSms(elapsed));
  requestAnim(tickStopwatch);
}

/* ======= Countdown logic ======= */
cdStartPause.addEventListener('click', () => {
  if(countdown.running) pauseCountdown();
  else startCountdown();
});
cdReset.addEventListener('click', resetCountdown);

presetBtns.forEach(b=>{
  b.addEventListener('click', ()=>{
    const s = parseInt(b.dataset.preset,10);
    setDurationMs(s*1000);
  });
});

[hh,mm,ss].forEach(inp=>{
  inp.addEventListener('input', e=>{
    e.target.value = e.target.value.replace(/[^\d]/g,'').slice(0,2);
    writeDurationFromInputs();
  });
  inp.addEventListener('blur', e=>{
    e.target.value = pad2(parseInt(e.target.value||'0',10));
    writeDurationFromInputs();
  });
});

function writeDurationFromInputs(){
  const H = clamp(parseInt(hh.value||'0',10),0,99);
  const M = clamp(parseInt(mm.value||'0',10),0,59);
  const S = clamp(parseInt(ss.value||'0',10),0,59);
  setDurationMs(((H*60 + M)*60 + S)*1000);
}

function clamp(n,min,max){ return isNaN(n)?min:Math.max(min,Math.min(max,n)); }

function setInputsFromMs(ms){
  const H = Math.floor(ms/3600000);
  const M = Math.floor((ms%3600000)/60000);
  const S = Math.floor((ms%60000)/1000);
  hh.value = pad2(H); mm.value = pad2(M); ss.value = pad2(S);
}

function setDurationMs(ms){
  countdown.duration = Math.max(0, ms|0);
  countdown.carried = 0;
  countdown.finished=false;
  setInputsFromMs(countdown.duration);
  renderDisplay(formatHMSms(countdown.duration));
  saveState({ mode, stopwatch, countdown });
}

function startCountdown(){
  if(countdown.duration<=0) return;
  countdown.running = true;
  countdown.startPerf = performance.now();
  cdStartPause.textContent = 'Pause';
  displayWrap.classList.remove('finished','flash');
  requestAnim(tickCountdown);
}
function pauseCountdown(){
  countdown.running = false;
  countdown.carried += performance.now() - countdown.startPerf;
  cdStartPause.textContent = 'Resume';
  cancelAnim();
  saveState({ mode, stopwatch, countdown });
}
function resetCountdown(){
  countdown.running = false;
  countdown.carried = 0;
  countdown.finished=false;
  cdStartPause.textContent = 'Start';
  cancelAnim();
  renderDisplay(formatHMSms(countdown.duration));
  displayWrap.classList.remove('finished','flash');
  saveState({ mode, stopwatch, countdown });
}

function tickCountdown(now){
  if(!countdown.running) return;
  const elapsed = countdown.carried + (now - countdown.startPerf);
  const remaining = Math.max(0, countdown.duration - elapsed);
  renderDisplay(formatHMSms(remaining));
  if(remaining<=0){
    countdown.running = false;
    countdown.carried = 0;
    countdown.finished=true;
    cdStartPause.textContent = 'Start';
    finishAlert();
    saveState({ mode, stopwatch, countdown });
    return;
  }
  requestAnim(tickCountdown);
}

function finishAlert(){
  displayWrap.classList.add('finished','flash');
  beep(600, 880);
}

/* ======= Animation helpers ======= */
function requestAnim(cb){
  rafId = requestAnimationFrame(cb);
}
function cancelAnim(){
  if(rafId!=null){ cancelAnimationFrame(rafId); rafId=null; }
}

/* ======= Keyboard shortcuts & accessibility ======= */
document.addEventListener('keydown', (e)=>{
  // Space toggles start/pause
  if(e.code==='Space'){
    e.preventDefault();
    if(mode==='stopwatch') swStartPause.click(); else cdStartPause.click();
  }
  // R reset
  if(e.key==='r' || e.key==='R'){
    if(mode==='stopwatch') swReset.click(); else cdReset.click();
  }
  // L lap (stopwatch only)
  if(e.key==='l' || e.key==='L'){
    if(mode==='stopwatch') swLap.click();
  }
  // M switch mode
  if(e.key==='m' || e.key==='M'){
    setMode(mode==='stopwatch' ? 'countdown' : 'stopwatch');
  }
});

/* Save minimal state on unload */
window.addEventListener('beforeunload', ()=>{
  saveState({ mode, stopwatch, countdown });
});

/* Ensure display speaks changes for screen readers */
let lastSpoken = '';
const speakObserver = new MutationObserver(()=>{
  const text = display.textContent.trim();
  if(text !== lastSpoken){
    display.setAttribute('aria-label', `Time ${text}`);
    lastSpoken = text;
  }
});
speakObserver.observe(display, { childList:true, subtree:true });

/* Initial visual alignment */
renderDisplay(mode==='stopwatch'
  ? formatHMSms(stopwatch.carried)
  : formatHMSms(Math.max(0, countdown.duration - countdown.carried))
);

