const whackboard = document.getElementById("whack-board-container");
let score = 0;
let set = new Set();
let totalMolesAtOnce = 2;
let gameTime = 15;
function addScore(ev) {
  const id = Number(ev.target.id);
  if (!set.has(id)) {
    return;
  }
  ev.target.style.transform = "translateY(120%)";
  score++;
  document.getElementById("score").innerText = score;
  set.delete(id);
}
let runTime = 0;
let runTimer;
function play() {
  playBtn.style.display = "none";
  clearInterval(runTimer);
  runTimer = undefined;
  runTime = 0;
  set.clear();
  score = 0;
  document.getElementById("score").innerText = score;
  runTimer = setInterval(() => {
    runGame();
    runTime++;
    if (runTime > gameTime) {
      clearInterval(runTimer);
      runTimer = undefined;
      playBtn.style.display = "block";
      timers.forEach((timer) => clearTimeout(timer));
      hideAllMoles();
      set.clear();
      return;
    }
    timeLeft.innerHTML = gameTime - runTime;
  }, 1000);
}

function hideAllMoles() {
  [...set.entries()].forEach(
    ([elemId]) =>
      (document.getElementById(elemId).style.transform = "translateY(120%)")
  );
}

const timers = [];
function runGame() {
  for (let i = 0; i < totalMolesAtOnce; i++) {
    const randomNumber = Math.ceil(Math.random() * 8);
    const elem = document.getElementById(randomNumber);
    set.add(randomNumber);
    elem.style.transform = "translateY(0%)";
    timers.push(
      setTimeout(() => {
        elem.style.transform = "translateY(120%)";
      }, 1500)
    );
  }
}
function createBoard() {
  new Array(9).fill(null).forEach((_, idx) => {
    whackboard.innerHTML += `
      <div class="mole-col">
        <img
          id="${idx}"
          class="mole-head"
          onclick="addScore(event)"
          src="https://www.greatfrontend.com/img/questions/whack-a-mole/mole-head.png"
        />
        <img
          class="mole-hill"
          src="https://www.greatfrontend.com/img/questions/whack-a-mole/mole-hill.png"
        />
      </div>
    `;
  });
}
createBoard();
