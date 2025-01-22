let files = [
  {
    name: "Root",
    children: [
      {
        name: "1",
        children: [
          {
            name: "3",
            children: [
              { name: "9", children: [{ name: "10" }, { name: "11" }] },
            ],
          },
          { name: "4" },
        ],
      },
      {
        name: "2",
        children: [
          { name: "5" },
          { name: "6", children: [{ name: "7" }, { name: "8" }] },
        ],
      },
      {
        name: "12",
        children: [
          { name: "13" },
          { name: "14", children: [{ name: "15" }, { name: "16" }] },
        ],
      },
    ],
  },
];

jsonInput.value = JSON.stringify(files, null, 2);

function flattenCustom(files) {
  const arr = [];
  for (let file of files) {
    const child = [];
    if (file.children) {
      child.push(...flattenCustom(file.children));
    }
    arr.push(
      {
        id: file.name,
        child: file.children?.map((child) => child.name) ?? [],
      },
      ...child
    );
  }
  return arr;
}

function parseJson() {
  try {
    const tempfiles = JSON.parse(jsonInput.value);
    if (!Array.isArray(tempfiles)) {
      throw new Error("Should be an array");
    }
    if (!tempfiles.length) {
      throw new Error("Should have atleast one node");
    }
    const arr = flattenCustom(tempfiles);
    const mem = {};
    for (const elem of arr) {
      if (!Object.hasOwn(elem, "id")) {
        throw new Error("Every objects must have name property");
      }
      if (mem[elem.id]) {
        throw new Error("Every object must have unique name");
      }
      mem[elem.id] = true;
    }
    files = tempfiles;
    init();
  } catch (error) {
    alert(error.message || "Invalid JSON");
  }
}

function generateLinesToDraw(files = []) {
  const arr = flattenCustom(files);
  const lines = document.getElementById("paths");
  lines.innerHTML = "";
  const fragment = document.createDocumentFragment();
  for (const { id, child } of arr) {
    if (child) {
      const parent = document.getElementById(id);
      const {
        left: pL,
        right: pR,
        bottom: pB,
      } = parent.getBoundingClientRect();
      const x1 = pL + (pR - pL) / 2;
      const y1 = pB;
      for (const elemId of child) {
        const child = document.getElementById(elemId);
        const { left: cL, right: cR, top: cT } = child.getBoundingClientRect();
        const x2 = cL + (cR - cL) / 2;
        const y2 = cT;
        const arrowId = "arrow-" + elemId;
        const stroke = "black";
        const svgLine = new DOMParser().parseFromString(
          `<svg style="overflow: visible; pointer-events: none;" class="position-fixed top-0 left-0 opacity-75">
            <defs>
              <marker id="${arrowId}" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="${stroke}" />
              </marker>
            </defs>
            <path d="M ${x1} ${y1} T ${x2} ${y2}" stroke="${stroke}" stroke-width="1" fill="transparent" marker-end="url(#${arrowId})" />
           </svg>`,
          "text/html"
        );
        fragment.appendChild(svgLine.body.firstChild);
      }
    }
  }
  lines.append(fragment);
  return arr;
}
function hideChildren(children) {
  children.classList.toggle("d-none");
}
function createStructure(filesArray) {
  if (!filesArray?.length) {
    return document.createDocumentFragment();
  }
  const ul = document.createElement("ul");
  ul.style.margin = "4px";
  for (let file of [...filesArray].reverse()) {
    const { name, children } = file;
    const li = document.createElement("li");
    li.style.margin = "4px";
    li.innerHTML = `<div id="${name}" class='d-flex rounded-circle border border-dark justify-content-center align-items-center' style='width: 50px; height: 50px; transform: rotate(-90deg);'>
      ${name}
      </div>`;
    const childNode = createStructure(children);
    li.style.cursor = "pointer";
    li.classList.add("d-flex", "align-items-center");
    li.appendChild(childNode);
    ul.appendChild(li);
  }
  return ul;
}

function init() {
  const fileExplorerContainer = document.getElementById(
    "file-explorer-container"
  );
  fileExplorerContainer.innerHTML = "";
  const fragment = document.createDocumentFragment();
  const child = createStructure(files);
  child.style.transform = "rotate(90deg)";
  child.style.width = "min-content";
  fragment.appendChild(child);
  fileExplorerContainer.appendChild(fragment);
  generateLinesToDraw(files);
}

window.addEventListener("DOMContentLoaded", () => {
  init();
});
window.addEventListener("resize", () => {
  init();
});
window.addEventListener("scroll", () => {
  init();
});
