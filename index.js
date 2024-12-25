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
];

const path = window.location.pathname.replace("/", "");
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
      path === href ? "active" : ""
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