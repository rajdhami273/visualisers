const sidebarTabs = [
  {
    href: "index.html",
    title: "Sorting",
  },
  {
    href: "tictactoe.html",
    title: "Tic tac toe",
  },
  {
    href: "unique-path.html",
    title: "Unique path",
  },
  {
    href: "traffic-light.html",
    title: "Traffic light",
  },
  {
    href: "stop-watch.html",
    title: "Stop watch",
  },
  {
    href: "carousel.html",
    title: "Carousel",
  },
  {
    href: "file-explorer.html",
    title: "File explorer",
  },
];

const path = window.location.pathname.split("/").pop();
function addSidebarTabs() {
  const sidenavContainer = document.getElementById("side-nav");
  const fragment = document.createDocumentFragment();
  const ul = document.createElement("ul");
  ul.className = "nav nav-pills flex-column mb-auto";
  for (let tab of sidebarTabs) {
    const { href, title } = tab;
    const li = `
    <li class="nav-item">
      <a href="${href}" class="nav-link  text-white ${
      path === href || (!path && href === "index.html") ? "active" : ""
    }" aria-current="page">
        ${title}
      </a>
    </li>
  `;
    ul.innerHTML += li;
  }
  fragment.append(ul);
  sidenavContainer.append(fragment);
}

addSidebarTabs();
