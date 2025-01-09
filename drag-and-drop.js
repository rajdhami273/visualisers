const listItem = new Array(10).fill(null).map((_, idx) => `Row ${idx + 1}`);

const rowsContainer = document.getElementById("rows-container");

const fragment = document.createDocumentFragment();
let dataElem;
listItem.forEach((_) => {
  const row = document.createElement("div");
  row.classList.add(
    "row",
    "drag-row",
    "p-3",
    "m-2",
    "rounded",
    "border",
    "border-2"
  );
  row.draggable = true;
  row.ondragstart = (e) => {
    dataElem = row;
    e.dataTransfer.setData("text/html", row.innerHTML);
    e.dataTransfer.dropEffect = "move";
    row.classList.add("border-primary", "border-dashed");
  };
  row.ondragend = () => {
    const rows = document.querySelectorAll(".drag-row");
    rows.forEach((elem) =>
      elem.classList.remove("border-primary", "border-dashed")
    );
  };
  row.ondragenter = (e) =>
    e.target.classList.add("border-primary", "border-dashed");
  row.ondragleave = (e) =>
    e.target.classList.remove("border-primary", "border-dashed");
  row.ondragover = (e) => e.preventDefault();
  row.ondrop = (e) => {
    if (dataElem !== row) {
      dataElem.innerHTML = e.target.innerHTML;
      row.innerHTML = e.dataTransfer.getData("text/html");
    }
    return false;
  };
  row.innerHTML = _;
  fragment.appendChild(row);
});

rowsContainer.append(fragment);
