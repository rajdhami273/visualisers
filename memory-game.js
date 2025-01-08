const emojis = [
  "🫎",
  "🫏",
  "🦘",
  "🦑",
  "🐙",
  "🦙",
  "🐖",
  "🐄",
  "🐂",
  "🐨",
  "🦌",
  "🦍",
  "🦬",
  "🐗",
  "🦏",
  "🪿",
  "🦅",
  "🐒",
  "🦆",
  "🐀",
];
let board = generateBoard(16, 2);
const totalRows = 4;
const totalCols = 4;
const matched = new Set();
let picked = [];
const memoryBoardContainer = document.getElementById("memory-game-board");

function addToPicked(idx) {
  picked.push(idx);
  if (picked.length === 2) {
    if (new Set(picked.map((idxInner) => board[idxInner])).size === 1) {
      picked.forEach((idxI) => matched.add(idxI));
      picked = [];
      createBoard();
    } else {
      createBoard();
      setTimeout(() => {
        picked = [];
        createBoard();
      }, 500);
    }
    return;
  }
  createBoard();
}
function shuffleElems(array) {
  for (let i = 0; i < array.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
function generateBoard(totalBoxes, matchCount) {
  const numOfGroups = totalBoxes / matchCount;
  if (numOfGroups > emojis.length) {
    throw new Error("Not enough emojis");
  }

  const array = new Array(numOfGroups)
    .fill(null)
    .map((_, idx) => idx)
    .map((idx) => new Array(matchCount).fill(emojis[idx]))
    .flat();
  return shuffleElems(array);
}

function reset() {
  picked = [];
  matched.clear();
  board = generateBoard(16, 2);
  createBoard();
}
function createBoard() {
  memoryBoardContainer.innerHTML = "";
  const fragment = document.createDocumentFragment();
  new Array(totalRows).fill(null).forEach((_, idx) => {
    const row = document.createElement("div");
    row.classList.add("d-flex");
    new Array(totalCols).fill(null).forEach((_, idxInner) => {
      const box = document.createElement("button");
      box.classList.add("btn", "btn-outline-primary", "memory-game-box");
      const arrayIdx = idx * totalCols + idxInner;
      box.id = arrayIdx;
      box.innerHTML =
        matched.has(arrayIdx) || picked.includes(arrayIdx)
          ? board[arrayIdx]
          : "&nbsp;";
      box.onclick = () => addToPicked(arrayIdx);
      box.disabled = matched.has(arrayIdx) || picked.includes(arrayIdx);
      row.append(box);
    });
    fragment.appendChild(row);
  });
  memoryBoardContainer.append(fragment);
}

createBoard();
