const items = new Array(10).fill(null);

const imagesContainer = document.getElementById("images-container");

function addItems() {
  const fragment = document.createDocumentFragment();
  items.forEach((_) => {
    const image = document.createElement("div");
    image.className = "card bg-secondary opacity-75";
    fragment.appendChild(image);
  });
  imagesContainer.append(fragment);
}
function addShimmer() {
  const fragment = document.createDocumentFragment();
  items.forEach((_) => {
    const image = document.createElement("div");
    image.className = "card placeholder shimmer opacity-25";
    fragment.appendChild(image);
  });
  imagesContainer.append(fragment);
  setTimeout(() => {
    removeShimmer();
    addItems();
  }, 2000);
}

function removeShimmer() {
  const shimmers = document.querySelectorAll(".shimmer");
  shimmers.forEach((shimmer) => shimmer.parentNode.removeChild(shimmer));
}

let timer;
window.addEventListener("scroll", (e) => {
  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight - 200
  ) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(addShimmer, 500);
  }
});

window.addEventListener("DOMContentLoaded", addItems);
