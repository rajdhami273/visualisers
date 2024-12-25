let hoursVar = 0,
  minutesVar = 0,
  secondsVar = 0,
  countVar = 0;

let timer;
function start() {
  countVar++;
  if (countVar === 100) {
    countVar = 0;
    secondsVar++;
    if (secondsVar === 60) {
      secondsVar = 0;
      minutesVar++;
      if (minutesVar === 60) {
        minutesVar = 0;
        hoursVar++;
      }
    }
  }
  count.innerText = appendZero(countVar);
  seconds.innerText = appendZero(secondsVar);
  minutes.innerText = appendZero(minutesVar);
  hours.innerText = appendZero(hoursVar);
  startStopBtn.innerText = "Stop";
  startStopBtn.className = "btn btn-sm btn-outline-warning w-100";
  timer = setTimeout(start, 10);
}

function appendZero(num) {
  if (num < 10) {
    return `0${num}`;
  }
  return num;
}

function stop() {
  clearTimeout(timer);
  timer = undefined;
  startStopBtn.innerText = "Start";
  startStopBtn.className = "btn btn-sm btn-outline-success w-100";
}

function startStop() {
  if (timer) {
    stop();
  } else {
    start();
  }
}

function reset() {
  stop();
  hoursVar = 0;
  minutesVar = 0;
  secondsVar = 0;
  countVar = 0;
  seconds.innerText = "-";
  minutes.innerText = "-";
  hours.innerText = "-";
  count.innerText = "-";
}

window.addEventListener("unload", () => {
  clearTimeout(timer);
  timer = undefined;
});
