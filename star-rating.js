const starRatingComponent = document.getElementById("stars-container");
let currentlyFilled = -1;

function fillStars(idx) {
  const stars = document.querySelectorAll("[class*='bi bi-star']");
  stars.forEach((elem, elemIdx) => {
    if (idx < elemIdx) {
      elem.classList.remove("bi-star-fill", "text-warning");
      elem.classList.add("bi-star");
    } else {
      elem.classList.remove("bi-star");
      elem.classList.add("bi-star-fill", "text-warning");
    }
  });
}

function onHoverOut() {
  const stars = document.querySelectorAll("[class*='bi bi-star']");
  stars.forEach((elem, elemIdx) => {
    if (currentlyFilled < elemIdx) {
      elem.classList.remove("bi-star-fill", "text-warning");
      elem.classList.add("bi-star");
    } else {
      elem.classList.remove("bi-star");
      elem.classList.add("bi-star-fill", "text-warning");
    }
  });
}

function clearStars() {
  currentlyFilled = -1;
  createStars();
}

function createStars() {
  starRatingComponent.innerHTML = "";
  const noOfStars = Number(noOfStarsElem.value || 5);
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < noOfStars; i++) {
    const star = document.createElement("i");
    star.className = "bi bi-star";
    star.onclick = () => {
      currentlyFilled = i;
      fillStars(i);
    };
    star.onmouseover = () => fillStars(i);
    star.onmouseleave = () => onHoverOut(i);
    fragment.appendChild(star);
  }
  starRatingComponent.append(fragment);
}

createStars();
