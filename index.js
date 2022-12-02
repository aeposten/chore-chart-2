import { chores } from "./data.js";
const CHORES = chores;
const choresEl = document.getElementById("all-chores");
const totalCountEl = document.getElementById("total-count");
const prizeEl = document.getElementById("get-prize");

renderChoreHTML();

document.addEventListener("click", function (e) {
  if (e.target.dataset.increment) {
    incrementCount(e.target.dataset.increment);
  } else if (e.target.dataset.reset) {
    resetCount(e.target.dataset.reset);
  }
});

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

function incrementCount(choreIndex) {
  let choreCount = CHORES[choreIndex].count;

  choreCount++;

  updateChoreCount(choreIndex, choreCount);
}

function resetCount(choreIndex) {
  let choreCount = CHORES[choreIndex].count;

  choreCount = 0;
  updateChoreCount(choreIndex, choreCount);
}

function updateChoreCount(choreIndex, choreCount) {
  const choreCountSpan = document.getElementById(`count-${choreIndex}`);

  choreCountSpan.textContent = choreCount;
  CHORES[choreIndex].count = choreCount;
  calculateTotal(CHORES);
}

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
