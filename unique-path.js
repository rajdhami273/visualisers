// global
const block = "🦖";
const duck = "🐥";
const home = "🏡";
let matrix = createMatrix();

function minimumTimeToReachEnd() {
  const row = Number(boardRow.value || 3);
  const col = Number(boardCol.value || 3);
  let allTrace = [];
  const { time, trace, error } = traverse(
    row - 1,
    col - 1,
    0,
    0,
    0,
    [],
    allTrace
  );
  const allTraceSpread = [];
  allTrace.forEach((trace) => allTraceSpread.push(duck, ...trace));
  if (error) {
    minimum.innerHTML = "Cannot reach the end!";
    animate([...allTraceSpread, duck], true);
    return decorateError("0-0");
  }
  minimum.innerHTML = time;
  allTraceSpread.push(duck, ...trace);
  animate(allTraceSpread);
}

function animate(allTrace, fail) {
  if (!allTrace.length) {
    return;
  }
  const trace = allTrace.shift();
  if (trace === duck) {
    createBoard();
    animate(allTrace, fail);
  } else {
    if (fail) {
      decorateError(trace);
    } else {
      decorateWinner(trace);
    }
    setTimeout(() => animate(allTrace, fail), 400);
  }
}

function decorateWinner(trace) {
  document.getElementById(trace).className =
    "btn btn-success section rounded-0 winnerAnimation";
}
function decorateError(trace) {
  document.getElementById(trace).className =
    "btn btn-danger section rounded-0 winnerAnimation";
}

function traverse(rowT, colT, row, col, acc, trace = [], allTrace = []) {
  const path = `${row}-${col}`;
  if (row === rowT && col === colT) {
    allTrace.push(trace.concat(path));
    return {
      time: acc,
      trace: trace.concat(path),
      allTrace,
    };
  }
  if (matrix[row][col] === block) {
    allTrace.push(trace.concat(path));
    return {
      error: true,
    };
  }
  const newAcc = acc + (matrix[row][col] === duck ? 0 : matrix[row][col]);
  if (row < rowT && col < colT) {
    const down = traverse(
      rowT,
      colT,
      row + 1,
      col,
      newAcc,
      trace.concat(path),
      allTrace
    );
    const right = traverse(
      rowT,
      colT,
      row,
      col + 1,
      newAcc,
      trace.concat(path),
      allTrace
    );
    if (down.error && right.error) {
      return { error: true };
    }
    if (down.error) {
      return right;
    }
    if (right.error) {
      return down;
    }
    if (down.time < right.time) {
      return down;
    }
    return right;
  } else if (row < rowT) {
    return traverse(
      rowT,
      colT,
      row + 1,
      col,
      newAcc,
      trace.concat(path),
      allTrace
    );
  } else if (col < colT) {
    return traverse(
      rowT,
      colT,
      row,
      col + 1,
      newAcc,
      trace.concat(path),
      allTrace
    );
  }
  return {
    error: true,
  };
}

function createMatrix() {
  const row = Number(boardRow.value || 3);
  const col = Number(boardCol.value || 3);
  const arr = new Array(row)
    .fill([])
    .map((_) =>
      new Array(col).fill("").map((_) => Math.ceil(Math.random() * 100))
    );
  arr[0][0] = duck;
  arr[row - 1][col - 1] = home;
  minimum.innerHTML = "Hit that start button!";
  return arr;
}

function resetBoard() {
  matrix = createMatrix();
  createBoard();
  minimum.innerHTML = "Hit that start button!";
}

function setBlock(e) {
  return function (row, col) {
    matrix[row][col] = block;
    e.target.innerHTML = block;
  };
}

function createBoard() {
  const board = document.getElementById("board");
  board.innerHTML = "";
  for (let i = 0; i < matrix.length; i++) {
    const row = document.createElement("div");
    row.className = "row";
    for (let j = 0; j < matrix[0].length; j++) {
      let section = document.createElement("button");
      section.id = `${i}-${j}`;
      section.className = "btn btn-outline-primary section rounded-0";
      section.addEventListener("click", (e) => setBlock(e)(i, j));
      section.innerHTML = matrix[i][j];
      row.append(section);
    }
    board.append(row);
  }
}
createBoard();
