import { chores } from "./data.js";
const CHORES = chores;
const choresEl = document.getElementById("all-chores");
const totalCountEl = document.getElementById("total-count")

renderChoreHTML();

document.addEventListener("click", function (e) {
  if (e.target.dataset.increment) {
    incrementCount(e.target.dataset.increment);
  }
});

function renderChoreHTML() {
  const choreDivs = CHORES.map(
    ({ chore, name, count }, index) =>
      `<div class="chore">
            <h3 class="chore-heading">${name}</h3><span class="count" id='count-${index}'>${count}</span><button
            class='add-btn' id='add-${index}' data-increment='${index}'>Finish Chore</button><button class="reset-btn">Reset</button>
    </div>`
  );
  return (choresEl.innerHTML = choreDivs.join(""));
}

function incrementCount(choreIndex) {
  const choreCountSpan = document.getElementById(`count-${choreIndex}`);
  let choreCount = CHORES[choreIndex].count;

  choreCount++;

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
}

