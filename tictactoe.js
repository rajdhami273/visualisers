// global
let matrix = createMatrix();
let counter = matrix.length * matrix.length;
const x = "🙅🏻";
const o = "🌎";
let turn = x;

// functions
function setValue(e) {
  const [row, column] = e.target.id.split("-");
  matrix[row][column] = turn;
  e.target.innerText = turn;
  setTurnValue();
  e.target.style.pointerEvents = "none";
  if (isWinner()) {
    winner.innerText = turn;
    winner.className = "winnerAnimation";
    board.style.pointerEvents = "none";
    turn = turn === x ? o : x;
    turnElem.innerText = turn;
    return;
  }
  counter--;
  if (counter <= 0) {
    winner.innerText = "Draw!";
  }
  turn = turn === x ? o : x;
  turnElem.innerText = turn;
}

function decorateWinner(trace = []) {
  for (let id of trace) {
    document.getElementById(id).className =
      "btn btn-success section rounded-0 winnerAnimation";
  }
}

function isWinner() {
  let allSame = true;
  // rows
  for (let i = 0; i < matrix.length; i++) {
    const trace = [];
    allSame = true;
    for (let j = 0; j < matrix.length; j++) {
      trace.push(`${i}-${j}`);
      if (matrix[i][j] !== turn) {
        allSame = false;
      }
    }
    if (allSame) {
      decorateWinner(trace);
      return true;
    }
  }
  // columns
  for (let i = 0; i < matrix.length; i++) {
    const trace = [];
    allSame = true;
    for (let j = 0; j < matrix.length; j++) {
      trace.push(`${j}-${i}`);
      if (matrix[j][i] !== turn) {
        allSame = false;
      }
    }
    if (allSame) {
      decorateWinner(trace);
      return true;
    }
  }
  // diagonals
  allSame = true;
  let trace = [];
  for (let i = 0; i < matrix.length; i++) {
    trace.push(`${i}-${i}`);
    if (matrix[i][i] !== turn) {
      allSame = false;
    }
  }
  if (allSame) {
    decorateWinner(trace);
    return true;
  }
  allSame = true;
  trace = [];
  for (let i = 0; i < matrix.length; i++) {
    trace.push(`${i}-${matrix.length - 1 - i}`);
    if (matrix[i][matrix.length - 1 - i] !== turn) {
      allSame = false;
    }
  }
  if (allSame) {
    decorateWinner(trace);
  }
  return allSame;
}

function createMatrix() {
  const size = Number(boardSize.value || 3);
  return new Array(size).fill([]).map((_) => new Array(size).fill(-1));
}
function resetMatrix() {
  matrix = createMatrix();
  createBoard();
  turn = x;
  setTurnValue();
  winner.innerText = "None";
  winner.className = "";
  board.style.pointerEvents = "all";
  counter = matrix.length * matrix.length;
}

function setTurnValue() {
  turnElem.innerText = turn;
}

function createBoard() {
  const board = document.getElementById("board");
  board.innerHTML = "";
  for (let i = 0; i < matrix.length; i++) {
    const row = document.createElement("div");
    row.className = "row";
    for (let j = 0; j < matrix.length; j++) {
      let section = document.createElement("button");
      section.id = `${i}-${j}`;
      section.className = "btn btn-outline-primary section rounded-0";
      section.addEventListener("click", setValue);
      row.append(section);
    }
    board.append(row);
  }
}
createBoard();
setTurnValue();
