const snakeAndLadderConfig = {
  5: 25,
  10: 29,
  22: 41,
  28: 55,
  31: 14,
  37: 17,
  44: 95,
  70: 89,
  73: 53,
  78: 39,
  92: 35,
  99: 7,
};

const diceConfig = [
  "",
  "&#9856",
  "&#9857",
  "&#9858",
  "&#9859",
  "&#9860",
  "&#9861",
];

const playersConfig = {
  p1: {
    backgroundColor: "bg-info",
    currentPosition: 1,
  },
  p2: {
    backgroundColor: "bg-warning",
    currentPosition: 1,
  },
};

let turn = "p1";

const timers = [];

function rollDice() {
  const dice = document.getElementById("dice");
  const randomDiceIdx = Math.ceil(Math.random() * 6);
  dice.innerHTML = diceConfig[randomDiceIdx];
  if (randomDiceIdx + playersConfig[turn].currentPosition > 100) {
    turn = turn === "p1" ? "p2" : "p1";
    initPlayers();
    return;
  }
  playBtn.disabled = true;
  animate(randomDiceIdx);
}

function animate(newPosition) {
  if (newPosition <= 0) {
    const currentPosition = playersConfig[turn].currentPosition;
    if (snakeAndLadderConfig[currentPosition]) {
      playersConfig[turn].currentPosition =
        snakeAndLadderConfig[currentPosition];
    }

    if (currentPosition === 100) {
      confirm(`${turn} won the game`);
      resetGame();
    }
    const currPosition = document.getElementById(
      playersConfig[turn].currentPosition
    );
    currPosition.classList.add(playersConfig[turn].backgroundColor);
    turn = turn === "p1" ? "p2" : "p1";
    initPlayers();
    playBtn.disabled = false;
    return;
  }
  const currPosition = document.getElementById(
    playersConfig[turn].currentPosition
  );
  const bgColor = playersConfig[turn].backgroundColor;
  currPosition.classList.add(bgColor);
  playersConfig[turn].currentPosition++;
  timers.push(setTimeout((_) => currPosition.classList.remove(bgColor), 200));
  timers.push(setTimeout((_) => animate(newPosition - 1), 200));
}

function createBoard() {
  const board = document.getElementById("snake-and-ladder-container");
  board.innerHTML = "";
  new Array(10).fill(null).forEach((_, idx) => {
    const row = document.createElement("tr");
    new Array(10).fill(null).forEach((_, idx1) => {
      const cell = document.createElement("td");
      const cellNumber = (10 - idx - 1) * 10 + (idx1 + 1);
      cell.id = cellNumber;
      let cellText = `${cellNumber}`;
      if (snakeAndLadderConfig[cellNumber]) {
        const key = cellNumber;
        const value = snakeAndLadderConfig[cellNumber];
        const isSnake = key > value;
        if (isSnake) {
          cell.classList.add("bg-danger");
          cell.classList.add("text-white");
        } else {
          cell.classList.add("bg-success");
          cell.classList.add("text-white");
        }
      }
      cell.innerHTML = cellText;
      if ((10 - idx - 1) % 2) {
        row.prepend(cell);
      } else {
        row.appendChild(cell);
      }
    });
    board.append(row);
  });
  initPlayers();
  drawSnakesAndLadders();
}
function initPlayers() {
  turnColor.className = `text-white d-inline-block p-2 text-capitalize rounded ${playersConfig[turn].backgroundColor}`;
  turnColor.innerHTML = turn;
}
function drawSnakesAndLadders() {
  const lines = document.getElementById("paths");
  lines.innerHTML = "";
  for (const p1 in snakeAndLadderConfig) {
    const p2 = snakeAndLadderConfig[p1];
    const stroke = p1 > p2 ? "red" : "green";
    const arrowId = `arrow-${p1}`;
    const p1Elem = document.getElementById(p1);
    const p2Elem = document.getElementById(p2);
    const {
      left: p1Left,
      right: p1Right,
      top: p1Top,
      bottom: p1Bottom,
    } = p1Elem.getBoundingClientRect();
    const {
      left: p2Left,
      right: p2Right,
      top: p2Top,
      bottom: p2Bottom,
    } = p2Elem.getBoundingClientRect();
    const x1 = p1Left + (p1Right - p1Left) / 2;
    const y1 = stroke === "red" ? p1Bottom : p1Top;
    const x2 = p2Left + (p2Right - p2Left) / 2;
    const y2 = stroke === "red" ? p2Top : p2Bottom;
    const svgLine = new DOMParser().parseFromString(
      `<svg style="overflow: visible; pointer-events: none;" class="position-fixed top-0 left-0 opacity-75">
        <defs>
          <marker id="${arrowId}" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="${stroke}" />
          </marker>
        </defs>
        <path d="M ${x1} ${y1} T ${x2} ${y2}" stroke="${stroke}" stroke-width="3" fill="transparent" marker-end="url(#${arrowId})" />
       </svg>`,
      "text/html"
    );
    lines.appendChild(svgLine.body.firstChild);
  }
}

function resetGame() {
  createBoard();
  Object.keys(playersConfig).forEach(
    (key) => (playersConfig[key].currentPosition = 1)
  );
  document.getElementById("dice").innerHTML = "";
  timers.forEach((timer) => clearTimeout(timer));
  turn = "p1";
}

function resetTimer() {
  timers.forEach((timer) => clearTimeout(timer));
}

window.addEventListener("DOMContentLoaded", createBoard);

window.addEventListener("resize", drawSnakesAndLadders);

window.addEventListener("unload", resetTimer);
