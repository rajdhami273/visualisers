const config = [
  [1, 1, 1, 0],
  [1, 0, 1, 1],
  [0, 1, 1, 1],
  [1, 1, 0, 1],
];
let unloadReverse = false;
const unloadBoard = document.getElementById("unload-board");

const visibleBoxes = config.reduce(
  (acc, row) => (acc += row.reduce((acc1, num) => (acc1 += num), 0)),
  0
);

const selectedBoxes = new Set();

function unloadReverseToggle(e) {
  unloadReverse = e.target.checked;
}

function maybeUnload() {
  if (selectedBoxes.size >= visibleBoxes) {
    setTimeout(unloadBoxes, 500);
  }
}

let counter = 0;
function unloadBoxes() {
  const selectedBoxesArr = [...selectedBoxes.keys()];
  let idx = counter;
  if (unloadReverse) {
    idx = selectedBoxesArr.length - 1 - counter;
  }
  if (selectedBoxesArr[idx]) {
    document
      .getElementById(selectedBoxesArr[idx])
      .classList.remove("bg-success");
    counter += 1;
    setTimeout(unloadBoxes, Number(animationSpeed.value));
  } else {
    resetAll();
  }
}

function resetAll() {
  counter = 0;
  selectedBoxes.clear();
  createBoard();
}

function createBoard() {
  unloadBoard.innerHTML = "";
  const fragment = document.createDocumentFragment();
  config.forEach((row, i) => {
    const rowDiv = document.createElement("div");
    rowDiv.className = "d-flex gap-2  justify-content-center";
    row.forEach((num, j) => {
      const rowElem = document.createElement("div");
      const elemId = `elem-${i}-${j}`;
      if (num) {
        rowElem.onclick = () => {
          selectedBoxes.add(elemId);
          rowElem.classList.add("bg-success");
          maybeUnload();
        };
        rowElem.role = "button";
        rowElem.classList.add("unload-box");
      } else {
        rowElem.classList.add("unload-box-placeholder");
      }
      rowElem.setAttribute("id", elemId);
      rowDiv.appendChild(rowElem);
    });
    fragment.appendChild(rowDiv);
  });
  unloadBoard.append(fragment);
}

function init() {
  createBoard();
}

init();
