const timers = [];
function init() {
  const date = new Date();
  const seconds = date.getSeconds();
  const minutes = date.getMinutes();
  const hours = date.getHours();

  // analog
  const secondsHand = document.getElementById("seconds-hand");
  resetAnimation(seconds, secondsHand);
  secondsHand.style.transform = `translateX(-50%) rotate(${seconds * 6}deg)`;
  const minutesHand = document.getElementById("minutes-hand");
  resetAnimation(minutes, minutesHand);
  minutesHand.style.transform = `translateX(-50%) rotate(${minutes * 6}deg)`;
  const hoursHand = document.getElementById("hours-hand");
  resetAnimation(hours, hoursHand);
  hoursHand.style.transform = `translateX(-50%) rotate(${
    (hours % 12) * 30
  }deg)`;

  // digital
  const hoursScreen = document.getElementById("hours-screen");
  hoursScreen.innerText = appendZero(hours);
  const minutesScreen = document.getElementById("minutes-screen");
  minutesScreen.innerText = appendZero(minutes);
  const secondsScreen = document.getElementById("seconds-screen");
  secondsScreen.innerText = appendZero(seconds);

  const dayScreen = document.getElementById("day-screen");
  dayScreen.innerText = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
  }).format(date);
  const dateScreen = document.getElementById("date-screen");
  const dayNum = date.getDate();
  const month = new Intl.DateTimeFormat("en-US", {
    month: "short",
  }).format(date);
  const year = date.getFullYear();
  dateScreen.innerText = `${dayNum} ${month}, ${year}`;

  // recall
  timers.push(setTimeout(init, 1000));
}

function resetAnimation(time, elem) {
  if (time === 0) {
    elem.style.transition = "all 0s linear";
  } else if (time === 1) {
    elem.style.transition = "all 1s linear";
  }
}

function appendZero(time) {
  if (time < 10) {
    return `0${time}`;
  }
  return time;
}

window.addEventListener("DOMContentLoaded", init);

window.addEventListener("unload", () => {
  timers.forEach((timer) => clearTimeout(timer));
});
