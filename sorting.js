let array = [];
function initArray() {
  timers.forEach((timer) => clearTimeout(timer));
  numberofElements.disabled = false;
  array = [];
  for (let i = 1; i < Number(numberofElements.value); i++) {
    array.push(Math.ceil(Math.random() * 100));
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
  if (move.type === "animate") {
    const [i, j] = move.indexes;
    moveAnimation(i, j);
    timers.push(
      setTimeout(() => {
        animate(swaps);
      }, Number(animationSpeed.value))
    );
    return;
  } else if (move.type === "swap") {
    const [i, j] = move.indexes;
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  } else if (move.type === "copy") {
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

function moveAnimation(i, j) {
  const iElem = document.getElementById(i);
  const jElem = document.getElementById(j);
  [iElem, jElem].forEach((elem) => {
    const { left, top, width, height } = elem.getBoundingClientRect();
    const elemCopy = elem.cloneNode();
    elem.classList.remove("bg-dark");
    elem.style.backgroundColor = "transparent";
    elemCopy.id = `${elem.id}clone`;
    elemCopy.style.width = `${width}px`;
    elemCopy.style.height = `${height}px`;
    elemCopy.style.left = `${left}px`;
    elemCopy.style.top = `${top}px`;
    elemCopy.style.position = "fixed";
    elemCopy.style.transition = "all 0.3s linear";
    elemCopy.classList.remove("bg-dark");
    elemCopy.classList.add("bg-danger");
    document.body.append(elemCopy);
  });
  const iElemClone = document.getElementById(`${i}clone`);
  const jElemClone = document.getElementById(`${j}clone`);
  const { left: iLeft } = iElemClone.getBoundingClientRect();
  const { left: jLeft } = jElemClone.getBoundingClientRect();
  iElemClone.style.left = `${jLeft}px`;
  jElemClone.style.left = `${iLeft}px`;
  setTimeout(() => {
    iElemClone.remove();
    jElemClone.remove();
  }, Number(animationSpeed.value));
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
  } else if (sortingAlgo === "quick") {
    func = quickSort;
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
        swaps.push({ indexes: [j, j + 1], type: "animate" });
        swaps.push({ indexes: [j, j + 1], type: "swap" });
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
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
      swaps.push({ indexes: [j + 1, j], type: "animate" });
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
      swaps.push({ indexes: [i, currIdx], type: "animate" });
      swaps.push({ indexes: [i, currIdx], type: "swap" });
      const temp = array[i];
      array[i] = array[currIdx];
      array[currIdx] = temp;
    }
  }
  return swaps;
}

// merge sort
function mergeSort(array) {
  const swaps = [];
  divide(array, 0, array.length, swaps);
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

// quick sort
function quickSort(array) {
  const swaps = [];
  quickSortMain(array, 0, array.length - 1, swaps);
  return swaps;
}
function quickSortMain(arr, left, right, swaps) {
  if (left < right) {
    const pivot = partition(arr, left, right, swaps);
    quickSortMain(arr, left, pivot - 1, swaps);
    quickSortMain(arr, pivot + 1, right, swaps);
  }
}
function partition(arr, left, right, swaps) {
  const pivot = arr[right];
  let i = left - 1;
  for (let j = left; j <= right - 1; j++) {
    swaps.push({ indexes: [j, right], type: "move" });
    if (arr[j] < pivot) {
      i++;
      swaps.push({ indexes: [j, j], type: "animate" });
      swaps.push({ indexes: [i, j], type: "swap" });
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }

  swaps.push({ indexes: [i + 1, right], type: "animate" });
  swaps.push({ indexes: [i + 1, right], type: "swap" });
  const temp = arr[i + 1];
  arr[i + 1] = arr[right];
  arr[right] = temp;

  return i + 1;
}

function showArray(move) {
  const container = document.getElementById("container");
  container.innerHTML = null;
  for (let idx = 0; idx < array.length; idx++) {
    const bar = document.createElement("div");
    bar.classList.add("bg-dark");
    bar.classList.add("rounded");
    bar.style.height = `${array[idx]}%`;
    bar.style.width = "40px";
    bar.id = idx;
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
