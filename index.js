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
  {
    href: "tabs.html",
    title: "Tabs",
  },
  {
    href: "clock.html",
    title: "Clock",
  },
  {
    href: "dice.html",
    title: "Dice",
  },
  {
    href: "snake-and-ladder.html",
    title: "Snake and ladder",
  },
  {
    href: "whack-a-mole.html",
    title: "Whack a mole",
  },
  {
    href: "autocomplete-and-search-bar.html",
    title: "Autocomplete and search bar",
  },
  {
    href: "shimmer.html",
    title: "Shimmer UI",
  },
  {
    href: "accordion.html",
    title: "Accordion",
  },
  {
    href: "unload-boxes.html",
    title: "Unload boxes",
  },
  {
    href: "highlight-text.html",
    title: "Highlight text",
  },
  {
    href: "magic-cursor.html",
    title: "Magic cursor",
  },
  {
    href: "canvas.html",
    title: "Fake canvas",
  },
  {
    href: "memory-game.html",
    title: "Memory game",
  },
  {
    href: "drag-and-drop.html",
    title: "Drag and drop",
  },
  {
    href: "otp.html",
    title: "OTP",
  },
  {
    href: "circles.html",
    title: "Circles",
  },
  {
    href: "animations.html",
    title: "Animations",
  },
  {
    href: "data-list.html",
    title: "Data list",
  },
  {
    href: "star-rating.html",
    title: "Star rating",
  },
  {
    href: "progress-bars.html",
    title: "Progress bars",
  },
  {
    href: "modal.html",
    title: "Modal",
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
