const circleContainer = document.getElementById("circles-container");
const circle1 = document.getElementById("circle1");
const circle2 = document.getElementById("circle2");

let buttonType;

const color1 = "#6B5B95";
const color2 = "#88B04B";

function checkCircleCoincide(circleCurr, circleOther) {
  const {
    right: right1,
    top: top1,
    width: width1,
  } = circleCurr.getBoundingClientRect();
  const {
    right: right2,
    top: top2,
    width: width2,
  } = circleOther.getBoundingClientRect();
  const circle1Radius = width1 / 2;
  const circle2Radius = width2 / 2;
  const leftCircle = {
    x: right1 + circle1Radius,
    y: top1 + circle1Radius,
  };
  const rightCircle = {
    x: right2 + circle2Radius,
    y: top2 + circle2Radius,
  };
  const distance = Math.sqrt(
    Math.pow(rightCircle.x - leftCircle.x, 2) +
      Math.pow(rightCircle.y - leftCircle.y, 2)
  );
  return distance < circle1Radius + circle2Radius;
}

circleContainer.addEventListener("mousedown", (e) => {
  let circle;
  let circleOther;
  if (e.button === 0) {
    buttonType = "left";
    circle = circle1;
    circleOther = circle2;
  } else {
    buttonType = "right";
    circle = circle2;
    circleOther = circle1;
    e.preventDefault();
  }

  circle.style.top = 0;
  circle.style.left = 0;
  circle.style.height = 0
  circle.style.width = 0
  circle.style.backgroundColor = color1;
});
circleContainer.addEventListener("mousemove", (e) => {
  if (!buttonType) {
    return;
  }
  let circle;
  let circleOther;
  if (buttonType === "left") {
    circle = circle1;
    circleOther = circle2;
  } else {
    circle = circle2;
    circleOther = circle1;
  }
  const circleRect = circleContainer.getBoundingClientRect();
  const relativeX = e.clientX - circleRect.left;
  const relativeY = e.clientY - circleRect.top;
  const size = Math.max(Math.abs(relativeX), Math.abs(relativeY));

  const newLeft = relativeX < 0 ? circleRect.left - size : relativeX;
  const newTop = relativeY < 0 ? circleRect.top - size : relativeY;

  circle.style.height = `${size}px`;
  circle.style.width = `${size}px`;
  circle.style.left = `${newLeft}px`;
  circle.style.top = `${newTop}px`;

  if (checkCircleCoincide(circle, circleOther)) {
    circleOther.style.backgroundColor = color2;
  } else {
    circleOther.style.backgroundColor = color1;
  }
});
circleContainer.addEventListener("mouseup", () => {
  buttonType = undefined;
});

window.addEventListener("contextmenu", (e) => e.preventDefault());
