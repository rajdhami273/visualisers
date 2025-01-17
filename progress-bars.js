const progressBarsContainer = document.getElementById(
  "progress-bars-container"
);
let progressBars = 0;
let completedBars = 0;

function addProgressBar() {
  const progressBarWrapper = document.createElement("div");
  progressBarWrapper.className = "progress-bar-wrapper";
  progressBarWrapper.style.width = "80%";
  progressBarWrapper.style.backgroundColor = "grey";
  const progressElem = document.createElement("div");
  progressElem.onanimationend = () => {
    completedBars++;
    const allPBs = document.querySelectorAll(".progress-bar-wrapper");
    console.log(allPBs.length, progressBars);
    if (allPBs.length > completedBars) {
      allPBs[completedBars].firstChild.className =
        "progress-bar-elem bg-success";
    }
  };
  progressBarWrapper.appendChild(progressElem);
  progressBarsContainer.appendChild(progressBarWrapper);
  if (progressBars === 0 || progressBars === completedBars) {
    progressElem.className = "progress-bar-elem bg-success";
  }
  progressBars++;
}
