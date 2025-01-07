const canvasContainer = document.getElementById("canvas-container");

const pixelHeight = 10;
const pixelWidth = 10;
let dragging = false;
let pixelColor = "#000000";
document.getElementById("color-picker").value = pixelColor;
let mode = "draw";

function toggleMode(newMode) {
  mode = newMode;
  const classes = ["active", "btn-outline-primary"];
  if (mode === "draw") {
    drawBtn.classList.add(...classes);
    eraseBtn.classList.remove(...classes);
  } else {
    drawBtn.classList.remove(...classes);
    eraseBtn.classList.add(...classes);
  }
}
function onColorChange(e) {
  pixelColor = e.target.value;
}

function getColor() {
  if (mode === "draw") {
    return pixelColor;
  }
  return "transparent";
}

function createCanvas() {
  canvasContainer.innerHTML = "";
  canvasContainer.onmousedown = () => (dragging = true);
  canvasContainer.onmouseup = () => (dragging = false);
  const height = canvasContainer.clientHeight;
  const width = canvasContainer.clientWidth;
  const totalRows = Math.ceil(height / pixelHeight);
  const totalColumns = Math.ceil(width / pixelWidth);

  const fragment = document.createDocumentFragment();
  new Array(totalRows).fill(null).forEach((_) => {
    const row = document.createElement("div");
    row.classList.add("d-flex");
    new Array(totalColumns).fill(null).forEach((_) => {
      const pixel = document.createElement("div");
      pixel.style.height = `${pixelHeight}px`;
      pixel.style.width = `${pixelWidth}px`;
      pixel.onclick = () => (pixel.style.backgroundColor = getColor());
      pixel.onmousedown = () => (pixel.style.backgroundColor = getColor());
      pixel.onmouseenter = () =>
        dragging ? (pixel.style.backgroundColor = getColor()) : null;
      row.appendChild(pixel);
    });
    fragment.appendChild(row);
  });
  canvasContainer.appendChild(fragment);
}

createCanvas();
