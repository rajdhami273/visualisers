let array = [];
initArray();
function initArray() {
  array = [];
  for (let i = 1; i < 10; i++) {
    array.push(Math.random() * 100);
  }
  showArray();
}

function animate(swaps) {
  if (!swaps.length) {
    showArray();
    return;
  }
  const move = swaps.shift();
  const [i, j] = move.indexes;
  if (move.type === "swap") {
    array[i] = array[i] ^ array[j];
    array[j] = array[i] ^ array[j];
    array[i] = array[i] ^ array[j];
  }
  showArray(move);
  setTimeout(() => {
    animate(swaps);
  }, 400);
}

function play(sortingAlgo) {
  const copy = [...array];
  let func = bubbleSort;
  if (sortingAlgo === "insertion") {
    func = insertionSort;
  } else if (sortingAlgo === "selection") {
    func = selectionSort;
  }
  const swaps = func(copy);
  animate(swaps);
}

function bubbleSort(array) {
  const swaps = [];
  for (let i = 0; i < array.length; i++) {
    let swapped = false;
    for (let j = 0; j < array.length - i - 1; j++) {
      // swaps.push({ indexes: [j, j + 1], type: "move" });
      if (array[j] > array[j + 1]) {
        swaps.push({ indexes: [j, j + 1], type: "swap" });
        array[j] = array[j] ^ array[j + 1];
        array[j + 1] = array[j] ^ array[j + 1];
        array[j] = array[j] ^ array[j + 1];
        swapped = true;
      }
    }
    if (!swapped) {
      break;
    }
  }
  return swaps;
}
function insertionSort(array) {
  const swaps = [];
  for (let i = 1; i < array.length; i++) {
    curr = array[i];
    j = i - 1;
    while (j >= 0 && array[j] > curr) {
      swaps.push({ indexes: [j + 1, j], type: "swap" });
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = curr;
  }
  return swaps;
}
function selectionSort(array) {
  const swaps = [];
  for (let i = 0; i < array.length - 1; i++) {
    currIdx = i;
    for (let j = i + 1; j < array.length; j++) {
      swaps.push({ indexes: [i, j], type: "move" });
      if (array[j] < array[currIdx]) {
        currIdx = j;
      }
    }
    if (currIdx !== i) {
      swaps.push({ indexes: [i, currIdx], type: "swap" });
      array[i] = array[i] ^ array[currIdx];
      array[currIdx] = array[i] ^ array[currIdx];
      array[i] = array[i] ^ array[currIdx];
    }
  }
  return swaps;
}
function showArray(move) {
  const container = document.getElementById("container");
  container.innerHTML = null;
  for (let idx = 0; idx < array.length; idx++) {
    const bar = document.createElement("div");
    bar.style.height = `${array[idx]}%`;
    bar.style.width = "40px";
    if (move && move.indexes.includes(idx)) {
      bar.style.backgroundColor = move.type === "swap" ? "red" : "blue";
    }
    container.append(bar);
  }
}
