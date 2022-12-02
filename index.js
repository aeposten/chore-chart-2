import { chores } from "./data.js";

// Global variables for chore counters
const CHORES = chores;
const choresEl = selectComponent("all-chores");
const totalCountEl = selectComponent("total-count");
const prizeEl = selectComponent("get-prize");

renderChoreHTML();

// Global variables to initialize timer
let timer;
const timerEl = selectComponent("timer");

renderTimerHTML();

// Global variables for timer elements
const timerSpan = selectComponent("time");
const startBtn = selectComponent("start-timer");
const pauseBtn = selectComponent("pause-timer");
const resetBtn = selectComponent("reset-timer");

// Global variables for minutes and seconds
let initialMinutes = 20;
let totalSeconds = initialMinutes * 60;

// Is timer paused?
let paused = true;



//Gets component by id
function selectComponent(elementId) {
  let component = document.getElementById(elementId);
  return component;
}

document.addEventListener("click", function (e) {
  if (e.target.dataset.increment) {
    incrementCount(e.target.dataset.increment);
  } else if (e.target.dataset.reset) {
    resetCount(e.target.dataset.reset);
  }
});

// Renders chore HTML
function renderChoreHTML() {
  const choreDivs = CHORES.map(
    ({ chore, name, count }, index) =>
      `<div class="chore">
            <h3 class="chore-heading">${name}</h3><span class="count" id='count-${index}'>${count}</span><button
            class='add-btn' id='add-${index}' data-increment='${index}'>Finish Chore</button><button class="reset-btn" data-reset='${index}'>Reset</button>
    </div>`
  );
  return (choresEl.innerHTML = choreDivs.join(""));
}

// Increments chore counter
function incrementCount(choreIndex) {
  let choreCount = CHORES[choreIndex].count;

  choreCount++;

  updateChoreCount(choreIndex, choreCount);
}

// Resets chore counter
function resetCount(choreIndex) {
  let choreCount = CHORES[choreIndex].count;

  choreCount = 0;
  updateChoreCount(choreIndex, choreCount);
}

// Used for updating chore count in increment and reset functions
function updateChoreCount(choreIndex, choreCount) {
  const choreCountSpan = selectComponent(`count-${choreIndex}`);

  choreCountSpan.textContent = choreCount;
  CHORES[choreIndex].count = choreCount;
  calculateTotal(CHORES);
}

// Calculates total chores completed
function calculateTotal(choreArr) {
  let total = 0;

  for (let i = 0; i < choreArr.length; i++) {
    total += choreArr[i].count;
  }

  totalCountEl.textContent = total;

  if (total < 15) {
    prizeEl.classList.add("display-none");
  } else if (total >= 15) {
    prizeEl.classList.remove("display-none");
  }
}

// Renders HTML for timer
function renderTimerHTML() {
  timerEl.innerHTML = `
  <h3>Chore Timer</h3>
  <div>
      <span id="time">20:00</span><button class="btn" id="start-timer">Start Timer</button>
      <button class="btn" id="pause-timer">Pause Timer</button><button class="btn" id="reset-timer">Reset Timer</button>
  </div>
  `;
}

// Sets initial time calculations
function setTimeCalculations() {
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;

  timerSpan.textContent = `${minutes}:${(seconds =
    seconds < 10 ? "0" + seconds : seconds)}`;
}

//Starts Timer
function startTimer() {
  if (paused) {
    paused = false;
    timer = setInterval(countdown, 1000);
  }
}

startBtn.addEventListener("click", startTimer);

//Pauses Timer
function pauseTimer() {
  paused = true;
  if (timer) {
    clearInterval(timer);
  }
}

pauseBtn.addEventListener("click", pauseTimer);

//Resets Timer
function resetTimer() {
  paused = true;
  clearInterval(timer);
  totalSeconds = initialMinutes * 60;
  timerSpan.textContent = `${initialMinutes}:00`;
}

resetBtn.addEventListener("click", resetTimer);

//Starts Countdown
function countdown() {
  totalSeconds--;
  setTimeCalculations();

  if (totalSeconds === 0) {
    paused = true;
    clearInterval(timer);
  }
}
