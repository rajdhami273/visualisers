const files = [
  { name: "Root 1", children: [{ name: "Root 1 - child 1" }] },
  { name: "Root 2", children: [{ name: "Root 2 - child 1" }] },
  {
    name: "Root 3",
    children: [
      {
        name: "Root 3 - child 1",
        children: [
          {
            name: "Root 3 - child 1 - child 1",
            children: [{ name: "Root 3 - child 1 - child 1 - child 1" }],
          },
        ],
      },
    ],
  },
  { name: "Root 4", children: [{ name: "Root 4 - child 1" }] },
  { name: "Root 5", children: [{ name: "Root 5 - child 1" }] },
];
function hideChildren(children) {
  children.classList.toggle("d-none");
}
function createStructure(filesArray) {
  if (!filesArray?.length) {
    return document.createDocumentFragment();
  }
  const ul = document.createElement("ul");
  for (let file of filesArray) {
    const { name, children } = file;
    const li = document.createElement("li");
    const hasChildren = !!children;
    li.innerHTML =
      (hasChildren
        ? '<i class="bi bi-folder-fill"></i> '
        : ' <i class="bi bi-file-earmark-fill"></i> ') +
      name +
      (hasChildren ? ' <i class="bi bi-caret-down-fill"></i>' : "");
    const childNode = createStructure(children);
    li.style.cursor = "pointer";
    li.addEventListener("click", (e) => {
      e.stopPropagation();
      if (hasChildren) {
        const liClassList = li.children[1].classList;
        if (liClassList.contains("bi-caret-down-fill")) {
          liClassList.remove("bi-caret-down-fill");
          liClassList.add("bi-caret-up-fill");
          file.open = false;
        } else {
          liClassList.remove("bi-caret-up-fill");
          liClassList.add("bi-caret-down-fill");
          file.open = true;
        }
        hideChildren(childNode);
      }
    });
    li.appendChild(childNode);
    ul.appendChild(li);
  }
  return ul;
}

function init() {
  const fileExplorerContainer = document.getElementById(
    "file-explorer-container"
  );
  const fragment = document.createDocumentFragment();
  fragment.appendChild(createStructure(files));
  fileExplorerContainer.appendChild(fragment);
}

window.addEventListener("DOMContentLoaded", () => {
  init();
});
