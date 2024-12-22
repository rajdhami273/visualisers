let array = [];
function initArray() {
  timers.forEach((timer) => clearTimeout(timer));
  numberofElements.disabled = false;
  array = [];
  for (let i = 1; i < Number(numberofElements.value); i++) {
    array.push(Math.random() * 100);
  }
  showArray();
}
const timers = [];
function animate(swaps) {
  if (!swaps.length) {
    showArray();
    return;
  }
  const move = swaps.shift();
  if (move.type === "swap") {
    const [i, j] = move.indexes;
    array[i] = array[i] ^ array[j];
    array[j] = array[i] ^ array[j];
    array[i] = array[i] ^ array[j];
  }
  if (move.type === "copy") {
    const { index, value } = move;
    array[index] = value;
  }
  showArray(move);
  timers.push(
    setTimeout(() => {
      animate(swaps);
    }, Number(animationSpeed.value))
  );
}

function play(sortingAlgo) {
  numberofElements.disabled = true;
  const copy = [...array];
  let func = bubbleSort;
  if (sortingAlgo === "insertion") {
    func = insertionSort;
  } else if (sortingAlgo === "selection") {
    func = selectionSort;
  } else if (sortingAlgo === "merge") {
    func = mergeSort;
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

// merge sort
function mergeSort(array) {
  const swaps = [];
  divide(array, 0, array.length, swaps);
  console.log(array, swaps);
  return swaps;
}
function divide(arr, left, right, swaps) {
  if (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    divide(arr, left, mid, swaps);
    divide(arr, mid + 1, right, swaps);
    merge(arr, left, mid, right, swaps);
  }
}
function merge(arr, left, mid, right, swaps) {
  const arrLeft = arr.slice(left, mid + 1);
  const arrRight = arr.slice(mid + 1, right + 1);
  let k = left,
    l = 0,
    r = 0;
  while (l < arrLeft.length && r < arrRight.length) {
    if (arrLeft[l] > arrRight[r]) {
      swaps.push({ indexes: [k, mid + 1 + r], type: "move" });
      swaps.push({
        indexes: [k, mid + 1 + r],
        index: k,
        value: arrRight[r],
        type: "copy",
      });
      arr[k] = arrRight[r];
      r++;
    } else {
      swaps.push({ indexes: [k, left + r], type: "move" });
      swaps.push({
        indexes: [k, left + r],
        index: k,
        value: arrLeft[l],
        type: "copy",
      });
      arr[k] = arrLeft[l];
      l++;
    }
    k++;
  }
  while (l < arrLeft.length) {
    swaps.push({ indexes: [k, left + l], type: "move" });
    swaps.push({
      indexes: [k, left + l],
      index: k,
      value: arrLeft[l],
      type: "copy",
    });
    arr[k] = arrLeft[l];
    l++;
    k++;
  }
  while (r < arrRight.length) {
    swaps.push({ indexes: [k, mid + 1 + r], type: "move" });
    swaps.push({
      indexes: [k, mid + 1 + r],
      index: k,
      value: arrRight[r],
      type: "copy",
    });
    arr[k] = arrRight[r];
    r++;
    k++;
  }
}

function showArray(move) {
  const container = document.getElementById("container");
  container.innerHTML = null;
  for (let idx = 0; idx < array.length; idx++) {
    const bar = document.createElement("div");
    bar.classList.add("bg-dark");
    bar.style.height = `${array[idx]}%`;
    bar.style.width = "40px";
    if (move && move.indexes.includes(idx)) {
      bar.classList.toggle("bg-dark");
      bar.classList.add(
        ["swap", "copy"].includes(move.type) ? "bg-danger" : "bg-primary"
      );
    }
    container.append(bar);
  }
}

initArray();
