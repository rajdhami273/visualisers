const diceInput = document.getElementById("diceInput");
const diceContainer = document.getElementById("dice-container");

const diceStyleConfig = {
  1: ["dice-dot-center"],
  2: ["dice-dot-top-right", "dice-dot-bottom-left"],
  3: ["dice-dot-top-right", "dice-dot-center", "dice-dot-bottom-left"],
  4: [
    "dice-dot-top-left",
    "dice-dot-top-right",
    "dice-dot-bottom-left",
    "dice-dot-bottom-right",
  ],
  5: [
    "dice-dot-top-left",
    "dice-dot-top-right",
    "dice-dot-center",
    "dice-dot-bottom-left",
    "dice-dot-bottom-right",
  ],
  6: [
    "dice-dot-top-left",
    "dice-dot-top-right",
    "dice-dot-center-left",
    "dice-dot-center-right",
    "dice-dot-bottom-left",
    "dice-dot-bottom-right",
  ],
};

function onSubmit(e) {
  e.preventDefault();
  createDices(Number(diceInput.value));
}

function createDices(dices) {
  // reset dice container
  diceContainer.innerHTML = "";
  new Array(dices).fill(null).forEach((dice) => {
    // create dice
    const diceElem = document.createElement("div");
    diceElem.className = "dice bg-secondary rounded p-2";

    // create dots wrapper
    const diceDotsWrapper = document.createElement("div");
    diceDotsWrapper.className = "dice-dots-wrapper";

    // randomly generate dots on dice
    const diceDots = Math.floor(Math.random() * 6) + 1;
    diceStyleConfig[diceDots].forEach((className) => {
      // create dots
      const diceDot = document.createElement("div");
      diceDot.className = `dice-dot ${className} bg-white`;
      diceDotsWrapper.appendChild(diceDot);
    });
    diceElem.appendChild(diceDotsWrapper);
    diceContainer.appendChild(diceElem);
  });
}
